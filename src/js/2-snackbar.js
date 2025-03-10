// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { Input } from 'postcss';

const submitForm = document.querySelector('.form');

submitForm.addEventListener('submit', event => {
  event.preventDefault();

  const radioBtn = document.querySelector('input[name="state"]:checked');
  const delay = Number(document.querySelector('input[name="delay"]').value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
    document.querySelectorAll('input[name="state"]').forEach(radio => {
      radio.checked = false;
    });
    document.querySelector('input[name="delay"]').value = '';
  });
  promise
    .then(delay => {
      iziToast.show({
        color: 'green',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        color: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
