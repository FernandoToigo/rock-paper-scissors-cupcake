export function addResult(rules, result, history) {
    const combinationIndex = getCombinationIndex(rules, result.playerOneOption, result.playerTwoOption);
    history.push(combinationIndex);
}

function getCombinationIndex(rules, firstOption, secondOption) {
    const options = Object.keys(rules);
    const firstIndex = options.indexOf(firstOption);
    const secondIndex = options.indexOf(secondOption);
    return firstIndex * options.length + secondIndex;
}

export function getOptionsFromCombinationIndex(rules, combinationIndex) {
    const options = Object.keys(rules);
    const firstIndex = Math.floor(combinationIndex / options.length)
    const secondIndex = combinationIndex % options.length;
    const firstOption = options[firstIndex];
    const secondOption = options[secondIndex];
    return [firstOption, secondOption];
}