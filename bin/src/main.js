const WORLD_SEED = 1.61803398875;
const WORLD_SEED_POW_1 = WORLD_SEED;
const WORLD_SEED_POW_2 = Math.pow(WORLD_SEED, WORLD_SEED_POW_1);
const WORLD_SEED_POW_3 = Math.pow(WORLD_SEED, WORLD_SEED_POW_2);
const WORLD_SEED_POW_4 = Math.pow(WORLD_SEED, WORLD_SEED_POW_3);
const USED_STAT_DECREASE_MODIFIER = 1 / WORLD_SEED;
const REALLY_USED_STAT_MIN_VALUE = WORLD_SEED / 10;
const CHILDHOOD_STAT_MODIFIER = 1;
const NORMAL_STAT_MIN_VALUE = 12;

const SkillModifier = {
    PENALTY_2: 0.8,
    PENALTY_1: 0.9,
    NORMAL: 1,
    BONUS_1: 1.1,
    BONUS_2: 1.2,
};

const SkillValue = {
    SMALL: 1,
    NORMAL: 2,
    LARGE: 3,
};

function skillToStatMagicFn(value) {
    return Math.pow(value, 1 / WORLD_SEED_POW_2) * WORLD_SEED_POW_3 * WORLD_SEED_POW_1;
}

function statToSkillModifierBonusMagicFn(value) {
    return Math.pow(value / WORLD_SEED_POW_3, WORLD_SEED_POW_1);
}

function statToSkillModifierPenaltyMagicFn(value) {
    return -Math.pow(value / WORLD_SEED_POW_1, WORLD_SEED_POW_1);
}

function skillDecreaseModifierMagicFn(value) {
    return 1 / (Math.pow(value, WORLD_SEED_POW_4) / (Math.pow(48, WORLD_SEED_POW_4) / (WORLD_SEED_POW_1 * 10)) + 1);
}

function statDecreaseMagicFn(value) {
    return WORLD_SEED_POW_2 * Math.pow(value, WORLD_SEED_POW_2 - 1) / (12 * 12 * 3);
}

const StatKey = {
    PHY_STR: "1.1:PHY_STR",
    PHY_DEX: "1.2:PHY_DEX",
    PHY_CON: "1.3:PHY_CON",
    ETH_STR: "2.1:ETH_STR",
    ETH_DEX: "2.2:ETH_DEX",
    ETH_CON: "2.3:ETH_CON",
    PSI_STR: "3.1:PSI_STR",
    PSI_DEX: "3.2:PSI_DEX",
    PSI_CON: "3.3:PSI_CON",
};

class List {
    constructor(items, defaultValue = 0) {
        this._items = items;
        this.defaultValue = defaultValue;
    }

    _createList(items, defaultValue) {
        throw new Error;
    }

    getItem(key) {
        return this.hasItem(key) ? this._items[key] : this.defaultValue;
    }

    hasItem(key) {
        return (typeof this._items[key] !== "undefined");
    }

    keys() {
        return Object.keys(this._items);
    }

    addList(list, useNewDefaultValue = false) {
        const keys = Array.from(new Set(this.keys().concat(list.keys())));
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = this.getItem(key) + list.getItem(key);
        }
        return this._createList(resultItems, useNewDefaultValue ? list.defaultValue : this.defaultValue);
    }

    multiplyList(list) {
        const keys = this.keys();
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = this.getItem(key) * list.getItem(key);
        }
        return this._createList(resultItems, this.defaultValue);
    }

    add(value) {
        const keys = this.keys();
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = this.getItem(key) + value;
        }
        return this._createList(resultItems, this.defaultValue);
    }

    multiply(value) {
        const keys = this.keys();
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = this.getItem(key) * value;
        }
        return this._createList(resultItems, this.defaultValue);
    }

    mergeList(list, useNewDefaultValue = false) {
        const keys = Array.from(new Set(this.keys().concat(list.keys())));
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = list.hasItem(key) ? list.getItem(key) : this.getItem(key);
        }
        return this._createList(resultItems, useNewDefaultValue ? list.defaultValue : this.defaultValue);
    }

    replace(value) {
        return this.modify(() => value);
    }

    modify(modifyFn) {
        const keys = this.keys();
        const resultItems = {};
        for (const key of keys) {
            resultItems[key] = modifyFn(this.getItem(key), key);
        }
        return this._createList(resultItems, this.defaultValue);
    }

    filter(filterFn) {
        const resultItems = {};
        const keys = this.keys();
        for (const key of keys) {
            if (filterFn(this.getItem(key))) {
                resultItems[key] = this.getItem(key);
            }
        }
        return this._createList(resultItems, this.defaultValue);
    }

    filterIfLessThen(value) {
        return this.filter((itemValue) => (itemValue >= value));
    }

    reduce(reduceFn, initialValue = 0) {
        const keys = this.keys();
        for (const key of keys) {
            initialValue = reduceFn(initialValue, this.getItem(key));
        }
        return initialValue;
    }
}

class StatList extends List {
    constructor(stats, defaultValue = 0, fillKeys = false) {
        if (fillKeys) {
            for (const stat of Object.keys(StatKey)) {
                const key = StatKey[stat];
                stats[key] = (typeof stats[key] !== "undefined") ? stats[key] : defaultValue;
            }
        }
        super(stats, defaultValue);
    }

    _createList(items, defaultValue) {
        return new StatList(items, defaultValue);
    }
}

function newStatList(baseValue = 0) {
    const list = {};
    for (const stat of Object.keys(StatKey)) {
        const key = StatKey[stat];
        list[StatKey[key]] = baseValue;
    }
    return list;
}

class Skill {
    constructor(key, statList) {
        this.key = key;
        this.statList = statList;
    }
}

const SkillKey = {
    EBLANING: "EBLANING",
    RIDING: "Верховая езда",
    COMBAT_BOW: "COMBAT_BOW",
    COMBAT_1H_SWORD: "COMBAT_1H_SWORD",
    COMBAT_SABER: "COMBAT_SABER",
    COMBAT_WHIP: "COMBAT_WHIP",
    COMBAT_SPEAR: "COMBAT_SPEAR",
    LEATHERWORKING: "LEATHERWORKING",
    AGRICULTURE: "AGRICULTURE",
    KNOWLEDGE_LIFE_STEPPE: "KNOWLEDGE_LIFE_STEPPE",
    KNOWLEDGE_LIFE_TUNDRA: "KNOWLEDGE_LIFE_TUNDRA",
    ART_MUSIC: "ART_MUSIC",
    ART_VISUAL_CARVING: "ART_VISUAL_CARVING",
    ORATORY: "ORATORY",
    KNOWLEDGE_LEGENDS: "KNOWLEDGE_LEGENDS",
    APPRAISAL: "APPRAISAL",
    LEADERSHIP: "LEADERSHIP",
    KNOWLEDGE_LAW: "KNOWLEDGE_LAW",
    FISHING: "FISHING",
    HUNTING: "HUNTING",
    HERDING_TUNDRA: "HERDING_TUNDRA",
    CRAFTING_BONE_CARVING: "CRAFTING_BONE_CARVING",
    CRAFTING_BLACKSMITHING: "CRAFTING_BLACKSMITHING",
    SERVICE_TRADE: "SERVICE_TRADE",
};

const SkillTable = {
    [SkillKey.RIDING]: new Skill(SkillKey.RIDING, new StatList({
        [StatKey.PHY_STR]: 0.1,
        [StatKey.PHY_DEX]: 0.2,
        [StatKey.PHY_CON]: 0.6,
        [StatKey.ETH_DEX]: 0.1,
    })),
    [SkillKey.COMBAT_BOW]: new Skill(SkillKey.COMBAT_BOW, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.COMBAT_1H_SWORD]: new Skill(SkillKey.COMBAT_1H_SWORD, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.COMBAT_SABER]: new Skill(SkillKey.COMBAT_SABER, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.EBLANING]: new Skill(SkillKey.EBLANING, new StatList({
        [StatKey.ETH_CON]: 1,
    })),
    [SkillKey.LEATHERWORKING]: new Skill(SkillKey.LEATHERWORKING, new StatList({
        [StatKey.PHY_STR]: 0.1,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.3,
        [StatKey.ETH_CON]: 0.2,
    })),
    [SkillKey.AGRICULTURE]: new Skill(SkillKey.AGRICULTURE, new StatList({
        [StatKey.PHY_CON]: 0.6,
        [StatKey.ETH_CON]: 0.2,
        [StatKey.PSI_CON]: 0.2,
    })),
    [SkillKey.KNOWLEDGE_LIFE_STEPPE]: new Skill(SkillKey.KNOWLEDGE_LIFE_STEPPE, new StatList({
        [StatKey.ETH_DEX]: 0.1,
        [StatKey.ETH_CON]: 0.2,
        [StatKey.PSI_STR]: 0.5,
        [StatKey.PSI_DEX]: 0.1,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.KNOWLEDGE_LIFE_TUNDRA]: new Skill(SkillKey.KNOWLEDGE_LIFE_TUNDRA, new StatList({
        [StatKey.ETH_DEX]: 0.1,
        [StatKey.ETH_CON]: 0.2,
        [StatKey.PSI_STR]: 0.5,
        [StatKey.PSI_DEX]: 0.1,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.ART_MUSIC]: new Skill(SkillKey.ART_MUSIC, new StatList({
        [StatKey.ETH_STR]: 0.4,
        [StatKey.ETH_DEX]: 0.3,
        [StatKey.ETH_CON]: 0.3,
    })),
    [SkillKey.ART_VISUAL_CARVING]: new Skill(SkillKey.ART_VISUAL_CARVING, new StatList({
        [StatKey.PHY_DEX]: 0.1,
        [StatKey.ETH_STR]: 0.5,
        [StatKey.ETH_DEX]: 0.3,
        [StatKey.ETH_CON]: 0.1,
    })),
    [SkillKey.ORATORY]: new Skill(SkillKey.ORATORY, new StatList({
        [StatKey.ETH_STR]: 0.5,
        [StatKey.ETH_DEX]: 0.3,
        [StatKey.ETH_CON]: 0.2,
    })),
    [SkillKey.KNOWLEDGE_LEGENDS]: new Skill(SkillKey.KNOWLEDGE_LEGENDS, new StatList({
        [StatKey.PSI_STR]: 0.8,
        [StatKey.PSI_CON]: 0.2,
    })),
    [SkillKey.APPRAISAL]: new Skill(SkillKey.APPRAISAL, new StatList({
        [StatKey.PSI_STR]: 0.6,
        [StatKey.PSI_DEX]: 0.3,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.LEADERSHIP]: new Skill(SkillKey.LEADERSHIP, new StatList({
        [StatKey.ETH_STR]: 0.5,
        [StatKey.ETH_DEX]: 0.2,
        [StatKey.ETH_CON]: 0.1,
        [StatKey.PSI_STR]: 0.1,
        [StatKey.PSI_DEX]: 0.1,
    })),
    [SkillKey.COMBAT_WHIP]: new Skill(SkillKey.LEADERSHIP, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.COMBAT_SPEAR]: new Skill(SkillKey.COMBAT_SPEAR, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.4,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.PSI_CON]: 0.1,
    })),
    [SkillKey.KNOWLEDGE_LAW]: new Skill(SkillKey.KNOWLEDGE_LAW, new StatList({
        [StatKey.PSI_STR]: 0.8,
        [StatKey.PSI_CON]: 0.2,
    })),
    [SkillKey.HERDING_TUNDRA]: new Skill(SkillKey.HERDING_TUNDRA, new StatList({
        [StatKey.PHY_DEX]: 0.1,
        [StatKey.PHY_CON]: 0.4,
        [StatKey.ETH_DEX]: 0.2,
        [StatKey.ETH_CON]: 0.3,
    })),
    [SkillKey.FISHING]: new Skill(SkillKey.FISHING, new StatList({
        [StatKey.PHY_DEX]: 0.1,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.ETH_DEX]: 0.2,
        [StatKey.ETH_CON]: 0.3,
        [StatKey.PSI_CON]: 0.2,
    })),
    [SkillKey.HUNTING]: new Skill(SkillKey.HUNTING, new StatList({
        [StatKey.PHY_DEX]: 0.2,
        [StatKey.PHY_CON]: 0.2,
        [StatKey.ETH_DEX]: 0.2,
        [StatKey.ETH_CON]: 0.3,
        [StatKey.PSI_DEX]: 0.1,
    })),
    [SkillKey.CRAFTING_BLACKSMITHING]: new Skill(SkillKey.CRAFTING_BLACKSMITHING, new StatList({
        [StatKey.PHY_STR]: 0.5,
        [StatKey.PHY_DEX]: 0.1,
        [StatKey.PHY_CON]: 0.4,
    })),
    [SkillKey.CRAFTING_BONE_CARVING]: new Skill(SkillKey.CRAFTING_BONE_CARVING, new StatList({
        [StatKey.PHY_STR]: 0.3,
        [StatKey.PHY_DEX]: 0.3,
        [StatKey.PHY_CON]: 0.4,
    })),
    [SkillKey.SERVICE_TRADE]: new Skill(SkillKey.SERVICE_TRADE, new StatList({
        [StatKey.ETH_STR]: 0.3,
        [StatKey.ETH_DEX]: 0.2,
        [StatKey.PSI_DEX]: 0.5,
    })),
};

class LifeYear {
    constructor(skillList, workSkills, homeRegionKey) {
        this._skillList = skillList;
        this._workSkills = workSkills;
        this._homeRegionKey = homeRegionKey;
    }

    _realSkills(lifeYearIndex) {
        const skillDecreaseModifier = skillDecreaseModifierMagicFn(lifeYearIndex);
        return this._skillList.multiply(skillDecreaseModifier);
    }

    skills(lifeYearIndex) {
        const skillModifiers = HomeRegionTable[this._homeRegionKey].skillModifiers;
        return this._realSkills(lifeYearIndex).multiplyList(skillModifiers);
    }

    isWorkSkill(skillKey) {
        return this._workSkills.contains(skillKey);
    }

    stats(lifeYearIndex) {
        let resultStats = new StatList({}, 0, true);
        const skills = this._realSkills(lifeYearIndex);
        for (const skillKey of skills.keys()) {
            const skillStats = SkillTable[skillKey].statList;
            const skillValue = skills.getItem(skillKey);
            resultStats = skillStats.multiply(skillValue).addList(resultStats);
        }
        return resultStats;
    }

    statDecreases(yearIndex) {
        const statDecreaseBase = statDecreaseMagicFn(yearIndex) * -1;
        let resultStatDecreases = new StatList({}, statDecreaseBase, true);
        const reallyUsedStats = this.stats().filterIfLessThen(REALLY_USED_STAT_MIN_VALUE);
        const reallyUsedStatDecreases = reallyUsedStats.replace(statDecreaseBase * USED_STAT_DECREASE_MODIFIER);
        resultStatDecreases = resultStatDecreases.mergeList(reallyUsedStatDecreases);
        return resultStatDecreases;
    }
}

class SkillList extends List{
    constructor(skills, defaultValue = 0) {
        super(skills, defaultValue);   }

    _createList(items, defaultValue) {
        return new SkillList(items, defaultValue);
    }
}

class SkillModifierList extends SkillList {
    constructor(skills) {
        super(skills, SkillModifier.NORMAL);
    }

    _createList(items, defaultValue) {
        return new SkillModifierList(items, defaultValue);
    }
}

const ChildhoodVector = {
    PHY: "PHY",
    ETH: "ETH",
    PSI: "PSI",
};

class HomeRegion {
    constructor(key, skillModifierList, baseChildhoodSkillList, phyChildhoodSkillList, ethChildhoodSkillList, psiChildhoodSkillList) {
        this.key = key;
        this.skillModifiers = skillModifierList;
        this._baseChildhoodSkillList = baseChildhoodSkillList;
        this._phyChildhoodSkillList = phyChildhoodSkillList;
        this._ethChildhoodSkillList = ethChildhoodSkillList;
        this._psiChildhoodSkillList = psiChildhoodSkillList;
    }

    getChildhoodSkills(childhoodVector) {
        switch (childhoodVector) {
            case ChildhoodVector.PHY:
                return this._baseChildhoodSkillList.addList(this._phyChildhoodSkillList);
            case ChildhoodVector.ETH:
                return this._baseChildhoodSkillList.addList(this._ethChildhoodSkillList);
            case ChildhoodVector.PSI:
                return this._baseChildhoodSkillList.addList(this._psiChildhoodSkillList);
        }
    }
}

const HomeRegionKey = {
    WILD_STEPPE: "WILD_STEPPE",
    STEPPE_TOWNS: "STEPPE_TOWNS",
    RIVER_DELTA: "RIVER_DELTA",
    TUNDRA_COAST: "TUNDRA_COAST",
};

const HomeRegionTable = {
    [HomeRegionKey.WILD_STEPPE]: new HomeRegion(
        HomeRegionKey.WILD_STEPPE,
        new SkillModifierList({
            [SkillKey.RIDING]: SkillModifier.BONUS_2,
            [SkillKey.LEATHERWORKING]: SkillModifier.BONUS_1,
        }),
        new SkillList({
            [SkillKey.KNOWLEDGE_LIFE_STEPPE]: SkillValue.NORMAL,
            [SkillKey.RIDING]: SkillValue.NORMAL,
        }),
        new SkillList({
            [SkillKey.COMBAT_WHIP]: SkillValue.NORMAL,
            [SkillKey.COMBAT_BOW]: SkillValue.NORMAL,
            [SkillKey.RIDING]: SkillValue.SMALL,
        }),
        new SkillList({
            [SkillKey.ART_MUSIC]: SkillValue.NORMAL,
            [SkillKey.ORATORY]: SkillValue.NORMAL,
            [SkillKey.KNOWLEDGE_LIFE_STEPPE]: SkillValue.SMALL,
        }),
        new SkillList({
            [SkillKey.KNOWLEDGE_LEGENDS]: SkillValue.NORMAL,
            [SkillKey.APPRAISAL]: SkillValue.NORMAL,
            [SkillKey.KNOWLEDGE_LIFE_STEPPE]: SkillValue.SMALL,
        })

    ),
    [HomeRegionKey.STEPPE_TOWNS]: new HomeRegion(
        HomeRegionKey.STEPPE_TOWNS,
        new SkillModifierList({
        }),
        new SkillList({
        }),
        new SkillList({
        }),
        new SkillList({
        }),
        new SkillList({
        })
    ),
    [HomeRegionKey.RIVER_DELTA]: new HomeRegion(
        HomeRegionKey.RIVER_DELTA,
        new SkillModifierList({
        }),
        new SkillList({
        }),
        new SkillList({
        }),
        new SkillList({
        }),
        new SkillList({
        })
    ),
    [HomeRegionKey.TUNDRA_COAST]: new HomeRegion(
        HomeRegionKey.TUNDRA_COAST,
        new SkillModifierList({
            [SkillKey.FISHING]: SkillModifier.BONUS_1,
            [SkillKey.HUNTING]: SkillModifier.BONUS_1,
        }),
        new SkillList({
            [SkillKey.KNOWLEDGE_LIFE_TUNDRA]: SkillValue.NORMAL,
            [SkillKey.HERDING_TUNDRA]: SkillValue.NORMAL,
        }),
        new SkillList({
            [SkillKey.COMBAT_BOW]: SkillValue.NORMAL,
            [SkillKey.COMBAT_SPEAR]: SkillValue.NORMAL,
            [SkillKey.HUNTING]: SkillValue.NORMAL,
        }),
        new SkillList({
            [SkillKey.ART_MUSIC]: SkillValue.NORMAL,
            [SkillKey.FISHING]: SkillValue.NORMAL,
            [SkillKey.KNOWLEDGE_LIFE_TUNDRA]: SkillValue.SMALL,
        }),
        new SkillList({
            [SkillKey.KNOWLEDGE_LEGENDS]: SkillValue.NORMAL,
            [SkillKey.APPRAISAL]: SkillValue.NORMAL,
            [SkillKey.KNOWLEDGE_LIFE_TUNDRA]: SkillValue.SMALL,
        })
    ),
};

class ParentalLineage {
    constructor(key, skills) {
        this.key = key;
        this.skills = skills;
    }
}

const ParentalLineageKey = {
    STEPPE_NOBLE: "STEPPE_NOBLE",
    ARTISAN_BONECARVER: "ARTISAN_BONECARVER",
};

const ParentalLineageTable = {
    [ParentalLineageKey.STEPPE_NOBLE]: new ParentalLineage(ParentalLineageKey.STEPPE_NOBLE, new SkillList({
        [SkillKey.COMBAT_SABER]: SkillValue.NORMAL,
        [SkillKey.COMBAT_BOW]: SkillValue.NORMAL,
        [SkillKey.COMBAT_SPEAR]: SkillValue.NORMAL,
        [SkillKey.COMBAT_WHIP]: SkillValue.NORMAL,
        [SkillKey.RIDING]: SkillValue.NORMAL,
        [SkillKey.LEADERSHIP]: SkillValue.NORMAL,
        [SkillKey.KNOWLEDGE_LAW]: SkillValue.NORMAL,
        [SkillKey.KNOWLEDGE_LEGENDS]: SkillValue.SMALL,
    })),
    [ParentalLineageKey.ARTISAN_BONECARVER]: new ParentalLineage(ParentalLineageKey.ARTISAN_BONECARVER, new SkillList({
        [SkillKey.COMBAT_SPEAR]: SkillValue.SMALL,
        [SkillKey.COMBAT_BOW]: SkillValue.NORMAL,
        [SkillKey.APPRAISAL]: SkillValue.NORMAL,
        [SkillKey.CRAFTING_BONE_CARVING]: SkillValue.NORMAL,
    })),
};

class Character {
    constructor() {
        this._stats = null;
        this._skills = null;
        this._skillModifiers = null;
        this._wealth = 0;
        this._weight = 0;

        this._parentalHomeRegionKey = null;
        this._parentalLineageKey = null;
        this._childhoodVector = null;
        this._choosenSkillKey = null;

        this._lifeYears = [];
    }

    setChildhood(parentalHomeRegionKey, parentalLineageKey, childhoodVector, choosenSkillKey) {
        this._parentalHomeRegionKey = parentalHomeRegionKey;
        this._parentalLineageKey = parentalLineageKey;
        this._childhoodVector = childhoodVector;
        this._choosenSkillKey = choosenSkillKey;
    }

    addLifeYear(lifeYear) {
        this._lifeYears.push(lifeYear);
    }

    invalidate() {
        this._skills = new SkillList({}, 0);
        this._stats = new StatList({}, 10, true);
        this._wealth = 0;
        this._weight = 0;

        this._invalidateChildhood();
        this._invalidateLife();
        this._invalidateSkillModifiers();

    }

    _invalidateChildhood() {
        const skillModifiers = HomeRegionTable[this._parentalHomeRegionKey].skillModifiers;
        const homeRegionSkills = HomeRegionTable[this._parentalHomeRegionKey].getChildhoodSkills(this._childhoodVector);
        const parentalSkills = ParentalLineageTable[this._parentalLineageKey].skills;
        const choosenSkills = new SkillList({[this._choosenSkillKey]: 1});

        const childhoodSkills = homeRegionSkills.addList(parentalSkills).addList(choosenSkills).multiplyList(skillModifiers);
        this._skills = this._skills.addList(childhoodSkills);

        let resultStats = new StatList({}, 0, true);
        for (const skillKey of childhoodSkills.keys()) {
            const skillStats = SkillTable[skillKey].statList;
            const skillValue = childhoodSkills.getItem(skillKey);
            resultStats = skillStats.multiply(skillValue).multiply(CHILDHOOD_STAT_MODIFIER).addList(resultStats);
        }
        this._stats = this._stats.addList(resultStats);
    }

    _invalidateLife() {
        this._invalidateLifeSkills();
        this._invalidateLifeStats();
    }

    _invalidateLifeSkills() {
        let resultYearSkills = new SkillList({}, 0);
        this._lifeYears.forEach((lifeYear, lifeYearIndex) => {
            resultYearSkills = resultYearSkills.addList(lifeYear.skills(lifeYearIndex));
        });
        this._skills = this._skills.addList(resultYearSkills);
    }

    _invalidateLifeStats() {
        let resultYearStats = new StatList({}, 0, true);
        let resultYearStatDecreases = new StatList({}, 0);
        this._lifeYears.forEach((lifeYear, lifeYearIndex) => {
            resultYearStats = resultYearStats.addList(lifeYear.stats(lifeYearIndex));
            resultYearStatDecreases = resultYearStatDecreases.addList(lifeYear.statDecreases(lifeYearIndex), true);
        });
        resultYearStats = resultYearStats.modify((value) => skillToStatMagicFn(value));
        resultYearStats = resultYearStats.addList(resultYearStatDecreases);
        this._stats = this._stats.addList(resultYearStats);
        this._skills = this._skills.multiply(WORLD_SEED_POW_1)
    }

    _invalidateSkillModifiers() {
        this._skillModifiers = this._skills.modify((value, skillKey) => {
            const skillStats = SkillTable[skillKey].statList.modify((skillStatValue, statKey) => {
                const statValue = this._stats.getItem(statKey);
                return (statValue - NORMAL_STAT_MIN_VALUE) * skillStatValue;
            });
            const skillSumm =  skillStats.reduce((currentValue, nextValue) => currentValue + nextValue);
            const isBonus = (skillSumm > 0);
            return isBonus
                ? statToSkillModifierBonusMagicFn(Math.abs(skillSumm))
                : statToSkillModifierPenaltyMagicFn(Math.abs(skillSumm));
        });
    }
}

function printList(list) {
    const infoArray = [];
    for (const key of list.keys()) {
        infoArray.push({key: key, value: list.getItem(key)})
    }
    console.table(infoArray, ["key", "value"]);
}

function printChar(character) {
    printList(character._stats.modify((v) => (Math.round(v * 2) / 2)));
    printList(character._skills.addList(character._skillModifiers).modify((v) => Math.round(v)));
}

// const char = new Character();
// char.setChildhood(
//     HomeRegionKey.WILD_STEPPE,
//     ParentalLineageKey.STEPPE_NOBLE,
//     ChildhoodVector.PHY,
//     SkillKey.RIDING,
// );

// char.invalidate();

// let year;
//
// for (let i = 0; i < 4; ++i) {
//     year = new LifeYear(
//         new SkillList({
//             [SkillKey.LEADERSHIP]: 0.4,
//             [SkillKey.RIDING]: 0.2,
//             [SkillKey.KNOWLEDGE_LAW]: 0.2,
//             [SkillKey.COMBAT_SABER]: 0.1,
//             [SkillKey.COMBAT_BOW]: 0.1,
//         }),
//         [],
//         HomeRegionKey.WILD_STEPPE,
//     );
//     char.addLifeYear(year);
// }
//
// for (let i = 0; i < 2; ++i) {
//     year = new LifeYear(
//         new SkillList({
//             [SkillKey.LEADERSHIP]: 0.1,
//             [SkillKey.RIDING]: 0.3,
//             [SkillKey.COMBAT_SABER]: 0.2,
//             [SkillKey.COMBAT_BOW]: 0.1,
//             [SkillKey.KNOWLEDGE_LIFE_STEPPE]: 0.3,
//         }),
//         [],
//         HomeRegionKey.WILD_STEPPE,
//     );
//     char.addLifeYear(year);
// }
//
// for (let i = 0; i < 6; ++i) {
//     year = new LifeYear(
//         new SkillList({
//             [SkillKey.LEADERSHIP]: 0.4,
//             [SkillKey.RIDING]: 0.2,
//             [SkillKey.COMBAT_SABER]: 0.3,
//             [SkillKey.COMBAT_BOW]: 0.1,
//         }),
//         [],
//         HomeRegionKey.WILD_STEPPE,
//     );
//     char.addLifeYear(year);
// }
//
// for (let i = 0; i < 0; ++i) {
//     year = new LifeYear(
//         new SkillList({
//             [SkillKey.ART_MUSIC]: 0.5,
//             [SkillKey.RIDING]: 0.2,
//             [SkillKey.LEADERSHIP]: 0.1,
//             [SkillKey.COMBAT_SABER]: 0.2,
//         }),
//         [],
//         HomeRegionKey.WILD_STEPPE,
//     );
//     char.addLifeYear(year);
// }
//
// char.invalidate();



const char = new Character();
char.setChildhood(
    HomeRegionKey.TUNDRA_COAST,
    ParentalLineageKey.ARTISAN_BONECARVER,
    ChildhoodVector.PSI,
    SkillKey.ART_VISUAL_CARVING,
);

let year;

for (let i = 0; i < 24; ++i) {
    year = new LifeYear(
        new SkillList({
            [SkillKey.SERVICE_TRADE]: 0.5,
            [SkillKey.CRAFTING_BONE_CARVING]: 0.2,
            [SkillKey.COMBAT_BOW]: 0.2,
            [SkillKey.APPRAISAL]: 0.1,
        }),
        [],
        HomeRegionKey.TUNDRA_COAST,
    );
    char.addLifeYear(year);
}

char.invalidate();


printChar(char);

