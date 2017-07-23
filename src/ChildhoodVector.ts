import {StatKey, StatList} from "./Stat";

export enum VectorKey {
    PHY = 1,
    ETH,
    PSI,
}

export function getVectorStats(vectorKey: VectorKey): StatList {
    switch (vectorKey) {
        case VectorKey.PHY:
            return new StatList([
                [StatKey.PHY_STR, 1],
                [StatKey.PHY_DEX, 1],
                [StatKey.PHY_CON, 1],
            ], 0);
        case VectorKey.ETH:
            return new StatList([
                [StatKey.ETH_STR, 1],
                [StatKey.ETH_DEX, 1],
                [StatKey.ETH_CON, 1],
            ], 0);
        case VectorKey.PSI:
            return new StatList([
                [StatKey.PSI_STR, 1],
                [StatKey.PSI_DEX, 1],
                [StatKey.PSI_CON, 1],
            ], 0);
    }
    throw new Error();
}