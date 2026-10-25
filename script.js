const btn = document.getElementById('magicBtn');
const textContainer = document.getElementById('text-container');

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
    
    setTimeout(() => {
      betaText.classList.add('show');
    }, 50);
  }
});
