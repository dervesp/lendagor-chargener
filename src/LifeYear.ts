import {HomeRegionKey, HomeRegions} from "./HomeRegion";
import {SkillKeys, SkillList, Skills} from "./Skill";
import {WorldSeed} from "./WorldSeed";
import {StatList} from "./Stat";
import {StateKeys, StateList, States} from "./State";
import {assertEqualNumber} from "./utils/Assert";

const USED_STAT_MIN_VALUE = WorldSeed.NUMBER / 10;
const USED_STAT_DECREASE_MODIFIER = 1 / WorldSeed.NUMBER;

const LIFE_YEAR_SKILL_SUM = 1;
const LIFE_YEAR_STATE_SUM = 1;
export class LifeYear {
    private _homeRegionKey: HomeRegionKey;
    private _skills: SkillList;
    private _states: StateList;

    constructor(homeRegionKey: HomeRegionKey, skills: SkillList, states: StateList) {
        this._homeRegionKey = homeRegionKey;
        assertEqualNumber(LIFE_YEAR_SKILL_SUM, skills.sum(), `invalid LifeYear skill sum`);
        this._skills = skills;
        assertEqualNumber(LIFE_YEAR_STATE_SUM, states.sum(), `invalid LifeYear state sum`);
        this._states = states;
    }

    skills(lifeYearIndex: number): SkillList {
        const homeRegionSkillModifiers = HomeRegions.get(this._homeRegionKey).skillModifiers();
        return this._baseSkills(lifeYearIndex).multiplyList(homeRegionSkillModifiers);
    }

    stats(lifeYearIndex: number): StatList {
        let resultSkillStats = new StatList([], 0);
        const skills = this._baseSkills(lifeYearIndex);
        for (const skillKey of SkillKeys()) {
            const skillStats = Skills.get(skillKey).stats();
            const skillValue = skills.getItem(skillKey);
            resultSkillStats = skillStats.multiply(skillValue).addList(resultSkillStats);
        }
        let resultStateStats = new StatList([], 0);
        const states = this._baseStates(lifeYearIndex);
        for (const stateKey of StateKeys()) {
            const stateStats = States.get(stateKey).stats();
            const stateValue = states.getItem(stateKey);
            resultStateStats = stateStats.multiply(stateValue).addList(resultStateStats);
        }
        return resultSkillStats.addList(resultStateStats);
    }

    statDecreases(lifeYearIndex: number): StatList {
        const baseStatDecreaseValue = WorldSeed.statDecreaseMagicFn(lifeYearIndex) * -1;
        const baseStatDecreases = new StatList([], baseStatDecreaseValue);
        const usedStats = this.stats(lifeYearIndex).filter((value) => (value >= USED_STAT_MIN_VALUE));
        const usedStatDecreases = usedStats.replace(baseStatDecreaseValue * USED_STAT_DECREASE_MODIFIER);
        return baseStatDecreases.mergeList(usedStatDecreases);
    }

    private _baseSkills(lifeYearIndex: number): SkillList {
        const skillDecreaseModifier = WorldSeed.skillDecreaseModifierMagicFn(lifeYearIndex);
        return this._skills.multiply(skillDecreaseModifier);
    }

    private _baseStates(lifeYearIndex: number): StateList {
        const stateDecreaseModifier = WorldSeed.stateDecreaseModifierMagicFn(lifeYearIndex);
        return this._states.multiply(stateDecreaseModifier);
    }
}