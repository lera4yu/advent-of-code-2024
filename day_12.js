import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/12/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let gardenMap = normalizeData(data);
    console.log(gardenMap);
    console.log(getPrice(gardenMap));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let normalizeData = data.trim().split('\n');
  let finalData = normalizeData.map(row => row.split(''));
  return finalData;
}

//получаем площадь и периметр, решение схоже с днем 10
function calculatePlant(gardenMap, visited, row, col, plantType) {
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0] //вспомогатели для обхода
  ];

  let area = 0;
  let perimeter = 0;
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [r, c] = stack.pop();

    if (visited[r][c]) continue;
    visited[r][c] = true;
    area++;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= gardenMap.length || nc < 0 || nc >= gardenMap[0].length || gardenMap[nr][nc] !== plantType) {
        perimeter++;
      } else if (!visited[nr][nc]) {
        stack.push([nr, nc]);
      }
    }
  }

  return { area, perimeter };
}

function getPrice(gardenMap) {
  const visited = Array.from({ length: gardenMap.length }, () => Array(gardenMap[0].length).fill(false));

  let price = 0;

  for (let r = 0; r < gardenMap.length; r++) {
    for (let c = 0; c < gardenMap[0].length; c++) {
      if (!visited[r][c]) {
        const plantType = gardenMap[r][c];
        const { area, perimeter } = calculatePlant(gardenMap, visited, r, c, plantType);
        price += area * perimeter;
      }
    }
  }

  return price;
}
