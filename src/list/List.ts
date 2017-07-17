export type ItemInfo<K, V> = [K, V];
export class List<K, V> {
    private _itemMap: Map<K, V> = new Map<K, V>();

    constructor(itemInfos: ItemInfo<K, V>[]) {
        for (const itemInfo of itemInfos) {
            this._itemMap.set(itemInfo[0], itemInfo[1]);
        }
    }

    keys(): K[] {
        return Array.from(this._itemMap.keys());
    }

    getItem(key: K): V {
        return this._itemMap.get(key);
    }

    hasItem(key: K): boolean {
        return this._itemMap.has(key);
    }

    reduce<U>(reduceFn: (result: U, value: V) => U, initialValue: U): U {
        let result: U = initialValue;
        for (const key of this.keys()) {
            result = reduceFn(result, this.getItem(key));
        }
        return result;
    }

    map<U>(mapFn: (value: V, key: K) => U): List<K, U> {
        const items: [K, U][] = [];
        for (const key of this.keys()) {
            items.push([key, mapFn(this.getItem(key), key)]);
        }
        return new List<K, U>(items);
    }

    replace<U>(newValue: U): List<K, U> {
        const mapFn = (value: V, key: K) => newValue;
        return this.map(mapFn);
    }

    filter(filterFn: (value: V, key: K) => boolean) {
        const items: ItemInfo<K, V>[] = [];
        for (const key of this.keys()) {
            if (filterFn(this.getItem(key), key)) {
                items.push([key, this.getItem(key)]);
            }
        }
        return new List<K, V>(items);
    }

    combine(list: List<K, V>, keyFn: (listA: List<K, V>, listB: List<K, V>) => K[], combineFn: (listA: List<K, V>, listB: List<K, V>, key: K) => V): List<K, V> {
        const keys: K[] = keyFn(this, list);
        const items: ItemInfo<K, V>[] = [];
        for (const key of keys) {
            items.push([key, combineFn(this, list, key)]);
        }
        return new List<K, V>(items);
    }

    mergeList(list: List<K, V>): List<K, V> {
        const combineFn = (listA: List<K, V>, listB: List<K, V>, key: K) => {
            return listB.hasItem(key) ? listB.getItem(key) : listA.getItem(key);
        };
        const keyFn = (listA: List<K, V>, listB: List<K, V>) => {
            return Array.from(new Set(listA.keys().concat(listB.keys())));
        };

        return this.combine(list, keyFn, combineFn);
    }
}