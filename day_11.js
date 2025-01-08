import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/11/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let initialStones = normalizeData(data);
    console.log(initialStones);
    let ansPOne = getAllIterations(initialStones, 25);
    console.log('answer part 1', ansPOne.length);
    // console.log('answer part 2', getAllIterations(ansPOne, 50));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let normalizeData = data;
  let finalData = normalizeData.split(' ').map(Number);
  return finalData;
}

function getOneIteration(stonesArr) {
  let newStonesArr = [];
  for (let i = 0; i < stonesArr.length; i++) {
    if (stonesArr[i] === 0) {
      newStonesArr.push(1);
    } else if (String(stonesArr[i]).length % 2 === 0) {
      let item = stonesArr[i];
      let len = String(item).length;
      let del = Math.pow(10, len / 2);
      newStonesArr.push(Math.floor(item / del));
      newStonesArr.push(item % del);
    } else {
      newStonesArr.push(stonesArr[i] * 2024);
    }
  }
  return newStonesArr;
}

function getAllIterations(stonesArr, count) {
  let result = stonesArr;
  for (let i = 0; i < count; i++) {
    result = getOneIteration(result);
    console.log(i);
  }
  return result;

}