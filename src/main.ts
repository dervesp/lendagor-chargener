import {Character} from "./Character";
import {HomeRegionKey} from "./HomeRegion";
import {ParentalLineageKey} from "./ParentalLineage";
import {VectorKey} from "./ChildhoodVector";
import {SkillKey, SkillKeys, SkillList} from "./Skill";
import {LifeYear} from "./LifeYear";
import {StatKey, StatKeys} from "./Stat";
import {StateKey, StateList} from "./State";

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

    for (let i = 0; i < 10 + additionalYears; ++i) {
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
             [SkillKey.APPRAISAL, 0.1],
        ], 0);
        const states = new StateList([
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.TUNDRA_COAST, skills, states));
    }

    character.invalidate();
    return character;
}

printCharacter(createSteppeNoble(-10), "Steppe noble, 18");
printCharacter(createSteppeNoble(-4), "Steppe noble, 24");
printCharacter(createSteppeNoble(2), "Steppe noble, 32");
printCharacter(createSteppeNoble(8), "Steppe noble, 38");
printCharacter(createSteppeNoble(14), "Steppe noble, 44");
printCharacter(createSteppeNoble(20), "Steppe noble, 50");
printCharacter(createSteppeNoble(26), "Steppe noble, 56");
printCharacter(createSteppeNoble(32), "Steppe noble, 62");

//printCharacter(createTundraBoneCarver(), "Tundra bonecarver, 28");