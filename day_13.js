import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/13/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = {
      buttonA: { x: 94, y: 34 },
      buttonB: { x: 22, y: 67 },
      prize: { x: 8400, y: 5400 }
    }
    let dataObj = normalizeData(data);
    console.log('answer part 1', getFinalAnswer(dataObj));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(input) {
  const regex = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push({
      buttonA: { x: parseInt(match[1]), y: parseInt(match[2]) },
      buttonB: { x: parseInt(match[3]), y: parseInt(match[4]) },
      prize: { x: parseInt(match[5]), y: parseInt(match[6]) }
    });
  }

  return matches;
}

function useCramerMethod(machine) {
  let coinsSum = 0;
  let determinant = machine.buttonA.x * machine.buttonB.y - machine.buttonA.y * machine.buttonB.x;
  if (determinant != 0) {
    let determinantX = machine.prize.x * machine.buttonB.y - machine.prize.y * machine.buttonB.x;
    let determinantY = machine.buttonA.x * machine.prize.y - machine.buttonA.y * machine.prize.x;
    let A = determinantX / determinant;
    let B = determinantY / determinant;
    if (A <= 100 && A >= 0 && B <= 100 && B >= 0 && Number.isInteger(A) && Number.isInteger(B)) {
      coinsSum = 3 * A + B
    }
  }
  return coinsSum;
}

function getFinalAnswer(dataObj) {
  let finalCoinsSum = 0;
  for (let machine in dataObj) {
    finalCoinsSum += useCramerMethod(dataObj[machine]);
  }
  return finalCoinsSum;
}