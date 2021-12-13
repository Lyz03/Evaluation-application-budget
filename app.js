const resetButtons = document.querySelectorAll('.reset');
const resultP = document.querySelector('.result p');

//expenses
const expensesCustomInput = document.querySelector('.second_part .custom_input');
const firstPart = document.querySelectorAll('.first_part input');
let secondPart = document.querySelectorAll('.second_part > input');
const newExpense = document.querySelector('input[type=submit]');
const newExpenseInput = document.querySelector('input[type="text"]');
const submitExpenses = document.getElementById('expense_button');

//saving
const saving = document.getElementById('saving');
const submitSaving = document.getElementById('saving_button');

//receipts
const receiptsCustomInput = document.querySelector('.receipts .custom_input');
let receipts = document.querySelectorAll('.receipts input[type=number]');
const newReceipts = document.querySelector('.receipts input[type=submit]');
const newReceiptsInput = document.querySelector('.receipts input[type="text"]');
const submitReceipts = document.getElementById('receipts_button');

let a = 0
let totalExpenses = 0;
let totalSaving = 0;
let totalReceipts = 0;
let finalTotal = 0;

/**
 * Is there nothing in the input
 * @param value
 */
function isZero(value) {
    if (value.value === '')
        value.value = 0;
}

// add every input value of the first part
function totalFirstPart() {
    firstPart.forEach(value => {
        isZero(value);
        totalExpenses += parseInt(value.value);
    });
}

// add every input value of the second part (checking if it's not monthly)
function totalSecondPart() {
    secondPart.forEach(value => {
        isZero(value);

        if (value.labels[0].innerText.includes('hebdomadaire'))
            totalExpenses += parseInt(value.value) * 4;
        else if (value.labels[0].innerText.includes('annuel'))
            totalExpenses += Math.round(parseInt(value.value) / 12);
        else
            totalExpenses += parseInt(value.value);
    })
}

// add every input value of the receipts part
function totalReceiptsF() {
    receipts.forEach(value => {
        isZero(value);
        totalReceipts += parseInt(value.value);
    });
}

// have all categories been filled in
function calcOrNo() {
    if (a >= 2) {
        printTotal();
    } else
        a++;
}

// add every total and print it in result
function printTotal() {
    finalTotal = totalReceipts - (totalExpenses + totalSaving)
    resultP.innerText = finalTotal.toString() + ' €';
    if (finalTotal === 0)
        resultP.innerText += '\n' + 'Votre budget est respecté';
    else if (finalTotal < 0)
        resultP.innerText += '\n' + 'Attention, vous avez dépassé votre budget';
    else
        resultP.innerText += '\n' + 'Vous avez dépensé moins que prévus'
}


submitExpenses.addEventListener("click", () => {
    totalExpenses = 0;
    totalFirstPart();
    totalSecondPart();
    calcOrNo();
});

submitSaving.addEventListener("click", () => {
    if (saving.value === '')
        saving.value = 0;

    totalSaving = parseInt(saving.value);
    calcOrNo()
});

submitReceipts.addEventListener("click", () => {
    totalReceipts = 0
    totalReceiptsF();
    calcOrNo();
});

// reset buttons
resetButtons[0].addEventListener("click", () => {
    firstPart.forEach(value => value.value = '');
    secondPart.forEach(value => value.value = '');
});

resetButtons[1].addEventListener("click", () => saving.value = '');

resetButtons[2].addEventListener("click", () => receipts.forEach(value => value.value = ''));


// add a custom input
function addInput(whichInput, whichPart) {
    if (whichInput.value !== '') {
        let b = 0;

        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.id = 'id' + b

        let label = document.createElement('label');
        label.setAttribute('for', input.id);
        label.innerText = whichInput.value

        whichPart.appendChild(label)
        whichPart.appendChild(input)
        whichPart.appendChild(document.createElement('br'));

        secondPart = document.querySelectorAll('.second_part input[type=number]');
        receipts = document.querySelectorAll('.receipts input[type=number]');

        b++
    }
}

newExpense.addEventListener("click", () => addInput(newExpenseInput, expensesCustomInput));

newReceipts.addEventListener("click", () => addInput(newReceiptsInput, receiptsCustomInput));