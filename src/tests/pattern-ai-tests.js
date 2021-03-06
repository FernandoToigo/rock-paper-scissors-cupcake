import test from 'ava';
import {chooseOption, addResult} from '../js/pattern-ai.js';
import {rules, extendedRules} from '../js/rock-paper-scissors.js';

test('not enough history to find pattern returns any option', t => {
    const chosenOption = chooseOption(rules, [1], 0);
    t.true(Object.keys(rules).includes(chosenOption));
});

test('pattern not found on history returns any option', t => {
    const chosenOption = chooseOption(rules, [5,4,5,3,8,5,7,1], 0);
    t.true(Object.keys(rules).includes(chosenOption));
});

test('finds 1 length pattern and returns opposite of next match of the history', t => {
    t.is(chooseOption(rules, [1,1], 0), 'paper');
});

test('finds 2 length pattern and returns opposite of next match of the history', t => {
    t.is(chooseOption(rules, [].concat([2,1], [5,6,7,7,4,6,5,0,5,7,1,2,0,5,6,8,7,4,2,3], [2,1]), 0), 'scissors');
});

test('finds 10 length pattern and returns opposite of next match of the history', t => {
    t.is(chooseOption(rules, [].concat([1,5,6,8,7,4,2,3,2,1], [7,1,5,6,7,7,0,3,2,1,7,7,0,2], [1,5,6,8,7,4,2,3,2,1]), 0), 'rock');
});

test('finds 20 length pattern and returns opposite of next match of the history', t => {
    t.is(chooseOption(rules, [].concat([8,7,1,5,6,7,8,0], [7,4,2,3,0,1,5,7,4,5,3,4,1,5,3,0,8,5,7,5], [2,1,5,6,7,7,0,6,5,4,5,7,0,2], [7,4,2,3,0,1,5,7,4,5,3,4,1,5,3,0,8,5,7,5]), 0), 'paper');
});

test('finds 20 length pattern and returns opposite of next match of the history with player two as enemy', t => {
    t.is(chooseOption(rules, [].concat([8,7,1,5,6,7,8,0], [7,4,2,3,0,1,5,7,4,5,3,4,1,5,3,0,8,5,7,5], [2,1,5,6,7,7,0,6,5,4,5,7,0,2], [7,4,2,3,0,1,5,7,4,5,3,4,1,5,3,0,8,5,7,5]), 1), 'rock');
});

test('finds 20 length pattern and returns opposite of next match of the history with extended rules', t => {
    t.is(chooseOption(extendedRules, [].concat([8,7,11,5,16,7,18,0], [17,4,2,3,10,1,5,7,24,5,3,4,11,5,3,0,8,5,7,15], [16,21,15,6,7,17,0,6,5,14,5,7,0,12], [17,4,2,3,10,1,5,7,24,5,3,4,11,5,3,0,8,5,7,15]), 0), 'paper');
});