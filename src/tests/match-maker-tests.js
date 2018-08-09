import test from 'ava';
import { playMatchFactory } from '../js/match-maker';

test('play match with fixed options results in correct match', t => {
    const game = (a, b) => {
        return 'something';
    };
    const match = playMatchFactory(game);
    const result = match(() => 'rock', () => 'paper');
    t.is('rock', result.firstOption);
    t.is('paper', result.secondOption);
    t.is('something', result.result);
});