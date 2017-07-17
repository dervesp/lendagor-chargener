import {List, ItemInfo} from "./List";

export type NumberInfo<K> = ItemInfo<K, number>;
export class NumberList<K> extends List<K, number> {
    addList(list: List<K, number>): List<K, number> {
        const combineFn = (listA: List<K, number>, listB: List<K, number>, key: K) => {
            return listA.getItem(key) + listB.getItem(key);
        };
        const keyFn = (listA: List<K, number>, listB: List<K, number>) => {
            return listA.keys();
        };

        return this.combine(list, keyFn, combineFn);
    }

    multiplyList(list: List<K, number>): List<K, number> {
        const combineFn = (listA: List<K, number>, listB: List<K, number>, key: K) => {
            return listA.getItem(key) * listB.getItem(key);
        };
        const keyFn = (listA: List<K, number>, listB: List<K, number>) => {
            return listA.keys();
        };

        return this.combine(list, keyFn, combineFn);
    }

    add(addition: number): List<K, number> {
        const mapFn = (value: number, key: K) => (value + addition);
        return this.map(mapFn);
    }

    multiply(multiplier: number): List<K, number> {
        const mapFn = (value: number, key: K) => (value * multiplier);
        return this.map(mapFn);
    }
}