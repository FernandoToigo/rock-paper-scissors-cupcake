import test from 'ava';
import { addResult, getOptionsFromCombinationIndex } from '../js/game-history.js';
import { rules, extendedRules } from '../js/rock-paper-scissors.js';

test('add match result to empty history', t => {
    const result = {
        playerOneOption: 'rock',
        playerTwoOption: 'rock'
    };
    const history = [];
    addResult(rules, result, history);
    t.deepEqual(history, [0]);
});

test('add match result to existing history', t => {
    const result = {
        playerOneOption: 'paper',
        playerTwoOption: 'scissors'
    };
    const history = [5,4,1,8,7];
    addResult(rules, result, history, 0);
    t.deepEqual(history, [5,4,1,8,7,5]);
});

test('get options from combination index 0 returns rock and rock', t => {
    const options = getOptionsFromCombinationIndex(rules, 0);
    t.is(options[0], 'rock');
    t.is(options[1], 'rock');
});

test('get options from combination index 1 returns rock and paper', t => {
    const options = getOptionsFromCombinationIndex(rules, 1);
    t.is(options[0], 'rock');
    t.is(options[1], 'paper');
});

test('get options from combination index 5 returns paper and scissors', t => {
    const options = getOptionsFromCombinationIndex(rules, 5);
    t.is(options[0], 'paper');
    t.is(options[1], 'scissors');
});

test('get options from combination index 8 returns scissors and scissors', t => {
    const options = getOptionsFromCombinationIndex(rules, 8);
    t.is(options[0], 'scissors');
    t.is(options[1], 'scissors');
});

test('get options from combination index 8 with extended rules returns paper and spock', t => {
    const options = getOptionsFromCombinationIndex(extendedRules, 8);
    t.is(options[0], 'paper');
    t.is(options[1], 'spock');
});

test('get options from combination index 23 with extended rules returns lizard and spock', t => {
    const options = getOptionsFromCombinationIndex(extendedRules, 23);
    t.is(options[0], 'lizard');
    t.is(options[1], 'spock');
});