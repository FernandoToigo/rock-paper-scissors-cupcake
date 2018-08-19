import { playRockPaperScissors } from './rock-paper-scissors';
import { chooseOption } from './random-ai';
import { playMatchFactory } from './match-maker';

window.onload = function () {
    const flashingTextElement = document.getElementById('flashingText');
    const matchResultElement = document.getElementById('matchResult');
    const choosePlayersPage = document.getElementById('choosePlayersPage');
    const matchPage = document.getElementById('matchPage');
    const humanOptionsOne = document.getElementById('humanOptionsOne');
    const humanOptionsTwo = document.getElementById('humanOptionsTwo');
    const computerOptionsOne = document.getElementById('computerOptionsOne');
    const computerOptionsTwo = document.getElementById('computerOptionsTwo');
    const playRoundButton = document.getElementById('playRoundButton');

    const selectedIndexes = {};

    const options = ['rock', 'paper', 'scissors'];

    const computerOptionCallback = () => {
        return chooseOption(options);
    };

    const humanOneOptionCallback = () => {
        return options[selectedIndexes[humanOptionsOne.id]];
    };

    const humanTwoOptionCallback = () => {
        return options[selectedIndexes[humanOptionsTwo.id]];
    };

    const playMatch = playMatchFactory(playRockPaperScissors);

    document.getElementById('toMatchButton').onclick = function () {
        choosePlayersPage.classList.add('page-previous');
        matchPage.classList.remove('page-next');

        if (isPlayerOneHuman()) {
            showElement(humanOptionsOne);
            hideElement(computerOptionsOne);
        }
        else {
            showElement(computerOptionsOne);
            hideElement(humanOptionsOne);
        }

        if (isPlayerTwoHuman()) {
            showElement(humanOptionsTwo);
            hideElement(computerOptionsTwo);
        }
        else {
            showElement(computerOptionsTwo);
            hideElement(humanOptionsTwo);
        }

        setFirstButtonIcon(computerOptionsOne, 'question', null);
        setFirstButtonIcon(computerOptionsTwo, 'question', null);
        matchResultElement.innerHTML = "";
    };

    document.getElementById('toPlayersButton').onclick = function () {
        choosePlayersPage.classList.remove('page-previous');
        matchPage.classList.add('page-next');
    };

    playRoundButton.onclick = function () {

        hideElement(playRoundButton);
        matchResultElement.innerHTML = "";

        const firstOptionCallback = isPlayerOneHuman() ? humanOneOptionCallback : computerOptionCallback;
        const secondOptionCallback = isPlayerTwoHuman() ? humanTwoOptionCallback : computerOptionCallback;

        doActionToDeselectedButtons([humanOptionsOne, humanOptionsTwo], button => hideElement(button));
        setFirstButtonIcon(computerOptionsOne, 'question', null);
        setFirstButtonIcon(computerOptionsTwo, 'question', null);

        flashMatchResult("Rock!");
        setTimeout(() => flashMatchResult("Paper!"), 300);
        setTimeout(() => flashMatchResult("Scissors!"), 600);
        setTimeout(() => {

            flashingTextElement.classList.remove('match-result-flashing');

            const matchResult = playMatch(firstOptionCallback, secondOptionCallback);
            let resultMessage = 'Draw!';
            if (matchResult.result == matchResult.firstOption)
                resultMessage = "Player 1 wins!";
            else if (matchResult.result == matchResult.secondOption)
                resultMessage = "Player 2 wins!";

            matchResultElement.innerHTML = resultMessage;

            if (isPlayerOneComputer()) {
                setFirstButtonIcon(computerOptionsOne, 'hand-' + matchResult.firstOption, matchResult.firstOption);
            }

            if (isPlayerTwoComputer()) {
                setFirstButtonIcon(computerOptionsTwo, 'hand-' + matchResult.secondOption, matchResult.secondOption);
            }

            showElement(playRoundButton);
            doActionToDeselectedButtons([humanOptionsOne, humanOptionsTwo], button => showElement(button));
        }, 900);

        function flashMatchResult(value) {
            flashingTextElement.classList.remove('match-result-flashing');
            flashingTextElement.innerHTML = value;
            void flashingTextElement.offsetWidth; // This line is needed in order for the transition to start again immediatelly
            flashingTextElement.classList.add('match-result-flashing');
        }
    };

    function isPlayerOneHuman() {
        return selectedIndexes['playerTypesOne'] == 0;
    }

    function isPlayerTwoHuman() {
        return selectedIndexes['playerTypesTwo'] == 0;
    }

    function isPlayerOneComputer() {
        return selectedIndexes['playerTypesOne'] == 1;
    }

    function isPlayerTwoComputer() {
        return selectedIndexes['playerTypesTwo'] == 1;
    }

    function hideElement(element) {
        element.classList.add('element-hidden');
    }

    function showElement(element) {
        element.classList.remove('element-hidden');
    }

    function setFirstButtonIcon(container, icon, name) {
        const iconElement = container.getElementsByClassName('option-icon')[0];
        iconElement.classList.remove('fa-question');
        iconElement.classList.remove('fa-hand-rock');
        iconElement.classList.remove('fa-hand-paper');
        iconElement.classList.remove('fa-hand-scissors');
        iconElement.classList.add('fa-' + icon);

        const nameElement = container.getElementsByClassName('option-name')[0];
        nameElement.classList.toggle('option-name-hidden', name === null);
        if (name !== null)
            nameElement.innerHTML = name;
    }

    function doActionToDeselectedButtons(containers, action) {
        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];

            const buttons = container.getElementsByClassName('list-item');
            for (let j = 0; j < buttons.length; j++) {
                if (selectedIndexes[container.id] == j)
                    continue;

                action(buttons[j]);
            }
        }
    }

    const containers = document.getElementsByClassName('options-list-container');
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        container.addEventListener("wheel", (event) => changeOption(container, event.deltaY));
        selectedIndexes[container.id] = 0;
        updateOptionLayout(container);

        const buttons = container.getElementsByClassName('list-item');
        for (let j = 0; j < buttons.length; j++) {
            const button = buttons[j];
            button.addEventListener('mousedown', () => {
                selectedIndexes[container.id] = j;
                updateOptionLayout(container);
            });
        }
    }

    function changeOption(container, delta) {
        const buttons = container.getElementsByClassName('list-item');
        const selectedIndex = selectedIndexes[container.id];
        delta = Math.sign(delta);
        if (selectedIndex + delta < 0 || selectedIndex + delta >= buttons.length)
            return;

        selectedIndexes[container.id] += delta;
        updateOptionLayout(container);
    }

    function updateOptionLayout(container) {

        const buttons = container.getElementsByClassName('list-item');

        const selectedIndex = selectedIndexes[container.id];
        let currentY = -120 * selectedIndex;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.transform = 'translateY(' + currentY + 'px)';
            currentY += 120;
            if (i != selectedIndex)
                buttons[i].classList.remove('selected-item');
            else
                buttons[i].classList.add('selected-item');
        }
    }
}