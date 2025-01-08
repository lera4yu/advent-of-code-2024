import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/3/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    findNormalMuls(data);
  })
  .catch(error => console.error('Ошибка:', error));

function findNormalMuls(data) {

  let originalString = data;
  const regex = /mul\((-?\d+),(-?\d+)\)/g;

  const stringMuls = originalString.match(regex);

  let finalAnswer = 0;

  for (let i = 0; i < stringMuls.length; i++) {
    let stringMul = stringMuls[i].match(regex);
    let stringMulExec = regex.exec(stringMul);
    finalAnswer += parseInt(stringMulExec[1], 10) * parseInt(stringMulExec[2], 10);
  }

  console.log('answer part 1', finalAnswer);
  doDontExpressions(originalString, regex);
}

function execToArray(varExec, regex, str, varArray) {
  while ((varExec = regex.exec(str)) !== null) {
    varArray.push([varExec[1], varExec[2], varExec.index])
  }
}

function execToDoArray(varExec, regex, str, varArray, bool) {
  while ((varExec = regex.exec(str)) !== null) {
    varArray.push([bool, varExec.index])
  }
}

function getIntervals(exprArray, originalString) {
  let intervals = [];
  let start = 0;
  for (let i = 0; i < exprArray.length; i++) {
    if ((!exprArray[i][0] && (start >= 0))) {
      intervals.push([start, exprArray[i][1]])
      start = -1;
    }
    if (exprArray[i][0] && (start < 0)) {
        start = exprArray[i][1];
    }
    if (( i == exprArray.length - 1) && (start >= 0)) {
      intervals.push([start, originalString.length - 1])
    }
  }
  return intervals;
}

function doDontExpressions(originalString, regexMul) {
  let finalAnswerPart2 = 0;

  const regexDo = /do\(\)/g;
  const regexDont = /don['’]t\(\)/g;

  let mulExec;
  let mulArray = [];

  execToArray(mulExec, regexMul, originalString, mulArray);

  let doExec;
  let doArray = [];

  execToDoArray(doExec, regexDo, originalString, doArray, true);

  let dontExec;
  let dontArray = [];

  execToDoArray(dontExec, regexDont, originalString, dontArray, false);
  
  let exprArray = doArray.concat(dontArray).sort((a, b) => a[1] - b[1]);

  let intervals = getIntervals(exprArray, originalString);
  
  for (let i = 0; i < mulArray.length; i++) {
    for (let j = 0; j < intervals.length; j++) {
      if (mulArray[i][2] > intervals[j][0] && mulArray[i][2] < intervals[j][1] ) {
        finalAnswerPart2 += mulArray[i][0] * mulArray[i][1];
      }
    }
  }

  console.log('answer part 2', finalAnswerPart2);
}