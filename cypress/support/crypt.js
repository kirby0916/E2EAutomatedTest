var CryptoJS = require("crypto-js");
class CryptoX{
    constructor(keyValue){
        this.key=keyValue;
    }

    getKey(){
        return this.key;
    }

    encrypt(value)
    {
        var ciphertext = CryptoJS.AES.encrypt(value, this.key).toString();
        return ciphertext;
    }


    decrypt(value)
    {
        var response;
        var byt = CryptoJS.AES.decrypt(value,this.key)
        response = byt.toString(CryptoJS.enc.Utf8);
        return response;
    }
}
module.exports.CryptoX=CryptoX;