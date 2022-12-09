import {readFileSync} from 'fs';

const moveOneSpace = (direction, currentX, currentY) => {
  switch(direction){
    case 'U':
      return [currentX, currentY - 1];
    case 'D':
      return [currentX, currentY + 1];
    case 'R':
      return [currentX + 1, currentY];
    case 'L':
      return [currentX - 1, currentY];
    default:
      throw new Error('invalid direction')
  }
};



const part1 = () => {
  const moveTail = ({headX, headY, tailX, tailY}) => {
    // move tail if needed, check diagonal first
  
    const right = headX - tailX > 1;
    const left = headX - tailX < -1;
    const down = headY - tailY > 1;
    const up = headY - tailY < -1;

  
    if(right){    // more than 1 space R
      [tailX, tailY] = moveOneSpace('R', tailX, tailY);
      tailY = headY;
    }
    if(left){    // more than 1 space L
      [tailX, tailY] = moveOneSpace('L', tailX, tailY);
      tailY = headY;
    }
    if(down){    // more than 1 space D
      [tailX, tailY] = moveOneSpace('D', tailX, tailY);
      tailX = headX;
    }
    if(up){    // more than 1 space U
      [tailX, tailY] = moveOneSpace('U', tailX, tailY);
      tailX = headX;
    }
  
    return [tailX, tailY];
  }
  try {
    const input = readFileSync('./day9/input.txt', 'utf8');
    const rows = input.split('\n');

    // initialize matrix
    const MATRIX_SIZE = 500;  // just guessing what this needs to be based on input...not a great way to do it
    const matrix = [];
    for(let i = 0; i < MATRIX_SIZE; i++){
      matrix.push([]);
      for(let j = 0; j < MATRIX_SIZE; j++){
        matrix[i].push('.');
      }
    }

    //starting in middle
    const START_X = MATRIX_SIZE/2;
    const START_Y = MATRIX_SIZE/2;

    let headX = START_X;
    let headY = START_Y;
    let tailX = START_X;
    let tailY = START_Y;

    matrix[START_Y][START_X] = true;  // mark start as visited

    rows.forEach(row => {
      const [direction, moves] = row.split(' ');

      let numMoves = parseInt(moves);
      while(numMoves > 0){
        [headX, headY] = moveOneSpace(direction, headX, headY);
        [tailX, tailY] = moveTail({headX, headY, tailX, tailY});
        matrix[tailY][tailX] = true;

        numMoves--;
      }

    });

    let visited = 0;
    matrix.forEach(row => {
      row.forEach(cell => {
        if(cell !== '.'){
          visited++;
        }
      })
    });


    console.log(`Part 1. answer: ${visited}`);
  } catch (err) {
    console.error(err);
  }
}
part1();


const part2 = () => {
  const moveTail = ({headX, headY, tailX, tailY}) => {
    // move tail if needed, check diagonal first

  
    const right = headX - tailX > 1;
    const left = headX - tailX < -1;
    const down = headY - tailY > 1;
    const up = headY - tailY < -1;
  
    // need to cover diagonal move from head when already diagonally behind
    if(right && up){
      return [tailX + 1, tailY - 1];
    }
    if(right && down){
      return [tailX + 1, tailY + 1];
    }
    if(left && up){
      return [tailX - 1, tailY - 1];
    }
    if(left && down){
      return [tailX - 1, tailY + 1];
    }
  
    if(right){    // more than 1 space R
      [tailX, tailY] = moveOneSpace('R', tailX, tailY);
      tailY = headY;
    }else if(left){    // more than 1 space L
      [tailX, tailY] = moveOneSpace('L', tailX, tailY);
      tailY = headY;
    }else if(down){    // more than 1 space D
      [tailX, tailY] = moveOneSpace('D', tailX, tailY);
      tailX = headX;
    }else if(up){    // more than 1 space U
      [tailX, tailY] = moveOneSpace('U', tailX, tailY);
      tailX = headX;
    }
  
    return [tailX, tailY];
  }
  try {
    const input = readFileSync('./day9/input.txt', 'utf8');
    const rows = input.split('\n');

    // initialize matrix
    const MATRIX_SIZE = 500;  // just guessing what this needs to be based on input...not a great way to do it
    const matrix = [];
    for(let i = 0; i < MATRIX_SIZE; i++){
      matrix.push([]);
      for(let j = 0; j < MATRIX_SIZE; j++){
        matrix[i].push('.');
      }
    }

    //starting in middle
    const START_X = MATRIX_SIZE/2;
    const START_Y = MATRIX_SIZE/2;

    const knots = Array(10).fill().map(i => [START_X, START_Y]);
    matrix[START_Y][START_X] = true;  // mark start as visited

    rows.forEach((row, debug_index) => {
      const [direction, moves] = row.split(' ');

      let numMoves = parseInt(moves);
      while(numMoves > 0){
        // move knots starting with first (head)
        knots.forEach((i, index) => {
          if(index === 0){
            [i[0], i[1]] = moveOneSpace(direction, i[0], i[1]);
          }else{
            [i[0], i[1]] = moveTail({headX: knots[index-1][0], headY: knots[index-1][1],tailX: i[0], tailY: i[1]});
          }
        });
        matrix[knots[knots.length -1][0]][knots[knots.length -1][1]] = true;
        numMoves--;
      }
    });
    let visited = 0;
    matrix.forEach(row => {
      row.forEach(cell => {
        if(cell !== '.'){
          visited++;
        }
      })
    });


    console.log(`Part 2. answer: ${visited}`);
  } catch (err) {
    console.error(err);
  }
}
part2();