document.getElementById('calculate').addEventListener('click', function () {

  const amount   = parseFloat(document.getElementById('amount').value);
  const interest = parseFloat(document.getElementById('interest').value);
  const period   = parseFloat(document.getElementById('period').value);
  const isYear   = document.getElementById('year').checked;

  // Clear any old error messages first //
  clearErrors();


  let hasError = false;

  if (!amount || isNaN(amount)) {
    showError('amount', 'Please enter a loan amount.');
    hasError = true;
  } else if (amount < 5000 || amount > 100000) {
    showError('amount', 'Amount must be between 5,000 and 100,000.');
    hasError = true;
  }

  if (!interest || isNaN(interest)) {
    showError('interest', 'Please enter an interest rate.');
    hasError = true;
  } else if (interest < 5 || interest > 100) {
    showError('interest', 'Rate must be between 5% and 100%.');
    hasError = true;
  }

  if (!period || isNaN(period)) {
    showError('period', 'Please enter a repayment period.');
    hasError = true;
  }

  if (hasError) return; 

  // CONVERT PERIOD TO MONTHS//
  const totalMonths = isYear ? period * 12 : period;

  // MONTHLY INTEREST RATE //
  const monthlyRate = interest / 100 / 12;

  // EMI CALCULATION //
  let emi;
  if (monthlyRate === 0) {
    emi = amount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    emi = (amount * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment  = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  //  OUTPUT BOXES CALCULATIONS //
  document.getElementById('emi').textContent =
    'BWP ' + formatNumber(emi);

  document.getElementById('totalInterest').textContent =
    'BWP ' + formatNumber(totalInterest);

  document.getElementById('totalPayment').textContent =
    'BWP ' + formatNumber(totalPayment);
});

// FORM CLEAR BUTTON //
document.getElementById('clear').addEventListener('click', function () {
  document.getElementById('amount').value   = '';
  document.getElementById('interest').value = '';
  document.getElementById('period').value   = '';
  document.getElementById('year').checked   = true;

  document.getElementById('emi').textContent           = '';
  document.getElementById('totalInterest').textContent = '';
  document.getElementById('totalPayment').textContent  = '';

  clearErrors();
});

// ── HELPER: FORMAT NUMBER WITH COMMAS ─────────────
function formatNumber(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ── HELPER: SHOW INLINE ERROR UNDER INPUT ─────────
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  input.style.border = '2px solid #ff4d4d';

  // Create error message element
  const error = document.createElement('small');
  error.className = 'error-msg';
  error.style.color = '#ff4d4d';
  error.style.fontSize = '12px';
  error.style.display = 'block';
  error.style.marginTop = '4px';
  error.textContent = message;

  input.insertAdjacentElement('afterend', error);
}

// ── HELPER: CLEAR ALL ERRORS ──────────────────────
function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
  document.querySelectorAll('.input').forEach(function (input) {
    input.style.border = '';
  });
}

// ── CLEAR ERROR ON INPUT CHANGE ───────────────────
document.querySelectorAll('.input').forEach(function (input) {
  input.addEventListener('input', function () {
    this.style.border = '';
    const next = this.nextElementSibling;
    if (next && next.classList.contains('error-msg')) next.remove();
    if (this.value < 0) this.value = 0;
  });
});