// --- Проверка на телефон (тач-экран) ---
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  const warningDiv = document.createElement('div');
  warningDiv.id = 'mobile-warning';
  warningDiv.style.display = 'flex';
  warningDiv.innerHTML = '<b>Вы зашли с телефона 📱</b><span>Пожалуйста, зайдите с ПК или включите полную версию сайта в настройках браузера.</span>';
  document.body.appendChild(warningDiv);
}

const btn = document.getElementById('magicBtn');
const textContainer = document.getElementById('text-container');

// --- Звук ---
let audioCtx; 
function playClickSound() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sine'; 
  oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); 
  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); 
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.03); 
}

btn.addEventListener('click', () => {
  btn.style.color = '#00bfff';
  btn.style.borderColor = '#00bfff';
  btn.style.backgroundColor = 'transparent';
  btn.textContent = 'механика классная';
  document.body.style.backgroundColor = '#021a02'; 
  
  if (textContainer.innerHTML === '') {
    const betaText = document.createElement('div');
    betaText.className = 'beta-text';
    betaText.textContent = 'это бета страница';
    textContainer.appendChild(betaText);
    
    setTimeout(() => { betaText.classList.add('show'); }, 50);
    setTimeout(() => { textContainer.style.top = '20px'; }, 500);
  }

  if (!document.getElementById('timer')) {
    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer';
    timerDiv.textContent = '5';
    document.body.appendChild(timerDiv);

    setTimeout(() => { timerDiv.classList.add('show'); }, 50);

    let timeLeft = 5;
    
    const countdown = setInterval(() => {
      timeLeft--;
      timerDiv.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        
        timerDiv.classList.remove('show');
        btn.classList.add('explode');
        
        setTimeout(() => {
          btn.style.display = 'none';
          timerDiv.remove();
          
          // Создаем ползунок (он остается по центру)
          const uiContainer = document.createElement('div');
          uiContainer.className = 'ui-container';
          
          const sliderContainer = document.createElement('div');
          sliderContainer.className = 'slider-container';
          const slider = document.createElement('input');
          slider.type = 'range';
          slider.min = '1';
          slider.max = '100';
          slider.value = '50'; 
          slider.addEventListener('input', playClickSound);
          sliderContainer.appendChild(slider);
          
          uiContainer.appendChild(sliderContainer);
          document.body.appendChild(uiContainer);

          setTimeout(() => {
            uiContainer.classList.add('show');
            setTimeout(() => { sliderContainer.classList.add('show'); }, 100);
            
            // Вызываем форму
            createFeedbackForm();
          }, 50);

        }, 500);
      }
    }, 1000); 
  }
});

// --- Функция создания формы с кулдауном ---
function createFeedbackForm() {
  if (document.querySelector('.feedback-container')) return;

  const formContainer = document.createElement('div');
  formContainer.className = 'feedback-container';
  
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Предложите идею или сообщите об ошибке...';
  
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Отправить';

  let isCooldown = false; // Флаг, чтобы не спамили

  submitBtn.addEventListener('click', async () => {
    if (textarea.value.trim() === '' || isCooldown) return; 

    isCooldown = true;
    const originalText = 'Отправить';
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    const formspreeUrl = 'https://formspree.io/f/xkjjodwq'; 
    const formData = new FormData();
    formData.append('message', textarea.value);
    formData.append('_subject', 'Новое сообщение с сайта FREDMS');

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        textarea.value = '';
        textarea.placeholder = 'Спасибо за ваш отзыв!';
        textarea.disabled = true; // Блокируем поле
      } else {
        submitBtn.textContent = 'Ошибка';
      }
    } catch (error) {
      submitBtn.textContent = 'Ошибка сети';
    }

    // --- ЛОГИКА КУЛДАУНА (120 СЕКУНД) ---
    let timeLeft = 120; 
    
    // Делаем кнопку серой
    submitBtn.style.color = '#888';
    submitBtn.style.borderColor = '#888';
    submitBtn.style.backgroundColor = 'transparent';
    submitBtn.style.cursor = 'not-allowed';
    
    submitBtn.textContent = `Ждите ${timeLeft} сек...`;

    const cooldownTimer = setInterval(() => {
      timeLeft--;
      submitBtn.textContent = `Ждите ${timeLeft} сек...`;

      if (timeLeft <= 0) {
        clearInterval(cooldownTimer);
        isCooldown = false;
        
        // Возвращаем всё в норму
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.color = '#00ff00';
        submitBtn.style.borderColor = '#00ff00';
        submitBtn.style.cursor = 'pointer';
        
        textarea.disabled = false; // Разблокируем поле
        textarea.placeholder = 'Предложите идею или сообщите об ошибке...';
      }
    }, 1000);
  });

  formContainer.appendChild(textarea);
  formContainer.appendChild(submitBtn);
  document.body.appendChild(formContainer);

  setTimeout(() => {
    formContainer.classList.add('show');
  }, 100);
}
