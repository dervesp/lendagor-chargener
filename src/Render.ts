import {Character} from "./Character";
import {NumberList} from "./list/NumberList";
import {StatKey, StatKeys} from "./Stat";
import {SkillKey, SkillKeys} from "./Skill";
export namespace Render {
    function renderHeader(titles: string[]): string {
        return `<tr class="header"><th></th>${titles.map((title) => `<th>${title}</th>`).join("")}</tr>`;
    }

    function renderSubHeader(value: string): string {
        return `<tr class="subheader"><td>${value}</td></tr>`;
    }

    function renderRow(name: string, values: string[]): string {
        return `<tr class="row"><td class="row_title">${name}</td>${values.map((value) => `<td>${value}</td>`).join("")}</tr>`;
    }

    function renderParams(characterInfos: [Character, string][]): string {
        const listHeader = renderSubHeader("Params");
        let listBody = "";
        listBody += renderRow("WILLPOWER", characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].paramWillPower().toString()));
        listBody += renderRow("HEALTH", characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].paramHealth().toString()));
        listBody += renderRow("HP", characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].paramHp().toString()));
        return listHeader + listBody
    }

    function renderNumberLists<K>(name: string, keyInfos: [K, string][], lists: NumberList<K>[]): string {
        const listHeader = renderSubHeader(name);
        const listBody = keyInfos.map((keyInfos: [K, string]) => {
            return renderRow(keyInfos[1], lists.map((list: NumberList<K>) => list.getItem(keyInfos[0]).toString()));
        }).join("");
        return listHeader + listBody;
    }

    function renderStatList(characterInfos: [Character, string][]): string {
        const statList = renderNumberLists(
            "Stats",
            StatKeys().map((statKey: StatKey) => [statKey, StatKey[statKey]] as [StatKey, string]),
            characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].stats())
        );
        const statSum = renderRow("∑", characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].stats().sum().toString()));
        return statList + statSum;
    }

    function renderSkillList(characterInfos: [Character, string][]): string {
        return renderNumberLists(
            "Skills",
            SkillKeys().map((skillKey: SkillKey) => [skillKey, SkillKey[skillKey]] as [SkillKey, string]),
            characterInfos.map((characterInfo: [Character, string]) => characterInfo[0].skills())
        );
    }

    export function renderCharacters(characterInfos: [Character, string][]) {
        let resultHtml = "";
        resultHtml += renderHeader(characterInfos.map((characterInfo: [Character, string]) => characterInfo[1]));
        resultHtml += renderStatList(characterInfos);
        resultHtml += renderParams(characterInfos);
        resultHtml += renderSkillList(characterInfos);
        document.body.innerHTML += `<table>${resultHtml}</table>`;
    }
}