import {getVectorStats, VectorKey} from "./ChildhoodVector";
import {SkillInfo, SkillKey, SkillList, SkillModifier, SkillValue, CitySkillBonuses} from "./Skill";
import {assert} from "./utils/Assert";
export enum HomeRegionKey {
    WILD_STEPPE,
    STEPPE_TOWN,
    RIVER_DELTA,
    TUNDRA_COAST,
    WARM_SEASIDE_VALLEYS, //LAKUAR
    MIDDLE_TAIGA_LAKES,
    MIDDLE_TAIGA_LAKES_CITY,
    WET_TROPICAL_FOREST, //ASHDAR'IAN
    WET_TROPICAL_FOREST_CITY, //ASHDAR'IAN
    MISTY_ISLAND_HIGHLANDS,
    MISTY_ISLAND_HIGHLANDS_CITY,
}

export class HomeRegion {
    private _key: HomeRegionKey;
    private _skillModifiers: SkillList;
    private _baseSkills: SkillList;
    private _childhoodVectorSkillMap: Map<VectorKey, SkillList>;

    constructor(key: HomeRegionKey, skillModifiers: SkillList, baseSkills: SkillList, childhoodVectorSkills: [VectorKey, SkillList][]) {
        this._key = key;
        this._skillModifiers = skillModifiers;
        this._baseSkills = baseSkills;
        this._childhoodVectorSkillMap = new Map<VectorKey, SkillList>(childhoodVectorSkills);
    }

    key(): HomeRegionKey {
        return this._key;
    }

    skillModifiers(): SkillList {
        return this._skillModifiers;
    }

    childhoodVectorSkills(childhoodVectorKey: VectorKey) {
        return this._baseSkills.addList(this._childhoodVectorSkillMap.get(childhoodVectorKey));
    }

    childhoodVectorStats(childhoodVectorKey: VectorKey) {
        return getVectorStats(childhoodVectorKey);
    }
}

export class HomeRegions {
    private static _map: Map<HomeRegionKey, HomeRegion> = new Map<HomeRegionKey, HomeRegion>();

    static get(key: HomeRegionKey): HomeRegion {
        assert(this._map.has(key), `undefined HomeRegion[${HomeRegionKey[key]}] in HomeRegionMap`);
        return this._map.get(key);
    }

    static init() {
        this._addHomeRegion(
            HomeRegionKey.WILD_STEPPE,
            [
                [SkillKey.RIDING_HORSE, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_LEATHERWORKING, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.NORMAL],
                [SkillKey.RIDING_HORSE, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    // [SkillKey.COMBAT_WHIP, SkillValue.NORMAL],
                    [SkillKey.COMBAT_BOW, SkillValue.NORMAL],
                    [SkillKey.RIDING_HORSE, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ART_MUSIC, SkillValue.NORMAL],
                    [SkillKey.ORATORY, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.SMALL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.SMALL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.TUNDRA_COAST,
            [
                [SkillKey.FISHING, SkillModifier.BONUS_1],
                [SkillKey.HUNTING, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.KNOWLEDGE_LIFE_TUNDRA, SkillValue.NORMAL],
                [SkillKey.AGRICULTURE_HERDING_TUNDRA, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.COMBAT_BOW, SkillValue.NORMAL],
                    [SkillKey.COMBAT_SPEAR, SkillValue.NORMAL],
                    [SkillKey.HUNTING, SkillValue.NORMAL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ART_MUSIC, SkillValue.NORMAL],
                    [SkillKey.FISHING, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_TUNDRA, SkillValue.SMALL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_TUNDRA, SkillValue.SMALL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.WARM_SEASIDE_VALLEYS,
            [
                [SkillKey.CRAFTING_WINEMAKING, SkillModifier.BONUS_2],
                [SkillKey.SERVICE_SOMMELIER, SkillModifier.BONUS_2],
                [SkillKey.ART_MUSIC, SkillModifier.BONUS_1],
                [SkillKey.GESTICULATION, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.AGRICULTURE_AGRONOMY, SkillValue.NORMAL],
                [SkillKey.GESTICULATION, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.LARGE],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ART_PERFORMANCE_DANCE_SPORTY, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.LARGE],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY,
            CitySkillBonuses([
                [SkillKey.CRAFTING_FURRING, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_LEATHERCUTTING, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_LEATHERWORKING, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_CARPENTERY, SkillModifier.BONUS_2],
            ]),
            [
                [SkillKey.KNOWLEDGE_LAW, SkillValue.SMALL],
                [SkillKey.CHORES, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.NORMAL],
                    [SkillKey.CHORES, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ORATORY, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LAW, SkillValue.NORMAL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.WET_TROPICAL_FOREST,
            [
                [SkillKey.RIDING_ELEPHANT, SkillModifier.BONUS_2],
            ],
            [
                [SkillKey.KNOWLEDGE_LIFE_WET_TROPICAL_FOREST, SkillValue.NORMAL],
                [SkillKey.HUNTING, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.HUNTING, SkillValue.NORMAL],
                    [SkillKey.COMBAT_SPEAR, SkillValue.NORMAL],
                    // [SkillKey.COMBAT_JAVELIN, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.RIDING_ELEPHANT, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_WET_TROPICAL_FOREST, SkillValue.NORMAL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.WET_TROPICAL_FOREST_CITY,
            CitySkillBonuses([
                [SkillKey.SERVICE_TRADE, SkillModifier.BONUS_2],
                [SkillKey.MEDICINE_DOCTORING, SkillModifier.NORMAL],
                [SkillKey.MEDICINE_WITCH_DOCTORING, SkillModifier.BONUS_2],
            ]),
            [
                [SkillKey.KNOWLEDGE_LAW, SkillValue.SMALL],
                [SkillKey.KNOWLEDGE_GHETTO, SkillValue.NORMAL],
                [SkillKey.CHORES, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.NORMAL],
                    [SkillKey.CHORES, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.AGRICULTURE_HERDING_WET_TROPICAL_FOREST, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LAW, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_GHETTO, SkillValue.SMALL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.MISTY_ISLAND_HIGHLANDS,[
                [SkillKey.FISHING, SkillModifier.BONUS_1],
                [SkillKey.MINING, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_BLACKSMITHING, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.AGRICULTURE_HERDING_MISTY_ISLAND_HIGHLANDS, SkillValue.NORMAL],
                [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_RELIGION, SkillValue.SMALL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.NORMAL],
                    [SkillKey.CHORES, SkillValue.NORMAL],
                    [SkillKey.SWIMMING, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.AGRICULTURE_HERDING_MISTY_ISLAND_HIGHLANDS, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_RELIGION, SkillValue.NORMAL],
                ]],
            ],
        );
        this._addHomeRegion(
            HomeRegionKey.MISTY_ISLAND_HIGHLANDS_CITY,
            CitySkillBonuses([
                [SkillKey.CRAFTING_BLACKSMITHING, SkillModifier.BONUS_2],
                [SkillKey.KNOWLEDGE_RELIGION, SkillModifier.BONUS_1],
                [SkillKey.SERVICE_TRADE, SkillModifier.BONUS_2],
                [SkillKey.PROSTITUTION, SkillModifier.BONUS_2],
                [SkillKey.PICKPOCKETING, SkillModifier.BONUS_2],
            ]),
            [
                [SkillKey.KNOWLEDGE_LAW, SkillValue.SMALL],
                [SkillKey.CHORES, SkillValue.NORMAL],
                [SkillKey.KNOWLEDGE_RELIGION, SkillValue.SMALL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.TRAINING_CHILDISH_SPORTS, SkillValue.NORMAL],
                    [SkillKey.CHORES, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ORATORY, SkillValue.NORMAL],
                    [SkillKey.ART_STORYTELLING, SkillValue.NORMAL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LAW, SkillValue.NORMAL],
                ]],
            ],
        );
    }

    private static _addHomeRegion(key: HomeRegionKey, skillModifierInfos: SkillInfo[], baseSkillInfos: SkillInfo[], childhoodVectorSkillInfos: [VectorKey, SkillInfo[]][]) {
        assert(!this._map.has(key), `duplicate HomeRegion[${HomeRegionKey[key]}] in HomeRegionMap`);
        const skillModifiers = new SkillList(skillModifierInfos, 1);
        const baseSkills = new SkillList(baseSkillInfos, 0);
        const childhoodVectorSkills = childhoodVectorSkillInfos.map((info) => [info[0], new SkillList(info[1], 0)] as [VectorKey, SkillList]);
        this._map.set(key, new HomeRegion(key, skillModifiers, baseSkills, childhoodVectorSkills));
    }
}

HomeRegions.init();