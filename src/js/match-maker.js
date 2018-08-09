export const playMatchFactory = (game) => (firstOptionCallback, secondOptionCallback) => {
    const firstOption = firstOptionCallback();
    const secondOption = secondOptionCallback();

    const result = game(firstOption, secondOption);

    return {
        firstOption: firstOption,
        secondOption: secondOption,
        result: result
    };
}