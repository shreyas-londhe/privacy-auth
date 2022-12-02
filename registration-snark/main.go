package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"math/big"
	"net/http"
	"os"
	"runtime/debug"

	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/consensys/gnark/frontend/cs/r1cs"
	"github.com/shryasss/registration-snark/circuit"
	"github.com/shryasss/registration-snark/data"
	"github.com/shryasss/registration-snark/utils"
)

func main() {
	http.HandleFunc("/", Handler)
	fmt.Println("Server started on port 6969")
	http.ListenAndServe(":6969", nil)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		defer func() { //catch or finally
			if err := recover(); err != nil { //catch
				fmt.Println(string(debug.Stack()))
				fmt.Fprintf(os.Stderr, "Exception: %v\n", err)
				w.Header().Set("Content-Type", "application/json")
				data := make(map[string]string)
				data["error"] = fmt.Sprintf("%v", err)
				data["status"] = "error"
				json.NewEncoder(w).Encode(data)
			}
		}()
		// get request body and parse it as bytes
		req, err := io.ReadAll(r.Body)
		defer r.Body.Close()
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		witness, publicInputs := data.GenerateWitness(req)

		circuitInstance := circuit.TreeData{}
		circuitInstance.SlotProof = make([]frontend.Variable, len(witness.SlotProof))
		circuitInstance.SlotHelper = make([]frontend.Variable, len(witness.SlotHelper))

		r1cs, err := frontend.Compile(ecc.BN254, r1cs.NewBuilder, &circuitInstance, frontend.IgnoreUnconstrainedInputs())
		utils.HandleError(err)

		CreateNewKeys := false
		var pk groth16.ProvingKey
		var vk groth16.VerifyingKey

		if CreateNewKeys {
			pk, vk, err = groth16.Setup(r1cs)
			utils.HandleError(err)
			{
				f, err := os.Create("exports/register-user-snark.vk")
				utils.HandleError(err)
				_, err = vk.WriteRawTo(f)
				utils.HandleError(err)
			}
			{
				f, err := os.Create("exports/register-user-snark.pk")
				utils.HandleError(err)
				_, err = pk.WriteRawTo(f)
				utils.HandleError(err)
			}
			{
				f, err := os.Create("exports/register-user-snark-verifier.sol")
				utils.HandleError(err)
				err = vk.ExportSolidity(f)
				utils.HandleError(err)
			}
		} else {
			pk = groth16.NewProvingKey(ecc.BN254)
			{
				f, _ := os.Open("exports/register-user-snark.pk")
				_, err = pk.ReadFrom(f)
				f.Close()
				utils.HandleError(err)
			}
			vk = groth16.NewVerifyingKey(ecc.BN254)
			{
				f, _ := os.Open("exports/register-user-snark.vk")
				_, err = vk.ReadFrom(f)
				f.Close()
				utils.HandleError(err)
			}
		}

		validWitness, err := frontend.NewWitness(&witness, ecc.BN254)
		utils.HandleError(err)

		validPublicWitness, err := frontend.NewWitness(&witness, ecc.BN254, frontend.PublicOnly())
		utils.HandleError(err)

		circuitProof, err := groth16.Prove(r1cs, pk, validWitness)
		utils.HandleError(err)

		err = groth16.Verify(circuitProof, vk, validPublicWitness)
		utils.HandleError(err)

		// get proof bytes
		const fpSize = 4 * 8
		var buff bytes.Buffer
		circuitProof.WriteRawTo(&buff)
		proofBytes := buff.Bytes()

		// solidity contract inputs
		var (
			a [2]*big.Int
			b [2][2]*big.Int
			c [2]*big.Int
		)

		// proof.Ar, proof.Bs, proof.Krs
		a[0] = new(big.Int).SetBytes(proofBytes[fpSize*0 : fpSize*1])
		a[1] = new(big.Int).SetBytes(proofBytes[fpSize*1 : fpSize*2])
		b[0][0] = new(big.Int).SetBytes(proofBytes[fpSize*2 : fpSize*3])
		b[0][1] = new(big.Int).SetBytes(proofBytes[fpSize*3 : fpSize*4])
		b[1][0] = new(big.Int).SetBytes(proofBytes[fpSize*4 : fpSize*5])
		b[1][1] = new(big.Int).SetBytes(proofBytes[fpSize*5 : fpSize*6])
		c[0] = new(big.Int).SetBytes(proofBytes[fpSize*6 : fpSize*7])
		c[1] = new(big.Int).SetBytes(proofBytes[fpSize*7 : fpSize*8])

		data := circuit.OutputParams{}
		data.A = [2]string{a[0].String(), a[1].String()}
		data.B = [2][2]string{}
		for i := 0; i < 2; i++ {
			for j := 0; j < 2; j++ {
				data.B[i][j] = b[i][j].String()
			}
		}
		data.C = [2]string{c[0].String(), c[1].String()}
		for i := 0; i < 3; i++ {
			data.Input[i] = publicInputs[i]
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
	}
}
