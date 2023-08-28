import { AABB } from "./aabb";
import { layers } from "./canvas";
import { TopCastle, BottomCastle } from "./castle";
import { SCREEN_WIDTH, SCREEN_HEIGHT, PROJECTILES } from "./constants";
import { generateCRTVignette } from "./crt-vignette";
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
import { WAVES } from "./wave";

export enum State {
    IN_BATTLE, BATTLE_BREAKDOWN, SHOP, GAME_OVER, GAME_COMPLETE
}

const $ = document.querySelector.bind(document);
// const vignette = generateCRTVignette(layers.offscreen, SCREEN_WIDTH, SCREEN_HEIGHT);

export class Game {
    private _gold = 0;

    public get gold(): number {
        return this._gold;
    }

    public set gold(value: number) {
        this._gold = value;
        $('#gold').innerText = value;
    }

    private _wave = 0;

    public get wave(): number {
        return this._wave;
    }

    public set wave(value: number) {
        this._wave = value;
        $('#wave').innerText = `${value}/${WAVES.length}`;
    }

    private _state = State.SHOP;

    public get state(): State {
        return this._state;
    }

    public set state(value: State) {
        this._state = value;
        this.setUILayerVisibility();
    }

    private _healCost = 0;

    public get healCost(): number {
        return this._healCost;
    }

    public set healCost(value: number) {
        this._healCost = value;
        this.updateHealCostUi();
    }

    private _upgradeCost = 0;

    public get upgradeCost(): number {
        return this._upgradeCost;
    }

    public set upgradeCost(value: number) {
        this._upgradeCost = value;
        this.updateUpgradeCostUI();
    }

    public maxSoldiersPerArmy = 12;

    public projectiles = PROJECTILES;

    public soldierSize = 15;
    public playerUnits = [new MongolSoldier(new AABB()), new MongolHorseArcher(new AABB()), new MongolHorseMan(new AABB())];
    public playerArmy: Soldier[] = [
        new MongolSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 - 50, SCREEN_HEIGHT - 200))),
        new MongolSoldier(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2 + 50, SCREEN_HEIGHT - 200))),
        new MongolHorseArcher(new AABB(this.soldierSize, this.soldierSize, new Vector2(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 150))),
    ];
    public enemyUnits = [new EuropeanSoldier(new AABB()), new EuropeanArcher(new AABB()), new EuropeanKnight(new AABB())];
    public enemyArmy: Soldier[] = [];

    public selectedUnit?: Soldier;

    private _livingSoldiers: Soldier[];

    public get livingSoldiers(): Soldier[] {
        return this._livingSoldiers;
    }

    public set livingSoldiers(value: Soldier[]) {
        this._livingSoldiers = value;
        $('#soldiers').innerText = `${value.length}/${this.playerArmy.length}`;
    }

    private _livingEnemies: Soldier[];

    public get livingEnemies(): Soldier[] {
        return this._livingEnemies;
    }

    public set livingEnemies(value: Soldier[]) {
        this._livingEnemies = value;
        $('#enemies').innerText = `${value.length}/${this.enemyArmy.length}`;
    }

    public $recruitButtons: HTMLButtonElement[] = [];

    public calculateLivingSoldiers(): Soldier[] {
        return this.playerArmy.filter(_ => _.alive);
    }

    public calculateLivingEnemies(): Soldier[] {
        return this.enemyArmy.filter(_ => _.alive);
    }

    public startBattle() {
        if (this.wave > WAVES.length) return;

        delete this.selectedUnit;
        this.state = State.IN_BATTLE;
        this.enemyArmy = WAVES[this.wave - 1];
    }

    public start() {
        this.createPlayingField();
        this.createDecorations();
        this.createGlitter();

        this.initDom();
        this.setUILayerVisibility();
        this.updateRecruitButtons();

        this.wave = 1;
        this.gold = 0;
        this.updateHealCostUi();
        this.updateUpgradeCostUI();

        this.livingEnemies = this.enemyArmy;
        this.livingSoldiers = this.playerArmy;
    }

    public updateHealCostUi() {
        $('#heal-cost').innerText = this.healCost > 0 ? '$' + this.healCost : '';

        if (this.healCost === 0) {
            $('#heal-cost').parentElement.setAttribute('disabled', '');
        } else {
            $('#heal-cost').parentElement.removeAttribute('disabled');
        }
    }

    public updateUpgradeCostUI() {
        $('#upgrade-cost').innerText = this.upgradeCost > 0 ? '$' + this.upgradeCost : '';

        if (this.upgradeCost === 0) {
            $('#upgrade-cost').parentElement.setAttribute('disabled', '');
        } else {
            $('#upgrade-cost').parentElement.removeAttribute('disabled');
        }
    }

    public update(dt: number) {
        this.glitter.forEach(p => p.update(dt));
        this.decorations.forEach(d => d.update(dt));

        if (this.state === State.IN_BATTLE) {
            this.livingEnemies = this.calculateLivingEnemies();
            this.livingSoldiers = this.calculateLivingSoldiers();

            this.livingEnemies.forEach(s => s.update(dt, this.livingSoldiers));
            this.livingSoldiers.forEach(s => s.update(dt, this.livingEnemies));

            this.updateProjectiles();

            const battleEnded = this.livingEnemies.length <= 0 || this.livingSoldiers.length <= 0;
            if (battleEnded) {
                this.endBattle();
            }
        }
    }

    public updateProjectiles() {
        for (const projectile of this.projectiles.filter(_ => !_.finished)) {
            projectile.update();

            if (this.livingSoldiers.find(_ => _.id === projectile.parentId)) {
                projectile.finished = this.checkProjectileHitsEnemyUnit(projectile);
            } else if (this.livingEnemies.find(_ => _.id === projectile.parentId)) {
                projectile.finished = this.checkProjectileHitsPlayerUnit(projectile);
            }

            this.checkProjectileHitsPlayerUnit(projectile);

            if (!this.playingField.containsPoint(projectile.position)) {
                projectile.finished = true;
            }
        }
    }

    public checkProjectileHitsPlayerUnit(p: Projectile): boolean {
        const playerUnit = this.livingSoldiers
            .filter(_ => _.id !== p.parentId)
            .find(_ => _.getHitBox().containsPoint(p.position));
        if (!playerUnit) return false;

        const shooter = this.livingEnemies.find(_ => _.id === p.parentId);
        if (shooter) {
            playerUnit.damaged = playerUnit.maxDamageFrames;
            playerUnit.health -= shooter.attack;
        }

        return true;
    }

    public checkProjectileHitsEnemyUnit(p: Projectile): boolean {
        const enemyUnit = this.livingEnemies
            .filter(_ => _.id !== p.parentId)
            .find(_ => _.getHitBox().containsPoint(p.position));
        if (!enemyUnit) return false;

        const playerUnit = this.livingSoldiers.find(_ => _.id === p.parentId);
        if (playerUnit) {
            enemyUnit.damaged = enemyUnit.maxDamageFrames;
            enemyUnit.health -= playerUnit.attack;
            if (enemyUnit.health <= 0) {
                playerUnit.experience += 1;
            }
        }

        return true;
    }

    public setUILayerVisibility() {
        switch (this.state) {
            case State.SHOP:
                $('#ui-left').style.visibility = 'visible';
                $('#ui-soldier-counts').style.visibility = 'hidden';
                break;
            case State.IN_BATTLE:
                $('#ui-left').style.visibility = 'hidden';
                $('#ui-soldier-counts').style.visibility = 'visible';
                break;
            case State.BATTLE_BREAKDOWN:
                $('#ui-left').style.visibility = 'hidden';
                $('#ui-soldier-counts').style.visibility = 'hidden';
                break;
        }
    }

    public endBattle() {
        this.state = State.SHOP;
        this.healCost = this.calculateHealCost();
        this.upgradeCost = this.calculateUpgradeCost();
        this.gold += this.enemyArmy.reduce((acc, _) => acc + _.goldValue, 0);

        // battle won
        if (this.livingSoldiers.length > 0) {
            this.wave += 1;
            incrementSeason();
            layers.bg.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            this.playingField.draw(layers.bg);
        } else {
            // battle lost
            this.resetSoldierHealth();
        }

        this.projectiles.length = 0;
        this.playerArmy = this.livingSoldiers;
        this.resetSoldierPositions();
        this.setUILayerVisibility();
        this.updateRecruitButtons();
    }

    public resetSoldierHealth() {
        this.playerArmy.forEach(_ => _.health = _.maxHealth);
    }

    public resetSoldierPositions() {
        this.playerArmy.forEach(_ => _.bounds.pos = _.startPos.copy());
    }

    public draw() {
        layers.mg.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        layers.fg.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        this.glitter.forEach(p => p.draw(layers.fg));
        this.decorations.forEach(d => d.draw(layers.mg));

        if (this.state === State.IN_BATTLE) {
            this.projectiles.filter(p => !p.finished).forEach(p => p.draw(layers.mg));
        }

        [...this.livingSoldiers, ...this.livingEnemies].forEach(s => {
            if (this.state !== State.IN_BATTLE) {
                s.damaged = 0;
                s.meleeAttack = 0;
            }
            s.draw(layers.mg);
        });

        this.highlightSelectedUnit();
    }

    public highlightSelectedUnit() {
        if (!this.selectedUnit) return;

        const { selectedUnit: { pos, width } } = this;
        layers.fg.save();
        layers.fg.beginPath();
        layers.fg.arc(pos.x, pos.y, width * 1.5, 0, 2 * Math.PI);
        layers.fg.fillStyle = 'rgba(0, 255, 0, .4)';
        layers.fg.closePath();
        layers.fg.fill();
        layers.fg.restore();
    }

    public initDom() {
        $('#heal').addEventListener('click', this.handleHealClick);
        $('#start').addEventListener('click', this.handleStartClick);
        $("#stage").addEventListener('click', this.handleUnitPlacement);
        $('#upgrade').addEventListener('click', this.handleUpgradeClick);

        this.createRecruitButtons();
    }

    public createRecruitButtons() {
        const $buttonContainer = $('#recruit-buttons');
        for (const unit of this.playerUnits) {
            const $cost = document.createElement('span');
            $cost.classList.add('cost');
            $cost.innerText = '$' + unit.cost;

            const $name = document.createElement('span');
            $name.innerText = unit.name;

            const $btn = document.createElement('button');
            $btn.dataset.unit = unit.name;
            $btn.dataset.cost = unit.cost.toString();
            $btn.addEventListener('click', () => {
                this.recruit(unit.name);
            });

            $btn.appendChild($cost);
            $btn.appendChild($name);
            $buttonContainer.appendChild($btn);
            this.$recruitButtons.push($btn);
        }
    }

    public updateRecruitButtons() {
        for (const btn of this.$recruitButtons) {
            const cost = Number(btn.dataset.cost);
            if (cost > this.gold || this.playerArmy.length >= this.maxSoldiersPerArmy) {
                btn.setAttribute('disabled', '');
            } else {
                btn.removeAttribute('disabled');
            }
        }
    }

    public handleUpgradeClick = () => {
        const upgradeCost = this.calculateUpgradeCost();
        if (this.gold >= upgradeCost) {
            this.livingSoldiers.filter(_ => _.canUpgrade()).forEach(_ => _.upgrade());
            this.gold -= upgradeCost;
            this.upgradeCost = this.calculateUpgradeCost();
        }
    };

    public handleHealClick = () => {
        const healCost = this.calculateHealCost();
        if (this.gold >= healCost) {
            this.gold -= healCost;
            this.livingSoldiers.forEach(s => s.health = s.maxHealth);
            this.healCost = this.calculateHealCost();
        }
    };

    public handleStartClick = () => {
        if (this.state !== State.IN_BATTLE) {
            this.startBattle();
        }
    };

    public handleUnitPlacement = (e: MouseEvent) => {
        if (this.state === State.IN_BATTLE) return;

        const clickPoint = new Vector2(e.offsetX, e.offsetY);
        if (!this.selectedUnit) {
            this.selectedUnit = this.livingSoldiers.find(s => s.getHitBox().containsPoint(clickPoint));
        } else {
            const { playingField: { height, width, pos } } = this;
            const bounds = new AABB(width, height / 2, new Vector2(pos.x, pos.y + height / 2));

            if (bounds.containsPoint(clickPoint)) {
                this.selectedUnit.bounds.pos = clickPoint;
                this.selectedUnit.startPos = clickPoint.copy();
                delete this.selectedUnit;
            }
        }
    };

    public calculateHealCost() {
        return this.livingSoldiers
            .filter(_ => _.hasDamage())
            .reduce((acc, u) => u.healCost + acc, 0);
    }

    public calculateUpgradeCost() {
        return this.livingSoldiers
            .filter(_ => _.canUpgrade())
            .reduce((acc, _) => _.upgradeCost + acc, 0);
    }

    public recruit(name: string) {
        const unit = this.playerUnits.find(_ => _.name === name) as Soldier;
        if (this.gold >= unit.cost && this.livingSoldiers.length < this.maxSoldiersPerArmy) {
            this.gold -= unit.cost;
            const minX = this.playingField.pos.x + 30;
            const maxX = this.playingField.pos.x + this.playingField.width - 30;
            const minY = this.playingField.pos.y + this.playingField.height - 60;
            const maxY = this.playingField.pos.y + this.playingField.height / 2;
            const pos = new Vector2(randomInt(minX, maxX), randomInt(minY, maxY));
            const bounds = new AABB(this.soldierSize, this.soldierSize, pos);
            const newUnit = new (unit as any).constructor(bounds);
            while (newUnit.collides(this.livingSoldiers)) {
                newUnit.bounds.pos = new Vector2(randomInt(minX, maxX), randomInt(minY, maxY));
            }
            this.playerArmy.push(newUnit);
            this.updateRecruitButtons();
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
        this.playingField.draw(layers.bg);
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