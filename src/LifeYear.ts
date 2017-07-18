import {HomeRegionKey, HomeRegions} from "./HomeRegion";
import {Skill, SkillKeys, SkillList, Skills} from "./Skill";
import {WorldSeed} from "./WorldSeed";
import {StatList} from "./Stat";

const USED_STAT_MIN_VALUE = WorldSeed.NUMBER / 10;
const USED_STAT_DECREASE_MODIFIER = 1 / WorldSeed.NUMBER;

export class LifeYear {
    private _homeRegionKey: HomeRegionKey;
    private _skills: SkillList;

    constructor(homeRegionKey: HomeRegionKey, skills: SkillList) {
        this._homeRegionKey = homeRegionKey;
        this._skills = skills;
    }

    skills(lifeYearIndex: number): SkillList {
        const homeRegionSkillModifiers = HomeRegions.get(this._homeRegionKey).skillModifiers();
        return this._baseSkills(lifeYearIndex).multiplyList(homeRegionSkillModifiers);
    }

    stats(lifeYearIndex: number): StatList {
        let resultStats = new StatList([], 0);
        const skills = this._baseSkills(lifeYearIndex);
        for (const skillKey of SkillKeys()) {
            const skillStats = Skills.get(skillKey).stats();
            const skillValue = skills.getItem(skillKey);
            resultStats = skillStats.multiply(skillValue).addList(resultStats);
        }
        return resultStats;
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
}