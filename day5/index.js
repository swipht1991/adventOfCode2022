import {readFileSync} from 'fs';

const part1 = () => {
  try {
    const input = readFileSync('./day5/input.txt', 'utf8');

    const rows = input.split('\n');
    const moveOrderStartIndex = rows.indexOf('');

    // initializing stacks to empty arrays
    const stacks = rows[moveOrderStartIndex-1].split('   ').map(i => []);

    for(let i = 0; i < moveOrderStartIndex-1; i++){
      for(let j = 0; j < rows[i].length / 4; j += 1){
        const charIndex = j * 4 + 1;
        const thisChar = rows[i][charIndex];
        if(thisChar !== ' '){
          stacks[j].push(thisChar);
        }
      }
    }

    // execute moves
    for(let i = moveOrderStartIndex + 1; i < rows.length; i++){
      const [, count, , from, , to] = rows[i].split(' ');
      
      const fromStack = stacks[parseInt(from) - 1];
      const itemsToMove = fromStack.splice(0, parseInt(count)).reverse();
      stacks[parseInt(to) - 1].unshift(...itemsToMove);
    }

    console.log(`Part 1. answer: ${stacks.map(i => i[0])}`);
  } catch (err) {
    console.error(err);
  }
}
part1();


const part2 = () => {
  try {
    const input = readFileSync('./day5/input.txt', 'utf8');

    const rows = input.split('\n');
    const moveOrderStartIndex = rows.indexOf('');

    // initializing stacks to empty arrays
    const stacks = rows[moveOrderStartIndex-1].split('   ').map(i => []);

    for(let i = 0; i < moveOrderStartIndex-1; i++){
      for(let j = 0; j < rows[i].length / 4; j += 1){
        const charIndex = j * 4 + 1;
        const thisChar = rows[i][charIndex];
        if(thisChar !== ' '){
          stacks[j].push(thisChar);
        }
      }
    }

    // execute moves
    for(let i = moveOrderStartIndex + 1; i < rows.length; i++){
      const [, count, , from, , to] = rows[i].split(' ');
      
      const fromStack = stacks[parseInt(from) - 1];
      const itemsToMove = fromStack.splice(0, parseInt(count));
      stacks[parseInt(to) - 1].unshift(...itemsToMove);
    }

    console.log(`Part 2. answer: ${stacks.map(i => i[0])}`);
  } catch (err) {
    console.error(err);
  }
}
part2();