import test from 'ava';
import { chooseRockPaperScissorsOption } from '../js/random-ai';

test('one option chooses always the same option', t => {
    for (let i = 0; i < 100; i++) {
        t.is(chooseRockPaperScissorsOption(['paper']), 'paper');
    }
});

test('two options chooses both options randomly', t => {
    const numberOfResults = {
        ['rock']: 0,
        ['paper']: 0
    };
    for (let i = 0; i < 100; i++) {
        const result = chooseRockPaperScissorsOption(['rock', 'paper']);
        numberOfResults[result]++;
    }
    t.true(numberOfResults['rock'] >= 25);
    t.true(numberOfResults['paper'] >= 25);
});

test('ten options chooses enough of each option randomly', t => {
    const options = [];
    const numberOfResults = {};
    for (let i = 0; i < 10; i++) {
        options.push(i);
        numberOfResults[i] = 0;
    }

    for (let i = 0; i < 100; i++) {
        const result = chooseRockPaperScissorsOption(options);
        numberOfResults[result]++;
    }

    for (let i = 0; i < 10; i++) {
        t.true(numberOfResults[i] >= 2);
    }
});