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

	// Verify Old Slot
	hFunc.Reset()
	hFunc.Write(circuit.Slot)
	oldLeaf := hFunc.Sum()
	api.AssertIsEqual(circuit.SlotProof[0], oldLeaf)

	hFunc.Reset()
	merkle.VerifyProof(
		api,
		hFunc,
		circuit.OldMembersRoot,
		circuit.SlotProof,
		circuit.SlotHelper,
	)

	// Verify New Slot
	hFunc.Reset()
	hFunc.Write(circuit.User.PrivateID)
	newLeaf := hFunc.Sum()

	circuit.SlotProof[0] = newLeaf

	hFunc.Reset()
	merkle.VerifyProof(
		api,
		hFunc,
		circuit.NewMembersRoot,
		circuit.SlotProof,
		circuit.SlotHelper,
	)

	return nil
}
