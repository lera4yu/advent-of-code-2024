import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/14/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = `p=0,4 v=3,-3
    p=6,3 v=-1,-3
    p=10,3 v=-1,2
    p=2,0 v=2,-1
    p=0,0 v=1,3
    p=3,0 v=-2,-2
    p=7,6 v=-1,-3
    p=3,0 v=-1,-2
    p=9,3 v=2,3
    p=7,3 v=-1,2
    p=2,4 v=2,-3
    p=9,5 v=-3,-3`
    let dataObj = normalizeData(data);
    let xMax = 101;
    let yMax = 103;
    let newPosObj = getNewPos(dataObj, 100, xMax, yMax);
    let field = getFieldInitial(newPosObj, xMax, yMax);
    console.log('answer part 1', getFinalAnswer(field, xMax, yMax));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(input) {
  //p=74,51 v=36,-94
  const regex = /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/g;
  const result = [];

  let match;
  while ((match = regex.exec(input)) !== null) {
    const obj = {
      p: { x: parseInt(match[1], 10), y: parseInt(match[2], 10) },
      v: { x: parseInt(match[3], 10), y: parseInt(match[4], 10) }
    };
    result.push(obj);
  }

  return result;
}

function getFieldInitial(dataObj, xMax, yMax) {
  let fieldArr = Array.from({ length: yMax }, () => Array(xMax).fill(0));

  for (let robot of dataObj) {
    let posX = robot.p.x;
    let posY = robot.p.y;
    fieldArr[posY][posX] += 1;
  }

  return fieldArr;
}

function getNotDirtyPos(dirtyPos, maxPos) {
  let newPos;
  if (dirtyPos < 0) {
    newPos = maxPos - Math.abs(dirtyPos) % maxPos;
  } else if (dirtyPos > maxPos) {
    newPos = dirtyPos % maxPos;
  } else {
    newPos = dirtyPos;
  }

  if (newPos === maxPos) {
    newPos = 0;
  }
  return newPos
}

function getNewPos(dataObj, time, xMax, yMax) {
  for (let robot in dataObj) {
    let posX = dataObj[robot].p.x;
    let posY = dataObj[robot].p.y;
    let moveX = dataObj[robot].v.x;
    let moveY = dataObj[robot].v.y;

    let offsetX = moveX * time;
    let offsetY = moveY * time;

    let dirtyPosX = offsetX + posX;
    let dirtyPosY = offsetY + posY;

    let newPosX = getNotDirtyPos(dirtyPosX, xMax);
    let newPosY = getNotDirtyPos(dirtyPosY, yMax);
    Object.assign(dataObj[robot].p, { x: newPosX, y: newPosY });
  }
  return dataObj;
}

function getFinalAnswer(shield, xMax, yMax) {
  let squareBorderX = (xMax - 1) / 2;
  let squareBorderY = (yMax - 1) / 2;
  let square1 = 0;
  let square2 = 0;
  let square3 = 0;
  let square4 = 0;
  for (let i = 0; i < shield.length; i++) {
    for (let j = 0; j < shield[i].length; j++) {
      if (i < squareBorderY) {
        if (j < squareBorderX) {
          square1 += shield[i][j];
        } else if (j > squareBorderX) {
          square2 += shield[i][j];
        }
      } else if (i > squareBorderY) {
        if (j < squareBorderX) {
          square3 += shield[i][j];
        } else if (j > squareBorderX) {
          square4 += shield[i][j];
        }
      }
    }
  }
  console.log(square1, square2, square3, square4);
  return square1 * square2 * square3 * square4
}