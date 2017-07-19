import {StatKey, StatList} from "./Stat";
import {Skill, SkillKey, SkillKeys, SkillList, Skills} from "./Skill";
import {HomeRegionKey, HomeRegions} from "./HomeRegion";
import {VectorKey} from "./ChildhoodVector";
import {LifeYear} from "./LifeYear";
import {ParentalLineageKey, ParentalLineages} from "./ParentalLineage";
import {WorldSeed} from "./WorldSeed";
import {SkillTagKeys} from "./list/SkillTag";

const NORMAL_STAT_MIN_VALUE = 12;

export class Character {
    private _stats: StatList = null;
    private _skills: SkillList = null;
    private _skillModifiers: SkillList = null;
    private _adjacentSkillModifiers: SkillList = null;

    private _childhoodHomeRegionKey: HomeRegionKey = null;
    private _childhoodParentalLineageKey: ParentalLineageKey = null;
    private _childhoodVectorKey: VectorKey = null;
    private _childhoodChoosenSkillKey: SkillKey = null;

    private _lifeYears: LifeYear[] = [];

    setChildhood(homeRegionKey: HomeRegionKey, parentalLineageKey: ParentalLineageKey, vectorKey: VectorKey, choosenSkillKey: SkillKey) {
        this._childhoodHomeRegionKey = homeRegionKey;
        this._childhoodParentalLineageKey = parentalLineageKey;
        this._childhoodVectorKey = vectorKey;
        this._childhoodChoosenSkillKey = choosenSkillKey;
    }

    addLifeYear(lifeYear: LifeYear) {
        this._lifeYears.push(lifeYear);
    }

    invalidate() {
        this._stats = new StatList([

        ], 10);
        this._skills = new SkillList([], 0);
        this._adjacentSkillModifiers = new SkillList([], 0);

        this._invalidateChildhood();
        this._invalidateLife();
        this._invalidateSkillModifiers();
        this._invalidateAdjacentSkillModifiers();
    }

    skills(): SkillList {
        return this._skills.addList(this._skillModifiers).addList(this._adjacentSkillModifiers).map(((value) => Math.round(value)));
    }

    stats(): StatList {
        return this._stats.map((value) => Math.round(value * 2) / 2);
    }

    private _invalidateChildhood() {
        const homeRegionSkillModifiers = HomeRegions.get(this._childhoodHomeRegionKey).skillModifiers();
        const homeRegionVectorSkills = HomeRegions.get(this._childhoodHomeRegionKey).childhoodVectorSkills(this._childhoodVectorKey);
        const parentalSkills = ParentalLineages.get(this._childhoodParentalLineageKey).skills();
        const choosenSkills = new SkillList([[this._childhoodChoosenSkillKey, 1]], 0);

        const childhoodSkills = homeRegionVectorSkills.addList(parentalSkills).addList(choosenSkills).multiplyList(homeRegionSkillModifiers);
        this._skills = this._skills.addList(childhoodSkills);

        let childhoodStats = new StatList([], 0);
        for (const skillKey of SkillKeys()) {
            const skillStats = Skills.get(skillKey).stats();
            const skillValue = childhoodSkills.getItem(skillKey);
            childhoodStats = skillStats.multiply(skillValue).addList(childhoodStats);
        }
        this._stats = this._stats.addList(childhoodStats);
    }

    private _invalidateLife() {
        this._invalidateLifeSkills();
        this._invalidateLifeStats();
    }

    private _invalidateLifeSkills() {
        let resultYearSkills = new SkillList([], 0);
        this._lifeYears.forEach((lifeYear: LifeYear, lifeYearIndex: number) => {
            resultYearSkills = resultYearSkills.addList(lifeYear.skills(lifeYearIndex));
        });
        this._skills = this._skills.addList(resultYearSkills);
    }

    private _invalidateLifeStats() {
        let resultYearStats = new StatList([], 0);
        let resultYearStatDecreases = new StatList([], 0);
        this._lifeYears.forEach((lifeYear: LifeYear, lifeYearIndex: number) => {
            resultYearStats = resultYearStats.addList(lifeYear.stats(lifeYearIndex));
            resultYearStatDecreases = resultYearStatDecreases.addList(lifeYear.statDecreases(lifeYearIndex));
        });
        resultYearStats = resultYearStats.map((value: number) => WorldSeed.skillToStatMagicFn(value));
        resultYearStats = resultYearStats.addList(resultYearStatDecreases);
        this._stats = this._stats.addList(resultYearStats);
        this._skills = this._skills.multiply(WorldSeed.NUMBER);
    }

    private _invalidateSkillModifiers() {
        this._skillModifiers = this._skills.map((realSkillValue: number, skillKey: SkillKey) => {
            const skillStats = Skills.get(skillKey).stats().map((skillStatValue: number, statKey: StatKey) => {
                return (this._stats.getItem(statKey) - NORMAL_STAT_MIN_VALUE) * skillStatValue;
            });
            const skillSum = skillStats.reduce((result: number, value: number) => (result + value), 0);
            if (skillSum > 0) {
                const skillBonus = WorldSeed.statToSkillModifierBonusMagicFn(Math.abs(skillSum));
                const skillMaxBonus = WorldSeed.skillModifierMaxValueMagicFn(realSkillValue);
                return Skills.get(skillKey).useUnlimitedStatBonus()
                    ? skillBonus
                    : Math.min(skillBonus, skillMaxBonus);
            }
            else {
                return WorldSeed.statToSkillModifierPenaltyMagicFn(Math.abs(skillSum));
            }
        });
    }

    private _invalidateAdjacentSkillModifiers() {
        this._adjacentSkillModifiers = this._skills.map((currentSkillValue: number, currentSkillKey: SkillKey) => {
            const currentSkill = Skills.get(currentSkillKey);
            let resultAdjacentSkillModifier = 0;
            for (const skillKey of SkillKeys()) {
                if (skillKey == currentSkillKey) {
                    continue;
                }
                const skill = Skills.get(skillKey);
                const skillValue = this._skills.getItem(skillKey);
                let minSum = 0;
                let maxSum = 0;
                for (const skillTagKey of SkillTagKeys()) {
                    const currentSkillTagValue = currentSkill.skillTags().getItem(skillTagKey);
                    const skillTagValue = skill.skillTags().getItem(skillTagKey);
                    minSum += Math.min(currentSkillTagValue, skillTagValue);
                    maxSum += Math.max(currentSkillTagValue, skillTagValue);
                }
                if (minSum == 0 || maxSum == 0) {
                    continue;
                }
                const adjacentSkillModifier = (minSum / maxSum) * skillValue;
                resultAdjacentSkillModifier += adjacentSkillModifier;
            }
            return resultAdjacentSkillModifier;
        });
    }
}