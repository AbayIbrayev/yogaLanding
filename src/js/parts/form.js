function form() {
  /* ---------------------------------- Form ---------------------------------- */
  //works on a localhost using open server panel

  let message = {
    loading: 'Loading...',
    success: 'Thank you! We will contact you soon',
    failure: 'Something went wrong!'
  };

  let form = document.querySelectorAll('.main-form, #form'),
    input = form.forEach(function (item) {
      item.getElementsByTagName('input');
    }),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.forEach(function (item) {
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
}

module.exports = form;