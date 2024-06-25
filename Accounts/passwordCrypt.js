function cryptPassword(password) {
    let cryptedPassword = password;
    
    for (let round = 0; round < 5; round++) {
        let roundCryptedPassword = '';
        
        for (let i = 0; i < cryptedPassword.length; i++) {
            // Get the ASCII value of the current character
            let asciiValue = cryptedPassword.charCodeAt(i);
            
            // Increment the ASCII value by 1
            let cryptedAsciiValue = asciiValue + 1;
            
            // Convert the crypted ASCII value back to a character
            let cryptedCharacter = String.fromCharCode(cryptedAsciiValue);
            
            // Append the crypted character to the round crypted password
            roundCryptedPassword += cryptedCharacter;
        }
        
        cryptedPassword = roundCryptedPassword;
    }
    
    // Step 1: Reverse the crypted password
    cryptedPassword = cryptedPassword.split('').reverse().join('');
    
    // Step 2: Shuffle the characters in the crypted password
    cryptedPassword = shuffleString(cryptedPassword);
    
    // Step 3: Add a random character at the beginning of the crypted password
    let randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    cryptedPassword = randomCharacter + cryptedPassword;
    
    return cryptedPassword;
}

function shuffleString(string) {
    let shuffledString = '';
    let stringArray = string.split('');
    
    while (stringArray.length > 0) {
        let randomIndex = Math.floor(Math.random() * stringArray.length);
        shuffledString += stringArray.splice(randomIndex, 1)[0];
    }
    
    return shuffledString;
}

function verifyCrypt(password, cryptedPassword) {
    return cryptPassword(password) === cryptedPassword;
}
