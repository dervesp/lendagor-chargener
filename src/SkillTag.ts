import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {NumberInfo} from "./list/NumberList";
import {assert} from "./utils/Assert";
import {SkillTagCategoryKey} from "./SkillTagCategory";

export enum SkillTagKey {
    WEAPON_MELEE_TYPE_BLADE,
    WEAPON_MELEE_TYPE_PYLON,
    WEAPON_MELEE_TYPE_FLEX,
    WEAPON_MELEE_HAND_COUNT_1,
    WEAPON_MELEE_HAND_COUNT_2,
    WEAPON_MELEE_LENGTH_SHORT,
    WEAPON_MELEE_LENGTH_MIDDLE,
    WEAPON_MELEE_LENGTH_LONG,
    WEAPON_MELEE_LENGTH_GROWTH,
    WEAPON_MELEE_LENGTH_EXTRA_LONG,
    WEAPON_MELEE_WEIGHT_LIGHT,
    WEAPON_MELEE_WEIGHT_MIDDLE,
    WEAPON_MELEE_WEIGHT_WEIGHTED,
    WEAPON_MELEE_WEIGHT_HEAVY,
    WEAPON_MELEE_BALANCE_YES,
    WEAPON_MELEE_BALANCE_NO,
    WEAPON_MELEE_ATTACK_SPEED_VERY_SLOW,
    WEAPON_MELEE_ATTACK_SPEED_SLOW,
    WEAPON_MELEE_ATTACK_SPEED_NORMAL,
    WEAPON_MELEE_ATTACK_SPEED_FAST,
    WEAPON_MELEE_ATTACK_SPEED_VERY_FAST,
    WEAPON_MELEE_DAMAGE_AREA_SMALL,
    WEAPON_MELEE_DAMAGE_AREA_MIDDLE,
    WEAPON_MELEE_DAMAGE_AREA_LARGE,
    WEAPON_MELEE_DAMAGE_TYPE_PRICKING,
    WEAPON_MELEE_DAMAGE_TYPE_CRUSHING,
    WEAPON_MELEE_DAMAGE_TYPE_CHOPPING,
    WEAPON_MELEE_DAMAGE_TYPE_CUTTING,
    WEAPON_MELEE_GUARD_TYPE_NO,
    WEAPON_MELEE_GUARD_TYPE_SIMPLE,
    WEAPON_MELEE_GUARD_TYPE_COMPLICATED,
    WEAPON_MELEE_ATTACK_TYPE_COUNT_1,
    WEAPON_MELEE_ATTACK_TYPE_COUNT_2,
    WEAPON_MELEE_ATTACK_TYPE_COUNT_3,
    WEAPON_MELEE_DAMAGE_MODIFIER_NO,
    WEAPON_MELEE_DAMAGE_MODIFIER_WEAK,
    WEAPON_MELEE_DAMAGE_MODIFIER_STRONG,
    WEAPON_MELEE_BLADE_FORM_STRAIGHT,
    WEAPON_MELEE_BLADE_FORM_CONVEX,
    WEAPON_MELEE_BLADE_FORM_CONCAVE,
    WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_0,
    WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_1,
    WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_2,
    WEAPON_MELEE_BLADE_GRIP_TYPE_STRAIGHT,
    WEAPON_MELEE_BLADE_GRIP_TYPE_CURVED,
    WEAPON_MELEE_BLADE_GRIP_TYPE_FISTHANDLE,
    WEAPON_MELEE_PYLON_TYPE_IMPACT,
    WEAPON_MELEE_PYLON_TYPE_STAB,
    COMMUNICATION,
}

export const SkillTagKeys = () =>
    [].concat(
        WeaponSkillTagKeys(),
        [
            SkillTagKey.COMMUNICATION,
        ]
    );

export const WeaponSkillTagKeys = () => [
    SkillTagKey.WEAPON_MELEE_TYPE_BLADE,
    SkillTagKey.WEAPON_MELEE_TYPE_PYLON,
    SkillTagKey.WEAPON_MELEE_TYPE_FLEX,
    SkillTagKey.WEAPON_MELEE_HAND_COUNT_1,
    SkillTagKey.WEAPON_MELEE_HAND_COUNT_2,
    SkillTagKey.WEAPON_MELEE_LENGTH_SHORT,
    SkillTagKey.WEAPON_MELEE_LENGTH_MIDDLE,
    SkillTagKey.WEAPON_MELEE_LENGTH_LONG,
    SkillTagKey.WEAPON_MELEE_LENGTH_GROWTH,
    SkillTagKey.WEAPON_MELEE_LENGTH_EXTRA_LONG,
    SkillTagKey.WEAPON_MELEE_WEIGHT_LIGHT,
    SkillTagKey.WEAPON_MELEE_WEIGHT_MIDDLE,
    SkillTagKey.WEAPON_MELEE_WEIGHT_WEIGHTED,
    SkillTagKey.WEAPON_MELEE_WEIGHT_HEAVY,
    SkillTagKey.WEAPON_MELEE_BALANCE_YES,
    SkillTagKey.WEAPON_MELEE_BALANCE_NO,
    SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_VERY_SLOW,
    SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_SLOW,
    SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_NORMAL,
    SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_FAST,
    SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_VERY_FAST,
    SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_SMALL,
    SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_MIDDLE,
    SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_LARGE,
    SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_PRICKING,
    SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CRUSHING,
    SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CHOPPING,
    SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CUTTING,
    SkillTagKey.WEAPON_MELEE_GUARD_TYPE_NO,
    SkillTagKey.WEAPON_MELEE_GUARD_TYPE_SIMPLE,
    SkillTagKey.WEAPON_MELEE_GUARD_TYPE_COMPLICATED,
    SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_1,
    SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_2,
    SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_3,
    SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_NO,
    SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_WEAK,
    SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_STRONG,
    SkillTagKey.WEAPON_MELEE_BLADE_FORM_STRAIGHT,
    SkillTagKey.WEAPON_MELEE_BLADE_FORM_CONVEX,
    SkillTagKey.WEAPON_MELEE_BLADE_FORM_CONCAVE,
    SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_0,
    SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_1,
    SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_2,
    SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_STRAIGHT,
    SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_CURVED,
    SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_FISTHANDLE,
    SkillTagKey.WEAPON_MELEE_PYLON_TYPE_IMPACT,
    SkillTagKey.WEAPON_MELEE_PYLON_TYPE_STAB,
];

export type SkillTagInfo = NumberInfo<SkillTagKey>;
export class SkillTagList extends DefaultValueNumberList<SkillTagKey> {
    constructor(skillTagInfos: SkillTagInfo[]) {
        super(SkillTagKeys(), skillTagInfos, 0);
    }
}

export class SkillTag {
    private _key: SkillTagKey;
    private _skillTagCategoryKey: SkillTagCategoryKey;

    constructor(key: SkillTagKey, skillTagCategoryKey: SkillTagCategoryKey) {
        assert((SkillTagCategoryKey[skillTagCategoryKey].indexOf(SkillTagKey[key]) != 1), `invalid SkillTagKey[${SkillTagKey[key]}] skillTagCategoryKey`);
        this._key = key;
        this._skillTagCategoryKey = skillTagCategoryKey;
    }

    key(): SkillTagKey {
        return this._key;
    }

    skillTagCategoryKey(): number {
        return this._skillTagCategoryKey;
    }
}

export class SkillTags {
    private static _map: Map<SkillTagKey, SkillTag> = new Map<SkillTagKey, SkillTag>();

    static get(key: SkillTagKey): SkillTag {
        assert(this._map.has(key), `undefined SkillTag[${SkillTagKey[key]}] in SkillTagMap`);
        return this._map.get(key);
    }

    static init() {
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_TYPE_BLADE, SkillTagCategoryKey.WEAPON_MELEE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_TYPE_PYLON, SkillTagCategoryKey.WEAPON_MELEE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_TYPE_FLEX, SkillTagCategoryKey.WEAPON_MELEE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_HAND_COUNT_1, SkillTagCategoryKey.WEAPON_MELEE_HAND_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_HAND_COUNT_2, SkillTagCategoryKey.WEAPON_MELEE_HAND_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_LENGTH_SHORT, SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_LENGTH_MIDDLE, SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_LENGTH_LONG, SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_LENGTH_GROWTH, SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_LENGTH_EXTRA_LONG, SkillTagCategoryKey.WEAPON_MELEE_LENGTH);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_WEIGHT_LIGHT, SkillTagCategoryKey.WEAPON_MELEE_WEIGHT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_WEIGHT_MIDDLE, SkillTagCategoryKey.WEAPON_MELEE_WEIGHT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_WEIGHT_WEIGHTED, SkillTagCategoryKey.WEAPON_MELEE_WEIGHT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_WEIGHT_HEAVY, SkillTagCategoryKey.WEAPON_MELEE_WEIGHT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BALANCE_YES, SkillTagCategoryKey.WEAPON_MELEE_BALANCE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BALANCE_NO, SkillTagCategoryKey.WEAPON_MELEE_BALANCE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_VERY_SLOW, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_SLOW, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_NORMAL, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_FAST, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_SPEED_VERY_FAST, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_SPEED);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_SMALL, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_AREA);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_MIDDLE, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_AREA);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_AREA_LARGE, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_AREA);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_PRICKING, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CRUSHING, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CHOPPING, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_TYPE_CUTTING, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_GUARD_TYPE_NO, SkillTagCategoryKey.WEAPON_MELEE_GUARD_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_GUARD_TYPE_SIMPLE, SkillTagCategoryKey.WEAPON_MELEE_GUARD_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_GUARD_TYPE_COMPLICATED, SkillTagCategoryKey.WEAPON_MELEE_GUARD_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_1, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_TYPE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_2, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_TYPE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_ATTACK_TYPE_COUNT_3, SkillTagCategoryKey.WEAPON_MELEE_ATTACK_TYPE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_NO, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_MODIFIER);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_WEAK, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_MODIFIER);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_DAMAGE_MODIFIER_STRONG, SkillTagCategoryKey.WEAPON_MELEE_DAMAGE_MODIFIER);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_FORM_STRAIGHT, SkillTagCategoryKey.WEAPON_MELEE_BLADE_FORM);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_FORM_CONVEX, SkillTagCategoryKey.WEAPON_MELEE_BLADE_FORM);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_FORM_CONCAVE, SkillTagCategoryKey.WEAPON_MELEE_BLADE_FORM);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_0, SkillTagCategoryKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_1, SkillTagCategoryKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT_2, SkillTagCategoryKey.WEAPON_MELEE_BLADE_CUTTING_EDGE_COUNT);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_STRAIGHT, SkillTagCategoryKey.WEAPON_MELEE_BLADE_GRIP_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_CURVED, SkillTagCategoryKey.WEAPON_MELEE_BLADE_GRIP_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_BLADE_GRIP_TYPE_FISTHANDLE, SkillTagCategoryKey.WEAPON_MELEE_BLADE_GRIP_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_PYLON_TYPE_IMPACT, SkillTagCategoryKey.WEAPON_MELEE_PYLON_TYPE);
        this._addSkillTag(SkillTagKey.WEAPON_MELEE_PYLON_TYPE_STAB, SkillTagCategoryKey.WEAPON_MELEE_PYLON_TYPE);
        this._addSkillTag(SkillTagKey.COMMUNICATION, SkillTagCategoryKey.COMMUNICATION);
    }

    private static _addSkillTag(key: SkillTagKey, skillTagCategoryKey: SkillTagCategoryKey) {
        assert(!this._map.has(key), `duplicate SkillTag[${SkillTag[key]}] in SkillTagMap`);
        this._map.set(key, new SkillTag(key, skillTagCategoryKey));
    }
}

SkillTags.init();