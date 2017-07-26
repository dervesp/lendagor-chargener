import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {NumberInfo} from "./list/NumberList";
import {assert} from "./utils/Assert";

export enum SkillTagCategoryKey {
    WEAPON_MELEE_TYPE,
    WEAPON_MELEE_HAND_COUNT,
    WEAPON_MELEE_LENGTH,
    WEAPON_MELEE_WEIGHT,
    WEAPON_MELEE_BALANCE,
    WEAPON_MELEE_ATTACK_SPEED,
    WEAPON_MELEE_DAMAGE_AREA,
    WEAPON_MELEE_DAMAGE_TYPE,
    WEAPON_MELEE_GUARD_TYPE,
    WEAPON_MELEE_BLADE_FORM,
    WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT,
    WEAPON_MELEE_BLADE_GRIP_TYPE,
    WEAPON_MELEE_PYLON_TYPE,
    WEAPON_MELEE_DAMAGE_MODIFIER,
    WEAPON_MELEE_ATTACK_TYPE_COUNT,
    COMMUNICATION,
}

export const SkillTagCategoryKeys = () =>{
    return [].concat(
        WeaponSkillTagCategoryKeys(),
        [
            SkillTagCategoryKey.COMMUNICATION,
        ]
    );
};

export const WeaponSkillTagCategoryKeys = () => [
    SkillTagCategoryKey.WEAPON_MELEE_TYPE,
    SkillTagCategoryKey.WEAPON_MELEE_HAND_COUNT,
    SkillTagCategoryKey.WEAPON_MELEE_LENGTH,
    SkillTagCategoryKey.WEAPON_MELEE_WEIGHT,
    SkillTagCategoryKey.WEAPON_MELEE_BALANCE,
    SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED,
    SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_AREA,
    SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE,
    SkillTagCategoryKey.WEAPON_MELEE_GUARD_TYPE,
    SkillTagCategoryKey.WEAPON_MELEE_BLADE_FORM,
    SkillTagCategoryKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT,
    SkillTagCategoryKey.WEAPON_MELEE_BLADE_GRIP_TYPE,
    SkillTagCategoryKey.WEAPON_MELEE_PYLON_TYPE,
    SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_MODIFIER,
    SkillTagCategoryKey.WEAPON_MELEE_ATTACK_TYPE_COUNT,
];

export type SkillTagCategoryInfo = NumberInfo<SkillTagCategoryKey>;
export class SkillTagCategoryList extends DefaultValueNumberList<SkillTagCategoryKey> {
    constructor(SkillTagCategoryInfos: SkillTagCategoryInfo[], defaultValue: number) {
        super(SkillTagCategoryKeys(), SkillTagCategoryInfos, defaultValue);
    }
}

const SKILL_TAG_CATEGORY_MAX_VALUE = 1;
const SKILL_TAG_CATEGORY_MIN_VALUE = 0;
export class SkillTagCategory {
    private _key: SkillTagCategoryKey;
    private _value: number;

    constructor(key: SkillTagCategoryKey, value: number) {
        assert(value <= SKILL_TAG_CATEGORY_MAX_VALUE, `invalid SkillTagCategory[${SkillTagCategoryKey[key]}] value`);
        assert(value >= SKILL_TAG_CATEGORY_MIN_VALUE, `invalid SkillTagCategory[${SkillTagCategoryKey[key]}] value`);
        this._key = key;
        this._value = value;
    }

    key(): SkillTagCategoryKey {
        return this._key;
    }

    value(): number {
        return this._value;
    }
}

export class SkillTagCategories {
    private static _map: Map<SkillTagCategoryKey, SkillTagCategory> = new Map<SkillTagCategoryKey, SkillTagCategory>();

    static get(key: SkillTagCategoryKey): SkillTagCategory {
        assert(this._map.has(key), `undefined SkillTagCategory[${SkillTagCategoryKey[key]}] in SkillTagCategoryMap`);
        return this._map.get(key);
    }

    static init() {
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_TYPE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_HAND_COUNT);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_WEIGHT);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_BALANCE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_AREA);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_GUARD_TYPE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_BLADE_FORM);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_BLADE_GRIP_TYPE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_PYLON_TYPE);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_MODIFIER);
        this._addSkillTagCategory(SkillTagCategoryKey.WEAPON_MELEE_ATTACK_TYPE_COUNT);
        this._addSkillTagCategory(SkillTagCategoryKey.COMMUNICATION);
    }

    private static _addSkillTagCategory(key: SkillTagCategoryKey, value: number = SKILL_TAG_CATEGORY_MAX_VALUE) {
        assert(!this._map.has(key), `duplicate SkillTagCategory[${SkillTagCategory[key]}] in SkillTagCategoryMap`);
        this._map.set(key, new SkillTagCategory(key, value));
    }
}

SkillTagCategories.init();