import {StatInfo, StatKey} from "./Stat";
import {VectorKey} from "./ChildhoodVector";
import {SkillInfo, SkillKey, SkillList, SkillModifier, SkillValue} from "./Skill";
export enum HomeRegionKey {
    WILD_STEPPE,
    STEPPE_TOWNS,
    RIVER_DELTA,
    TUNDRA_COAST,
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
}

export class HomeRegions {
    private static _map: Map<HomeRegionKey, HomeRegion> = new Map<HomeRegionKey, HomeRegion>();

    static get(key: HomeRegionKey): HomeRegion {
        if (!this._map.has(key)) {
            throw new Error(`undefined HomeRegion [${key}] in HomeRegionMap`);
        }
        return this._map.get(key);
    }

    static init() {
        this._addHomeRegion(
            HomeRegionKey.WILD_STEPPE,
            [
                [SkillKey.RIDING, SkillModifier.BONUS_2],
                [SkillKey.CRAFTING_LEATHERWORKING, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.NORMAL],
                [SkillKey.RIDING, SkillValue.NORMAL],
            ],
            [
                [VectorKey.PHY, [
                    [SkillKey.COMBAT_WHIP, SkillValue.NORMAL],
                    [SkillKey.COMBAT_BOW, SkillValue.NORMAL],
                    [SkillKey.RIDING, SkillValue.SMALL],
                ]],
                [VectorKey.ETH, [
                    [SkillKey.ART_MUSIC, SkillValue.NORMAL],
                    [SkillKey.ORATORY, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.SMALL],
                ]],
                [VectorKey.PSI, [
                    [SkillKey.KNOWLEDGE_LEGENDS, SkillValue.NORMAL],
                    [SkillKey.APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_STEPPE, SkillValue.SMALL],
                ]],
            ]
        );
        this._addHomeRegion(
            HomeRegionKey.TUNDRA_COAST,
            [
                [SkillKey.FISHING, SkillModifier.BONUS_1],
                [SkillKey.HUNTING, SkillModifier.BONUS_1],
            ],
            [
                [SkillKey.KNOWLEDGE_LIFE_TUNDRA, SkillValue.NORMAL],
                [SkillKey.HERDING_TUNDRA, SkillValue.NORMAL],
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
                    [SkillKey.APPRAISAL, SkillValue.NORMAL],
                    [SkillKey.KNOWLEDGE_LIFE_TUNDRA, SkillValue.SMALL],
                ]],
            ]
        );
    }

    private static _addHomeRegion(key: HomeRegionKey, skillModifierInfos: SkillInfo[], baseSkillInfos: SkillInfo[], childhoodVectorSkillInfos: [VectorKey, SkillInfo[]][]) {
        if (this._map.has(key)) {
            throw new Error(`duplicate HomeRegion in HomeRegionStorage: [${key}]`);
        }
        const skillModifiers = new SkillList(skillModifierInfos, 1);
        const baseSkills = new SkillList(baseSkillInfos, 0);
        const childhoodVectorSkills = childhoodVectorSkillInfos.map((info) => [info[0], new SkillList(info[1], 0)] as [VectorKey, SkillList]);
        this._map.set(key, new HomeRegion(key, skillModifiers, baseSkills, childhoodVectorSkills));
    }
}

HomeRegions.init();