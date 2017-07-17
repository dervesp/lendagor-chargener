import {NumberInfo} from "./list/NumberList";
import {StatInfo, StatList} from "./Stat";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";

export enum SkillKey {
    RIDING,
    SWIMMING,
}

export const SkillKeys = () => Object.keys(SkillKey).map((keyIndex) => SkillKey[keyIndex] as SkillKey);

export type SkillInfo = NumberInfo<SkillKey>;
export class SkillList extends DefaultValueNumberList<SkillKey> {
    constructor(skillInfos: SkillInfo[], defaultValue: number) {
        super(SkillKeys(), skillInfos, defaultValue);
    }
}

export class Skill {
    private _key: SkillKey;
    private _stats: StatList;

    constructor(key: SkillKey, stats: StatList) {
        this._key = key;
        this._stats = stats;
    }

    key(): SkillKey {
        return this._key;
    }

    stats(): StatList {
        return this._stats;
    }
}

export class Skills {
    private static _map: Map<SkillKey, Skill> = new Map<SkillKey, Skill>();

    static init() {
    }

    private static _addSkill(key: SkillKey, statInfos: StatInfo[]) {
        if (this._map.has(key)) {
            throw new Error(`duplicate skill in skillStorage: [${key}]`);
        }
        this._map.set(key, new Skill(key, new StatList(statInfos, 0)));
    }
}