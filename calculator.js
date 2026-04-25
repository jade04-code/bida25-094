document.querySelectorAll('input[type="number"]').forEach(input => {
    inputNumber.oninput = () => {
        if(inputNumber.value.length > inputNumber.maxlength) {
            inputNumber.value = inputNumber.value.slice(0, inputNumber.maxlength);
        }
    }
});

let loanAmount= document.getElementById('amount');
let interestRate= document.getElementById('interest');
let RepaymentPeriod=document.getElementById('period');
let calculateEMI=document.getElementById('calculate');

calculateEMI.onclick=(e) => {
    e.preventDefault();

    let isYear=document.getElementById('year').checked;
    let isMonth=document.getElementById('month').checked;
    let numberOfMonths = 0;

    if(isMonth== '' && isYear== ''){
        alert('Please select Either Month or year');
        return;
    }else{
        if (isYear == true){
            numberOfMonths= RepaymentPeriod.value * 12;
        }
        else
            numberOfMonths= RepaymentPeriod.value;
    }

    let r= parseFloat(interestRate.value)/100/12;
    let p =loanAmount.value;
    let n= numberOfMonths;

    let emi = (p * r * Math.pow( (1 + r), n)) / (Math.pow((1 + r), n) - 1);
    document.getElementById('result').innerHTML = "Your EMI is: " + emi.toFixed(2);
    let totalInterest = (emi * n) - p;
    let totalPayment = totalInterest + parseFloat(p);

    document.getElementById('emi').innerHTML = '' +Math.round(emi);
    
    document.getElementById('totalInterest').innerHTML = '' +Math.round (totalInterest)
   
    document.getElementById('totalPayment').innerHTML = '' +Math.round (totalPayment)
}
let clear=document.getElementById('clear');

loanAmount.value='';
interestRate.value='';
RepaymentPeriod.value='';

document.getElementById('year').checked=true;

document.getElementById('emi').innerHTML='';
document.getElementById('totalInterest').innerHTML='';
document.getElementById('totalPayment').innerHTML='';

clearRecords,onclick=(e) => {
    e.preventDefault();
    recordsList.innerHTML="";
    localStorage.removeItem('emi');
};