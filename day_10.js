import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/10/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let mapInitial = normalizeData(data);
    console.log('answer part 1', getFinalAnswer(mapInitial));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let normalizeData = data.trim().split('\n');
  let finalData = normalizeData.map(row => row.split('').map(Number)); 
  return finalData;
}

function findStartPoints(map) {
  let startPointsArr = [];
  for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] === 0) {
            startPointsArr.push([x, y]);
          }
      }
  }
  return startPointsArr;
}

function getPath(x, y, map) {
  let queue = [[x, y]];
  let visited = new Set();
  visited.add(`${x},${y}`);
  let score = 0;

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; //получение новых точек из исходной

  while (queue.length > 0) {
      let [currentX, currentY] = queue.shift();
      let currentHeight = map[currentY][currentX];

      if (currentHeight === 9) {
          score++;
      }

      for (let [dx, dy] of directions) {
          let nx = currentX + dx;
          let ny = currentY + dy;

          if (nx >= 0 && ny >= 0 && nx < map[0].length && ny < map.length) {
              let nextHeight = map[ny][nx];
              if (!visited.has(`${nx},${ny}`) && nextHeight === currentHeight + 1) {
                  visited.add(`${nx},${ny}`);
                  queue.push([nx, ny]);
              }
          }
      }
  }

  return score;
}

function getFinalAnswer(map) {
  let startPointsArr = findStartPoints(map);
  let totalScore = 0;

  for (let [x, y] of startPointsArr) {
      totalScore += getPath(x, y, map);
  }

  return totalScore;
}
