import { playRockPaperScissors } from './rock-paper-scissors';
import { chooseRockPaperScissorsOption } from './random-ai';
import { playMatchFactory } from './match-maker';

window.onload = function () {
    // const playerOptionSelect = document.getElementById("playerOption");

    // const playerVsPlayerMatchLabel = document.getElementById('playerVsComputerMatch');
    // const playerVsPlayerResultLabel = document.getElementById('playerVsComputerResult');

    // const computerVsComputerMatchLabel = document.getElementById('computerVsComputerMatch');
    // const computerVsComputerResultLabel = document.getElementById('computerVsComputerResult');

    const selectedIndexes = {};

    const options = ['rock', 'paper', 'scissors'];

    const aiOptionCallback = () => {
        return chooseRockPaperScissorsOption(options);
    };

    const playerOneOptionCallback = () => {
        return options[selectedIndexes['optionsHumanOne']];
    };

    const playerTwoOptionCallback = () => {
        return options[selectedIndexes['optionsHumanTwo']];
    };

    const playMatch = playMatchFactory(playRockPaperScissors);

    // document.getElementById('playerVsComputer').onclick = function () {
    //     const playerOption = playerOptionSelect.value;

    //     const matchResult = playMatch(() =>  playerOption, aiOptionCallback);

    //     playerVsPlayerMatchLabel.innerHTML = matchResult.firstOption + " vs " + matchResult.secondOption;
    //     playerVsPlayerResultLabel.innerHTML = matchResult.result;
    // }

    // document.getElementById('computerVsComputer').onclick = function () {
    //     const matchResult = playMatch(aiOptionCallback, aiOptionCallback);

    //     computerVsComputerMatchLabel.innerHTML = matchResult.firstOption + " vs " + matchResult.secondOption;
    //     computerVsComputerResultLabel.innerHTML = matchResult.result;
    // }

    //document.getElementById('matchPage').classList.remove('page-next');

    const matchResultElement = document.getElementById('matchResult');

    document.getElementById('goToMatchButton').onclick = function () {
        document.getElementById('choosePlayersPage').classList.add('page-previous');
        document.getElementById('matchPage').classList.remove('page-next');

        if (selectedIndexes['playerTypesOne'] == 0) {
            document.getElementById('optionsHumanOne').style.opacity = '1';
            document.getElementById('optionsHumanOne').style.pointerEvents = 'initial';
            document.getElementById('optionsComputerOne').style.opacity = '0';
            document.getElementById('optionsComputerOne').style.pointerEvents = 'none';

        }
        else {
            document.getElementById('optionsHumanOne').style.opacity = '0';
            document.getElementById('optionsHumanOne').style.pointerEvents = 'none';
            document.getElementById('optionsComputerOne').style.opacity = '1';
            document.getElementById('optionsComputerOne').style.pointerEvents = 'initial';
        }

        if (selectedIndexes['playerTypesTwo'] == 0) {
            document.getElementById('optionsHumanTwo').style.opacity = '1';
            document.getElementById('optionsHumanTwo').style.pointerEvents = 'initial';
            document.getElementById('optionsComputerTwo').style.opacity = '0';
            document.getElementById('optionsComputerTwo').style.pointerEvents = 'none';
        }
        else {
            document.getElementById('optionsHumanTwo').style.opacity = '0';
            document.getElementById('optionsHumanTwo').style.pointerEvents = 'none';
            document.getElementById('optionsComputerTwo').style.opacity = '1';
            document.getElementById('optionsComputerTwo').style.pointerEvents = 'initial';
        }

        setButtonIcon('optionsComputerOne', 'question', null);
        setButtonIcon('optionsComputerTwo', 'question', null);
        matchResultElement.innerHTML = "";
    };

    document.getElementById('goToChoosePlayersButton').onclick = function () {
        document.getElementById('choosePlayersPage').classList.remove('page-previous');
        document.getElementById('matchPage').classList.add('page-next');
    };

    document.getElementById('startButton').onclick = function () {
        let firstOptionCallback;
        let secondOptionCallback;
        if (selectedIndexes['playerTypesOne'] == 0)
            firstOptionCallback = playerOneOptionCallback;
        else
            firstOptionCallback = aiOptionCallback;

        if (selectedIndexes['playerTypesTwo'] == 0)
            secondOptionCallback = playerTwoOptionCallback;
        else
            secondOptionCallback = aiOptionCallback;

        doActionToDeselectedButtons(['optionsHumanOne', 'optionsHumanTwo'], button => button.classList.add('element-hidden'));
        setButtonIcon('optionsComputerOne', 'question', null);
        setButtonIcon('optionsComputerTwo', 'question', null);

        flashMatchResult("Rock!");
        setTimeout(() => flashMatchResult("Paper!"), 300);
        setTimeout(() => flashMatchResult("Scissors!"), 600);
        setTimeout(() => {

            const matchResult = playMatch(firstOptionCallback, secondOptionCallback);
            let resultMessage = 'Draw!';
            if (matchResult.result == matchResult.firstOption)
                resultMessage = "Player one wins!";
            else if (matchResult.result == matchResult.secondOption)
                resultMessage = "Player two wins!";

            matchResultElement.innerHTML = resultMessage;

            if (selectedIndexes['playerTypesOne'] == 1) {
                setButtonIcon('optionsComputerOne', 'hand-'+matchResult.firstOption, matchResult.firstOption);
            }

            if (selectedIndexes['playerTypesTwo'] == 1) {
                setButtonIcon('optionsComputerTwo', 'hand-'+matchResult.secondOption, matchResult.secondOption);
            }

            doActionToDeselectedButtons(['optionsHumanOne', 'optionsHumanTwo'], button => button.classList.remove('element-hidden'));
        }, 900);

        function flashMatchResult(value) {
            matchResultElement.classList.remove('match-result-flashing');
            matchResultElement.innerHTML = value;
            void matchResultElement.offsetWidth; // This line is needed in order for the transition to start again immediatelly
            matchResultElement.classList.add('match-result-flashing');
        }
    };

    function setButtonIcon(container, icon, name) {
        const iconElement = document.getElementById(container).getElementsByClassName('option-icon')[0];
        iconElement.classList.remove('fa-question');
        iconElement.classList.remove('fa-hand-rock');
        iconElement.classList.remove('fa-hand-paper');
        iconElement.classList.remove('fa-hand-scissors');
        iconElement.classList.add('fa-' + icon);
        const nameElement = document.getElementById(container).getElementsByClassName('option-name')[0];
        if (name === null) {
            nameElement.classList.add('option-name-hidden');
        }
        else {
            nameElement.classList.remove('option-name-hidden');
            nameElement.innerHTML = name;
        }
    }

    function doActionToDeselectedButtons(containers, action) {
        for (let i = 0; i < containers.length; i++) {
            const container = document.getElementById(containers[i]);

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
                buttons[i].classList += ' selected-item';
        }
    }
}