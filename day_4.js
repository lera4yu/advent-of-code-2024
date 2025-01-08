import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/4/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    findXmas(normalizeData(data));
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let finalData = [];
  let normalizeData = data.trim().split('\n');
  for (let i = 0; i < normalizeData.length; i++) {
    finalData.push(normalizeData[i].split(""))
  }
  return finalData;
}

function findLetters(array) {
  let sumOfXmas = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length - 3; j++) { // чтобы не вылетать за длину массива при анализе слова
      if ((array[i][j] === 'X') && (array[i][j + 1] === 'M') && (array[i][j + 2] === 'A') && (array[i][j + 3] === 'S')) {
        sumOfXmas++;
      } else if ((array[i][j] === 'S') && (array[i][j + 1] === 'A') && (array[i][j + 2] === 'M') && (array[i][j + 3] === 'X')) {
        sumOfXmas++;
      }
    }
  }

  return sumOfXmas;
}

function findXmas(data) {
  let xmasDataArray = data;

  //базовый обход по горизонтали
  let horLettersXmas = findLetters(xmasDataArray);

  //обход по вертикали
  let transposedXmasDataArray = xmasDataArray[0].map((_, i) => xmasDataArray.map(row => row[i]));

  let vertLettersXmas = findLetters(transposedXmasDataArray);

  //обход по главной диагонали
  let mainDiagonalsXmasDataArray = [];

  for (let sumOfInd = 0; sumOfInd < xmasDataArray.length + xmasDataArray[0].length - 1; sumOfInd++) {
    let diagonal = [];
    for (let i = 0; i < xmasDataArray.length; i++) {
      let j = sumOfInd - i;
      if (j >= 0 && j < xmasDataArray[0].length) {
        diagonal.push(xmasDataArray[i][j]);
      }
    }
    mainDiagonalsXmasDataArray.push(diagonal);
  }

  let mainDiagLettersXmas = findLetters(mainDiagonalsXmasDataArray);

  //обход по побочной диагонали
  let sideDiagonalsXmasDataArray = [];

  for (let diff = -(xmasDataArray.length - 1); diff <= xmasDataArray[0].length - 1; diff++) {
    let diagonal = [];
    for (let i = 0; i < xmasDataArray.length; i++) {
      let j = i - diff;
      if (j >= 0 && j < xmasDataArray[0].length) {
        diagonal.push(xmasDataArray[i][j]);
      }
    }
    sideDiagonalsXmasDataArray.push(diagonal);
  }

  let sideDiagLettersXmas = findLetters(sideDiagonalsXmasDataArray);

  console.log('answer part 1', horLettersXmas + vertLettersXmas + mainDiagLettersXmas + sideDiagLettersXmas);

  console.log('answer part 2', findXmasPartTwo(xmasDataArray));
}

function findXmasPartTwo(data) {
  let xmasDataArray = data;
  let sumOfXmas = 0;

  for (let i = 1; i < xmasDataArray.length - 1; i++) { // чтобы не вылетать за длину массива при анализе слова
    for (let j = 1; j < xmasDataArray[i].length - 1; j++) { // чтобы не вылетать за длину массива при анализе слова
      if (((xmasDataArray[i][j] === 'A') && (xmasDataArray[i - 1][j - 1] === 'M') && (xmasDataArray[i + 1][j + 1] === 'S')) // ищем первую диагональ иксов с основой в букве А
        || ((xmasDataArray[i][j] === 'A') && (xmasDataArray[i - 1][j - 1] === 'S') && (xmasDataArray[i + 1][j + 1] === 'M'))) { // смотрим на вторую диагональ
        if (((xmasDataArray[i - 1][j + 1] === 'M') && (xmasDataArray[i + 1][j - 1] === 'S'))
          || ((xmasDataArray[i - 1][j + 1] === 'S') && (xmasDataArray[i + 1][j - 1] === 'M'))) {
          sumOfXmas++;
        }

      }
    }
  }

  return sumOfXmas;
}