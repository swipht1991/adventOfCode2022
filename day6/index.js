import {readFileSync} from 'fs';

const hasRepeats = (str) => {
  return /(.).*\1/.test(str);
}

const part1 = () => {
  try {
    const numInARow = 4;
    const input = readFileSync('./day6/input.txt', 'utf8');

    let answer = -1;
    for(let i = numInARow; i < input.length; i++){
      const lastFour = input.substring(i - numInARow, i);
      if(!hasRepeats(lastFour)){
        answer = i;
        break;
      }
    }

    console.log(`Part 1. answer: ${answer}`);
  } catch (err) {
    console.error(err);
  }
}
part1();


const part2 = () => {
  try {
    const numInARow = 14;
    const input = readFileSync('./day6/input.txt', 'utf8');

    let answer = -1;
    for(let i = numInARow; i < input.length; i++){
      const lastFour = input.substring(i - numInARow, i);
      if(!hasRepeats(lastFour)){
        answer = i;
        break;
      }
    }

    console.log(`Part 2. answer: ${answer}`);
  } catch (err) {
    console.error(err);
  }
}
part2();
