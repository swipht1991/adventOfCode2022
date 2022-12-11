import {readFileSync} from 'fs';

const part1 = () => {
  try {
    const input = readFileSync('./day10/input.txt', 'utf8');
    const rows = input.split('\n');
    let x = 1;
    let signal = 0;
    let cycle = 0;
    rows.forEach(row => {
      const [instruction, val] = row.split(' ');
      if(instruction === 'addx'){
        if((cycle + 1 - 20) % 40 === 0){
          signal += ((cycle + 1) * x)
        }else if( (cycle + 2 - 20) % 40 === 0){
          signal += ((cycle + 2) * x)
        }
        cycle += 2
        x += parseInt(val);
      }else{
        if((cycle + 1 - 20) % 40 === 0){
          signal += ((cycle + 1) * x)
        }
        cycle++;
      }
    });

    console.log(`Part 1. answer: ${signal}`);
  } catch (err) {
    console.error(err);
  }
}
part1();


const part2 = () => {
  const updateOutput = (current, spriteMiddle) => {
    if((current.length % 40) - spriteMiddle <= 1 && (current.length % 40) - spriteMiddle >= -1){
      return current += '#';
    }
    return current += '.';
  };
  try {
    const input = readFileSync('./day10/input.txt', 'utf8');
    const rows = input.split('\n');
    let x = 1;
    let output = '';
    rows.forEach(row => {
      const [instruction, val] = row.split(' ');
      if(instruction === 'addx'){
        output = updateOutput(output, x);
        output = updateOutput(output, x);
        x += parseInt(val);
      }else{
        output = updateOutput(output, x);
      }
    });

    console.log('Part 2. answer:');
    let remaining = output.length;
    let lineNumber = 1;
    while(remaining > 0){
      console.log(`line #${lineNumber}: ${output.substring((lineNumber * 40 - 40), (lineNumber * 40))}`);
      lineNumber++;
      remaining -= 40;
    }
  } catch (err) {
    console.error(err);
  }
}
part2();