package circuit

import "github.com/consensys/gnark/frontend"

type UserData struct {
	PrivateID frontend.Variable
}

type TreeData struct {
	OldMembersRoot frontend.Variable `gnark:",public"`
	NewMembersRoot frontend.Variable `gnark:",public"`
	Slot           frontend.Variable `gnark:",public"`
	User           UserData
	SlotProof      []frontend.Variable
	SlotHelper     []frontend.Variable
}

type OutputParams struct {
	A     [2]string
	B     [2][2]string
	C     [2]string
	Input [3]string
}
