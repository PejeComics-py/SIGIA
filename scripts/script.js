var spinnerWrapper = document.querySelector('.spinner-wrapper');
window.addEventListener("load", () => {
  setTimeout(() => {
    spinnerWrapper.style.opacity = '0';
    setTimeout(() => {
      spinnerWrapper.style.display = 'none';
    }, 500);
  }, 1000);
});
