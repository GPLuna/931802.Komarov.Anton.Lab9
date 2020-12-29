const buttons = document.getElementsByTagName('button');
const input = document.getElementById('expression');
let counterOfDots = 0;

for(let i of buttons) {
  i.addEventListener('click', () => {
    const symbol = i.innerText;

    if(symbol >= '0' && symbol <= '9') {
      addDigit(symbol);
      return true;
    }

    if(symbol === '<-') {
      deleteSymbol();
      return true;
    }

    if(symbol === '.' && counterOfDots === 0) {
      ++counterOfDots;
      input.value += '.';
      return false;
    }

    if(symbol === '+' || symbol === '-' || symbol === '/' || symbol === '*') {
      const lastElements = input.value.slice(-2)[0];
      if(lastElements === '+' || lastElements === '-' || lastElements === '*' || lastElements === '/')
        return false;

      counterOfDots = 0;
      input.value += ' ' + symbol + ' ';
    }

    if(symbol === 'C')
      clear();

    if(symbol === '=')
      calculate();
  });
}

const addDigit = (digit) => {
  if(input.value === '0')
    input.value = digit;
  else
    input.value += digit;
};

const deleteSymbol = () => {
  if(input.value.slice(-3)[0] === ' ' && input.value.slice(-3)[2] === ' ') {
    input.value = input.value.substring(0, input.value.length - 3);
  }

  if(input.value.length === 1)
    input.value = 0;
  else {
    if(input.value.slice(-1) === '.')
      --counterOfDots;
    input.value = input.value.substring(0, input.value.length - 1);
  }
};

const clear = () => {
  counterOfDots = 0;
  input.value = 0;
};

const calculate = () => {
  input.value = eval(input.value);
};