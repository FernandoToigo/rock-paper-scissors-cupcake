import test from 'ava';
import { playRockPaperScissors } from '../js/rock-paper-scissors';

test('rock beats scissors', t => {
    t.is(playRockPaperScissors('rock', 'scissors'), 'rock');
});

test('scissors is beaten by rock', t => {
    t.is(playRockPaperScissors('scissors', 'rock'), 'rock');
});

test('scissors beats paper', t => {
    t.is(playRockPaperScissors('scissors', 'paper'), 'scissors');
});

test('paper is beaten by scissors', t => {
    t.is(playRockPaperScissors('paper', 'scissors'), 'scissors');
});

test('paper beats rock', t => {
    t.is(playRockPaperScissors('paper', 'rock'), 'paper');
});

test('rock is beaten by paper', t => {
    t.is(playRockPaperScissors('rock', 'paper'), 'paper');
});

test('rock draws with rock', t => {
    t.is(playRockPaperScissors('rock', 'rock'), 'draw');
});

test('paper draws with paper', t => {
    t.is(playRockPaperScissors('paper', 'paper'), 'draw');
});

test('scissors draws with scissors', t => {
    t.is(playRockPaperScissors('scissors', 'scissors'), 'draw');
});