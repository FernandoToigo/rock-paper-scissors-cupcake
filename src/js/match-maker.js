export const playMatchFactory = (gameConfiguration) => () => {
    const playerOneOption = gameConfiguration.playerOneCallback();
    const playerTwoOption = gameConfiguration.playerTwoCallback();

    const result = gameConfiguration.game(playerOneOption, playerTwoOption);

    const match = {
        playerOneOption: playerOneOption,
        playerTwoOption: playerTwoOption,
        result: result
    }

    return match;
}