import { playRockPaperScissors } from './rock-paper-scissors';
import { chooseRockPaperScissorsOption } from './rock-paper-scissors-random-ai';

window.onload = function () {
    document.getElementById('play').onclick = function () {
        const playerOption = document.getElementById("playerOption").value;
        const aiOption = chooseRockPaperScissorsOption([ 'rock', 'paper', 'scissors']);
        const result = playRockPaperScissors(playerOption, aiOption);;

        const aiOptionLabel = document.getElementById('aiOption');
        const resultLabel = document.getElementById('result');
        aiOptionLabel.innerHTML = aiOption;
        resultLabel.innerHTML = result;
    }
}