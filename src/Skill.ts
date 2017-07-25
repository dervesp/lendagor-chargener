import {MergeNumberInfos, NumberInfo} from "./list/NumberList";
import {StatInfo, StatKey, StatList} from "./Stat";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {SkillTagInfo, SkillTagKey, SkillTagList} from "./SkillTag";
import {assert, assertEqualNumber} from "./utils/Assert";

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
    COMBAT_RAPIER,
    COMBAT_WHIP,
    COMBAT_LANCE,
    COMBAT_SABER,
    COMBAT_SPEAR,
    RIDING,
    CRAFTING_LEATHERWORKING=200,
    CRAFTING_LEATHERCUTTING,
    CRAFTING_FURRING,
    CRAFTING_TAILORING,
    CRAFTING_SHOEMAKING,
    CRAFTING_HATMAKING,
    CRAFTING_BLACKSMITHING,
    CRAFTING_WOODWORKING,
    CRAFTING_CARPENTERY,
    CRAFTING_POTTERY,
    CRAFTING_BONE_CARVING,
    CRAFTING_SADDLERY,
    CRAFTING_MILLING,
    CRAFTING_GLASSWORKING,
    CRAFTING_JEWELRY,
    CRAFTING_BUTCHERY,
    CRAFTING_COOKING,
    CRAFTING_WINEMAKING,
    MEDICINE_DOCTORING,
    MEDICINE_WITCH_DOCTORING,
    MEDICINE_BARBERING,
    ART_MUSIC,
    ART_POETRY,
    ART_STORYTELLING,
    ART_VISUAL_CARVING,
    ART_PERFORMANCE_DANCE_CALM,
    ART_PERFORMANCE_DANCE_PASSION,
    ART_PERFORMANCE_DANCE_SPORTY,
    KNOWLEDGE_LIFE_STEPPE,
    KNOWLEDGE_LIFE_TUNDRA,
    KNOWLEDGE_LEGENDS,
    KNOWLEDGE_WARFARE,
    KNOWLEDGE_APPRAISAL,
    KNOWLEDGE_ETIQUETTE,
    KNOWLEDGE_LAW,
    KNOWLEDGE_GHETTO,
    KNOWLEDGE_RELIGION,
    KNOWLEDGE_POLYMORTH,
    KNOWLEDGE_ETHER,
    KNOWLEDGE_PSIONIC,
    AGRICULTURE_AGRONOMY,
    AGRICULTURE_HERDING_TUNDRA,
    AGRICULTURE_BEEKEEPING,
    ORATORY,
    GESTICULATION,
    LEADERSHIP,
    ALCHEMY,
    ALCHEMY_PHARMACY,
    FISHING,
    HUNTING,
    PICKPOCKETING,
    LOCKPICKING,
    PROSTITUTION,
    SERVICE_TRADE,
    SERVICE_SOMMELIER,
    SERVICE_COURIER,
    CHORES,
    TRAINING_CHILDISH_SPORTS,
}

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
    SkillKey.COMBAT_BOW,
    SkillKey.COMBAT_1H_SWORD,
    SkillKey.COMBAT_RAPIER,
    SkillKey.COMBAT_WHIP,
    SkillKey.COMBAT_LANCE,
    SkillKey.COMBAT_SABER,
    SkillKey.COMBAT_SPEAR,
    SkillKey.RIDING,
    SkillKey.CRAFTING_LEATHERWORKING,
    SkillKey.CRAFTING_LEATHERCUTTING,
    SkillKey.CRAFTING_FURRING,
    SkillKey.CRAFTING_TAILORING,
    SkillKey.CRAFTING_SHOEMAKING,
    SkillKey.CRAFTING_HATMAKING,
    SkillKey.CRAFTING_BLACKSMITHING,
    SkillKey.CRAFTING_WOODWORKING,
    SkillKey.CRAFTING_CARPENTERY,
    SkillKey.CRAFTING_POTTERY,
    SkillKey.CRAFTING_BONE_CARVING,
    SkillKey.CRAFTING_SADDLERY,
    SkillKey.CRAFTING_MILLING,
    SkillKey.CRAFTING_GLASSWORKING,
    SkillKey.CRAFTING_JEWELRY,
    SkillKey.CRAFTING_BUTCHERY,
    SkillKey.CRAFTING_COOKING,
    SkillKey.CRAFTING_WINEMAKING,
    SkillKey.MEDICINE_DOCTORING,
    SkillKey.MEDICINE_WITCH_DOCTORING,
    SkillKey.MEDICINE_BARBERING,
    SkillKey.ART_MUSIC,
    SkillKey.ART_POETRY,
    SkillKey.ART_STORYTELLING,
    SkillKey.ART_VISUAL_CARVING,
    SkillKey.ART_PERFORMANCE_DANCE_CALM,
    SkillKey.ART_PERFORMANCE_DANCE_PASSION,
    SkillKey.ART_PERFORMANCE_DANCE_SPORTY,
    SkillKey.KNOWLEDGE_LIFE_STEPPE,
    SkillKey.KNOWLEDGE_LIFE_TUNDRA,
    SkillKey.KNOWLEDGE_LEGENDS,
    SkillKey.KNOWLEDGE_WARFARE,
    SkillKey.KNOWLEDGE_APPRAISAL,
    SkillKey.KNOWLEDGE_ETIQUETTE,
    SkillKey.KNOWLEDGE_LAW,
    SkillKey.KNOWLEDGE_GHETTO,
    SkillKey.KNOWLEDGE_RELIGION,
    SkillKey.KNOWLEDGE_POLYMORTH,
    SkillKey.KNOWLEDGE_ETHER,
    SkillKey.KNOWLEDGE_PSIONIC,
    SkillKey.AGRICULTURE_AGRONOMY,
    SkillKey.AGRICULTURE_HERDING_TUNDRA,
    SkillKey.AGRICULTURE_BEEKEEPING,
    SkillKey.ORATORY,
    SkillKey.GESTICULATION,
    SkillKey.LEADERSHIP,
    SkillKey.ALCHEMY,
    SkillKey.ALCHEMY_PHARMACY,
    SkillKey.FISHING,
    SkillKey.HUNTING,
    SkillKey.PICKPOCKETING,
    SkillKey.LOCKPICKING,
    SkillKey.PROSTITUTION,
    SkillKey.SERVICE_TRADE,
    SkillKey.SERVICE_SOMMELIER,
    SkillKey.SERVICE_COURIER,
    SkillKey.CHORES,
    SkillKey.TRAINING_CHILDISH_SPORTS,
];

export const CitySkillBonuses = (skillInfos: SkillInfo[]): SkillInfo[] => {
    return MergeNumberInfos([
        [SkillKey.CRAFTING_LEATHERWORKING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_LEATHERCUTTING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_FURRING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_TAILORING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_SHOEMAKING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_HATMAKING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_BLACKSMITHING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_WOODWORKING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_CARPENTERY, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_POTTERY, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_BONE_CARVING, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_SADDLERY, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_JEWELRY, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_BUTCHERY, SkillModifier.BONUS_1],
        [SkillKey.CRAFTING_COOKING, SkillModifier.BONUS_1],
        [SkillKey.MEDICINE_DOCTORING, SkillModifier.BONUS_1],
        [SkillKey.MEDICINE_BARBERING, SkillModifier.BONUS_1],
        [SkillKey.PICKPOCKETING, SkillModifier.BONUS_1],
        [SkillKey.LOCKPICKING, SkillModifier.BONUS_1],
        [SkillKey.PROSTITUTION, SkillModifier.BONUS_1],
        [SkillKey.SERVICE_TRADE, SkillModifier.BONUS_1],
        [SkillKey.KNOWLEDGE_LAW, SkillModifier.BONUS_1],
        [SkillKey.KNOWLEDGE_GHETTO, SkillModifier.BONUS_1],
        [SkillKey.KNOWLEDGE_ETIQUETTE, SkillModifier.BONUS_1],
        [SkillKey.ALCHEMY, SkillModifier.BONUS_1],
        [SkillKey.ALCHEMY_PHARMACY, SkillModifier.BONUS_1],
    ], skillInfos);
};

assert(Object.keys(SkillKey).length / 2 == SkillKeys().length, "unexpected SkillKeys length");

export type SkillInfo = NumberInfo<SkillKey>;
export class SkillList extends DefaultValueNumberList<SkillKey> {
    constructor(skillInfos: SkillInfo[], defaultValue: number) {
        super(SkillKeys(), skillInfos, defaultValue);
    }
}

const SKILL_STAT_SUM = 1;
export class Skill {
    private _key: SkillKey;
    private _stats: StatList;
    private _skillTags: SkillTagList;
    private _isServiceSkill: boolean;

    constructor(key: SkillKey, stats: StatList, skillTags: SkillTagList, isServiceSkill: boolean) {
        assertEqualNumber(SKILL_STAT_SUM, stats.sum(), `invalid Skill[${SkillKey[key]}] stat sum`);
        this._key = key;
        this._stats = stats;
        this._skillTags = skillTags;
        this._isServiceSkill = isServiceSkill;
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

    isServiceSkill(): boolean {
        return this._isServiceSkill;
    }
}

export class Skills {
    private static _map: Map<SkillKey, Skill> = new Map<SkillKey, Skill>();

    static get(key: SkillKey): Skill {
        assert(this._map.has(key), `undefined Skill[${SkillKey[key]}] in SkillMap`);
        return this._map.get(key);
    }

    static init() {
        this._addSkill(SkillKey.PHY_STR_ROLL_BONUS, [
            [StatKey.PHY_STR, 1],
        ], [], true);
        this._addSkill(SkillKey.PHY_DEX_ROLL_BONUS, [
            [StatKey.PHY_DEX, 1],
        ], [], true);
        this._addSkill(SkillKey.PHY_CON_ROLL_BONUS, [
            [StatKey.PHY_CON, 1],
        ], [], true);
        this._addSkill(SkillKey.ETH_STR_ROLL_BONUS, [
            [StatKey.ETH_STR, 1],
        ], [], true);
        this._addSkill(SkillKey.ETH_DEX_ROLL_BONUS, [
            [StatKey.ETH_DEX, 1],
        ], [], true);
        this._addSkill(SkillKey.ETH_CON_ROLL_BONUS, [
            [StatKey.ETH_CON, 1],
        ], [], true);
        this._addSkill(SkillKey.PSI_STR_ROLL_BONUS, [
            [StatKey.PSI_STR, 1],
        ], [], true);
        this._addSkill(SkillKey.PSI_DEX_ROLL_BONUS, [
            [StatKey.PSI_DEX, 1],
        ], [], true);
        this._addSkill(SkillKey.PSI_CON_ROLL_BONUS, [
            [StatKey.PSI_CON, 1],
        ], [], true);
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
        this._addSkill(SkillKey.COMBAT_RAPIER, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.5],
            [StatKey.PHY_CON, 0.4],
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
        this._addSkill(SkillKey.COMBAT_LANCE, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.6],
        ], [
            [SkillTagKey.WEAPON_1_HAND, 1],
            [SkillTagKey.WEAPON_2_HAND, 0],
            [SkillTagKey.WEAPON_BALANCED, 1],
            [SkillTagKey.WEAPON_UNBALANCED, 0],
            [SkillTagKey.WEAPON_TYPE_BLADE, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_SHOCK, 0],
            [SkillTagKey.WEAPON_TYPE_PYLON_STICHING, 1],
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
        this._addSkill(SkillKey.CRAFTING_LEATHERCUTTING, [
            [StatKey.PHY_STR, 0.4],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.CRAFTING_FURRING, [
            [StatKey.PHY_STR, 0.2],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.4],
        ], []);
        this._addSkill(SkillKey.CRAFTING_TAILORING, [
            [StatKey.PHY_DEX, 0.5],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.CRAFTING_SHOEMAKING, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.CRAFTING_HATMAKING, [
            [StatKey.PHY_DEX, 0.5],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.CRAFTING_SADDLERY, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.CRAFTING_WOODWORKING, [
            [StatKey.PHY_STR, 0.4],
            [StatKey.PHY_DEX, 0.2],
            [StatKey.PHY_CON, 0.4],
        ], []);
        this._addSkill(SkillKey.CRAFTING_CARPENTERY, [
            [StatKey.PHY_STR, 0.2],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.CRAFTING_POTTERY, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.CRAFTING_GLASSWORKING, [
            [StatKey.PHY_STR, 0.2],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.5],
        ], []);
        this._addSkill(SkillKey.CRAFTING_JEWELRY, [
            [StatKey.PHY_DEX, 0.3],
            [StatKey.ETH_STR, 0.1],
            [StatKey.ETH_DEX, 0.1],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.CRAFTING_BUTCHERY, [
        ], []);
        this._addSkill(SkillKey.CRAFTING_COOKING, [
        ], []);
        this._addSkill(SkillKey.CRAFTING_MILLING, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_CON, 0.5],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.CRAFTING_WINEMAKING, [
            [StatKey.PHY_CON, 0.1],
            [StatKey.ETH_STR, 0.1],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_DEX, 0.2],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.MEDICINE_DOCTORING, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_STR, 0.3],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.MEDICINE_WITCH_DOCTORING, [
        ], []);
        this._addSkill(SkillKey.MEDICINE_BARBERING, [
        ], []);
        this._addSkill(SkillKey.AGRICULTURE_AGRONOMY, [
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
        this._addSkill(SkillKey.KNOWLEDGE_LEGENDS, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_ETIQUETTE, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_WARFARE, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_APPRAISAL, [
            [StatKey.PSI_STR, 0.7],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_LAW, [
            [StatKey.PSI_STR, 0.7],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_GHETTO, [
            [StatKey.PSI_STR, 0.5],
            [StatKey.PSI_DEX, 0.3],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_RELIGION, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_POLYMORTH, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_ETHER, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.KNOWLEDGE_PSIONIC, [
            [StatKey.PSI_STR, 0.8],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.ART_MUSIC, [
            [StatKey.ETH_STR, 0.4],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.ART_POETRY, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.4],
            [StatKey.ETH_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.ART_STORYTELLING, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.1],
            [StatKey.PSI_STR, 0.2],
        ], []);
        this._addSkill(SkillKey.ART_VISUAL_CARVING, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.ART_PERFORMANCE_DANCE_CALM, [
            [StatKey.PHY_DEX, 0.2],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.ART_PERFORMANCE_DANCE_PASSION, [
            [StatKey.PHY_DEX, 0.2],
            [StatKey.PHY_CON, 0.2],
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.1],
        ], []);
        this._addSkill(SkillKey.ART_PERFORMANCE_DANCE_SPORTY, [
            [StatKey.PHY_DEX, 0.4],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_STR, 0.2],
            [StatKey.ETH_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.ORATORY, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.3],
            [StatKey.ETH_CON, 0.2],
        ], [
            [SkillTagKey.COMMUNICATION, 1],
        ]);
        this._addSkill(SkillKey.GESTICULATION, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.ETH_STR, 0.7],
            [StatKey.ETH_DEX, 0.2],
        ], [
            [SkillTagKey.COMMUNICATION, 1],
        ]);
        this._addSkill(SkillKey.LEADERSHIP, [
            [StatKey.ETH_STR, 0.5],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.1],
            [StatKey.PSI_STR, 0.1],
            [StatKey.PSI_DEX, 0.1],
        ], []);
        this._addSkill(SkillKey.AGRICULTURE_HERDING_TUNDRA, [
            [StatKey.PHY_DEX, 0.1],
            [StatKey.PHY_CON, 0.4],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.ETH_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.AGRICULTURE_BEEKEEPING, [
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
        this._addSkill(SkillKey.ALCHEMY, [
        ], []);
        this._addSkill(SkillKey.ALCHEMY_PHARMACY, [
            [StatKey.PSI_STR, 0.4],
            [StatKey.PSI_DEX, 0.4],
            [StatKey.PSI_CON, 0.2],
        ], []);
        this._addSkill(SkillKey.PICKPOCKETING, [
        ], []);
        this._addSkill(SkillKey.LOCKPICKING, [
            [StatKey.PHY_DEX, 0.5],
            [StatKey.PSI_STR, 0.2],
            [StatKey.PSI_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.PROSTITUTION, [
        ], []);
        this._addSkill(SkillKey.SERVICE_TRADE, [
            [StatKey.ETH_STR, 0.3],
            [StatKey.ETH_DEX, 0.2],
            [StatKey.PSI_DEX, 0.5],
        ], []);
        this._addSkill(SkillKey.SERVICE_SOMMELIER, [
            [StatKey.ETH_STR, 0.1],
            [StatKey.ETH_DEX, 0.5],
            [StatKey.ETH_CON, 0.2],
            [StatKey.PSI_DEX, 0.1],
            [StatKey.PSI_CON, 0.1],
        ], []);
        this._addSkill(SkillKey.SERVICE_COURIER, [
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.4],
            [StatKey.PSI_STR, 0.1],
            [StatKey.PSI_DEX, 0.2],
        ], []);
        this._addSkill(SkillKey.CHORES, [
            [StatKey.PHY_STR, 0.1],
            [StatKey.PHY_DEX, 0.1],
            [StatKey.PHY_CON, 0.4],
            [StatKey.ETH_CON, 0.1],
            [StatKey.PSI_CON, 0.3],
        ], []);
        this._addSkill(SkillKey.TRAINING_CHILDISH_SPORTS, [
            [StatKey.PHY_STR, 0.2],
            [StatKey.PHY_DEX, 0.3],
            [StatKey.PHY_CON, 0.3],
            [StatKey.ETH_STR, 0.1],
            [StatKey.ETH_DEX, 0.1],
        ], []);
    }

    private static _addSkill(key: SkillKey, statInfos: StatInfo[], skillTagInfos: SkillTagInfo[], isServiceSkill: boolean = false) {
        assert(!this._map.has(key), `duplicate Skill[${Skill[key]}] in SkillMap`);
        this._map.set(key, new Skill(key, new StatList(statInfos, 0), new SkillTagList(skillTagInfos, 0), isServiceSkill));
    }
}

Skills.init();