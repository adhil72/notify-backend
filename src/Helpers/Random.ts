function randomInt(min: number, max: number): number {
    min = Math.floor(min);
    max = Math.floor(max);
    const randomNum = Math.random();
    return Math.floor(randomNum * (max - min + 1)) + min;
}

function randomId(length: number): string {
    let KEY = "@#J)(FJ)(#JF()N)S)(NN()@E()ND48943829df8e42398dsfdsfVG&*@G*&GE**&G&G(!()*BDCBICObjhschsvcvasiuih*(@&*(#(*#@cd16384er6d6dc1ds6c651d*(@*&@(5653e132413265e1edfew2few23f13"
    let uKey = ''
    for (let i = 0; i < length; i++) {
        uKey += KEY[randomInt(0, KEY.length - 1)]
    }
    return uKey
}

export { randomInt, randomId }