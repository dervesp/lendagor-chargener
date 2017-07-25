import {ItemInfo} from "./List";

export type NumberInfo<K> = [K, number];
export function MergeNumberInfos<K>(numberInfosA: NumberInfo<K>[], numberInfosB: NumberInfo<K>[]): NumberInfo<K>[] {
    const mapA: Map<K, number> = new Map<K, number>(numberInfosA);
    const mapB: Map<K, number> = new Map<K, number>(numberInfosB);
    const keySet = Array.from(new Set(Array.from(mapA.keys()).concat(Array.from(mapB.keys()))));
    const numberInfos: NumberInfo<K>[] = [];
    for (const key of keySet) {
        numberInfos.push([key, mapB.has(key) ? mapB.get(key) : mapA.get(key)]);
    }
    return numberInfos;

}
export class NumberList<K> {
    private _itemMap: Map<K, number> = new Map<K, number>();

    constructor(itemInfos: ItemInfo<K, number>[]) {
        for (const itemInfo of itemInfos) {
            this._itemMap.set(itemInfo[0], itemInfo[1]);
        }
    }

    keys(): K[] {
        return Array.from(this._itemMap.keys());
    }

    getItem(key: K): number {
        return this._itemMap.get(key);
    }

    hasItem(key: K): boolean {
        return this._itemMap.has(key);
    }

    reduce<U>(reduceFn: (result: U, value: number) => U, initialValue: U): U {
        let result: U = initialValue;
        for (const key of this.keys()) {
            result = reduceFn(result, this.getItem(key));
        }
        return result;
    }

    map<U>(mapFn: (value: number, key: K) => number): NumberList<K> {
        const items: NumberInfo<K>[] = [];
        for (const key of this.keys()) {
            items.push([key, mapFn(this.getItem(key), key)]);
        }
        return new NumberList<K>(items);
    }

    replace<U>(newValue: number): NumberList<K> {
        const mapFn = (value: number, key: K) => newValue;
        return this.map(mapFn);
    }

    filter(filterFn: (value: number, key: K) => boolean) {
        const items: ItemInfo<K, number>[] = [];
        for (const key of this.keys()) {
            if (filterFn(this.getItem(key), key)) {
                items.push([key, this.getItem(key)]);
            }
        }
        return new NumberList<K>(items);
    }

    combine(list: NumberList<K>, keyFn: (listA: NumberList<K>, listB: NumberList<K>) => K[], combineFn: (listA: NumberList<K>, listB: NumberList<K>, key: K) => number): NumberList<K> {
        const keys: K[] = keyFn(this, list);
        const items: ItemInfo<K, number>[] = [];
        for (const key of keys) {
            items.push([key, combineFn(this, list, key)]);
        }
        return new NumberList<K>(items);
    }

    mergeList(list: NumberList<K>): NumberList<K> {
        const combineFn = (listA: NumberList<K>, listB: NumberList<K>, key: K) => {
            return listB.hasItem(key) ? listB.getItem(key) : listA.getItem(key);
        };
        const keyFn = (listA: NumberList<K>, listB: NumberList<K>) => {
            return Array.from(new Set(listA.keys().concat(listB.keys())));
        };

        return this.combine(list, keyFn, combineFn);
    }

    addList(list: NumberList<K>): NumberList<K> {
        const combineFn = (listA: NumberList<K>, listB: NumberList<K>, key: K) => {
            return listA.getItem(key) + listB.getItem(key);
        };
        const keyFn = (listA: NumberList<K>, listB: NumberList<K>) => {
            return listA.keys();
        };

        return this.combine(list, keyFn, combineFn) as NumberList<K>;
    }

    multiplyList(list: NumberList<K>): NumberList<K> {
        const combineFn = (listA: NumberList<K>, listB: NumberList<K>, key: K) => {
            return listA.getItem(key) * listB.getItem(key);
        };
        const keyFn = (listA: NumberList<K>, listB: NumberList<K>) => {
            return listA.keys();
        };

        return this.combine(list, keyFn, combineFn) as NumberList<K>;
    }

    add(addition: number): NumberList<K> {
        const mapFn = (value: number, key: K) => (value + addition);
        return this.map(mapFn);
    }

    multiply(multiplier: number): NumberList<K> {
        const mapFn = (value: number, key: K) => (value * multiplier);
        return this.map(mapFn);
    }

    sum(): number {
        return this.reduce((result: number, value: number) => {
            return result + value;
        }, 0);
    }
}