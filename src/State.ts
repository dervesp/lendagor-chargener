import {NumberInfo} from "./list/NumberList";
import {StatInfo, StatKey, StatList} from "./Stat";
import {DefaultValueNumberList} from "./list/DefaultValueNumberList";
import {assert, assertEqualNumber} from "./utils/Assert";

export enum StateKey {
    WAR,
    FAVORITE_LABORS,
    SERVICE_TO_IDEALS,
    INSPIRATION,
    LOVE,
    UNREQUITED_LOVE,
    INTERESTING_INTERLOCUTORS,
    ROUTINE,
    HARD_WORD,
}

export const StateKeys = () => [
    StateKey.WAR,
    StateKey.FAVORITE_LABORS,
    StateKey.SERVICE_TO_IDEALS,
    StateKey.INSPIRATION,
    StateKey.LOVE,
    StateKey.UNREQUITED_LOVE,
    StateKey.INTERESTING_INTERLOCUTORS,
    StateKey.ROUTINE,
    StateKey.HARD_WORD,
];

assert(Object.keys(StateKey).length / 2 == StateKeys().length, "unexpected StateKeys length");

export type StateInfo = NumberInfo<StateKey>;
export class StateList extends DefaultValueNumberList<StateKey> {
    constructor(StateInfos: StateInfo[], defaultValue: number) {
        super(StateKeys(), StateInfos, defaultValue);
    }
}

const STATE_STAT_SUM = 0.5;
export class State {
    private _key: StateKey;
    private _stats: StatList;

    constructor(key: StateKey, stats: StatList) {
        assertEqualNumber(STATE_STAT_SUM, stats.sum(), `invalid State[${StateKey[key]}] stat sum`);
        this._key = key;
        this._stats = stats;
    }

    key(): StateKey {
        return this._key;
    }

    stats(): StatList {
        return this._stats;
    }
}

export class States {
    private static _map: Map<StateKey, State> = new Map<StateKey, State>();

    static get(key: StateKey): State {
        assert(this._map.has(key), `undefined State[${StateKey[key]}] in StateMap`);
        return this._map.get(key);
    }

    static init() {
        this._addState(StateKey.WAR, [
            [StatKey.ETH_DEX, -0.2],
            [StatKey.ETH_CON, 0.5],
            [StatKey.PSI_DEX, 0.2],
        ]);
        this._addState(StateKey.FAVORITE_LABORS, [
            [StatKey.ETH_STR, 0.3],
            [StatKey.ETH_DEX, 0.2],
        ]);
        this._addState(StateKey.SERVICE_TO_IDEALS, [
            [StatKey.ETH_STR, 0.2],
            [StatKey.ETH_CON, 0.3],
        ]);
        this._addState(StateKey.INTERESTING_INTERLOCUTORS, [
            [StatKey.PSI_STR, 0.3],
            [StatKey.PSI_DEX, 0.2],
        ]);
        this._addState(StateKey.INSPIRATION, [
            [StatKey.ETH_DEX, 0.5],
        ]);
        this._addState(StateKey.LOVE, [
            [StatKey.ETH_STR, 0.4],
            [StatKey.ETH_DEX, 0.1],
        ]);
        this._addState(StateKey.UNREQUITED_LOVE, [
            [StatKey.ETH_STR, 0.6],
            [StatKey.ETH_DEX, -0.2],
            [StatKey.ETH_CON, 0.1],
        ]);
        this._addState(StateKey.ROUTINE, [
            [StatKey.ETH_STR, -0.1],
            [StatKey.ETH_DEX, -0.2],
            [StatKey.ETH_CON, 0.4],
            [StatKey.PSI_CON, 0.4],
        ]);
        this._addState(StateKey.HARD_WORD, [
            [StatKey.ETH_CON, 0.1],
            [StatKey.PSI_CON, 0.4],
        ]);
    }

    private static _addState(key: StateKey, statInfos: StatInfo[]) {
        assert(!this._map.has(key), `duplicate State[${StatKey[key]}] in StateMap`);
        if (this._map.has(key)) {
            throw new Error();
        }
        this._map.set(key, new State(key, new StatList(statInfos, 0)));
    }
}

States.init();