/* --------------- checks for the whole DOM tree to be loaded --------------- */
window.addEventListener('DOMContentLoaded', function() {
  'use strict';
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
});