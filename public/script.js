let current = '';
let operator = null;
let operand = null;
const display = document.getElementById('display');

document.querySelectorAll('.digit').forEach(btn => {
  btn.addEventListener('click', () => {
    current += btn.textContent;
    display.value = current;
  });
});

document.querySelectorAll('button[data-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    operator = btn.getAttribute('data-action');
    operand = current;
    current = '';
  });
});

document.getElementById('equals').addEventListener('click', () => {
  if (!operator || !operand) return;
  fetch(`/api/calc?action=${operator}&a=${operand}&b=${current}`)
    .then(r => r.json())
    .then(j => {
      if (j.error) {
        alert(j.error);
        return;
      }
      current = j.result.toString();
      display.value = current;
      operator = null; operand = null;
    });
});

document.getElementById('clear').addEventListener('click', () => {
  current = ''; operator = null; operand = null;
  display.value = '';
});