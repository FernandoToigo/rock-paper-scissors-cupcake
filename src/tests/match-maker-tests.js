import test from 'ava';
import { playMatchFactory } from '../js/match-maker';

test('play match returns correct results', t => {
    const gameConfiguration = {
        game: (a, b) => 'something',
        playerOneCallback: () => 'rock',
        playerTwoCallback: () => 'paper'
    }
    const match = playMatchFactory(gameConfiguration);
    const result = match([]);
    t.is('rock', result.playerOneOption);
    t.is('paper', result.playerTwoOption);
    t.is('something', result.result);
});