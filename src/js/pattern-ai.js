import { getOptionsFromCombinationIndex } from './game-history.js';

export function chooseOption(rules, history, enemyPlayerIndex) {

    if (history.length > 1) {
        const historyCut = history.slice(0, -1);
        const maximumSearchLength = Math.min(history.length, 20);

        for (let searchLength = maximumSearchLength; searchLength > 0; searchLength--) {
            const pattern = history.slice(-searchLength);
            const samePatternIndex = findPattern(historyCut, pattern);

            if (samePatternIndex > -1) {
                const playedOptions = getOptionsFromCombinationIndex(rules, Number(history[samePatternIndex + searchLength]));
                const enemyPlayedOption = playedOptions[enemyPlayerIndex];
                return rules[enemyPlayedOption].isBeatenBy[0];
            }
        }
    }

    const randomIndex = Math.floor(Math.random() * Object.keys(rules).length);
    return Object.keys(rules)[randomIndex];
}

function findPattern(history, pattern)  {
    for (let i = history.length - pattern.length; i >= 0; i--) {
        let j = 0;
        for (;j < pattern.length; j++) {
            if (history[i + j] != pattern[j])
                break;
        }

        if (j == pattern.length)
            return i;
    }

    return -1;
}