import {readFileSync} from 'fs';

const part1 = () => {
  try {
    const input = readFileSync('./day1/input.txt', 'utf8');
    const elves = input.split('\n\n');
    let max = 0;
    elves.forEach(elf => {
      const totalFood = elf.split('\n').reduce((acc, i)=> {
        acc += parseInt(i);
        return acc;
      }, 0);
  
      max = totalFood > max ? totalFood : max;
  
    });
    console.log(`Part 1. max food carried by elves: ${max}`);
  } catch (err) {
    console.error(err);
  }
}
part1();

const part2 = () => {
  try {
    const input = readFileSync('./day1/input.txt', 'utf8');
    const elfRations = input.split('\n\n').map(elf => elf.split('\n').reduce((acc, i)=> {
      acc += parseInt(i);
      return acc;
    }, 0)).sort(function(a, b){return b-a});
    const sumTopThree = parseInt(elfRations[0]) + parseInt(elfRations[1]) + parseInt(elfRations[2]);
    console.log(`Part 2. max food carried by top 3 elves: ${sumTopThree}`);
  } catch (err) {
    console.error(err);
  }
}
part2();