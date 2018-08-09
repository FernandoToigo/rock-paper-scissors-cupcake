import { playRockPaperScissors } from './rock-paper-scissors';
import { chooseRockPaperScissorsOption } from './rock-paper-scissors-random-ai';
import { playMatchFactory } from './match-maker';

window.onload = function () {
    const playerOptionSelect = document.getElementById("playerOption");
    
    const playerVsPlayerMatchLabel = document.getElementById('playerVsComputerMatch');
    const playerVsPlayerResultLabel = document.getElementById('playerVsComputerResult');

    const computerVsComputerMatchLabel = document.getElementById('computerVsComputerMatch');
    const computerVsComputerResultLabel = document.getElementById('computerVsComputerResult');

    const aiOptionCallback = () => {
        return chooseRockPaperScissorsOption([ 'rock', 'paper', 'scissors']);
    };

    const playMatch = playMatchFactory(playRockPaperScissors);

    document.getElementById('playerVsComputer').onclick = function () {
        const playerOption = playerOptionSelect.value;

        const matchResult = playMatch(() =>  playerOption, aiOptionCallback);

        playerVsPlayerMatchLabel.innerHTML = matchResult.firstOption + " vs " + matchResult.secondOption;
        playerVsPlayerResultLabel.innerHTML = matchResult.result;
    }

    document.getElementById('computerVsComputer').onclick = function () {
        const matchResult = playMatch(aiOptionCallback, aiOptionCallback);

        computerVsComputerMatchLabel.innerHTML = matchResult.firstOption + " vs " + matchResult.secondOption;
        computerVsComputerResultLabel.innerHTML = matchResult.result;
    }
}