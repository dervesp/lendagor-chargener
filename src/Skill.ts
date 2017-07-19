import {NumberInfo} from "./list/NumberList";
import {StatInfo, StatKey, StatList} from "./Stat";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {SkillTagInfo, SkillTagKey, SkillTagList} from "./list/SkillTag";

export enum SkillKey {
    PHY_STR_ROLL_BONUS=11,
    PHY_DEX_ROLL_BONUS,
    PHY_CON_ROLL_BONUS,
    ETH_STR_ROLL_BONUS=21,
    ETH_DEX_ROLL_BONUS,
    ETH_CON_ROLL_BONUS,
    PSI_STR_ROLL_BONUS=31,
    PSI_DEX_ROLL_BONUS,
    PSI_CON_ROLL_BONUS,
    COMBAT_BOW=100,
    COMBAT_1H_SWORD,
    COMBAT_WHIP,
    COMBAT_SABER,
    RIDING,
    CRAFTING_LEATHERWORKING,
    AGRICULTURE,
    KNOWLEDGE_LIFE_STEPPE,
    KNOWLEDGE_LIFE_TUNDRA,
    ART_MUSIC,
    ART_VISUAL_CARVING,
    ORATORY,
    KNOWLEDGE_LEGENDS,
    APPRAISAL,
    LEADERSHIP,
    COMBAT_SPEAR,
    KNOWLEDGE_LAW,
    HERDING_TUNDRA,
    FISHING,
    HUNTING,
    CRAFTING_BLACKSMITHING,
    CRAFTING_BONE_CARVING,
    SERVICE_TRADE,
}

export const SkillModifier = {
    PENALTY_2: 0.8,
    PENALTY_1: 0.9,
    NORMAL: 1,
    BONUS_1: 1.1,
    BONUS_2: 1.2,
};

export const SkillValue = {
    SMALL: 1,
    NORMAL: 2,
    LARGE: 3,
};

export const SkillKeys = () => [
    SkillKey.PHY_STR_ROLL_BONUS,
    SkillKey.PHY_DEX_ROLL_BONUS,
    SkillKey.PHY_CON_ROLL_BONUS,
    SkillKey.ETH_STR_ROLL_BONUS,
    SkillKey.ETH_DEX_ROLL_BONUS,
    SkillKey.ETH_CON_ROLL_BONUS,
    SkillKey.PSI_STR_ROLL_BONUS,
    SkillKey.PSI_DEX_ROLL_BONUS,
    SkillKey.PSI_CON_ROLL_BONUS,
    SkillKey.RIDING,
    SkillKey.COMBAT_BOW,
    SkillKey.COMBAT_1H_SWORD,
    SkillKey.COMBAT_SABER,
    SkillKey.CRAFTING_LEATHERWORKING,
    SkillKey.AGRICULTURE,
    SkillKey.KNOWLEDGE_LIFE_STEPPE,
    SkillKey.KNOWLEDGE_LIFE_TUNDRA,
    SkillKey.ART_MUSIC,
    SkillKey.ART_VISUAL_CARVING,
    SkillKey.ORATORY,
    SkillKey.KNOWLEDGE_LEGENDS,
    SkillKey.APPRAISAL,
    SkillKey.COMBAT_WHIP,
    SkillKey.LEADERSHIP,
    SkillKey.COMBAT_SPEAR,
    SkillKey.KNOWLEDGE_LAW,
    SkillKey.HERDING_TUNDRA,
    SkillKey.FISHING,
    SkillKey.HUNTING,
    SkillKey.CRAFTING_BLACKSMITHING,
    SkillKey.CRAFTING_BONE_CARVING,
    SkillKey.SERVICE_TRADE,
];

export type SkillInfo = NumberInfo<SkillKey>;
export class SkillList extends DefaultValueNumberList<SkillKey> {
    constructor(skillInfos: SkillInfo[], defaultValue: number) {
        super(SkillKeys(), skillInfos, defaultValue);
    }
}

export class Skill {
    private _key: SkillKey;
    private _stats: StatList;
    private _skillTags: SkillTagList;

    constructor(key: SkillKey, stats: StatList, skillTags: SkillTagList) {
        this._key = key;
        this._stats = stats;
        this._skillTags = skillTags;
    }

    key(): SkillKey {
        return this._key;
    }

    stats(): StatList {
        return this._stats;
    }

    skillTags(): SkillTagList {
        return this._skillTags;
    }
}

export class Skills {
    private static _map: Map<SkillKey, Skill> = new Map<SkillKey, Skill>();

    static get(key: SkillKey): Skill {
        if (!this._map.has(key)) {
            throw new Error(`undefined skill [${key}] in SkillMap`);
        }
        return this._map.get(key);
    }

    static init() {

        this._addSkill(SkillKey.PHY_STR_ROLL_BONUS, [
            [StatKey.PHY_STR, 1],
        ], []);
        this._addSkill(SkillKey.PHY_DEX_ROLL_BONUS, [
            [StatKey.PHY_DEX, 1],
        ], []);
        this._addSkill(SkillKey.PHY_CON_ROLL_BONUS, [
            [StatKey.PHY_CON, 1],
        ], []);
        this._addSkill(SkillKey.ETH_STR_ROLL_BONUS, [
            [StatKey.ETH_STR, 1],
        ], []);
        this._addSkill(SkillKey.ETH_DEX_ROLL_BONUS, [
            [StatKey.ETH_DEX, 1],
        ], []);
        this._addSkill(SkillKey.ETH_CON_ROLL_BONUS, [
            [StatKey.ETH_CON, 1],
        ], []);
        this._addSkill(SkillKey.PSI_STR_ROLL_BONUS, [
            [StatKey.PSI_STR, 1],
        ], []);
        this._addSkill(SkillKey.PSI_DEX_ROLL_BONUS, [
            [StatKey.PSI_DEX, 1],
        ], []);
        this._addSkill(SkillKey.PSI_CON_ROLL_BONUS, [
            [StatKey.PSI_CON, 1],
        ], []);
        this._addSkill(SkillKey.COMBAT_BOW, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], [
            [SkillTagKey.WEAPON_1_HAND, 0],
            [SkillTagKey.WEAPON_2_HAND, 1],
            [SkillTagKey.WEAPON_BALANCED, 0],
            [SkillTagKey.WEAPON_UNBALANCED, 0],
            [SkillTagKey.WEAPON_TYPE_BLADE, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_SHOCK, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_STICHING, 0],
            [SkillTagKey.WEAPON_TYPE_FLEXIBLE, 0],
            [SkillTagKey.WEAPON_TYPE_RANGED, 1],
            [SkillTagKey.WEAPON_TYPE_THROWING, 0],
        ]);
        this._addSkill(SkillKey.COMBAT_1H_SWORD, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], [
            [SkillTagKey.WEAPON_1_HAND, 1],
            [SkillTagKey.WEAPON_2_HAND, 0],
            [SkillTagKey.WEAPON_BALANCED, 1],
            [SkillTagKey.WEAPON_UNBALANCED, 0],
            [SkillTagKey.WEAPON_TYPE_BLADE, 1],
            [SkillTagKey.WEAPON_TYPE_PYLON_SHOCK, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_STICHING, 0],
            [SkillTagKey.WEAPON_TYPE_FLEXIBLE, 0],
            [SkillTagKey.WEAPON_TYPE_RANGED, 0],
            [SkillTagKey.WEAPON_TYPE_THROWING, 0],
        ]);
        this._addSkill(SkillKey.COMBAT_SABER, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], [
            [SkillTagKey.WEAPON_1_HAND, 1],
            [SkillTagKey.WEAPON_2_HAND, 0],
            [SkillTagKey.WEAPON_BALANCED, 1],
            [SkillTagKey.WEAPON_UNBALANCED, 0],
            [SkillTagKey.WEAPON_TYPE_BLADE, 1],
            [SkillTagKey.WEAPON_TYPE_PYLON_SHOCK, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_STICHING, 0],
            [SkillTagKey.WEAPON_TYPE_FLEXIBLE, 0],
            [SkillTagKey.WEAPON_TYPE_RANGED, 0],
            [SkillTagKey.WEAPON_TYPE_THROWING, 0],
        ]);
        this._addSkill(SkillKey.COMBAT_WHIP, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], [
            [SkillTagKey.WEAPON_1_HAND, 1],
            [SkillTagKey.WEAPON_2_HAND, 0],
            [SkillTagKey.WEAPON_BALANCED, 0],
            [SkillTagKey.WEAPON_UNBALANCED, 0],
            [SkillTagKey.WEAPON_TYPE_BLADE, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_SHOCK, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_STICHING, 0],
            [SkillTagKey.WEAPON_TYPE_FLEXIBLE, 1],
            [SkillTagKey.WEAPON_TYPE_RANGED, 0],
            [SkillTagKey.WEAPON_TYPE_THROWING, 0],
        ]);
        this._addSkill(SkillKey.COMBAT_SPEAR, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.RIDING, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.2],
            [StatKey.PHY_CON, 0.6],
            [StatKey.ETH_DEX, 0.1],
        ], []);
        this._addSkill(SkillKey.CRAFTING_LEATHERWORKING, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.AGRICULTURE, [
            [StatKey.PHY_CON, 0.6],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_LIFE_STEPPE, [
            [StatKey.ETH_DEX, 0.1],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_STR, 0.5],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_LIFE_TUNDRA, [
            [StatKey.ETH_DEX, 0.1],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_STR, 0.5],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.ART_MUSIC, [
            [StatKey.ETH_STR, 0.4],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.ART_VISUAL_CARVING, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.ORATORY, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_LEGENDS, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.APPRAISAL, [
            [StatKey.PSI_STR, 0.6],
            [StatKey.PSI_DEX, 0.3],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.LEADERSHIP, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.1],
            [StatKey.PSI_STR, 0.1],
            [StatKey.PSI_DEX, 0.1],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_LAW, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.HERDING_TUNDRA, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.PHY_CON, 0.4],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.FISHING, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.3],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.HUNTING, [
            [StatKey.PHY_DEX, 0.2],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.3],
            [StatKey.PSI_DEX, 0.1],
        ], []);
        this._addSkill(SkillKey.CRAFTING_BLACKSMITHING, [
            [StatKey.PHY_STR, 0.5],
            [StatKey.PHY_DEX, 0.1],
            [StatKey.PHY_CON, 0.4],
        ], []);
        this._addSkill(SkillKey.CRAFTING_BONE_CARVING, [
            [StatKey.PHY_STR, 0.3],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.4],
        ], []);
        this._addSkill(SkillKey.SERVICE_TRADE, [
            [StatKey.ETH_STR, 0.3],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.PSI_DEX, 0.5],
        ], []);
    }

    private static _addSkill(key: SkillKey, statInfos: StatInfo[], skillTagInfos: SkillTagInfo[]) {
        if (this._map.has(key)) {
            throw new Error(`duplicate skill in skillStorage: [${key}]`);
        }
        this._map.set(key, new Skill(key, new StatList(statInfos, 0), new SkillTagList(skillTagInfos, 0)));
    }
}

Skills.init();