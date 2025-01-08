import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/18/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`
    let bytePositions = normalizeData(data);
    let Xmax = 70;
    let Ymax = 70;
    let finalMap = getMapAfterKiloByte(bytePositions, Xmax, Ymax);
    //console.log(finalMap.map(subArray => subArray.join('')).join('\n'));
    let path = findShortestPath(finalMap);
    // console.log(path.map(subArray => subArray.join('')).join('\n'));
    console.log('answer part 1', countPath(path));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let normalizeData = data.trim().split('\n');
  let finalData = normalizeData.map(row => row.split(',').map(Number));
  return finalData;
}

function getMapAfterKiloByte(bytePositions, Xmax, Ymax) {
  let finalMap = Array.from({ length: Ymax + 1 }, () => Array(Xmax + 1).fill('.'));
  let count = 0;
  for (let byte = 0; byte < bytePositions.length; byte++) {
    if (count < 1024) {
      let posX = bytePositions[byte][0];
      let posY = bytePositions[byte][1];
      finalMap[posY][posX] = '#';
      count += 1;
    }
  }
  return finalMap;
}

function findShortestPath(map) {
  let directions = [
    [0, 1],   //вправо
    [1, 0],   //вниз
    [0, -1],  //влево
    [-1, 0]   //вверх
  ];
  let rows = map.length;
  let cols = map[0].length;
  let queue = [[0, 0]]; //очередь для BFS
  let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let prev = Array.from({ length: rows }, () => Array(cols).fill(null)); //для восстановления пути

  visited[0][0] = true;

  while (queue.length > 0) {
    let [x, y] = queue.shift();

    if (x === rows - 1 && y === cols - 1) {
      break; //достигли выхода
    }

    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !visited[nx][ny] && map[nx][ny] === '.') {
        queue.push([nx, ny]);
        visited[nx][ny] = true;
        prev[nx][ny] = [x, y]; //сохраняем предыдущую клетку
      }
    }
  }

  //восстановление пути
  let [x, y] = [rows - 1, cols - 1];
  while (x !== null && y !== null) {
    map[x][y] = 'O';
    let next = prev[x][y];
    if (next === null) break;
    [x, y] = next;
  }

  return map;
}

function countPath(map) {
  let finalSum = -1; //так как steps на один меньше чем позиций
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'O') {
        finalSum += 1;
      }
    }
  }
  return finalSum;
}