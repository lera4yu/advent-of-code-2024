let A = 37293246;
let B = 0;
let C = 0;
let program = [2, 4, 1, 6, 7, 5, 4, 4, 1, 7, 0, 3, 5, 5, 3, 0];

function getCombo(value, A, B, C) {
  if (value >= 0 && value <= 3) {
    return value;
  } else if (value === 4) {
    return A;
  } else if (value === 5) {
    return B;
  } else if (value === 6) {
    return C
  }
  return -1;
}

function getOutput(A, B, C, program) {
  let i = 0;
  let output = [];
  while (i < program.length) {
    console.log( 'i', i, 'A', A, 'B', B, 'C', C,  'program', program[i], program[i + 1]);
    if (program[i] === 0) {
      A = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))));
      console.log('A = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))))', A);
      i += 2;
    } else if (program[i] === 1) {
      B = B ^ program[i + 1];
      console.log('B = B ^ program[i + 1]', B)
      i += 2;
    } else if (program[i] === 2) {
      B = Math.abs(getCombo(program[i + 1], A, B, C) % 8); 
      console.log('B = Math.abs(getCombo(program[i + 1], A, B, C) % 8)', B);
      i += 2;
    } else if (program[i] === 3) {
      if (A != 0) {
        i = program[i + 1];
      } else {
        return output;
      }
    } else if (program[i] === 4) {
      B = B ^ C;
      console.log('B = B ^ C', B)
      i += 2;
    } else if (program[i] === 5) {
      let out = Math.abs(getCombo(program[i + 1], A, B, C) % 8)
      console.log(out, 'output');
      output.push(out);
      i += 2;
    } else if (program[i] === 6) {
      B = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))));
      console.log('B = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))))', B)
      i += 2;
    } else if (program[i] === 7) {
      C = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))));
      console.log('C = parseInt(A / (2 ** (getCombo(program[i + 1], A, B, C))))', C)
      i += 2;
    }
  }
}

let finalAns = getOutput(A, B, C, program);
console.log(finalAns);