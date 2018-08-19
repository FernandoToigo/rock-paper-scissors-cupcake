export function playRockPaperScissors(first, second) {
    const rule = rules[first];

    if (rule.beats.some(v => v === second))
        return first;

    if (rule.isBeatenBy.some(v => v === second))
        return second;

    return 'draw';
}

export const rules = 
{
    rock: {
        beats: [ 'scissors' ],
        isBeatenBy: [ 'paper' ]
    },
    paper:
    {
        beats: [ 'rock' ],
        isBeatenBy: [ 'scissors' ]
    },
    scissors:
    {
        beats: [ 'paper' ],
        isBeatenBy: [ 'rock' ]
    }
}

export const extendedRules = 
{
    rock: {
        beats: [ 'scissors', 'lizard' ],
        isBeatenBy: [ 'paper', 'spock' ]
    },
    paper: {
        beats: [ 'rock', 'spock' ],
        isBeatenBy: [ 'scissors', 'lizard' ]
    },
    scissors: {
        beats: [ 'paper', 'lizard' ],
        isBeatenBy: [ 'rock', 'spock' ]
    },
    spock: {
        beats: [ 'scissors', 'rock' ],
        isBeatenBy: [ 'paper', 'lizard' ]
    },
    lizard: {
        beats: [ 'paper', 'spock' ],
        isBeatenBy: [ 'rock', 'scissors' ]
    }
}