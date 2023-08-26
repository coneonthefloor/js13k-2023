import { AABB } from "./aabb";
import { SCREEN_WIDTH } from "./constants";
import { EuropeanSoldier } from "./soldiers/europeans";
import { Soldier } from "./soldiers/soldier";
import { Vector2 } from "./vector";

export const WAVES: Soldier[][] = [
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2, 200))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ],
    [
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(15, 15, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
    ]
]