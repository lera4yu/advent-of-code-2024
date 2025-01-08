import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/2/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    mainLogicPartOne(noramlizeData(data));
    mainLogicPartTwo(noramlizeData(data));
  })
  .catch(error => console.error('Ошибка:', error));

function noramlizeData(data) {
  const reports = data.trim().split('\n');

  return reports.map(report =>
    report.split(' ').map(Number)
  );
}

function checkReport(report) {
  let isSafe = false;
  let testArr = [];

  let grow = true;
  if (report[0] > report[1]) { //определяем тренд возрастание или убывание
    grow = false;
  }
  for (let j = 1; j < report.length - 1; j++) {
    if ((report[j] == report[j - 1]) || (report[j] == report[j + 1])) {
      break;
    } else if ((Math.abs(report[j] - report[j - 1]) > 3) || (Math.abs(report[j] - report[j + 1]) > 3)) {
      break;
    }
    else if (((report[j] > report[j - 1]) || (report[j] < report[j + 1])) && !grow) {
      break;
    } else if (((report[j] < report[j - 1]) || (report[j] > report[j + 1])) && grow) {
      break;
    }

    if (j == report.length - 2) {
      isSafe = true;
      testArr.push(report);
    }
  }
  return isSafe;
}

function mainLogicPartOne(reports) {
  let finalAnswer = 0;
  for (let i = 0; i < reports.length; i++) {
    if (checkReport(reports[i])) {
      finalAnswer += 1
    }
  }
  console.log('safe reports part 1', finalAnswer);
}

function checkModifiedReport(report) {
  let isSafeModified = false;
  for (let j = 0; j < report.length; j++) {
    let modifiedReport = [...report.slice(0, j), ...report.slice(j + 1)];
    if (checkReport(modifiedReport)) {
      isSafeModified = true;
      return isSafeModified;
    }
  }
}

function mainLogicPartTwo(reports) {
  let finalAnswer = 0;
  for (let i = 0; i < reports.length; i++) {
    if (checkReport(reports[i])) {
      finalAnswer += 1;
    } else if (checkModifiedReport(reports[i])) {
      finalAnswer += 1;
    }
  }
  console.log('safe reports part 2', finalAnswer);
}