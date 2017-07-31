export namespace WorldSeed {
    export let NUMBER = 1.61803398875;
    const NUMBER_POW_1 = NUMBER;
    const NUMBER_POW_2 = Math.pow(NUMBER_POW_1, NUMBER);
    const NUMBER_POW_3 = Math.pow(NUMBER_POW_2, NUMBER);
    const NUMBER_POW_4 = Math.pow(NUMBER_POW_3, NUMBER);
    const NUMBER_POW_0 = Math.pow(NUMBER, 1 / NUMBER);

    export function skillToStatMagicFn(value: number): number {
        return (value > 0)
            ? Math.pow(value, 1 / NUMBER_POW_2) * NUMBER_POW_3 * NUMBER_POW_1
            : value;
    }

    export function skillModifierMaxValueMagicFn(value: number): number {
        return Math.pow(value, 1 / NUMBER_POW_1) + NUMBER_POW_2;
    }

    export function statToSkillModifierBonusMagicFn(value: number): number {
        return Math.pow(value / NUMBER_POW_3, NUMBER_POW_1);
    }

    export function statToSkillModifierPenaltyMagicFn(value: number): number {
        return -Math.pow(value / NUMBER_POW_1, NUMBER_POW_1);
    }

    export function skillDecreaseModifierMagicFn(value: number): number {
        return NUMBER_POW_2 / (Math.pow(value, NUMBER_POW_3) / Math.pow(12, NUMBER_POW_3) + 1);
    }

    export function stateDecreaseModifierMagicFn(value: number): number {
        return 1 / (Math.pow(value, NUMBER_POW_4) / (Math.pow(48, NUMBER_POW_4) / (NUMBER_POW_1 * 10)) + 1);
    }

    export function statDecreaseMagicFn(value: number): number {
        return NUMBER_POW_2 * Math.pow(value, NUMBER_POW_2 - 1) / (12 * 12 * 3);
    }

    export function paramWillPowerMagicFn(ethStr: number, ethCon: number): number {
        return NUMBER_POW_3 * Math.pow(ethCon, NUMBER_POW_1) / NUMBER_POW_4 + Math.pow(ethStr, NUMBER_POW_1) / (NUMBER_POW_2 * NUMBER_POW_4);
    }

    export function paramHealthMagicFn(phyStr: number, phyDex: number, phyCon: number): number {
        return phyStr * NUMBER_POW_2 + phyDex * NUMBER_POW_0 + phyCon * NUMBER_POW_4;
    }

    export function paramHpMagicFn(health: number, willPower: number): number {
        return health * Math.min(99, willPower) / 100;
    }
}