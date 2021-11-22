let year;
let month = 0;
let day;
let last5numbers;
let pesel = "";

onmessage = function(e) {
    console.log('Worker: Message received from main script');
    let validateResult = validate(e.data[0]);
    postMessage(validateResult);
}

function validate(n) {
    last5numbers = n;
    let peselArray = [];
    let extendMonth = 0;
    for (let y=30; y<=150; y++) {
        year = y + 1900;
        if (year > 1999) extendMonth = 20;
        else extendMonth = 0;
        for (let m=1; m<=12; m++) {
            month = m+extendMonth;
            if (month < 10) {
                month = "0" + month;
            }
            for (let d=1; d<=new Date(year, month, 0).getDate(); d++) {
                day = d;
                if (day < 10) {
                    day = "0" + day;
                }
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
        }
    }
    return peselArray;
}

function concatenate() {
    let stringYear = year.toString()
    if (stringYear.length === 4) stringYear = stringYear.substring(2,4);
    pesel = stringYear + month + day + last5numbers;
}