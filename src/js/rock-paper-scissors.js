export function playRockPaperScissors(first, second) {
    if ((first === 'rock' || second === 'rock') &&
        (first === 'scissors' || second === 'scissors')) {
        return 'rock';
    }

    if ((first === 'scissors' || second === 'scissors') &&
        (first === 'paper' || second === 'paper')) {
        return 'scissors';
    }

    if ((first === 'paper' || second === 'paper') &&
        (first === 'rock' || second === 'rock')) {
        return 'paper';
    }

    return 'draw';
}