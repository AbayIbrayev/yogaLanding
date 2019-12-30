function timer() {
  /* ---------------------------------- timer --------------------------------- */

  //setting the deadline

  let deadline = '2020-01-01';

  //calculating and rounding numbers using the Date.parse and Math.floor methods
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)));

    //returning an object with data
    return {
      'total': t,
      'hours': hours,
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
}

module.exports = timer;