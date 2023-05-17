const bill = document.getElementById('bill__input')
const tipButtons = document.querySelectorAll('.btn')
const tipCustom = document.getElementById('tip__input')
const people = document.getElementById('people__input')
const errorMsg = document.querySelector('.error-msg')
const output = document.querySelectorAll('.output__value')
const resetButton = document.querySelector('.btn__reset')

bill.addEventListener('input', getBillValue)
tipButtons.forEach(button => {
    button.addEventListener('click', handleClick)
})
tipCustom.addEventListener('input', getCustomTipValue)
people.addEventListener('input', getPeopleValue)
resetButton.addEventListener('click', reset)

let billValue = 0.0
let tipValue = 0.15
let peopleValue = 1

function validateFloat(s) {
    let rgx  = /^[0-9]*\.?[0-9]*$/
    return s.match(rgx)
}

function validateInt(s) {
    let rgx  = /^[0-9]*$/
    return s.match(rgx)
}

function getBillValue() {
    if(bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.')
    }

    if(!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1)
    }

    billValue = parseFloat(bill.value)

    calculateTip()
}

function handleClick(event){
    tipButtons.forEach(button => {
        button.classList.remove('btn-active');

        if(event.target.innerHTML == button.innerHTML){
            button.classList.add('btn-active');
            tipValue = parseFloat(button.innerHTML)/100;
        }
    });

    tipCustom.value = ''

    calculateTip()
}

function getCustomTipValue() {
    if(!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1)
    }
    tipValue = parseFloat(tipCustom.value)/100;
    tipButtons.forEach(button => {
        button.classList.remove('btn-active');
    })

    if(tipCustom.value != '') {
        calculateTip()
    }
}

function getPeopleValue() {
    if(!validateInt(people.value)) {
        people.value = people.value.substring(0, people.value.length - 1)
    }

    peopleValue = parseFloat(people.value)

    if(peopleValue <= 0) {
        errorMsg.classList.add('show-error-msg')
        setTimeout(function() {
            errorMsg.classList.remove('show-error-msg')
        }, 3000)
    }
    calculateTip()
}

function calculateTip() {
    if(peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue
        let total = billValue * (tipValue + 1) / peopleValue
        output[0].innerHTML = '$' + tipAmount.toFixed(2)
        output[1].innerHTML = '$' + total.toFixed(2)
    }
}

function reset() {
    bill.value = '0.0'
    getBillValue()

    tipButtons[2].click()

    people.value = 1
    getPeopleValue()
}