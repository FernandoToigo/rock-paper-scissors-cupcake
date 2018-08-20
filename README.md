# rock-paper-scissors-cupcake
Rock, paper and scissors game that is part of the hiring process for Cupcake Entertainment.

You can play it online at this [link](http://fernandotoigo.com/projects/rock-paper-scissors/).

## How to play

First, choose the players who are going to fight against each other. You can choose any combination between:
* Human
* Computer (which always plays random moves)
* Computer+ (which tries to predict the opponent next move by finding patterns on their previous plays)

Then, choose the move you want to play and press Play round.

A score is shown to keep track of how many matches each player has won.

## Running

After cloning, install all the necessary packages by running:

```console
npm install
```

Then, run the following command to start the program in development mode:

```console
npm start
```

Your browser should open up with the game running.
All changes on files should refresh your browser automatically with the changes.

## Tests

Run all the tests by running:

```console
npm test
```

## Code coverage

To view the report for the code that is covereded by tests, run:

```console
npm run codecoverage
```
