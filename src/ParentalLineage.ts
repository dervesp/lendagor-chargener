import {StatInfo, StatKey} from "./Stat";
import {VectorKey} from "./ChildhoodVector";
import {SkillInfo, SkillKey, SkillList, SkillModifier, SkillValue} from "./Skill";
export enum ParentalLineageKey {
    STEPPE_NOBLE,
    ARTISAN_BONECARVER,
}

export class ParentalLineage {
    private _key: ParentalLineageKey;
    private _skills: SkillList;

    constructor(key: ParentalLineageKey, skillModifiers: SkillList) {
        this._key = key;
        this._skills = skillModifiers;
    }

    key(): ParentalLineageKey {
        return this._key;
    }

    skills(): SkillList {
        return this._skills;
    }
}

export class ParentalLineages {
    private static _map: Map<ParentalLineageKey, ParentalLineage> = new Map<ParentalLineageKey, ParentalLineage>();

    static get(key: ParentalLineageKey): ParentalLineage {
        if (!this._map.has(key)) {
            throw new Error(`undefined ParentalLineage [${key}] in ParentalLineageMap`);
        }
        return this._map.get(key);
    }

    static init() {
        this._addParentalLineage(
            ParentalLineageKey.STEPPE_NOBLE,
            [
                [SkillKey.COMBAT_SABER, SkillValue.NORMAL],
                [SkillKey.COMBAT_BOW, SkillValue.NORMAL],
                [SkillKey.COMBAT_SPEAR, SkillValue.NORMAL],
                [SkillKey.COMBAT_WHIP, SkillValue.NORMAL],
                [SkillKey.RIDING, SkillValue.NORMAL],
                [SkillKey.LEADERSHIP, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_LAW, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.SMALL],
            ]
        );
        this._addParentalLineage(
            ParentalLineageKey.ARTISAN_BONECARVER,
            [
                [SkillKey.COMBAT_SPEAR, SkillValue.SMALL],
                [SkillKey.COMBAT_BOW, SkillValue.NORMAL],
                [SkillKey.APPRAISAL, SkillValue.NORMAL],
                [SkillKey.CRAFTING_BONE_CARVING, SkillValue.NORMAL],
            ]
        );
    }

    private static _addParentalLineage(key: ParentalLineageKey, skillInfos: SkillInfo[]) {
        if (this._map.has(key)) {
            throw new Error(`duplicate ParentalLineage in ParentalLineageStorage: [${key}]`);
        }
        this._map.set(key, new ParentalLineage(key, new SkillList(skillInfos, 0)));
    }
}

ParentalLineages.init();