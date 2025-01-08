import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/6/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let normalData = normalizeData(data);
    SecWay(normalData.finalData, normalData.yZero, normalData.xZero);
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let testData = ['....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...']
  let finalData = [];
  let yZero = 0, xZero = 0;
  let noramlizeData = data.trim().split('\n');
  finalData = noramlizeData.map((row, rowIndex) => row.split("").map((item, colIndex) => {
    if (item === '.') return true;
    if (item === '#') return false;
    if (item === '^') {
      yZero = rowIndex;
      xZero = colIndex;
      return true;
    }
  }));
  return { finalData, yZero, xZero };
}

function SecWay(mapArray, yZero, xZero) {
  let usedCoord = [];
  doingWay(yZero, xZero, 'up', mapArray, usedCoord);
  console.log('answer part 1', usedCoord.length + 1);
}

function addCoord(y, x, arr) {
  if (!arr.find(coord => coord[0] === y && coord[1] === x)) {
    arr.push([y, x]);
  }
  return arr;
}

function doingWay(y, x, way, map, usedCoord) {
  if (way === 'up' || way === 'down') {
    while (y <= map.length - 1 && y >= 0) {
      if ((y === 0 || y === map.length - 1) && (map[y][x])) {
        return;
      } else {
        if (way === 'up') {
          if (map[y][x]) {
            addCoord(y, x, usedCoord);
            y -= 1;
          } else {
            doingWay(y + 1, x + 1, 'right', map, usedCoord);
            return;
          }
        } else if (way === 'down') {
          if (map[y][x]) {
            addCoord(y, x, usedCoord);
            y += 1;
          } else {
            doingWay(y - 1, x - 1, 'left', map, usedCoord);
            return;
          }
        }
      }
    }
  } else if (way === 'left' || way === 'right') {
    while (x < map[y].length && x >= 0) {
      if ((x === 0 || x === map[y].length - 1) && (map[y][x])) {
        return;
      } else {
        if (way === 'right') {
          if (map[y][x]) {
            addCoord(y, x, usedCoord);
            x += 1;
          } else {
            doingWay(y + 1, x - 1, 'down', map, usedCoord);
            return;
          }
        } else if (way === 'left') {
          if (map[y][x]) {
            addCoord(y, x, usedCoord);
            x -= 1;
          } else {
            doingWay(y - 1, x + 1, 'up', map, usedCoord);
            return;
          }
        }
      }
    }
  }
}
