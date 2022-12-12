import {readFileSync} from 'fs';

const part1 = () => {
  const getLastNumber = input => parseInt(input.split(' ')[input.split(' ').length - 1].trim())
  try {
    const input = readFileSync('./day11/input.txt', 'utf8');
    const monkeysInput = input.split('\n\n');

    const monkeys = [];
    monkeysInput.forEach((i, index) => {
      const [
        _monkey,
        starting,
        operation,
        test,
        trueOutcome,
        falseOutcome
      ] = i.split('\n');
      const items = starting.split(':')[1].split(',').map(item => parseInt(item.trim()));
      const operationFunc = num => {
        return eval(operation.split('=')[1].trim().replaceAll('old', num));
      }
      monkeys[index] = {
        items,
        operationFunc,
        testDivisor: getLastNumber(test),
        trueMonkey: getLastNumber(trueOutcome),
        falseMonkey: getLastNumber(falseOutcome)
      };

      // console.log(`monkey ${index}: ${i}`);
    });

    const monkeyCounts = monkeys.map(i => 0);

    for(let i = 0; i < 20; i++){
      monkeys.forEach((monkey, monkeyIndex) => {
        // for each item
        monkey.items.forEach((item, index) => {
          monkeyCounts[monkeyIndex]++;
          // console.log(`monkey#${monkeyIndex} item worry#${item}`);
          // apply operation
          item = monkey.operationFunc(item);
  
          // divide by 3 (floor it)
          item = Math.floor(item / 3);
  
          // take action on it
          // console.log(`new item${item} divisor${monkey.testDivisor}`);
          if(item % monkey.testDivisor === 0){
            monkeys[monkey.trueMonkey].items.push(item);
          }else{
            monkeys[monkey.falseMonkey].items.push(item);
          }
  
          // remove item from this monkey
          // monkey.items.splice(index, 1);
        });
        monkey.items = [];
      });
    }

    
    monkeyCounts.sort((a,b) => b - a);
    // monkeys.forEach(i => console.log(i.items))
    // console.log('monkeyCounts', monkeyCounts);

    console.log(`Part 1. answer: ${monkeyCounts[0] * monkeyCounts[1]}`);
  } catch (err) {
    console.error(err);
  }
}
part1();

const part2 = () => {
  function leastCommonMultiple(input) {

    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = input[0];
    input.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}
  const getLastNumber = input => parseInt(input.split(' ')[input.split(' ').length - 1].trim())
  try {
    const input = readFileSync('./day11/input.txt', 'utf8');
    const monkeysInput = input.split('\n\n');

    const monkeys = [];
    monkeysInput.forEach((i, index) => {
      const [
        _monkey,
        starting,
        operation,
        test,
        trueOutcome,
        falseOutcome
      ] = i.split('\n');
      const items = starting.split(':')[1].split(',').map(item => parseInt(item.trim()));
      const operationFunc = num => {
        return eval(operation.split('=')[1].trim().replaceAll('old', num));
      }
      monkeys[index] = {
        items,
        operationFunc,
        testDivisor: getLastNumber(test),
        trueMonkey: getLastNumber(trueOutcome),
        falseMonkey: getLastNumber(falseOutcome)
      };

      // console.log(`monkey ${index}: ${i}`);
    });

    const monkeyCounts = monkeys.map(i => 0);

    const lcm = leastCommonMultiple(monkeys.map(i => i.testDivisor).sort((a,b) => a-b));
    // console.log('lcm:', lcm);

    for(let i = 0; i < 10000; i++){
      monkeys.forEach((monkey, monkeyIndex) => {
        // for each item
        monkey.items.forEach((item, index) => {
          monkeyCounts[monkeyIndex]++;
          item = monkey.operationFunc(item);
  
          // part 1 - divide by 3 (floor it)

          // Needed a hint that lcm was involved here, wasn't really following what to do and didn't see that numbers were getting huge.
          item = item % lcm;
  
          // take action on it
          if(item % monkey.testDivisor === 0){
            monkeys[monkey.trueMonkey].items.push(item);
          }else{
            monkeys[monkey.falseMonkey].items.push(item);
          }
        });
        monkey.items = [];
      });
    }

    // console.log('monkeyCounts', monkeyCounts);
    monkeyCounts.sort((a,b) => b - a);

    console.log(`Part 2. answer: ${monkeyCounts[0] * monkeyCounts[1]}`);
  } catch (err) {
    console.error(err);
  }
}
part2();
