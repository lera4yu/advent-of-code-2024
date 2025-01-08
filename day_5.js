import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/5/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let { rulesDict, updates } = normalizeData(data);
    normalizeUpdatesArray(rulesDict, updates);
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let regex = /^\d+\|\d+$/;
  let rules = [];
  let updates = []
  let normalizeData = data.trim().split('\n');
  for (let i = 0; i < normalizeData.length; i++) {
    if (regex.test(normalizeData[i])) {
      rules.push(normalizeData[i]);
    } else if (normalizeData[i] != '') {
      updates.push(normalizeData[i]);
    }
  }

  updates = updates.map(item => item.split(',').map(Number));

  //преобразование в словарь
  let rulesDict = {};

  for (let pair of rules) {
    let [key, value] = pair.split('|').map(Number);
    if (!rulesDict[key]) {
      rulesDict[key] = [];
    }
    rulesDict[key].push(value);
  }

  return { rulesDict, updates };
}

function checkUpdates(rulesDict, updatesArray) {
  let arrayOfNormalUpdates = [];
  for (let i = 0; i < updatesArray.length; i++) {
    let isNormal = true;
    for (let j = 0; j < updatesArray[i].length; j++) {
      if (updatesArray[i][j] in rulesDict) {
        for (let k = 0; k < j; k++) {
          if (rulesDict[updatesArray[i][j]].includes(updatesArray[i][k])) {
            isNormal = false;
            break;
          }
        }
        if (!isNormal) {
          break;
        }
      }
    }
    if (isNormal) {
      arrayOfNormalUpdates.push(updatesArray[i]);
    }
  }

  let answerPartOne = 0;
  for (let i = 0; i < arrayOfNormalUpdates.length; i++) {
    answerPartOne += arrayOfNormalUpdates[i][((arrayOfNormalUpdates[i].length - 1) / 2)]
  }

  console.log('part1', answerPartOne);

  const notNormalArrays = updatesArray.filter(item => !arrayOfNormalUpdates.includes(item));
  return notNormalArrays;
}

function normalizeUpdatesArray(rulesDict, updatesArray) {
  let arrayofNotNormalArrays = checkUpdates(rulesDict, updatesArray);
  let arrayofNormalizeArrays = []
  let answerPartTwo = 0
  for (let i = 0; i < arrayofNotNormalArrays.length; i++) {
    arrayofNormalizeArrays.push(editUpdatesArrayToNormal(arrayofNotNormalArrays[i], rulesDict))
    answerPartTwo += arrayofNormalizeArrays[i][((arrayofNormalizeArrays[i].length - 1) / 2)];
  }
  console.log('part2', answerPartTwo);
  
}

function editUpdatesArrayToNormal(notNormalArray, rulesDict) {
  let sortedArray = [];
  let visited = new Set(); //внутри будут только уникальные значения

  //функция для рекурсии проверок
  function visit(updateItem) {
    if (visited.has(updateItem)) return;
    visited.add(updateItem);

    if (rulesDict[updateItem]) {
      for (let rulesItem of rulesDict[updateItem]) {
        if (notNormalArray.includes(rulesItem)) {
          visit(rulesItem);
        }
      }
    }

    if (notNormalArray.includes(updateItem)) {
      sortedArray.push(updateItem);
    }
  }

  for (let updateItem of notNormalArray) {
    visit(updateItem);
  }

  return sortedArray;
}
