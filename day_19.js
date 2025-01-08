import fetch from 'node-fetch';

const url = 'https://adventofcode.com/2024/day/19/input';
const options = {
  headers: {
    'Cookie': 'session=53616c7465645f5f0aefaacee5d2d1953eb13b5f1a23039fcf12a3c602a45c02c52cb6818f7b84b60ae3b39518436b9700d0f13a4b6e6156859cffad64c0ead3',
  },
};

fetch(url, options)
  .then(response => response.text())
  .then(data => {
    let testData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`
    let { patterns, towels } = normalizeData(data);
    let {resultArr, finalAnswer} = checkTowelsArray(towels, patterns);
    console.log('answer part 1', finalAnswer);
  })
  .catch(error => console.error('Ошибка:', error));

function normalizeData(data) {
  let [patternData, towelData] = data.trim().split("\n\n");
  let patterns = patternData.split(", ");
  let towels = towelData.split("\n");
  return { patterns, towels };
}

function checkTowel(towel, patterns) {
  let queue = [towel]; 
  let visited = new Set();
  while (queue.length > 0) {
    let current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    if (current === '') return true;
    for (let pattern of patterns) {
      if (current.startsWith(pattern)) {
        let next = current.slice(pattern.length);
        queue.push(next); 
      }
    }
  }
  return false;
}

function checkTowelsArray(towels, patterns) {
  let resultArr = [];
  let finalAnswer = 0;

  for (let towel of towels) {
    if (checkTowel(towel, patterns)) {
      resultArr.push(towel);
      finalAnswer += 1;
    }
  }

  return {resultArr, finalAnswer}
}

