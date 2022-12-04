import {readFileSync} from 'fs';

const part1 = () => {
  try {
    const input = readFileSync('./day4/input.txt', 'utf8');
    let overlapCount = 0;
    input.split('\n').forEach(row => {
      const [first, second] = row.split(',');
      const [min1, max1] = first.split('-');
      const [min2, max2] = second.split('-');
      if(
        (parseInt(min1) <= parseInt(min2) && parseInt(max1) >= parseInt(max2)) ||
        (parseInt(min2) <= parseInt(min1) && parseInt(max2) >= parseInt(max1))
        ){
          overlapCount++;
      }
    });
    
    console.log(`Part 1. overlap count: ${overlapCount}`);
  } catch (err) {
    console.error(err);
  }
}
part1();

const part2 = () => {

  try {
    const input = readFileSync('./day4/input.txt', 'utf8');
    let overlapCount = 0;
    input.split('\n').forEach(row => {
      const [first, second] = row.split(',');
      const [min1, max1] = first.split('-');
      const [min2, max2] = second.split('-');

      const intMin1 = parseInt(min1);
      const intMax1 = parseInt(max1);
      const intMin2 = parseInt(min2);
      const intMax2 = parseInt(max2);

      let isOverlap = false;

      // was struggling to find the optimal logic, so just going to brute force it
      for(let i = intMin1; i <= intMax1; i++){
        if(i === intMin2 || i === intMax2){
          isOverlap = true;
          break;
        }
      }

      for(let i = intMin2; i <= intMax2; i++){
        if(i === intMin1 || i === intMax1){
          isOverlap = true;
          break;
        }
      }

      overlapCount += isOverlap ? 1 : 0;
    });
    
    console.log(`Part 2. overlap count: ${overlapCount}`);
  } catch (err) {
    console.error(err);
  }
}
part2();