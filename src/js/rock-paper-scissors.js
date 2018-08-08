export function playRockPaperScissors(first, second) {
    const rule = rules.find(r => r.value === first);

    if (rule.beats.some(v => v === second))
        return first;

    if (rule.isBeatenBy.some(v => v === second))
        return second;

    return 'draw';
}

let rules = [
    {
        value: 'rock',
        beats: [ 'scissors' ],
        isBeatenBy: [ 'paper' ]
    },
    {
        value: 'scissors',
        beats: [ 'paper' ],
        isBeatenBy: [ 'rock' ]
    },
    {
        value: 'paper',
        beats: [ 'rock' ],
        isBeatenBy: [ 'scissors' ]
    }
];