import {Character} from "./Character";
import {HomeRegionKey} from "./HomeRegion";
import {ParentalLineageKey} from "./ParentalLineage";
import {VectorKey} from "./ChildhoodVector";
import {SkillKey, SkillKeys, SkillList} from "./Skill";
import {LifeYear} from "./LifeYear";
import {NumberList} from "./list/NumberList";
import {StatKey, StatKeys} from "./Stat";

function printNumberList<K>(list: NumberList<K>, keyInfos: [K, string][], groupName: string) {
    console.group(groupName);
    for (const keyInfo of keyInfos) {
        console.log(`${keyInfo[1]}: ${list.getItem(keyInfo[0])}`);
    }
    console.groupEnd();
}

function printCharacter(character: Character, name: string) {
    console.group(name);
    printNumberList(character.skills(), SkillKeys().map((key) => [key, SkillKey[key]] as [SkillKey, string]), "Skills");
    printNumberList(character.stats(), StatKeys().map((key) => [key, StatKey[key]] as [StatKey, string]), "Stats");
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
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills));
    }

    for (let i = 0; i < 2; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.1],
            [SkillKey.RIDING, 0.3],
            [SkillKey.COMBAT_SABER, 0.2],
            [SkillKey.COMBAT_BOW, 0.1],
            [SkillKey.KNOWLEDGE_LIFE_STEPPE, 0.3],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills));
    }

    for (let i = 0; i < 10 + additionalYears; ++i) {
        const skills = new SkillList([
            [SkillKey.LEADERSHIP, 0.4],
            [SkillKey.RIDING, 0.2],
            [SkillKey.COMBAT_SABER, 0.3],
            [SkillKey.COMBAT_BOW, 0.1],
        ], 0);
        character.addLifeYear(new LifeYear(HomeRegionKey.WILD_STEPPE, skills));
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
        character.addLifeYear(new LifeYear(HomeRegionKey.TUNDRA_COAST, skills));
    }

    character.invalidate();
    return character;
}

printCharacter(createSteppeNoble(), "Steppe noble, 28");
//printCharacter(createSteppeNoble(30), "Steppe noble, 58");
//printCharacter(createTundraBoneCarver(), "Tundra bonecarver, 28");