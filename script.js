document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('formSuccess').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('hidden');
    this.reset();
  }, 4000);
});
