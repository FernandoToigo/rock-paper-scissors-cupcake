export function chooseOption(rules, history) {

    if (history.length > 1) {
        const historyCut = history.slice(0, -1);
        const maximumSearchLength = Math.min(history.length, 20);

        for (let searchLength = maximumSearchLength; searchLength > 0; searchLength--) {
            const pattern = history.slice(-searchLength);
            const samePatternIndex = findPattern(historyCut, pattern);

            if (samePatternIndex > -1) {
                const playedOptions = getOptionsFromCombinationIndex(rules, Number(history[samePatternIndex + searchLength]));
                return rules[playedOptions[0]].isBeatenBy[0];
            }
        }
    }

    const randomIndex = Math.floor(Math.random() * Object.keys(rules).length);
    return Object.keys(rules)[randomIndex];
}

export function addResult(rules, result, history, player) {
    let combinationIndex;
    if (player === 0)
        combinationIndex = getCombinationIndex(rules, result.firstOption, result.secondOption);
    else
        combinationIndex = getCombinationIndex(rules, result.secondOption, result.firstOption);

    history.push(combinationIndex);
    return history;
}

function getCombinationIndex(rules, firstOption, secondOption) {
    const options = Object.keys(rules);
    const firstIndex = options.indexOf(firstOption);
    const secondIndex = options.indexOf(secondOption);
    return firstIndex * options.length + secondIndex;
}

function getOptionsFromCombinationIndex(rules, combinationIndex) {
    const options = Object.keys(rules);
    const firstIndex = Math.floor(combinationIndex / options.length)
    const secondIndex = combinationIndex % options.length;
    const firstOption = options[firstIndex];
    const secondOption = options[secondIndex];
    return [firstOption, secondOption];
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