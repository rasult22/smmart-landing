require('./styles/main.css')


window.addEventListener('load', (event) => {
  // Вырубаем zoom in/out на айосах
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener('touchmove', function(e) {
      if(e.scale !== 1) {
        e.preventDefault();
      }
    }, {passive: false});
  }
  formHandlerer()
  menuLogic()
  localeHandler()
  setScrollBehavior()
});



function formHandlerer () {
  var form = document.querySelector('#landing-form')
  var name = document.querySelector('#input-name')
  var email = document.querySelector('#input-email')
  if (form) {
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
  
      fetch('https://api.smm.art/api/test-users/', {
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
}

function triggerValidationError () {
  var errorText = document.querySelector('.form__error')
  errorText.style.opacity = 1
}

function submitSucceed () {
  var successMessageEl = document.querySelector('.form__success')
  var formWrapper = document.querySelector('.form__inputs-wrapper')
  successMessageEl.style.display = 'block'
  formWrapper.style.display = 'none'

}

function menuLogic () {
  var burger = document.querySelector('#burger')
  var closemenu = document.querySelector('#close-menu')
  var menu = document.querySelector('#mobile-menu')

  if (closemenu && burger) {
    closemenu.addEventListener('click', function () {
      menu.style.display = 'none'
    })
  
    burger.addEventListener('click', function () {
      menu.style.display = 'block'
    })
  }
}


function localeHandler () {
  var activeLang = location.pathname.startsWith('/en') ? 'en' : 'ru'
  var langs = document.querySelectorAll('.lang-switcher__item')

  if (langs.length) {
    langs.forEach(function (x) {
      x.addEventListener('click', function (e) {
        var pathname = window.location.pathname
        if (x.dataset.lang === 'en' && activeLang !== 'en') {
          localStorage.setItem('activeLang', 'en')
          window.location.href = pathname === '/' ? '/en' : '/en' + pathname
        }
        if (x.dataset.lang === 'ru' && activeLang !== 'ru') {
          localStorage.setItem('activeLang', 'ru')
          window.location.href = pathname.startsWith('/en/') ? pathname.split('/en').join('') : pathname.split('/en').join('/')
        }
      })
    })
  }

  // Article page back btn handle depend on value in localStorage
  var storageLang = localStorage.getItem('activeLang')
  var locale =  storageLang ? storageLang : 'ru' 

  var articleBackBtn = document.querySelector('.article-back-btn')
  if (articleBackBtn) {
    articleBackBtn.addEventListener('click', function(e) {
      if (locale === 'ru') {
        return
      } else {
        e.preventDefault()
        window.location.href = '/en/posts.html'
      }
    })
  }
}

function setScrollBehavior () {
  function clickHandler(e) {
    e.preventDefault();
    var href = this.getAttribute("href");
    var offsetTop = getOffsetTop(document.querySelector(href))
    window.scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  }

  var links = document.querySelectorAll('.app-menu__item--smooth a')

  if (links.length) {
    links.forEach(function (x) {
      x.addEventListener('click', clickHandler)
    })
  }
}
var getOffsetTop = function (element) {
  var offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}