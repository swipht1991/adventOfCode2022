import {readFileSync} from 'fs';

const charValueMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
}

const part1 = () => {
  
  try {
    const input = readFileSync('./day3/input.txt', 'utf8');

    const rows = input.split('\n');

    let sum = 0;

    rows.forEach(i => {
      if(i.length %2 !== 0 ){
        throw new Error('Odd length row: ', i);
      }

      const first = i.substring(0, i.length / 2);
      const second = i.substring(i.length/2, i.length);

      let char;
      for (let index in first) {
        if(second.indexOf(first[index]) !== -1){
          char = first[index];
          break;
        }
      }

      const isUpper = char === char.toUpperCase();

      sum += (isUpper ? 26 : 0) + charValueMap[char.toLowerCase()];

    });
    
    console.log(`Part 1. sum: ${sum}`);
  } catch (err) {
    console.error(err);
  }
}
part1();

const part2 = () => {
  
  try {
    const input = readFileSync('./day3/input.txt', 'utf8');

    const rows = input.split('\n');

    let sum = 0;

    for(let i = 0; i < rows.length; i += 3){
      let char;
      for (let index in rows[i]) {
        if(rows[i+1].indexOf(rows[i][index]) !== -1 && rows[i+2].indexOf(rows[i][index]) !== -1 ){
          char = rows[i][index];
          break;
        }
      }
      const isUpper = char === char.toUpperCase();
      sum += (isUpper ? 26 : 0) + charValueMap[char.toLowerCase()];
    }
    
    console.log(`Part 2. sum: ${sum}`);
  } catch (err) {
    console.error(err);
  }
}
part2();