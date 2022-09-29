const MIN_LEN = 8;
const MAX_LEN = 128;

const LOWER = 'L';
const UPPER = 'U';
const NUMERIC = 'N';
const SPECIAL = 'S';

const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHARS = LOWER_CHARS.toUpperCase();
const NUMERIC_CHARS = '0123456789';
const SPECIAL_CHARS = `" !"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~"`;



// generates a random number between 0 and (limit - 1)
function generateRandomNbr(limit){
    return (Math.floor(Math.random() * limit));
}


// Prompt user for length and validate. 
// Once validated, return the length entered.
function promptForLength(){
    var len = 0;
    var valid = false;

    while (!valid) {
        len = prompt('Please enter the length of the password. Must be at least 8 and no more than 128.');
        if (len >=8 && len <= 128) {
            valid = true;
        }
    }
  
    return len;
}

// Prompt user for character types. Store the types selected in an array.  
// If nothing is chosen, prompt user to try again.  
// Return the array with selected types.
function promptForTypes(){
    var arr = [];

    while (arr.length === 0){
        if (confirm('Include lowercase characters?')){
            arr.push(LOWER);
        }
        if (confirm('Include uppercase characters?')){
            arr.push(UPPER);
        }
        if (confirm('Include numeric characters?')){
            arr.push(NUMERIC);
        }
        if (confirm('Include special characters?')){
            arr.push(SPECIAL);
        }
        if (arr.length === 0){
            alert('You must select at least one character type!  Try again...');
        }
    }

    return arr;
}


// convert each string to an array and combine them all into one array
function createPasswordCharList(arr){
    var pwdArr = [];

    for (var i = 0; i < arr.length; i++){
        switch (arr[i]){
            case LOWER: pwdArr.concat(LOWER_CHARS.split(''));
                break;
            case UPPER: pwdArr.concat(UPPER_CHARS.split(''));
                break;
            case NUMERIC: pwdArr.concat(NUMERIC_CHARS.split(''));
                break;
            case SPECIAL: pwdArr.concat(SPECIAL_CHARS.split(''));
                break;
        }
    }

    return pwdArr
}



function generatePassword(passwordLen, charArr){
    var passwordArr = [];
    var nbr;


    for (var i = 0; i < passwordLen; i++){
        nbr = generateRandomNbr(charArr.length);
        passwordArr.push(charArr[nbr]);
    }

    return passwordArr;
}



// Write password to the #password input
function writePassword(password) {
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}


function generatePasswordString(){
    var pwdLen = promptForLength();
    var pwdTypesArr = promptForTypes();
    var pwdCharListArr = createPasswordCharList(pwdTypesArr);
    var pwdCharArr = generatePassword(pwdLen, pwdCharListArr);

    writePassword(pwdCharArr.toString());
}

function main(){
    // retrieve the DOM Button element
    var generateBtn = document.querySelector("#generate");
    
    // Add event listener to DOM Button element
    generateBtn.addEventListener("click", generatePasswordString);
}

main();







// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page