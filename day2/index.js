import {readFileSync} from 'fs';

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const LOSS = 0;
const DRAW = 3;
const WIN = 6;

const part1 = () => {
  const getValueFromSymbol = symbol => {
    switch (symbol) {
      case 'A':
      case 'X':
        return ROCK;
      case 'B':
      case 'Y':
        return PAPER;
      case 'C':
      case 'Z':
        return SCISSORS;
      default:
        throw new Error('Symbol not found');
    }
  };

  const getWinValue = (oppValue, myValue) => {
    if(oppValue === myValue){
      return DRAW;
    }

    if(
      (oppValue === ROCK && myValue === PAPER) ||
      (oppValue === PAPER && myValue === SCISSORS) ||
      (oppValue === SCISSORS && myValue === ROCK)
    ){
      return WIN;
    }

    return LOSS;
  };

  try {
    const input = readFileSync('./day2/input.txt', 'utf8');

    const total = input.split('\n').reduce((acc, row) => {
      // console.log('row', row);
      const [opp, mine] = row.split(' ');
      const oppValue = getValueFromSymbol(opp);
      const myValue = getValueFromSymbol(mine);

      acc += myValue;
      acc += getWinValue(oppValue, myValue);
      return acc;
    }, 0);
    
    console.log(`Part 1. score: ${total}`);
  } catch (err) {
    console.error(err);
  }
}
part1();

// this is pretty ugly but w/e
const part2 = () => {
  const symbolValues = {
    'A': ROCK,
    'B': PAPER,
    'C': SCISSORS
  }
  const winValues = {
    'X': LOSS,
    'Y': DRAW,
    'Z': WIN
  }

  const winMap = {
    [ROCK]: PAPER,
    [PAPER]: SCISSORS,
    [SCISSORS]: ROCK
  };
  const lossMap = {
    [ROCK]: SCISSORS,
    [PAPER]: ROCK,
    [SCISSORS]: PAPER
  };

  const getValue = (oppValue, winValue) => {
    let myValue;
    if(winValue === LOSS){
      myValue = lossMap[oppValue];
    }else if(winValue === WIN){
      myValue = winMap[oppValue];
    }else{
      myValue = oppValue;
    }

    return winValue + myValue;
  };

  try {
    const input = readFileSync('./day2/input.txt', 'utf8');

    const total = input.split('\n').reduce((acc, row) => {
      const [opp, win] = row.split(' ');
      acc += getValue(symbolValues[opp], winValues[win]);
      return acc;
    }, 0);
    
    console.log(`Part 2. score: ${total}`);
  } catch (err) {
    console.error(err);
  }
}
part2();