import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/8/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let { antCoords, mapLength, mapXLength } = normalizeData(data);
    console.log('answer 1', getAntiNods(antCoords, mapLength, mapXLength));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  const mapArray = data.trim().split('\n');
  let mapLength = mapArray.length;
  let mapXLength = mapArray[0].length;
  let antCoords = {};

  // Собираем все антенны с их координатами
  mapArray.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char !== ".") {
        if (!antCoords[char]) antCoords[char] = [];
        antCoords[char].push([x, y]);
      }
    });
  });

  return { antCoords, mapLength, mapXLength };
}

function getAntiNods(antennas, mapLen, mapXLen) {
  let antinodes = new Set();

  for (let freq in antennas) {
    let positions = antennas[freq];
    let n = positions.length;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let [x1, y1] = positions[i];
        let [x2, y2] = positions[j];

        //расстояние до антинодов по осям
        const dx = (x2 - x1);
        const dy = (y2 - y1);

        const antinode1 = [x1 - dx, y1 - dy];
        const antinode2 = [x2 + dx, y2 + dy];

        //пушим их, если нахождение в пределах карты
        if (antinode1[0] >= 0 && antinode1[0] < mapXLen && antinode1[1] >= 0 && antinode1[1] < mapLen) {
          antinodes.add(`${antinode1[0]},${antinode1[1]}`);
        }
        if (antinode2[0] >= 0 && antinode2[0] < mapXLen && antinode2[1] >= 0 && antinode2[1] < mapLen) {
          antinodes.add(`${antinode2[0]},${antinode2[1]}`);
        }
      }
    }
  }

  return antinodes.size;
}