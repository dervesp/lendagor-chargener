import {Character} from "./Character";
import {StatKey, StatKeys} from "./Stat";
import {SkillKey, SkillKeys} from "./Skill";
export namespace Render {
    function renderHeader(titles: string[]): string {
        return `<tr class="header"><th></th>${titles.map((title) => `<th>${title}</th>`).join("")}</tr>`;
    }

    function renderSubHeader(value: string): string {
        return `<tr class="subheader"><td>${value}</td></tr>`;
    }

    type RowItem = [string, string];
    function renderRow(title: string, rowItems: RowItem[], type: string = ""): string {
        const rowItemsHtml = rowItems.map((rowItem: RowItem) => {
            const text = rowItem[0];
            const title = rowItem[1];
            return `<td title="${title}">${text}</td>`
        });
        return `<tr class="row${(type != "") ? " " + type : ""}"><td class="row_title">${title}</td>${rowItemsHtml.join("")}</tr>`;
    }

    function renderParams(characterInfos: CharacterInfo[]): string {
        const listHeader = renderSubHeader("Params");
        let listBody = "";
        listBody += renderRow("WILLPOWER", characterInfos.map((characterInfo: CharacterInfo) => [characterInfo[0].paramWillPower().toString(), ""] as RowItem));
        listBody += renderRow("HEALTH", characterInfos.map((characterInfo: CharacterInfo) => [characterInfo[0].paramHealth().toString(), ""] as RowItem));
        listBody += renderRow("HP", characterInfos.map((characterInfo: CharacterInfo) => [characterInfo[0].paramHp().toString(), ""] as RowItem));
        return listHeader + listBody
    }

    type RowInfo = [string, string, RowItem[]]
    function renderNumberLists<K>(name: string, keys: K[], generateRowInfoFn: (key: K) => RowInfo): string {
        const listHeader = renderSubHeader(name);
        const listRows = keys.map((key: K) => {
            const rowInfo = generateRowInfoFn(key);
            const rowTitle = rowInfo[0];
            const rowType = rowInfo[1];
            const rowItems = rowInfo[2];
            return renderRow(rowTitle, rowItems, rowType);
        });
        return listHeader + listRows.join("");
    }

    type CharacterInfo = [Character, string];
    function renderStatList(characterInfos: CharacterInfo[]): string {
        const generateFn = (statKey: StatKey) => {
            const rowTitle = StatKey[statKey];
            const rowType = StatKey[statKey];
            const rowItems = characterInfos.map((characterInfo: CharacterInfo) => {
                const character = characterInfo[0];
                const statValue = character.stats().getItem(statKey);
                return [statValue.toString(), ""] as RowItem;
            });
            return [rowTitle, rowType, rowItems] as RowInfo;
        };
        const statList = renderNumberLists("Stats", StatKeys(), generateFn);

        const statSums = characterInfos.map((characterInfo: CharacterInfo) => {
            const character = characterInfo[0];
            return [character.stats().sum().toString(), ""] as RowItem;
        });
        const statSumRow = renderRow("∑", statSums);
        return statList + statSumRow;
    }

    function renderSkillList(characterInfos: CharacterInfo[]): string {
        const generateFn = (skillKey: SkillKey) => {
            const rowTitle = SkillKey[skillKey];
            const rowType = SkillKey[skillKey];
            const rowItems = characterInfos.map((characterInfo: CharacterInfo) => {
                const character = characterInfo[0];
                const skillValue = character.skills().getItem(skillKey);
                const skillRawValue = (<any>character)._skills.getItem(skillKey);
                const skillModifier = (<any>character)._skillModifiers.getItem(skillKey);
                const adjacentSkillModifier = (<any>character)._adjacentSkillModifiers.getItem(skillKey);
                return [
                    skillValue.toString(),
                    `${skillRawValue.toFixed(2)} + ${skillModifier.toFixed(2)} + ${adjacentSkillModifier.toFixed(2)}`,
                ] as RowItem;
            });
            return [rowTitle, rowType, rowItems] as RowInfo;
        };
        return renderNumberLists("Skills", SkillKeys(), generateFn);
    }

    export function renderCharacters(characterInfos: CharacterInfo[]) {
        let resultHtml = "";
        resultHtml += renderHeader(characterInfos.map((characterInfo: CharacterInfo) => characterInfo[1]));
        resultHtml += renderStatList(characterInfos);
        resultHtml += renderParams(characterInfos);
        resultHtml += renderSkillList(characterInfos);
        document.body.innerHTML += `<table>${resultHtml}</table>`;
    }
}