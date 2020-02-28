const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const errorEl = document.getElementById('error');
const error2El = document.getElementById('error2');

// Password generator function is called based om user entry and event of user pushing the button /
generateEl.addEventListener('click', (event) => {
    event.preventDefault();
    const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

    if ((lengthEl.value > 64) || (lengthEl.value < 8)) {
        error2El.innerText = "Length only between 8 and 64";
        length = 0;
    } else {
        error2El.innerText = "";
    }
    if ((hasLower + hasUpper + hasNumber + hasSymbol) === 4) {
        errorEl.innerText = ""
    }
	resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//***************** generate password function */
function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;

        if(typesCount === 0) {
            errorEl.innerText = "Choose atleast one checkbox elements";
            return '';
        }	

        if(typesCount < 4) {
            errorEl.innerText = "By choosing all 4 elements create a reliable Password!"
        }	

        // creating a loop to produce password content one by one
        for(let i=0; i<length; i+=typesCount) {
            if (lower) { generatedPassword += getRandomLower(); }
            if (upper) { generatedPassword += getRandomUpper(); }
            if (number) { generatedPassword += getRandomNumber(); }
            if (symbol) { generatedPassword += getRandomSymbol(); }
        }	
        const finalPassword = generatedPassword.slice(0, length);
        console.log(finalPassword);
        return finalPassword; 
   }
//****************** */

// random generators for each selection

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//clipboard event to copy the password
clipboardEl.addEventListener('click', (event) => {
    event.preventDefault();
    const textarea = document.createElement('textarea');
	const password = resultEl.value;
	if(!password) { 
        return; 
    }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});
