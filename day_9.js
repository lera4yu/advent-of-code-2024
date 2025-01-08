import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/9/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = '2333133121414131402'
    let dataInfo = normalizeData(data);
    console.log(getDataVisual(dataInfo));
    let modData = getOptimalString(dataInfo);
    console.log(getDataVisual(modData));
    console.log('answer part 1', getAnswerPartOne(modData));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  const str = data;
  let dataInfo = {};
  let id = 0;
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < str[i]; j++) {
        dataInfo[id] = i / 2;
        id += 1;
      }
    } else {
      for (let j = 0; j < str[i]; j++) {
        dataInfo[id] = -1;
        id += 1
      }
    }
  }
  return dataInfo;
}

function getDataVisual(dataInfo) {
  let dataVisualisation = '';
  for (let index in dataInfo) {
    if (dataInfo[index] === -1) {
      dataVisualisation += '.'
    } else {
      dataVisualisation += dataInfo[index];
    }
  }
  return dataVisualisation;
}

function getOptimalString(dataInfo) {
  let dataInfoArray = Object.entries(dataInfo)
  for (let i = dataInfoArray.length - 1; i >= 0; i--) {
    // console.log(getDataVisual(Object.fromEntries(dataInfoArray)));
    let movingItem = 0;
    if (dataInfoArray[i][1] != -1) { // находим элемент для мува
      movingItem = dataInfoArray[i][1];
      for (let j = 0; j < i; j++) {
        if (dataInfoArray[j][1] === -1) { // находим элемент с пустотой
          dataInfoArray[j][1] = movingItem;
          dataInfoArray[i][1] = -1; //перемещаем элемент и заменяем исходный на пустоту
          break;
        } else if (j === i - 1) {
          return Object.fromEntries(dataInfoArray)
        }
      }
    }
  }
}

function getAnswerPartOne(modifiedDataInfo) {
  let finalSum = 0;
  for (let index in modifiedDataInfo) {
    if (modifiedDataInfo[index] != -1) {
      finalSum += modifiedDataInfo[index] * index;
    }
  }
  return finalSum;
}