import {NumberInfo} from "./list/NumberList";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
export enum StatKey {
    PHY_STR = 11,
    PHY_DEX,
    PHY_CON,
    ETH_STR = 21,
    ETH_DEX,
    ETH_CON,
    PSI_STR = 31,
    PSI_DEX,
    PSI_CON,
}

export const StatKeys = () => Object.keys(StatKey).map((keyIndex) => StatKey[keyIndex] as StatKey);

export type StatInfo = NumberInfo<StatKey>;
export class StatList extends DefaultValueNumberList<StatKey> {
    constructor(statInfos: StatInfo[], defaultValue: number) {
        super(StatKeys(), statInfos, defaultValue);
    }
}