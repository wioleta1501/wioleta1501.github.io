let year;
let month;
let day;
let last5numbers;
let pesel = "";

onmessage = function(e) {
    console.log('Worker: Message received from main script');
    let validateResult = validate(e.data[0],e.data[1], e.data[2]);
    postMessage(validateResult);
}

function validate(y, m, d) {
    year = y;
    month = m;
    day = d;
    let peselArray = [];
    for (let j=0; j<=99999; j++) {
        last5numbers = j;
        concatenate();
        let numberArray = [];
        for (let i=1; i<=pesel.length; i++) {
            numberArray[i-1] = parseInt(pesel.substring(i-1, i))
        }
        let mult = numberArray[0] + (numberArray[1]*3) + (numberArray[2]*7) + (numberArray[3]*9) + numberArray[4] + (numberArray[5]*3) + (numberArray[6]*7) + (numberArray[7]*9) + numberArray[8] + (numberArray[9]*3);
        let result = 10 - (mult % 10);
        if (result===10) {
            result = 0;
        }
        if (result === numberArray[10]) {
            peselArray.push(pesel);
        }
    }
    return peselArray;
}

function concatenate() {
    let intYear = parseInt(year);
    let intMonth = parseInt(month);
    let intDay = parseInt(day);
    if (intYear >= 1800 && intYear <= 1899) {
        intMonth += 80;
    }
    else if (intYear >= 2000 && intYear <= 2099) {
        intMonth += 20;
    }
    else if (intYear >= 2100 && intYear <= 2199) {
        intMonth += 40;
    }
    else if (intYear >= 2200 && intYear <= 2299) {
        intMonth += 60;
    }
    month = intMonth
    if (intMonth < 10) {
        month = "0" + month;
    }

    day = intDay
    if (intDay < 10) {
        day = "0" + day;
    }

    let numbersString = last5numbers.toString();
    while (numbersString.length < 5) numbersString = "0" + numbersString;

    if (year.length === 4) year = year.substring(2,4);
    pesel = year + month + day + numbersString;
}