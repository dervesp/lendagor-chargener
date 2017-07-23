import {SkillInfo, SkillKey, SkillList, SkillValue} from "./Skill";
import {assert} from "./utils/Assert";
export enum ParentalLineageKey {
    CLASSIS_NOBLE,
    STEPPE_NOBLE,
    POUR_LAKUAR_PEASANT,
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
        assert(this._map.has(key), `undefined ParentalLineage[${ParentalLineage[key]}] in ParentalLineageMap`);
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
                [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                [SkillKey.CRAFTING_BONE_CARVING, SkillValue.NORMAL],
            ]
        );
        this._addParentalLineage(
            ParentalLineageKey.CLASSIS_NOBLE,
            [
                [SkillKey.RIDING, SkillValue.NORMAL],
                [SkillKey.COMBAT_LANCE, SkillValue.NORMAL],
                [SkillKey.COMBAT_RAPIER, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_ETIQUETTE, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_WARFARE, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                [SkillKey.LEADERSHIP, SkillValue.NORMAL],
            ]
        );
        this._addParentalLineage(
            ParentalLineageKey.POUR_LAKUAR_PEASANT,
            [
                [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.SMALL],
                [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.SMALL],
                [SkillKey.AGRICULTURE, SkillValue.LARGE],
            ]
        );
    }

    private static _addParentalLineage(key: ParentalLineageKey, skillInfos: SkillInfo[]) {
        assert(!this._map.has(key), `duplicate ParentalLineage[${ParentalLineage[key]}] in ParentalLineageMap`);
        this._map.set(key, new ParentalLineage(key, new SkillList(skillInfos, 0)));
    }
}

ParentalLineages.init();