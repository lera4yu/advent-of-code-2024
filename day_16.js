import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/16/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let map = normalizeData(data);
    let startX = map.findIndex(row => row.includes('S'));
    let startY = map[startX].indexOf('S');
    let endX = map.findIndex(row => row.includes('E'));
    let endY = map[endX].indexOf('E');
    let lowestScore = bfs(map, startX, startY, endX, endY);
    console.log("Lowest score:", lowestScore);

  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let map = data.split("\n").map(row => row.split(""));
  return map;
}

function bfs(map, startX, startY, endX, endY) {
  let directions = ['N', 'E', 'S', 'W'];
  let moveDelta = {
    'N': [-1, 0],
    'E': [0, 1],
    'S': [1, 0],
    'W': [0, -1]
  };

  let rows = map.length;
  let cols = map[0].length;
  let queue = [];
  let visited = new Set();

  //начальная точка
  queue.push([startX, startY, 'E', 0]);
  visited.add(`${startX},${startY},E`);
  while (queue.length > 0) {
    let [x, y, dir, score] = queue.shift();
    if (x === endX && y === endY) {
      return score;
    }
    let [dx, dy] = moveDelta[dir];
    let newX = x + dx;
    let newY = y + dy;
    if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && map[newX][newY] !== '#') {
      let newState = `${newX},${newY},${dir}`;
      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push([newX, newY, dir, score + 1]);
      }
    }

    //повороты на 90
    let newDirClockwise = directions[(directions.indexOf(dir) + 1) % 4];
    let newStateClockwise = `${x},${y},${newDirClockwise}`;
    if (!visited.has(newStateClockwise)) {
      visited.add(newStateClockwise);
      queue.push([x, y, newDirClockwise, score + 1000]);
    }

    let newDirCounterclockwise = directions[(directions.indexOf(dir) + 3) % 4];
    let newStateCounterclockwise = `${x},${y},${newDirCounterclockwise}`;
    if (!visited.has(newStateCounterclockwise)) {
      visited.add(newStateCounterclockwise);
      queue.push([x, y, newDirCounterclockwise, score + 1000]);
    }
  }

  return -1;
}