import {Character} from "./Character";
import {HomeRegionKey} from "./HomeRegion";
import {ParentalLineageKey} from "./ParentalLineage";
import {VectorKey} from "./ChildhoodVector";
import {SkillKey, SkillKeys, SkillList} from "./Skill";
import {LifeYear} from "./LifeYear";
import {StatKey, StatKeys} from "./Stat";
import {StateKey, StateList} from "./State";
import {Render} from "./Render";

function printNumberList<K>( keyInfos: [K, string, (key: K) => string, boolean][], groupName: string) {
    console.group(groupName);
    for (const keyInfo of keyInfos) {
        console.log(`%c${keyInfo[1]}: ${keyInfo[2](keyInfo[0])}`, keyInfo[3] ? `color: #868686` : ``);
    }
    console.groupEnd();
}


function printCharacterParams(character: Character) {
    console.group("Params");
    console.log(`HP: ${character.paramHp()}`);
    console.log(`HEALTH: ${character.paramHealth()}`);
    console.log(`WILLPOWER: ${character.paramWillPower()}`);
    console.groupEnd();
}

function printCharacter(character: Character, name: string) {
    console.group(name);
    printCharacterParams(character);
    printNumberList(SkillKeys().map((key) => {
        return [
            key,
            SkillKey[key],
            (currKey: SkillKey) => {
                const baseSkill = Math.round((<any>character)._skills.getItem(currKey) * 10) / 10;
                const skillModifier = Math.round((<any>character)._skillModifiers.getItem(currKey) * 10) / 10;
                const adjacentSkillModifier = Math.round((<any>character)._adjacentSkillModifiers.getItem(currKey) * 10) / 10;
                const resultSkillValue = character.skills().getItem(currKey);
                return `${resultSkillValue} (${baseSkill} + ${skillModifier} + ${adjacentSkillModifier})`;
            },
            ((<any>character)._skills.getItem(key) == 0)
        ] as [SkillKey, string, (key: SkillKey) => string, boolean]
    }), "Skills");
    printNumberList(StatKeys().map((key) => {
        return [
            key,
            StatKey[key],
            (currKey: StatKey) => ("" + character.stats().getItem(currKey)),
            false
        ] as [StatKey, string, (key: StatKey) => string, boolean]
    }), "Stats");
    console.groupEnd();
}

function createSteppeNoble(additionalYears: number = 0): Character {
    const character = new Character();
    character.setChildhood(HomeRegionKey.WILD_STEPPE, ParentalLineageKey.STEPPE_NOBLE, VectorKey.PHY, SkillKey.RIDING);


    for (let i = 0; i < 4; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.4],
            [SkillKey.RIDING, 0.2],
            [SkillKey.KNOWLEDGE_LAW, 0.2],
            [SkillKey.COMBAT_SABER, 0.1],
            [SkillKey.COMBAT_BOW, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.FAVORITE_LABORS, 1],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills, states));
    }

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.1],
            [SkillKey.RIDING, 0.3],
            [SkillKey.COMBAT_SABER, 0.2],
            [SkillKey.COMBAT_BOW, 0.1],
            [SkillKey.KNOWLEDGE_LIFE_STEPPE, 0.3],
        ], 0);
        const states = new StateList([
            [StateKey.FAVORITE_LABORS, 0.3],
            [StateKey.SERVICE_TO_IDEALS, 0.7],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills, states));
    }

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.4],
            [SkillKey.RIDING, 0.2],
            [SkillKey.COMBAT_SABER, 0.3],
            [SkillKey.COMBAT_BOW, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.WAR, 0.7],
            [StateKey.ROUTINE, 0.3],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills, states));
    }

    for (let i = 0; i < additionalYears; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.1],
            [SkillKey.RIDING, 0.3],
            [SkillKey.COMBAT_SABER, 0.2],
            [SkillKey.COMBAT_BOW, 0.1],
            [SkillKey.KNOWLEDGE_LIFE_STEPPE, 0.3],
        ], 0);
        const states = new StateList([
            [StateKey.FAVORITE_LABORS, 0.3],
            [StateKey.SERVICE_TO_IDEALS, 0.6],
            [StateKey.WAR, 0.1],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills, states));
    }

    character.invalidate();
    return character;
}

function createTundraBoneCarver(): Character {
    const character = new Character();
    character.setChildhood(HomeRegionKey.TUNDRA_COAST, ParentalLineageKey.ARTISAN_BONECARVER, VectorKey.PSI, SkillKey.ART_VISUAL_CARVING);


    for (let i = 0; i < 16; ++i) {
        const skills = new SkillList([
            [SkillKey.SERVICE_TRADE, 0.5],
            [SkillKey.CRAFTING_BONE_CARVING, 0.2],
            [SkillKey.COMBAT_BOW, 0.2],
            [SkillKey.KNOWLEDGE_APPRAISAL, 0.1],
        ], 0);
        const states = new StateList([
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.TUNDRA_COAST, skills, states));
    }

    character.invalidate();
    return character;
}

function createClassicNoblePoet(): Character {
    const character = new Character();
    character.setChildhood(HomeRegionKey.WARM_SEASIDE_VALLEYS, ParentalLineageKey.CLASSIS_NOBLE, VectorKey.ETH, SkillKey.ART_POETRY);

    for (let i = 0; i < 6; ++i) {
        const skills = new SkillList([
            [SkillKey.RIDING, 0.1],
            [SkillKey.COMBAT_RAPIER, 0.3],
            [SkillKey.KNOWLEDGE_ETIQUETTE, 0.1],
            [SkillKey.KNOWLEDGE_APPRAISAL, 0.1],
            [SkillKey.ART_POETRY, 0.2],
            [SkillKey.ORATORY, 0.1],
            [SkillKey.GESTICULATION, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.FAVORITE_LABORS, 0.5],
            [StateKey.INTERESTING_INTERLOCUTORS, 0.3],
            [StateKey.INSPIRATION, 0.2],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WARM_SEASIDE_VALLEYS, skills, states));
    }

    for (let i = 0; i < 4; ++i) {
        const skills = new SkillList([
            [SkillKey.SERVICE_SOMMELIER, 0.4],
            [SkillKey.COMBAT_RAPIER, 0.1],
            [SkillKey.KNOWLEDGE_ETIQUETTE, 0.2],
            [SkillKey.KNOWLEDGE_APPRAISAL, 0.1],
            [SkillKey.ART_POETRY, 0.2],
        ], 0);
        const states = new StateList([
            [StateKey.FAVORITE_LABORS, 0.5],
            [StateKey.INTERESTING_INTERLOCUTORS, 0.1],
            [StateKey.UNREQUITED_LOVE, 0.4],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WARM_SEASIDE_VALLEYS, skills, states));
    }

    character.invalidate();
    return character;
}

function createWinegrapePeasant(): Character {
    const character = new Character();
    character.setChildhood(HomeRegionKey.WARM_SEASIDE_VALLEYS, ParentalLineageKey.POUR_LAKUAR_PEASANT, VectorKey.PSI, SkillKey.TRAINING_CHILDISH_SPORTS);

    for (let i = 0; i < 10; ++i) {
        const skills = new SkillList([
            [SkillKey.AGRICULTURE_AGRONOMY, 0.6],
            [SkillKey.ART_PERFORMANCE_DANCE_SPORTY, 0.2],
            [SkillKey.GESTICULATION, 0.2],
        ], 0);
        const states = new StateList([
            [StateKey.ROUTINE, 0.7],
            [StateKey.HARD_WORD, 0.3],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WARM_SEASIDE_VALLEYS, skills, states));
    }

    character.invalidate();
    return character;
}

function createDoctor(additionalYears: number = 0): Character {
    const character = new Character();
    character.setChildhood(HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY, ParentalLineageKey.ARTISAN_DOCTOR, VectorKey.PSI, SkillKey.KNOWLEDGE_GHETTO);

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.MEDICINE_DOCTORING, 0.5],
            [SkillKey.CHORES, 0.2],
            [SkillKey.SERVICE_COURIER, 0.2],
            [SkillKey.KNOWLEDGE_GHETTO, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.HARD_WORD, 0.6],
            [StateKey.ROUTINE, 0.2],
            [StateKey.SORROW, 0.2],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY, skills, states));
    }

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.MEDICINE_DOCTORING, 0.5],
            [SkillKey.CHORES, 0.1],
            [SkillKey.SERVICE_COURIER, 0.2],
            [SkillKey.KNOWLEDGE_GHETTO, 0.1],
            [SkillKey.LOCKPICKING, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.HARD_WORD, 0.6],
            [StateKey.ADRENALINE, 0.2],
            [StateKey.MOURNING, 0.2],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY, skills, states));
    }

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.MEDICINE_DOCTORING, 0.5],
            [SkillKey.ALCHEMY_PHARMACY, 0.2],
            [SkillKey.SERVICE_TRADE, 0.1],
            [SkillKey.KNOWLEDGE_GHETTO, 0.2],
        ], 0);
        const states = new StateList([
            [StateKey.HARD_WORD, 0.4],
            [StateKey.INTERESTING_INTERLOCUTORS, 0.2],
            [StateKey.ADRENALINE, 0.1],
            [StateKey.CYNICISM, 0.3],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY, skills, states));
    }

    for (let i = 0; i < 4 + additionalYears; ++i) {
        const skills = new SkillList([
            [SkillKey.MEDICINE_DOCTORING, 0.2],
            [SkillKey.ALCHEMY_PHARMACY, 0.5],
            [SkillKey.SERVICE_TRADE, 0.2],
            [SkillKey.KNOWLEDGE_GHETTO, 0.1],
        ], 0);
        const states = new StateList([
            [StateKey.INTROSPECTION, 0.3],
            [StateKey.INTERESTING_INTERLOCUTORS, 0.1],
            [StateKey.CYNICISM, 0.6],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.MIDDLE_TAIGA_LAKES_CITY, skills, states));
    }

    character.invalidate();
    return character;
}

Render.renderCharacters([
    // [createSteppeNoble(0), "Steppe noble, 22"],
    // [createSteppeNoble(6), "Steppe noble, 28"],
    // [createSteppeNoble(12), "Steppe noble, 34"],
    // [createSteppeNoble(18), "Steppe noble, 40"],
    // [createSteppeNoble(24), "Steppe noble, 46"],
    // [createSteppeNoble(30), "Steppe noble, 52"],
    // [createSteppeNoble(36), "Steppe noble, 58"],
    // [createSteppeNoble(42), "Steppe noble, 64"],
    // [createClassicNoblePoet(), "Noble poet, 22"],
    // [createWinegrapePeasant(), "Lakuar winegrape peasant, 22"],
    [createDoctor(0), "Ghetto doctor, 22"],
    [createDoctor(6), "Ghetto doctor, 28"],
    [createDoctor(12), "Ghetto doctor, 34"],
    [createDoctor(18), "Ghetto doctor, 40"],
    [createDoctor(24), "Ghetto doctor, 46"],
    [createDoctor(30), "Ghetto doctor, 52"],
]);