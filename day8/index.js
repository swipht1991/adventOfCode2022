import {readFileSync} from 'fs';
const part1 = () => {
  try {
    const input = readFileSync('./day8/input.txt', 'utf8');
    const rows = input.split('\n');

    //build a map - probably not needed but seems easier to work with than arr of rows and string for cols
    const treeMap = [];
    rows.forEach((row, rowIndex) => {
      treeMap.push([]);
      for(let colIndex = 0; colIndex < row.length; colIndex++){
        treeMap[rowIndex].push(parseInt(row[colIndex]));
      }
    });

    let visibleTreeCount = 0;
    treeMap.forEach((row, rowIndex) => {
      row.forEach((treeHeight, colIndex) => {
        // exclude outer trees
        if(colIndex === 0 || rowIndex === 0 ||
          colIndex === treeMap[0].length - 1 || rowIndex === treeMap.length - 1
          ){
          visibleTreeCount++
          return;
        }

        let visibleLeft = true;
        //check left trees
        for(let j = colIndex - 1; j > -1; j--){
          if(treeMap[rowIndex][j] >= treeHeight){
            visibleLeft = false;
            break;
          }
        }

        let visibleRight = true;
        // check right
        for(let j = colIndex + 1; j < treeMap[0].length; j++){
          if(treeMap[rowIndex][j] >= treeHeight){
            visibleRight = false;
            break;
          }
        }

        let visibleUp = true;
        // check up
        for(let j = rowIndex - 1; j > - 1; j--){
          if(treeMap[j][colIndex] >= treeHeight){
            visibleUp = false;
            break;
          }
        }


        let visibleDown = true;
        // check down
        for(let j = rowIndex + 1; j < treeMap.length; j++){
          if(treeMap[j][colIndex] >= treeHeight){
            visibleDown = false;
            break;
          }
        }
        if(visibleUp || visibleDown || visibleLeft || visibleRight){
          visibleTreeCount++;
          return;
        }

      });
    });

    console.log(`Part 1. answer: ${visibleTreeCount}`);
  } catch (err) {
    console.error(err);
  }
}
part1();


const part2 = () => {
  try {
    const input = readFileSync('./day8/input.txt', 'utf8');
    const rows = input.split('\n');

    //build a map - probably not needed but seems easier to work with than arr of rows and string for cols
    const treeMap = [];
    rows.forEach((row, rowIndex) => {
      treeMap.push([]);
      for(let colIndex = 0; colIndex < row.length; colIndex++){
        treeMap[rowIndex].push(parseInt(row[colIndex]));
      }
    });

    let highestScenicScore = 0;
    treeMap.forEach((row, rowIndex) => {
      row.forEach((treeHeight, colIndex) => {
        // exclude outer trees, since one of their views is 0
        if(colIndex === 0 || rowIndex === 0 ||
          colIndex === treeMap[0].length - 1 || rowIndex === treeMap.length - 1
          ){
          return;
        }

        let visibleLeft = 0;
        //check left trees
        for(let j = colIndex - 1; j > -1; j--){
          visibleLeft++;
          if(treeMap[rowIndex][j] >= treeHeight){
            break;
          }
        }

        let visibleRight = 0;
        // check right
        for(let j = colIndex + 1; j < treeMap[0].length; j++){
          visibleRight++;
          if(treeMap[rowIndex][j] >= treeHeight){
            break;
          }
        }

        let visibleUp = 0;
        // check up
        for(let j = rowIndex - 1; j > - 1; j--){
          visibleUp++;
          if(treeMap[j][colIndex] >= treeHeight){
            break;
          }
        }


        let visibleDown = 0;
        // check down
        for(let j = rowIndex + 1; j < treeMap.length; j++){
          visibleDown++;
          if(treeMap[j][colIndex] >= treeHeight){
            break;
          }
        }

        const scenicScore = visibleUp * visibleDown * visibleLeft * visibleRight;
        highestScenicScore = scenicScore > highestScenicScore ? scenicScore : highestScenicScore;

      });
    });

    console.log(`Part 2. answer: ${highestScenicScore}`);
  } catch (err) {
    console.error(err);
  }
}
part2();


