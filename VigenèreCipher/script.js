function setup() {
    
    const decryptButton = select('#decryptButton');
    decryptButton.mousePressed(decryptCipherText);
}

// decryption kode
function decrypt(ciphertext, keyword) {
    let plaintext = "";
    keyword = keyword.toUpperCase(); 
    ciphertext = ciphertext.toUpperCase(); 

    for (let i = 0, j = 0; i < ciphertext.length; i++) {
        const letter = ciphertext[i];

        
        if (letter < 'A' || letter > 'Z') {
            plaintext += letter; 
            continue;
        }

        
        const shift = keyword[j % keyword.length].charCodeAt(0) - 'A'.charCodeAt(0);
        
        const decryptedLetter = String.fromCharCode(((letter.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
        plaintext += decryptedLetter;

       
        j++;
    }

    return plaintext;
}

function decryptCipherText() {
    const ciphertext = document.getElementById('ciphertext').value;
    const keyword = document.getElementById('keyword').value;

    //Checker om begge input er givet
    if (!ciphertext || !keyword) {
        document.getElementById('output').innerText = "Please enter both ciphertext and keyword.";
        return;
    }

    const plaintext = decrypt(ciphertext, keyword);
    document.getElementById('output').innerText = plaintext; //display af resulat
}