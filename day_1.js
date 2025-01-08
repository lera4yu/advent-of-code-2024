import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/1/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    mainLogic(data);
  })
  .catch(error => console.error('Ошибка:', error));

function mainLogic(data) {

  //разбиваем строки на массив и удаляем лишние пробелы
  const columns = data.trim().split('\n');

  //разделяем данные на два массива
  const columnOne = [];
  const columnTwo = [];

  columns.forEach(line => {
    const [num1, num2] = line.split(/\s+/).map(Number);
    columnOne.push(num1);
    columnTwo.push(num2);
  });

  function sortArray(a, b) {
    return a - b;
  }

  columnOne.sort(sortArray);
  columnTwo.sort(sortArray);

  let finalSum = 0;

  for (let i = 0; i < columnOne.length; i++) {
    finalSum += Math.abs(columnOne[i] - columnTwo[i]);
  }
  console.log('answer part one', finalSum);

  let finalSumPartTwo = 0;

  for (let i = 0; i < columnOne.length; i++) {
    let numberDoubles = 0
    for (let j = 0; j < columnTwo.length; j++) {
      if (columnOne[i] == columnTwo[j]) {
        numberDoubles += 1;
      }
    }
    finalSumPartTwo += columnOne[i] * numberDoubles;
  }
  console.log('answer part two', finalSumPartTwo);
}
