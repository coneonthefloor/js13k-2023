import { Context } from "../canvas";
import { Duration } from "../duration";
import { Soldier, SoldierPalette, SoldierRank, SoldierType } from "./soldier";

const colors: { [key in SoldierRank]: SoldierPalette } = {
    [SoldierRank.BASE]: {
        main: '#305182',
        accent: '#4192c3',
        skin: '#ffdba2'
    },
    [SoldierRank.UPGRADED]: {
        main: '#378230',
        accent: '#5bc341',
        skin: '#ffdba2'
    },
    [SoldierRank.ELITE]: {
        main: '#823030',
        accent: '#c34141',
        skin: '#ffdba2'
    }
};

export class EuropeanSoldier extends Soldier {
    public name = 'Swordsman';
    public type = SoldierType.MELEE;
    public cost = 2;
    public upgradeCost = 2;
    public healCost = 1;

    public goldValue = 2;

    public attack = 1;
    public speed = .33;
    public maxHealth = 4;
    public health = this.maxHealth;
    public attackRange = 50;
    public attackRate = new Duration(1000);

    public draw(ctx: Context) {
        const { x, y } = this.pos;
        this.drawHealthBar(ctx);
        this.animateMeleeAttack(ctx);

        ctx.save();
        ctx.translate(x, y);

        ctx.lineWidth = 2;

        // helmet arc
        ctx.beginPath();
        ctx.arc(0, 0, this.width, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].main;
        ctx.fill();
        ctx.stroke();

        // helmet visor
        ctx.beginPath();
        ctx.moveTo(-this.width, -this.height / 4);
        ctx.lineTo(-this.width, 0);
        ctx.lineTo(this.width, 0);
        ctx.lineTo(this.width, -this.height / 4);
        ctx.lineTo(0, -this.height / 1.5);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].accent;
        ctx.fill();
        ctx.stroke();

        // face
        ctx.beginPath();
        ctx.arc(0, 0, this.width, 0, Math.PI);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].skin;
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        super.draw(ctx);
    }

    public upgrade(): void {
        super.upgrade();

        if (this.rank === SoldierRank.UPGRADED) {
            this.speed += .10;
            this.attack += 1;
        }

        if (this.rank === SoldierRank.ELITE) {
            this.health += 2;
        }
    }
}

export class EuropeanArcher extends Soldier {
    public name = 'Crossbowman';
    public type = SoldierType.RANGED;
    public cost = 3;
    public upgradeCost = 3;
    public healCost = 2;

    public goldValue = 4;

    public attack = 1;
    public speed = .25;
    public maxHealth = 3;
    public health = this.maxHealth;
    public attackRange = 250;
    public attackRate = new Duration(1000);

    public draw(ctx: Context) {
        const { x, y } = this.pos;
        this.drawHealthBar(ctx);

        ctx.save();
        ctx.translate(x, y);

        ctx.lineWidth = 2;

        // helmet arc
        ctx.beginPath();
        ctx.arc(0, 0, this.width, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].accent;
        ctx.fill();
        ctx.stroke();

        // helmet visor
        ctx.beginPath();
        ctx.moveTo(-this.width, -this.height / 2.5);
        ctx.lineTo(-this.width * 1.25, 0);
        ctx.lineTo(this.width * 1.25, 0);
        ctx.lineTo(this.width, -this.height / 2.5);
        // ctx.lineTo(0, -this.height / 1.5);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].main;
        ctx.fill();
        ctx.stroke();

        // face
        ctx.beginPath();
        ctx.arc(0, 0, this.width, 0, Math.PI);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].skin;
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        super.draw(ctx);
    }

    public upgrade(): void {
        super.upgrade();

        if (this.rank === SoldierRank.UPGRADED) {
            this.health += 1;
            this.attack += 1;
        }

        if (this.rank === SoldierRank.ELITE) {
            this.attackRate = new Duration(800);
        }
    }
}

export class EuropeanKnight extends Soldier {
    public name = 'Knight';
    public type = SoldierType.MELEE;
    public cost = 6;
    public upgradeCost = 3;
    public healCost = 3;

    public goldValue = 5;

    public attack = 3;
    public speed = .25;
    public maxHealth = 8;
    public health = this.maxHealth;
    public attackRange = 50;
    public attackRate = new Duration(1000);

    public animateMeleeAttack(ctx: Context) {
        if (this.meleeAttack && this.target) {
            ctx.save();
            ctx.fillStyle = 'white';

            const offset = this.meleeAttackFrames - (this.meleeAttack * 2);
            const offsetRadians = offset * (0.0174533 * 2);
            ctx.translate(this.pos.x, this.pos.y);
            if (this.target.pos.x < this.pos.x) {
                ctx.rotate(this.attackAngle - offsetRadians);
            } else {
                ctx.rotate(this.attackAngle + offsetRadians);
            }
            ctx.lineWidth = 2;
            ctx.fillStyle = 'black';
            ctx.moveTo(0, 0);
            ctx.lineTo(this.attackRange - this.width, 0);
            ctx.stroke();
            ctx.fillStyle = 'gray';
            ctx.beginPath();
            ctx.arc(this.attackRange - this.width, 0, this.width / 3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    public draw(ctx: Context) {
        const { x, y } = this.pos;
        this.drawHealthBar(ctx);
        this.animateMeleeAttack(ctx);

        ctx.save();
        ctx.translate(x, y);

        ctx.lineWidth = 2;

        // helmet arc
        ctx.beginPath();
        ctx.arc(0, -this.height, this.width / 4, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].main;
        ctx.fill();
        ctx.stroke();

        // helmet arc
        ctx.beginPath();
        ctx.arc(0, 0, this.width, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].accent;
        ctx.fill();
        ctx.stroke();

        // face
        ctx.beginPath();
        ctx.arc(0, 0, this.width, 0, Math.PI);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].skin;
        ctx.fill();
        ctx.stroke();

        // helmet visor
        ctx.beginPath();
        ctx.moveTo(-this.width, -this.height / 4);
        ctx.lineTo(-this.width, 0);
        ctx.lineTo(0, this.height / 2);
        ctx.lineTo(this.width, 0);
        ctx.lineTo(this.width, -this.height / 4);
        ctx.lineTo(0, -this.height / 1.5);
        ctx.closePath();
        ctx.fillStyle = colors[this.rank].main;
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        super.draw(ctx);
    }

    public upgrade(): void {
        super.upgrade();

        if (this.rank === SoldierRank.UPGRADED) {
            this.speed += .10
        }

        if (this.rank === SoldierRank.ELITE) {
            this.attackRate = new Duration(800);
        }
    }
}