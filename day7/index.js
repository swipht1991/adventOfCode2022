import {readFileSync} from 'fs';
const getDirId = (arrDirPath) => arrDirPath.join('#');
const part1 = () => {
  try {
    const input = readFileSync('./day7/input.txt', 'utf8');
    const rows = input.split('\n');
    
    const dirHasHadLsRun = {};
    const dirSizes = {};
    let currentDir = [];
    rows.forEach(row => {
      if(row[0] === '$'){
        const cmd = row.split(' ')[1];
        if(cmd === 'cd'){
          const dir = row.split(' ')[2];
          if(dir === '/'){
            currentDir = ['/'];
          }else if(dir === '..'){
            currentDir.pop();
          }else{
            currentDir.push(dir);
          }
        }else if(cmd === 'ls'){
          if(!dirHasHadLsRun[getDirId(currentDir)]){
            dirHasHadLsRun[getDirId(currentDir)] = true;
          }else{
            throw new Error('double ls!');
          }
        }
      }else{
        const isDir = row.split(' ')[0] === 'dir'
        if(isDir){
          // we can do something when we cd to dir
        }else{
          const fileSize = row.split(' ')[0];

          //add this file size to dir and all parent dirs
          currentDir.forEach( (_dir, index) => {
            const dirPath = currentDir.slice(0, index + 1);
            if(typeof dirSizes[getDirId(dirPath)] === 'undefined'){
              dirSizes[getDirId(dirPath)] = 0;
            }
            dirSizes[getDirId(dirPath)] += parseInt(fileSize);
          });
        }
      }
    });


    console.log(`Part 1. answer: ${Object.keys(dirSizes).reduce((acc, i) => {
      if(dirSizes[i] <= 100000){
        acc += dirSizes[i];
      }

      return acc;
    }, 0)}`);
  } catch (err) {
    console.error(err);
  }
}
part1();



const part2 = () => {
  try {
    const input = readFileSync('./day7/input.txt', 'utf8');
    const rows = input.split('\n');
    
    const dirHasHadLsRun = {};
    const dirSizes = {};
    let currentDir = [];
    rows.forEach(row => {
      if(row[0] === '$'){
        const cmd = row.split(' ')[1];
        if(cmd === 'cd'){
          const dir = row.split(' ')[2];
          if(dir === '/'){
            currentDir = ['/'];
          }else if(dir === '..'){
            currentDir.pop();
          }else{
            currentDir.push(dir);
          }
        }else if(cmd === 'ls'){
          if(!dirHasHadLsRun[getDirId(currentDir)]){
            dirHasHadLsRun[getDirId(currentDir)] = true;
          }else{
            throw new Error('double ls!');
          }
        }
      }else{
        const isDir = row.split(' ')[0] === 'dir'
        if(isDir){
          // we can do something when we cd to dir
        }else{
          const fileSize = row.split(' ')[0];

          //add this file size to dir and all parent dirs
          currentDir.forEach( (_dir, index) => {
            const dirPath = currentDir.slice(0, index + 1);
            if(typeof dirSizes[getDirId(dirPath)] === 'undefined'){
              dirSizes[getDirId(dirPath)] = 0;
            }
            dirSizes[getDirId(dirPath)] += parseInt(fileSize);
          });
        }
      }
    });

    // console.log('dirSizes ', dirSizes);
    // console.log('used space: ', dirSizes['/']);
    const unusedSpace = 70000000 - dirSizes['/'];
    const sizeNeeded = 30000000 - unusedSpace;
    // console.log('unusedSpace', unusedSpace);
    // console.log('sizeNeeded', sizeNeeded);

    let deleteSize = dirSizes['/'];
    Object.keys(dirSizes).forEach(dir => {
      if(dirSizes[dir] >= sizeNeeded && dirSizes[dir] < deleteSize){
        deleteSize = dirSizes[dir]
      }
    });


    // const answerDirSplit = deleteDir.split('#');
    console.log(`Part 2. answer: ${deleteSize}`);
  } catch (err) {
    console.error(err);
  }
}
part2();
