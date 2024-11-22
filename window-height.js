// Избегаем прокрутки при 100vh на мобильных устройствах
// https://denis-creative.com/zadaem-razmer-100vh-bez-prokrutki-dlya-mobilnyh-ustrojstv/

function setHeight() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setHeight();
window.addEventListener('resize', setHeight);