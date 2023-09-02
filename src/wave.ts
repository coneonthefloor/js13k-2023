import { AABB } from "./aabb";
import { Vector2 } from "./vector";
import { SCREEN_WIDTH } from "./constants";
import { Soldier, SoldierRank } from "./soldiers/soldier";
import { EuropeanArcher, EuropeanKnight, EuropeanSoldier } from "./soldiers/europeans";

const frontLine = 250
const midLine = 175
const backLine = 100

export const WAVES: Soldier[][] = [
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, frontLine))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, midLine)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.UPGRADED),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, frontLine)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, frontLine))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, frontLine)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 50, midLine))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 50, midLine))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, backLine)), SoldierRank.UPGRADED),
    ],
    [
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
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 150, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 150, 150)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 250))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 250))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 50))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 150, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 150, 150)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 250))),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 250))),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 50)), SoldierRank.UPGRADED),
    ],
    [
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 150, 150)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 150, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 250))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 250))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 50)), SoldierRank.UPGRADED),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 150, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150)), SoldierRank.UPGRADED),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 150, 150)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 250)), SoldierRank.UPGRADED),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 250)), SoldierRank.UPGRADED),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 50)), SoldierRank.UPGRADED),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 150, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150)), SoldierRank.ELITE),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 150, 150)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 250)), SoldierRank.ELITE),
        new EuropeanArcher(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 250)), SoldierRank.ELITE),
        new EuropeanKnight(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 50)), SoldierRank.ELITE),
    ]
];