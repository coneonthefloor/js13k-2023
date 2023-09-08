import { AABB } from "./aabb";
import { Vector2 } from "./vector";
import { SCREEN_WIDTH } from "./constants";
import { Soldier, SoldierRank } from "./soldiers/soldier";
import { EuropeanArcher, EuropeanKnight, EuropeanSoldier, Pope } from "./soldiers/europeans";

const frontLine = 250;
const midLine = 175;
const backLine = 100;

export const WAVES: Soldier[][] = [
    [//1
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine))),
    ],
    [//2
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine))),
    ],
    [//3
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.UPGRADED),
    ],
    [//4
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.UPGRADED),
    ],
    [//5
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
    ],
    [//6
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.ELITE),
    ],
    [//7
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.UPGRADED),
    ],
    [//8
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.ELITE),
    ],
    [//9
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.ELITE),
    ],
    [//10
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.ELITE),
    ],
    [//11
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, backLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.ELITE),
    ],
    [//12
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, midLine)), SoldierRank.ELITE),
        new Pope(new AABB(30, 30, new Vector2(SCREEN_WIDTH / 2, backLine))),
    ]
];