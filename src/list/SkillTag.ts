import {DefaultValueNumberList} from "./DefaultValueNumberList";
import {NumberInfo} from "./NumberList";

export enum SkillTagKey {
    WEAPON_1_HAND,
    WEAPON_2_HAND,
    WEAPON_BALANCED,
    WEAPON_UNBALANCED,
    WEAPON_TYPE_BLADE,
    WEAPON_TYPE_PYLON_SHOCK,
    WEAPON_TYPE_PYLON_STICHING,
    WEAPON_TYPE_FLEXIBLE,
    WEAPON_TYPE_RANGED,
    WEAPON_TYPE_THROWING,
};

export const SkillTagKeys = () => [
    SkillTagKey.WEAPON_1_HAND,
    SkillTagKey.WEAPON_2_HAND,
    SkillTagKey.WEAPON_BALANCED,
    SkillTagKey.WEAPON_UNBALANCED,
    SkillTagKey.WEAPON_TYPE_BLADE,
    SkillTagKey.WEAPON_TYPE_PYLON_SHOCK,
    SkillTagKey.WEAPON_TYPE_PYLON_STICHING,
    SkillTagKey.WEAPON_TYPE_FLEXIBLE,
    SkillTagKey.WEAPON_TYPE_RANGED,
    SkillTagKey.WEAPON_TYPE_THROWING,
];

export type SkillTagInfo = NumberInfo<SkillTagKey>;
export class SkillTagList extends DefaultValueNumberList<SkillTagKey> {
    constructor(skillTagInfos: SkillTagInfo[], defaultValue: number) {
        super(SkillTagKeys(), skillTagInfos, defaultValue);
    }
}