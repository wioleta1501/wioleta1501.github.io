const year = document.querySelector('#year_input');
const month = document.querySelector('#month_input');
const day = document.querySelector('#day_input');
const numbers = document.querySelector('#numbers_input');

const validate_button = document.querySelector('#validate');
const show_button = document.querySelector('#show');
const find_button = document.querySelector('#find');

if (window.Worker) {
    const validate_one_pesel = new Worker("validate_one_pesel.js");
    const show_all_pesels = new Worker("show_all_pesels.js");
    const find_valid_pesels = new Worker("find_valid_pesels.js");

    validate_button.onclick = function () {
        validate_one_pesel.postMessage([year.value, month.value, day.value, numbers.value]);
        console.log('Message posted to worker');
    }

    show_button.onclick = function () {
        show_all_pesels.postMessage([year.value, month.value, day.value]);
        console.log('Message posted to worker');
    }

    find_button.onclick = function () {
        find_valid_pesels.postMessage([numbers.value]);
        console.log('Message posted to worker');
    }

    validate_one_pesel.onmessage = function (e) {
        if (e.data === true) alert("PESEL jest poprawny");
        else alert("PESEL nie jest poprawny");
        console.log('Message received from worker');
    }
    show_all_pesels.onmessage = function (e) {
        document.querySelector('#results').innerHTML=e.data.join(", ");
        console.log('Message received from worker');
    }
    find_valid_pesels.onmessage = function (e) {
        document.querySelector('#results').innerHTML=e.data.join(", ");
        console.log('Message received from worker');
    }
} else {
    console.log('Your browser doesn\'t support web workers.');
}