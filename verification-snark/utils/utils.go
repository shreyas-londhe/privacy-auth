package utils

const NumPublicInputs = 1

func HandleError(err error) {
	if err != nil {
		panic(err)
	}
}
