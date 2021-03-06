function modal() {
  /* ---------------------------------- Modal --------------------------------- */

  let more = document.querySelectorAll('.description-btn, .more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

  more.forEach(function (item) {
    item.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  });

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.forEach(function (item) {
      item.classList.remove('more-splash');
    });
    document.body.style.overflow = '';
  });
}

module.exports = modal;