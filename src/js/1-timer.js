// IMPORT code //
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// CODE area//
let userSelectedDate = null;
let countdownInterval = null;

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

startButton.disabled = true;
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.disabled = false;
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      iziToast.show({
        color: 'green',
        title: 'Success',
        message: 'You pick date right!',
      });
      userSelectedDate = selectedDate;
      startButton.classList.add('hovered');
      startButton.disabled = false;
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimer() {
  const timeLeft = userSelectedDate - new Date();
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    spanDays.textContent = '00';
    spanHours.textContent = '00';
    spanMinutes.textContent = '00';
    spanSeconds.textContent = '00';
    datePicker.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  spanDays.textContent = String(days).padStart(2, '0');
  spanHours.textContent = String(hours).padStart(2, '0');
  spanMinutes.textContent = String(minutes).padStart(2, '0');
  spanSeconds.textContent = String(seconds).padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datePicker.disabled = true;
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});
