function averageThreeNumbers(a, b, c) {
    let sum = a + b + c;
    let ave = sum / 3;
    return ave;
}

function createSentence(num, noun) {
    return "On average, a Berkeley student has " + num.toString() + " " +  noun + "s.";
}

function getRandomNum(num) {
    return Math.floor(Math.random() * num);
}

let x = getRandomNum(20);
let y = getRandomNum(10);
let z = getRandomNum(13);

let avg = averageThreeNumbers(x, y, z);

let sentence = createSentence(avg, "Axolotl");

console.log(sentence);