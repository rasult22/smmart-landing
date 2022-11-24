require('./styles/main.css')


window.addEventListener('load', (event) => {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener('touchmove', function(e) {
      if(e.scale !== 1) {
        e.preventDefault();
      }
    }, {passive: false});
  }
  formHandlerer()
});



function formHandlerer () {
  var form = document.querySelector('#landing-form')
  var name = document.querySelector('#input-name')
  var email = document.querySelector('#input-email')

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    
    if (!name.value || !email.value) {
      triggerValidationError()
      return
    }

    var params = {
      name: name.value,
      email: email.value
    }

    fetch('https://smmart.pro/api/test-users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(data => {
      submitSucceed()
      name.value = ''
      email.value = ''
    })
  })
}

function triggerValidationError () {
  const errorText = document.querySelector('.form__error')
  errorText.style.opacity = 1
}

function submitSucceed () {
  const successMessageEl = document.querySelector('.form__success')
  const formWrapper = document.querySelector('.form__inputs-wrapper')
  successMessageEl.style.display = 'block'
  formWrapper.style.display = 'none'

}
