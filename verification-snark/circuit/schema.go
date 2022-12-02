package circuit

import (
	"github.com/consensys/gnark/frontend"
	"github.com/shryasss/registration-snark/utils"
)

type UserData struct {
	PrivateID frontend.Variable
}

type TreeData struct {
	MembersRoot frontend.Variable `gnark:",public"`
	User        UserData
	SlotProof   []frontend.Variable
	SlotHelper  []frontend.Variable
}

type OutputParams struct {
	A     [2]string
	B     [2][2]string
	C     [2]string
	Input [utils.NumPublicInputs]string
}
