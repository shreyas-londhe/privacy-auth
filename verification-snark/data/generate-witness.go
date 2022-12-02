package data

import (
	"encoding/json"

	"github.com/consensys/gnark/frontend"

	"github.com/shryasss/registration-snark/circuit"
	"github.com/shryasss/registration-snark/utils"
)

func GenerateWitness(content []byte) (circuit.TreeData, []string) {
	var witness circuit.TreeData
	var publicInputs [1]string

	var payload map[string]interface{}
	err := json.Unmarshal(content, &payload)
	utils.HandleError(err)

	// MembersRoot
	witness.MembersRoot = payload["MembersRoot"].(string)
	publicInputs[0] = payload["MembersRoot"].(string)

	// User.PrivateID
	witness.User.PrivateID = payload["User"].(map[string]interface{})["PrivateID"].(string)

	// SlotProof
	witness.SlotProof = make([]frontend.Variable, len(payload["SlotProof"].([]interface{})))
	for i := 0; i < len(payload["SlotProof"].([]interface{})); i++ {
		witness.SlotProof[i] = payload["SlotProof"].([]interface{})[i].(string)
	}

	// SlotHelper
	witness.SlotHelper = make([]frontend.Variable, len(payload["SlotHelper"].([]interface{})))
	for i := 0; i < len(payload["SlotHelper"].([]interface{})); i++ {
		witness.SlotHelper[i] = int(payload["SlotHelper"].([]interface{})[i].(float64))
	}

	return witness, publicInputs[:]
}
