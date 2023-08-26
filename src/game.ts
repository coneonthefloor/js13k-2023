import { AABB } from "./aabb";
import { layers } from "./canvas";
import { TopCastle, BottomCastle } from "./castle";
import { SCREEN_WIDTH, SCREEN_HEIGHT, PROJECTILES } from "./constants";
import { Glitter } from "./glitter";
import { PlayingField } from "./playing-field";
import { Projectile } from "./projectile";
import { randomInt, randomFloat } from "./random";
import { incrementSeason } from "./season";
import { EuropeanKnight, EuropeanSoldier, EuropeanArcher } from "./soldiers/europeans";
import { MongolSoldier, MongolHorseArcher, MongolHorseMan } from "./soldiers/mongols";
import { Soldier } from "./soldiers/soldier";
import { trees } from "./tree";
import { Vector2 } from "./vector";

export class Game {
    public gold = 100;
    public wave = 0;
    public battleInProgress = false;
    public maxSoldiersPerArmy = 20;

    public projectiles = PROJECTILES;

    public soldierSize = 15;
    public playerUnits = [new MongolSoldier(new AABB()), new MongolHorseArcher(new AABB()), new MongolHorseMan(new AABB())];
    public playerArmy: Soldier[] = [
        new MongolSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 50, SCREEN_HEIGHT - 200))),
        new MongolSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 200))),
        new MongolSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 50, SCREEN_HEIGHT - 200))),
        new MongolHorseArcher(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 100, SCREEN_HEIGHT - 150))),
        new MongolHorseArcher(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT - 150))),
        new MongolHorseMan(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 100))),
    ];
    public enemyUnits = [new EuropeanSoldier(new AABB()), new EuropeanArcher(new AABB()), new EuropeanKnight(new AABB())];
    public enemyArmy: Soldier[] = [
        new EuropeanKnight(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 50, 200))),
        new EuropeanKnight(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 50, 200))),
        new EuropeanSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 100, 150))),
        new EuropeanSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 100, 150))),
        new EuropeanArcher(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 25, 100))),
        new EuropeanArcher(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 25, 100))),
    ];

    public queuedDomUpdate = true;

    public startBattle() {
        this.battleInProgress = true;
        this.queuedDomUpdate = true;
    }

    public start() {
        this.createPlayingField();
        this.createDecorations();
        this.createGlitter();
        this.initDom();

        window.addEventListener('click', (e: any) => {
            const clickPoint = new Vector2(e.layerX, e.layerY);

            const previouslySelected = this.playerArmy.find(s => s.selected);
            if (!previouslySelected) {
                const selectedSoldier = this.playerArmy.find(s => s.getHitBox().containsPoint(clickPoint));
                if (selectedSoldier) {
                    selectedSoldier.selected = true;
                }
            } else {
                previouslySelected.bounds.pos = clickPoint;
                previouslySelected.selected = false;
            }
        });
    }

    public update(dt: number) {
        this.decorations.forEach(d => d.update(dt));
        this.glitter.forEach(p => p.update(dt));

        if (this.battleInProgress) {
            this.playerArmy = this.playerArmy.filter(_ => _.health > 0);
            this.enemyArmy = this.enemyArmy.filter(_ => _.health > 0);
            this.playerArmy.forEach(s => s.update(dt, this.enemyArmy));
            this.enemyArmy.forEach(s => s.update(dt, this.playerArmy));
            this.projectiles.forEach((p, i) => {
                p.update();

                const playerUnit = this.playerArmy.find(_ => _.getHitBox().containsPoint(p.position));
                if (playerUnit) {
                    const enemy = this.enemyArmy.find(_ => _.id === p.parentId);
                    if (enemy) {
                        playerUnit.damaged = playerUnit.maxDamageFrames;
                        playerUnit.health -= enemy.attack;
                        p.finished = true;
                    }
                } else {
                    const enemyUnit = this.enemyArmy.find(_ => _.getHitBox().containsPoint(p.position));
                    if (enemyUnit) {
                        const playerUnit = this.playerArmy.find(_ => _.id === p.parentId);
                        if (playerUnit) {
                            enemyUnit.damaged = enemyUnit.maxDamageFrames;
                            enemyUnit.health -= playerUnit.attack;
                            p.finished = true;
                        }
                    }
                }

                if (!this.playingField.containsPoint(p.position)) {
                    p.finished = true;
                }

                if (p.finished) {
                    this.projectiles.splice(i);
                }

            });


        }

        if (this.queuedDomUpdate) {
            this.updateDom();
        }

        if (this.battleInProgress) {
            const battleEnded = this.enemyArmy.length <= 0 || this.playerArmy.length <= 0;

            if (battleEnded) {
                this.battleInProgress = false;
                this.wave++;
                incrementSeason();
                layers.background.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                this.playingField.draw(layers.background);
                this.queuedDomUpdate = true;
                this.projectiles.splice(0, this.projectiles.length);
                this.playerArmy.forEach(s => {
                    s.bounds.pos.x = s.startPos.x
                    s.bounds.pos.y = s.startPos.y
                })
            }
        }
    }

    public draw() {
        this.glitter.forEach(p => p.draw(layers.effects));
        this.decorations.forEach(d => d.draw(layers.game));

        if (this.battleInProgress) {
            this.projectiles.forEach(p => p.draw(layers.game));
        }

        [...this.playerArmy, ...this.enemyArmy].forEach(s => {
            if (!this.battleInProgress) {
                s.damaged = 0;
                s.meleeAttack = 0;
            }
            s.draw(layers.game);
        });
    }

    public initDom() {
        const $ = document.querySelector.bind(document);

        $('#start').addEventListener('click', () => {
            if (!this.battleInProgress) {
                this.startBattle();
            }
        });

        for (const unit of this.playerUnits) {
            $('#recruit-buttons').innerHTML += `<button data-unit="${unit.name}" data-cost="${unit.cost}">
                <span class="cost">$${unit.cost}</span> ${unit.name}
            </button>`;
        }

        $('#recruit-buttons').querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.recruitUnit(e.target.dataset.unit);
            });
        });
    }

    public updateDom() {
        const $ = document.querySelector.bind(document);

        $('#wave').innerText = this.wave;
        $('#gold').innerText = this.gold;

        const healCost = this.getHealCost();
        if (healCost > 0) {
            $('#heal-cost').innerText = '$' + healCost;
        }
        $('#heal-cost').parentElement.setAttribute('disabled', healCost === 0);

        const upgradeCost = this.getUpgradeCost();
        if (upgradeCost > 0) {
            $('#upgrade-cost').innerText = '$' + upgradeCost;
        }
        $('#upgrade-cost').parentElement.setAttribute('disabled', upgradeCost === 0);

        if (this.battleInProgress) {
            $('#ui-left').style.visibility = 'hidden';
        } else {
            $('#ui-left').style.visibility = 'visible';
        }

        this.queuedDomUpdate = false;
    }

    public getHealCost() {
        return this.playerArmy
            .filter(_ => _.hasDamage())
            .reduce((acc, u) => u.healCost + acc, 0);
    }

    public getUpgradeCost() {
        return this.playerArmy
            .filter(_ => _.canUpgrade())
            .reduce((acc, u) => u.upgradeCost + acc, 0);
    }

    public recruitUnit(name: string) {
        const unit = this.playerUnits.find(_ => _.name === name) as Soldier;
        if (this.gold >= unit.cost && this.playerArmy.length < this.maxSoldiersPerArmy) {
            this.gold -= unit.cost;
            const minX = this.playingField.pos.x + 30;
            const maxX = this.playingField.pos.x + this.playingField.width - 30;
            const minY = this.playingField.pos.y + this.playingField.height - 60;
            const maxY = this.playingField.pos.y + this.playingField.height / 2;
            const pos = new Vector2(randomInt(minX, maxX), randomInt(minY, maxY));
            const bounds = new AABB(this.soldierSize, this.soldierSize, pos);
            const newUnit = new (unit as any).constructor(bounds);
            while (newUnit.collides(this.playerArmy)) {
                newUnit.bounds.pos = new Vector2(randomInt(minX, maxX), randomInt(minY, maxY));
            }
            this.playerArmy.push(newUnit);

            this.queuedDomUpdate = true;
        }
    }

    public decorations: any[] = [];
    public createDecorations() {
        this.decorations = [
            ...trees,
            new TopCastle(this.playingField),
            new BottomCastle(this.playingField)
        ];
        this.decorations.sort((a, b) => a.pos.y < b.pos.y ? 0 : 1);
    }

    public playingField: PlayingField;
    public createPlayingField() {
        const playingFieldOffsetY = 25;
        const playingFieldOffsetX = SCREEN_WIDTH / 3.3;
        this.playingField = new PlayingField(
            SCREEN_WIDTH - playingFieldOffsetX * 2,
            SCREEN_HEIGHT - playingFieldOffsetY * 2,
            new Vector2(
                playingFieldOffsetX,
                playingFieldOffsetY,
            )
        );
        this.playingField.draw(layers.background);
    }

    public glitter: Glitter[] = [];
    public createGlitter() {
        const maxGlitterParticles = 100;
        for (let i = 0; i < maxGlitterParticles; i++) {
            this.glitter.push(new Glitter(
                new Vector2(randomInt(0, SCREEN_WIDTH), randomInt(0, SCREEN_HEIGHT)),
                new Vector2(randomFloat(.01, .05), .1),
                randomFloat(.05, .8)
            ));
        }
    }
} 