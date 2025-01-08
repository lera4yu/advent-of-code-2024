import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/7/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = ['190: 10 19',
      '3267: 81 40 27',
      '83: 17 5',
      '156: 15 6',
      '7290: 6 8 6 15',
      '161011: 16 10 13',
      '192: 17 8 14',
      '21037: 9 7 18 13',
      '292: 11 6 16 20'];
    getAnswerPartOne((normalizeData(data)));
    //1623679896826
    //1623679897457
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  const reports = data.trim().split('\n');
  // const reports = data; //для тест даты

  return reports.map(report => {
    let [result, values] = report.split(':');
    return [
      Number(result.trim()),
      values.trim().split(' ').map(Number)
    ];
  });
}

function checkReport(report) {
  let result = report[0];
  let values = report[1];
  let expression = '';
  let i = 0;

  let EqualExpr = getEveryCombi(values, expression, i);
  if (EqualExpr.includes(result)) {
    return true;
  }
}

function getEveryCombi(values, expression, i) {
  let allResultsOfExpressions = [];
  if (i === values.length - 1) {
    const fullExpression = expression + values[i];
    const resultOfExpression = calculateLeftToRight(fullExpression);
    allResultsOfExpressions.push(resultOfExpression);
    return allResultsOfExpressions;
  }
   const addResults = getEveryCombi(values, expression + values[i] + ' + ', i + 1);
   const multiplyResults = getEveryCombi(values, expression + values[i] + ' * ', i + 1);
 
   allResultsOfExpressions = allResultsOfExpressions.concat(addResults, multiplyResults);
   return allResultsOfExpressions;
}

function calculateLeftToRight(expression) {
  const tokens = expression.split(' ');
  let result = Number(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextValue = Number(tokens[i + 1]);

    if (operator === '+') {
      result += nextValue;
    } else if (operator === '*') {
      result *= nextValue;
    }
  }
  return result;
}


function getAnswerPartOne(operationableData) {
  let answerPartOne = 0;
  for (let i = 0; i < operationableData.length; i++) {
    if (checkReport(operationableData[i])) {
      answerPartOne += operationableData[i][0];
    }
  }
  console.log('answer part 1', answerPartOne);
}
