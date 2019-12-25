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
  info.addEventListener('click', function(event) {
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

  let deadline = '2019-12-28';

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
});