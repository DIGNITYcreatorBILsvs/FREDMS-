// --- ОТПРАВКА УВЕДОМЛЕНИЯ В DISCORD ---
async function sendDiscordAlert() {
  // ⚠️ ВСТАВЬ СЮДА СВОЮ ССЫЛКУ ИЗ DISCORD ⚠️
  const WEBHOOK_URL = '';

  try {
    const message = {
  
    };

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Обход защиты браузера
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (error) {
    console.log("Ошибка отправки в Discord", error);
  }
}

// Запускаем отправку в Discord сразу при заходе
sendDiscordAlert();


// --- ЛОГИКА ХОРРОР-САЙТА ---

// 1. Показываем угрозу 4 секунды
setTimeout(() => {
  document.getElementById('warning-screen').style.display = 'none';
  
  const leaveScreen = document.getElementById('leave-screen');
  const leaveText = document.getElementById('leave-text');
  
  leaveScreen.style.display = 'block';
  
  // 2. Эффект мигания для слова "УХОДИ"
  let blinkCount = 0;
  const blinkInterval = setInterval(() => {
    leaveText.style.opacity = leaveText.style.opacity === '0' ? '1' : '0';
    blinkCount++;
    
    // Как только слово мигнуло 6 раз (3 секунды), запускаем краш
    if (blinkCount >= 6) {
      clearInterval(blinkInterval);
      leaveScreen.style.display = 'none';
      triggerCrash();
    }
  }, 500); // Мигание каждые полсекунды

}, 4000);

// Функция фейкового краша браузера
function triggerCrash() {
  const crashScreen = document.getElementById('crash-screen');
  crashScreen.style.display = 'flex';
  
  // Создаем эффект "помех" (глитча) на экране
  document.body.style.animation = 'shake 0.1s infinite';
  document.body.style.backgroundColor = '#111';
  
  // Добавляем противный звук
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  } catch (e) {}

  // Через 1.5 секунды после "краша" вырубаем всё
  setTimeout(() => {
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#000';
    document.body.style.animation = 'none';
    
    // Пытаемся закрыть вкладку
    window.close();
    window.stop();
  }, 1500); 
}
