import {NumberInfo} from "./list/NumberList";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {assert} from "./utils/Assert";

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

export const StatKeys = () => [
    StatKey.PHY_STR,
    StatKey.PHY_DEX,
    StatKey.PHY_CON,
    StatKey.ETH_STR,
    StatKey.ETH_DEX,
    StatKey.ETH_CON,
    StatKey.PSI_STR,
    StatKey.PSI_DEX,
    StatKey.PSI_CON,
];

assert(Object.keys(StatKey).length / 2 == StatKeys().length, "unexpected StatKeys length");

export type StatInfo = NumberInfo<StatKey>;
export class StatList extends DefaultValueNumberList<StatKey> {
    constructor(statInfos: StatInfo[], defaultValue: number) {
        super(StatKeys(), statInfos, defaultValue);
    }
}