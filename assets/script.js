const MIN_LEN = 8;
const MAX_LEN = 128;

const LOWER = 'L';
const UPPER = 'U';
const NUMERIC = 'N';
const SPECIAL = 'S';

const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHARS = LOWER_CHARS.toUpperCase();
const NUMERIC_CHARS = '0123456789';
const SPECIAL_CHARS = ` !"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`;


// Generates a random number between 0 and (limit - 1) and returns it.
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

// Convert each string to an array and combine all arrays into one. Return the combined array.
function createPasswordCharList(arr){
    var pwdArr = [];

    for (var i = 0; i < arr.length; i++){
        switch (arr[i]){
            case LOWER: pwdArr =  pwdArr.concat(LOWER_CHARS.split(''));
                break;
            case UPPER: pwdArr =  pwdArr.concat(UPPER_CHARS.split(''));
                break;
            case NUMERIC: pwdArr =  pwdArr.concat(NUMERIC_CHARS.split(''));
                break;
            case SPECIAL: pwdArr =  pwdArr.concat(SPECIAL_CHARS.split(''));
                break;
        }
    }
    return pwdArr
}

// Loop as many times as the length of the password. For every pass, 
// generate a random number from 0 to length of the Character array. 
// Use the generated number as an index to get the char and push it in
// a resulting array. Return the resulting array.
function generatePassword(passwordLen, charArr){
    var passwordArr = [];

    for (var i = 0; i < passwordLen; i++){
       var nbr = generateRandomNbr(charArr.length);
        passwordArr.push(charArr[nbr]);
    }
    return passwordArr;
}

// Write password to the #password input
function writePassword(password) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

// This function gets called upon a button click event.  It calls 
// functions that prompt the user for password length and for allowed character types.
// It then calls a function to construct an array of generated random characters, which
// is converted to a string.  This string is then passed to a function that outputs
// the string to the screen. 
function generatePasswordString(){
    var pwdLen = promptForLength();
    var pwdTypesArr = promptForTypes();
    var pwdCharListArr = createPasswordCharList(pwdTypesArr);
    var pwdCharArr = generatePassword(pwdLen, pwdCharListArr);

    writePassword(pwdCharArr.join(''));
}

// This function attaches a callback function to a button's click event 
// which does the work to generate a random password and output it to the screen.
function main(){
    // retrieve the DOM Button element with the id 'generate'
    var generateBtn = document.querySelector("#generate");
    
    // Add event listener to DOM Button element
    generateBtn.addEventListener("click", generatePasswordString);
}

main();