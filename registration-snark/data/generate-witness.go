package data

import (
	"encoding/json"

	"github.com/consensys/gnark/frontend"

	"github.com/shryasss/registration-snark/circuit"
	"github.com/shryasss/registration-snark/utils"
)

func GenerateWitness(content []byte) (circuit.TreeData, []string) {
	var witness circuit.TreeData
	var publicInputs [3]string

	var payload map[string]interface{}
	err := json.Unmarshal(content, &payload)
	utils.HandleError(err)

	// OldMembersRoot
	witness.OldMembersRoot = payload["OldMembersRoot"].(string)
	publicInputs[0] = payload["OldMembersRoot"].(string)

	// NewMembersRoot
	witness.NewMembersRoot = payload["NewMembersRoot"].(string)
	publicInputs[1] = payload["NewMembersRoot"].(string)

	// Slot
	witness.Slot = payload["Slot"].(string)
	publicInputs[2] = payload["Slot"].(string)

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
