import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/15/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`
    let { map, commands } = normalizeData(data);
    map.forEach(row => console.log(row.join("")));
    console.log(commands);
    let newMap = getNewRobotPosition(map, commands);
    newMap.forEach(row => console.log(row.join("")));
    let { gpsCoordinates, finalAnswer } = calculateGPSCoordinates(newMap);
    console.log('gps array', gpsCoordinates);
    console.log('answer part 1', finalAnswer);
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let [mapData, commandData] = data.trim().split("\n\n");
  let map = mapData.split("\n").map(row => row.split(""));
  let commands = commandData.trim();
  return { map, commands };
}

function isInsideMap(x, y, map) {
  return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}

function move(map, command) {
  let deltaX = 0, deltaY = 0;
  let xZero = 0, yZero = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") {
        xZero = i;
        yZero = j;
        break;
      }
    }
  }

  if (command === "^") deltaX = -1;
  if (command === "v") deltaX = 1;
  if (command === "<") deltaY = -1;
  if (command === ">") deltaY = 1;

  let nextX = xZero + deltaX;
  let nextY = yZero + deltaY;

  if (isInsideMap(nextX, nextY, map) && map[nextX][nextY] === ".") { //просто двигаем
    map[xZero][yZero] = ".";
    map[nextX][nextY] = "@";
    xZero = nextX;
    yZero = nextY;
  } else if (isInsideMap(nextX, nextY, map) && map[nextX][nextY] === "O") {
    let boxes = [];
    let boxX = nextX;
    let boxY = nextY;
    while (isInsideMap(boxX, boxY, map) && map[boxX][boxY] === "O") { //собираем все коробки по пути
      boxes.push([boxX, boxY]);
      boxX += deltaX;
      boxY += deltaY;
    }
    if (isInsideMap(boxX, boxY, map) && map[boxX][boxY] === ".") { //можем ли толкнуть все коробки
      for (let i = boxes.length - 1; i >= 0; i--) { //двигаем коробки
        let [currentX, currentY] = boxes[i];
        map[currentX + deltaX][currentY + deltaY] = "O";
        map[currentX][currentY] = ".";
      }
      //двигаем робота
      map[xZero][yZero] = ".";
      map[nextX][nextY] = "@";
      xZero = nextX;
      yZero = nextY;
    }
  }
  return map;
}

function getNewRobotPosition(map, commands) {
  for (let command of commands) {
    map = move(map, command);
  }
  return map;
}

function calculateGPSCoordinates(map) {
  let gpsCoordinates = [];
  let finalAnswer = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'O') {
        let gps = 100 * i + j;
        gpsCoordinates.push(gps);
      }
    }
  }
  for (let gps in gpsCoordinates) {
    finalAnswer += gpsCoordinates[gps];
  }
  console.log(gpsCoordinates, finalAnswer);

  return { gpsCoordinates, finalAnswer };
}
