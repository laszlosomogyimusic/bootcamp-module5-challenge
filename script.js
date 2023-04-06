// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

var passwordCriteria = {
  length: 0,
  isLowercase: false,
  isUpperCase: false,
  isNumeric: false,
  isSpecialChars: false,
  minLength: 8,
  maxLength: 128
}

//this is a 2D array which could store the lowercase, uppercase, numeric or special character arrays
var bigArray = [];

function initVars() {
  bigArray = [];
  passwordCriteria.isLowercase = false;
  passwordCriteria.isUpperCase = false;
  passwordCriteria.isNumeric = false;
  passwordCriteria.isSpecialChars = false;
}

//check if the input is a number
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


//display and validate the password length prompt.
function validatePasswordLength() {
  var retVal = true;
  passwordCriteria.length = prompt("Please enter the length of the generated password. The number should be between 8 and 128");

  if(isNumber(passwordCriteria.length)) {
    if(passwordCriteria.length >= passwordCriteria.minLength && passwordCriteria.length <= passwordCriteria.maxLength) {
      retVal = true;
    } else {
      retVal = false;
      alert("The number should be between 8 and 128");
    }
  } else {
    retVal = false;
    alert("Please enter a valid number");
  }

  return retVal;
}

//display a series of confirm popups for the characters to be included to the password
function validateUserInputs() {
  var retVal = true;

  passwordCriteria.isLowercase = confirm("Do you want to include lowercase characters?");
  passwordCriteria.isUpperCase = confirm("Do you want to include uppercase characters?");
  passwordCriteria.isNumeric = confirm("Do you want to include numeric characters?");
  passwordCriteria.isSpecialChars = confirm("Do you want to include special characters?");


  if(!passwordCriteria.isLowercase && !passwordCriteria.isUpperCase && !passwordCriteria.isNumeric && !passwordCriteria.isSpecialChars) {
    alert("Please select yes to at least one option");
    retVal = false;
  }

  return retVal;
}

// Function to prompt user for password options
function getPasswordOptions() {
  var retVal = false;
  retVal = validatePasswordLength();

  if(retVal) {
    retVal = validateUserInputs();
  }
  return retVal;
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor((Math.random()*arr.length))];
}


//this will give an all-in one 2D array so we can randomly select the types and the characters
function createBigArray() {
  if (passwordCriteria.isLowercase) {
    bigArray.push(lowerCasedCharacters);
  }

  if (passwordCriteria.isUpperCase) {
    bigArray.push(upperCasedCharacters);
  }

  if (passwordCriteria.isNumeric) {
    bigArray.push(numericCharacters);
  }

  if (passwordCriteria.isSpecialChars) {
    bigArray.push(specialCharacters);
  }
}

// Function to generate password with user input
function generatePassword() {
  //we have to initialise the variables each time we click on the button
  //otherwise unexpected behaviours will happen
  initVars();

  var finalPassword = "";
  if(getPasswordOptions()) {

    createBigArray();

    //iterate through the chosen password length
    for(var i=0; i<passwordCriteria.length; i++) {
      //randomly select the array we work from (this could be lowecase, uppercase, number and special)
      selectedArray = getRandom(bigArray);

      //randomly select a character from the array
      selectedChar = getRandom(selectedArray);

      //concatenating the password string
      finalPassword = finalPassword.concat(selectedChar);
    }
  }

  return finalPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);