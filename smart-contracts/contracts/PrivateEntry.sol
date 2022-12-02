// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "./Verifier.sol";

contract PrivacyAuth {
    Verifier internal verifier;

    bytes32 public membersRoot;
    uint256 public numUsersRegistered;

    constructor(bytes32 _initialMembersRoot, address _verifier) {
        membersRoot = _initialMembersRoot;
        verifier = Verifier(_verifier);
    }

    function registerUser(
        uint256[2] calldata _a,
        uint256[2][2] calldata _b,
        uint256[2] calldata _c,
        uint256[3] calldata _publicInputs
    ) public {
        require(
            verifier.userRegistrationVerifyProof(_a, _b, _c, _publicInputs),
            "Invalid user registration zk proof"
        );
        require(
            membersRoot == bytes32(_publicInputs[0]),
            "invalid old members root"
        );
        require(numUsersRegistered == _publicInputs[2], "invalid slot used");
        numUsersRegistered++;

        membersRoot = bytes32(_publicInputs[1]);
    }

    function verifyMember(
        uint256[2] calldata _a,
        uint256[2][2] calldata _b,
        uint256[2] calldata _c,
        uint256[1] calldata _publicInputs
    ) public view {
        require(
            verifier.userVerificationVerifyProof(_a, _b, _c, _publicInputs),
            "Invalid member zk proof"
        );
        require(
            membersRoot == bytes32(_publicInputs[0]),
            "invalid members root"
        );
    }
}
