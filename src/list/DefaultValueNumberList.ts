import {NumberInfo, NumberList} from "./NumberList";

export class DefaultValueNumberList<K> extends NumberList<K> {
    constructor(allKeys: K[], numberInfos: NumberInfo<K>[], defaultValue: number) {
        const numberMap: Map<K, number> = new Map<K, number>(numberInfos);
        const finalNumberMap: Map<K, number> = new Map<K, number>();
        for (const key of allKeys) {
            finalNumberMap.set(key, numberMap.has(key) ? numberMap.get(key) : defaultValue);
        }
        super(Array.from(finalNumberMap.entries()));
    }
}