// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "./libs/Pairing.sol";

contract Verifier {
    using Pairing for *;

    uint256 constant SNARK_SCALAR_FIELD =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 constant PRIME_Q =
        21888242871839275222246405745257275088696311157297823662689037894645226208583;

    struct UserResgistrationVerifyingKey {
        Pairing.G1Point alfa1;
        Pairing.G2Point beta2;
        Pairing.G2Point gamma2;
        Pairing.G2Point delta2;
        Pairing.G1Point[4] IC;
    }

    struct UserVerificationVerifyingKey {
        Pairing.G1Point alfa1;
        Pairing.G2Point beta2;
        Pairing.G2Point gamma2;
        Pairing.G2Point delta2;
        Pairing.G1Point[2] IC;
    }

    struct Proof {
        Pairing.G1Point A;
        Pairing.G2Point B;
        Pairing.G1Point C;
    }

    function userRegistrationVerifyingKey()
        internal
        pure
        returns (UserResgistrationVerifyingKey memory vk)
    {
        vk.alfa1 = Pairing.G1Point(
            uint256(
                11397518974902259607442236053469007233828279521952115176983382679075758309932
            ),
            uint256(
                4926597618593860156172244134002972047145262049453736129983839668728094753142
            )
        );
        vk.beta2 = Pairing.G2Point(
            [
                uint256(
                    2337550771160307347727341984467988009626319024713713899092712340363312844905
                ),
                uint256(
                    5986829594447257695880576074361412454183523757028835292430443921451227728223
                )
            ],
            [
                uint256(
                    8117251989140666437250293931669142374562811915826824857282641264273523294806
                ),
                uint256(
                    20008614595337256161618698466044708727205832726129078736852139092635267355516
                )
            ]
        );
        vk.gamma2 = Pairing.G2Point(
            [
                uint256(
                    17926226959378049118379356010514962829779358723036735138957273440986255396290
                ),
                uint256(
                    16560379925255425787541413568930301443677737943290351228399823863023244252357
                )
            ],
            [
                uint256(
                    11518372245480435299206875260997161407140544144090059355025218565692133376544
                ),
                uint256(
                    8039308858595830299253344483907257705874982479181904034855918891288457789981
                )
            ]
        );
        vk.delta2 = Pairing.G2Point(
            [
                uint256(
                    2274189117610937045960892702474952494302784511894486785769957174911044257524
                ),
                uint256(
                    7030454749792047578017966196723644499477501977171444700094228276633098931761
                )
            ],
            [
                uint256(
                    12134359709929647368971840804685839339109372126817646436356097212958615464494
                ),
                uint256(
                    10555527302152902229755376388194840834945957581499628365460302760102168666031
                )
            ]
        );
        vk.IC[0] = Pairing.G1Point(
            uint256(
                9147669156505627401096653791783851730606030338074729127103879981332989315250
            ),
            uint256(
                2850692774241753438340323424164203279239635661121482868259210387955430610966
            )
        );
        vk.IC[1] = Pairing.G1Point(
            uint256(
                20227336181057987446905076721990875492045255578452714861299699131969323777608
            ),
            uint256(
                18108410594675231448272573583670632496367644637235033908270730949342558910730
            )
        );
        vk.IC[2] = Pairing.G1Point(
            uint256(
                6019760594809019115663023884674750054329211961514637015700184467005715088442
            ),
            uint256(
                18387103811337242324904427844980010666563526206771495755224756701387517112929
            )
        );
        vk.IC[3] = Pairing.G1Point(
            uint256(
                768736287886810011902835430607829875857144971626738260799736495218767824482
            ),
            uint256(
                19382411278245055823662378279315533752914949298011584658700073391313600346143
            )
        );
    }

    function userVerificationVerifyingKey()
        internal
        pure
        returns (UserVerificationVerifyingKey memory vk)
    {
        vk.alfa1 = Pairing.G1Point(
            uint256(
                2445079269178138229679395993073006067701843286239516539677882419486366047040
            ),
            uint256(
                4464259855892990210593517323452891502524582708500326591560431360784512982065
            )
        );
        vk.beta2 = Pairing.G2Point(
            [
                uint256(
                    2421622039398904942731657550126589261742583800696341260164492906044814649292
                ),
                uint256(
                    14430101405140674821764935443375597231553497464638668187252029598741089747861
                )
            ],
            [
                uint256(
                    16729329078473767938522610523728342403150625098125533539085995210526893894538
                ),
                uint256(
                    14027780176630153209387697441512620497833461399937222430069215954018522140599
                )
            ]
        );
        vk.gamma2 = Pairing.G2Point(
            [
                uint256(
                    15147772983325975276396371918603025020461851921782017561072788330192332004191
                ),
                uint256(
                    2775248203976049426982712325679738022523147450581765341910796489315310365909
                )
            ],
            [
                uint256(
                    8919189678186151004629658054452948201290191727631123653999410683458848237294
                ),
                uint256(
                    7986664551731562365729589315273185245463640323603085319025620388915173144086
                )
            ]
        );
        vk.delta2 = Pairing.G2Point(
            [
                uint256(
                    4238873704655111825252546899871109459562599010186613856137818618304232060036
                ),
                uint256(
                    20512473454973603680740982529976841717230051610484591798537479723732942563028
                )
            ],
            [
                uint256(
                    18914574594437220377118892979551470672805670458493974279538172558254776558680
                ),
                uint256(
                    19973683047090455649480286410531956132041752821277680915491337976116237837114
                )
            ]
        );
        vk.IC[0] = Pairing.G1Point(
            uint256(
                17248854395276967600719394295730297491804622169891960006681361149546252522961
            ),
            uint256(
                13434251560703049240532132674306557525706346353273620822747767414256750987681
            )
        );
        vk.IC[1] = Pairing.G1Point(
            uint256(
                5514763003239047857684947103547578997730591241515203394793271557749042644165
            ),
            uint256(
                9804805470743809111161539701542373378436038025853836604935328711686591922893
            )
        );
    }

    /*
     * @returns Whether the proof is valid given the hardcoded verifying key
     *          above and the public inputs
     */
    function userRegistrationVerifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[3] memory input
    ) public view returns (bool r) {
        Proof memory proof;
        proof.A = Pairing.G1Point(a[0], a[1]);
        proof.B = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.C = Pairing.G1Point(c[0], c[1]);

        UserResgistrationVerifyingKey
            memory vk = userRegistrationVerifyingKey();

        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);

        // Make sure that proof.A, B, and C are each less than the prime q
        require(proof.A.X < PRIME_Q, "verifier-aX-gte-prime-q");
        require(proof.A.Y < PRIME_Q, "verifier-aY-gte-prime-q");

        require(proof.B.X[0] < PRIME_Q, "verifier-bX0-gte-prime-q");
        require(proof.B.Y[0] < PRIME_Q, "verifier-bY0-gte-prime-q");

        require(proof.B.X[1] < PRIME_Q, "verifier-bX1-gte-prime-q");
        require(proof.B.Y[1] < PRIME_Q, "verifier-bY1-gte-prime-q");

        require(proof.C.X < PRIME_Q, "verifier-cX-gte-prime-q");
        require(proof.C.Y < PRIME_Q, "verifier-cY-gte-prime-q");

        // Make sure that every input is less than the snark scalar field
        for (uint256 i = 0; i < input.length; i++) {
            require(
                input[i] < SNARK_SCALAR_FIELD,
                "verifier-gte-snark-scalar-field"
            );
            vk_x = Pairing.plus(
                vk_x,
                Pairing.scalar_mul(vk.IC[i + 1], input[i])
            );
        }

        vk_x = Pairing.plus(vk_x, vk.IC[0]);

        return
            Pairing.pairing(
                Pairing.negate(proof.A),
                proof.B,
                vk.alfa1,
                vk.beta2,
                vk_x,
                vk.gamma2,
                proof.C,
                vk.delta2
            );
    }

    function userVerificationVerifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) public view returns (bool r) {
        Proof memory proof;
        proof.A = Pairing.G1Point(a[0], a[1]);
        proof.B = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.C = Pairing.G1Point(c[0], c[1]);

        UserVerificationVerifyingKey memory vk = userVerificationVerifyingKey();

        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);

        // Make sure that proof.A, B, and C are each less than the prime q
        require(proof.A.X < PRIME_Q, "verifier-aX-gte-prime-q");
        require(proof.A.Y < PRIME_Q, "verifier-aY-gte-prime-q");

        require(proof.B.X[0] < PRIME_Q, "verifier-bX0-gte-prime-q");
        require(proof.B.Y[0] < PRIME_Q, "verifier-bY0-gte-prime-q");

        require(proof.B.X[1] < PRIME_Q, "verifier-bX1-gte-prime-q");
        require(proof.B.Y[1] < PRIME_Q, "verifier-bY1-gte-prime-q");

        require(proof.C.X < PRIME_Q, "verifier-cX-gte-prime-q");
        require(proof.C.Y < PRIME_Q, "verifier-cY-gte-prime-q");

        // Make sure that every input is less than the snark scalar field
        for (uint256 i = 0; i < input.length; i++) {
            require(
                input[i] < SNARK_SCALAR_FIELD,
                "verifier-gte-snark-scalar-field"
            );
            vk_x = Pairing.plus(
                vk_x,
                Pairing.scalar_mul(vk.IC[i + 1], input[i])
            );
        }

        vk_x = Pairing.plus(vk_x, vk.IC[0]);

        return
            Pairing.pairing(
                Pairing.negate(proof.A),
                proof.B,
                vk.alfa1,
                vk.beta2,
                vk_x,
                vk.gamma2,
                proof.C,
                vk.delta2
            );
    }
}
