/* --------------- checks for the whole DOM tree to be loaded --------------- */
window.addEventListener('DOMContentLoaded', function() {
  'use strict';

/* ---------------------------------- tabs ---------------------------------- */

  //getting all the elements from the document object
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  //function to toggle classes to hide or show specific tabContents
  function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
  }

  //here we parse the first element to the hideTabContent function parameter to hide
  //all the other tabs apart from the first one
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    } 
  }

  //adding a click event to each child in the info-header element through Delegation
  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
    //through this for loop we go through each tab and check if the target
    //and matches this specific indexed tab then that index is parsed to the
    //showTabContent function to know which content to display
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });


/* ---------------------------------- timer --------------------------------- */

  //setting the deadline

  let deadline = '2020-01-01';

  //calculating and rounding numbers using the Date.parse and Math.floor methods
  function getTimeRemaining(endtime) {
      let t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000*60*60)));

          //returning an object with data
          return {
            'total' : t,
            'hours' : hours,
            'minutes': minutes,
            'seconds': seconds
          };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        //calling the updateClock function every 1s using the setInterval method
        timeInterval = setInterval(updateClock, 1000);
    
    function updateClock() {
      let t = getTimeRemaining(endtime);

      //function to add a 0 before the numbers less or equal than 9
      function addZero(num) {
        if (num <= 9) {
          return '0' + num;
        } else return num;
      }

      //setting the page elements using the textContent property 
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      //if the deadline is passed clock is set on the 00:00:00
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }
  //calling the setClock function with the parsed data
  setClock('timer', deadline);

/* ---------------------------------- Modal --------------------------------- */

  let more = document.querySelectorAll('.description-btn, .more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');
      
  more.forEach(function(item) {
    item.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  });

  close.addEventListener('click', function() {
    overlay.style.display = 'none';
    more.forEach(function(item) {item.classList.remove('more-splash');});
    document.body.style.overflow = '';
  });

/* ---------------------------------- Form ---------------------------------- */
//works on a localhost using open server panel

  let message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon',
      failure: 'Something went wrong!'
  };

  let form = document.querySelectorAll('.main-form, #form'),
      input = form.forEach(function(item) {item.getElementsByTagName('input');}),
      statusMessage = document.createElement('div');

      statusMessage.classList.add('status');
  
  form.forEach(function(item) {
    item.addEventListener('submit', function (event) {
      event.preventDefault();
      form.appendChild(statusMessage);

      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


      let formData = new FormData(form);

      //sends form data in a JSON format
      let obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      let json = JSON.stringify(obj);

      request.send(json);


      request.send(formData);

      request.addEventListener('readystatechange', function () {
        if (request.readyState < 4) {
          statusMessage.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          statusMessage.innerHTML = message.success;
        } else {
          statusMessage.innerHTML = message.failure;
        }
      });

      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    });
  });
  
/* --------------------------------- Slider --------------------------------- */
  //parameter of the current slide
  let slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  function showSlides(n) {
    //cheks for the movement from the first slide to the last one and vice versa
    if (n > slides.length) {
      slideIndex = 1;
    } 
    if(n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }
  //function to increase our slideIndex parameter
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  //checks the current slide
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  //setting the click event to the arrows

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });

  next.addEventListener('click', function () {
    plusSlides(1);
  });
  
  //setting the click event to the dots

  dotsWrap.addEventListener('click', function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

/* ------------------------------- Calculator ------------------------------- */

let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = 0;

  //mathimatical functionality and logic of the calculator's inputs
    persons.addEventListener('change', function() {
      personsSum = +this.value;
      total = (daysSum + personsSum)*4000;

      if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });

    restDays.addEventListener('change', function () {
      daysSum = +this.value;
      total = (daysSum + personsSum) * 4000;

      if (persons.value == '' || restDays.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });

    place.addEventListener('change', function() {
      if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
      }
    });
});