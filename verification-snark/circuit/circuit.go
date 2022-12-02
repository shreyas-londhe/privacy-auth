package circuit

import (
	"github.com/consensys/gnark/frontend"
	"github.com/consensys/gnark/std/accumulator/merkle"
	"github.com/consensys/gnark/std/hash/mimc"
	"github.com/shryasss/registration-snark/utils"
)

func (circuit *TreeData) Define(api frontend.API) error {

	hFunc, err := mimc.NewMiMC(api)
	utils.HandleError(err)

	// Verify Slot
	hFunc.Reset()
	hFunc.Write(circuit.User.PrivateID)
	leaf := hFunc.Sum()

	api.AssertIsEqual(leaf, circuit.SlotProof[0])

	hFunc.Reset()
	merkle.VerifyProof(
		api,
		hFunc,
		circuit.MembersRoot,
		circuit.SlotProof,
		circuit.SlotHelper,
	)

	return nil
}
