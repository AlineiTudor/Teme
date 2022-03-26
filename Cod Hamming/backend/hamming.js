function decode(bits) {
    parity = function(number) {
        return number % 2;
    };

    var z = [];
    var aux = 0;
    for (let i = 1; i <= bits.length; i *= 2) {
        aux = 0;
        for (let a = i; a <= bits.length; a += i * 2) {
            for (let j = 0; j < i && a + j <= bits.length; j++) {
                aux += bits[a - 1 + j];
            }
        }
        z.push(parity(aux));
    }
    console.log("biti z: " + z);
    var pow = 1;
    var errorPosition = 0;
    for (let i = 0; i < z.length; i++, pow *= 2) {
        errorPosition += z[i] * pow;
    }
    console.log("bit gresit: " + errorPosition);
    var errorDetected = false;

    if (errorPosition != 0) errorDetected = true;
    if (errorDetected) {
        bits[errorPosition - 1] = parity(bits[errorPosition - 1] + 1);
    }

    return {
        errorCorrected: errorDetected,
        errorPosition: errorPosition - 1,
        bits: bits,
    };
}
exports.decode = decode;