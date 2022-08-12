const HOST = `http://${document.querySelector('#host').dataset['host']}`

//makeYoutubeVideoOpanable()
makeLoginModalButtonActive()
makeRegistrationModalButtonActive()
makeLogoutButtonActive()
makeSubscribeEmailIconActive()

function makeYoutubeVideoOpanable() {
   document.querySelectorAll('.video').forEach(video => {
      video.addEventListener('click', (e) => {
         const vid = e.target.dataset['vid']
         const modal = document.createElement('div')
         modal.classList.add('youtube-watch-wrapper')
         modal.innerHTML = `
            <div class="watch-video">
            <div class="close">
               <svg height="512px" fill="white" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g class="st2" id="cross">
                     <g class="st0"><line class="st1" x1="112.5" x2="401" y1="112.5" y2="401"/>
                        <line class="st1" x1="401" x2="112.5" y1="112.5" y2="401"/>
                     </g>
                  </g>
                  <g id="cross_copy">
                     <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
                  </g>
               </svg>
            </div>
            <iframe src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
         </div>
         `
         window.scrollTo(0, 0);

         modal.querySelector('.close').onclick = () => {
            modal.remove()
            document.body.style.overflow = ''
         }

         document.body.appendChild(modal)
         document.body.style.overflow = 'hidden'
      })
   })
}



function makeLoginModalButtonActive() {
   if (document.querySelector('.login-span') == null) return
   document.querySelector('.login-span').addEventListener('click', e => {
      const modal = document.createElement('div')
      modal.classList.add('login-wrapper')
      modal.innerHTML =
         `
      <div class="login-block">
         <div class="close">
            <svg height="512px" fill="white" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
               <g class="st2" id="cross">
                  <g class="st0"><line class="st1" x1="112.5" x2="401" y1="112.5" y2="401"/>
                     <line class="st1" x1="401" x2="112.5" y1="112.5" y2="401"/>
                  </g>
               </g>
               <g id="cross_copy">
                  <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
               </g>
            </svg>
         </div>
         <h2>Войти в аккаунт</h2>
         <input type="text" placeholder="Email" id="login-email">
         <input type="password" placeholder="Пароль" id="login-pass">
         <div class="login-button">Войти</div>
      </div>
      `

      document.body.appendChild(modal)
      setTimeout(() => {
         modal.style.opacity = 100
      }, 1)

      modal.querySelector('.login-button').addEventListener('click', e => {
         const email = modal.querySelector('#login-email').value
         const password = modal.querySelector('#login-pass').value
      
         if (!email) {
            return createErrorMessage('Необходимо ввести email')
         }
         if (!password) {
            return createErrorMessage('Необходимо ввести пароль')
         }

         

         fetch(`${HOST}/api/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email,
               password
            })
         })
            .then((res) => res.json())
            .then(responce => {
               if (responce.message) {
                  return createErrorMessage(responce.message)
               }
               location.reload()
            })

      })







      modal.querySelector('.close').onclick = () => {
         modal.style.opacity = 0
         setTimeout(() => {
            modal.remove()
            document.body.style.overflow = ''
         }, 300)


      }
   })
}

function makeRegistrationModalButtonActive() {
   if (document.querySelector('.registration-span') == null) return
   document.querySelector('.registration-span').addEventListener('click', e => {
      const modal = document.createElement('div')
      modal.classList.add('registration-wrapper')
      modal.innerHTML =
         `
      <div class="login-block">
         <div class="close">
            <svg height="512px" fill="white" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
               <g class="st2" id="cross">
                  <g class="st0"><line class="st1" x1="112.5" x2="401" y1="112.5" y2="401"/>
                     <line class="st1" x1="401" x2="112.5" y1="112.5" y2="401"/>
                  </g>
               </g>
               <g id="cross_copy">
                  <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
               </g>
            </svg>
         </div>
         <h2>Регистрация</h2>
         <input type="text" placeholder="Имя" id="reg-name">
         <input type="text" placeholder="Фамилия" id="reg-lastname">
         <input type="text" placeholder="Email" id="reg-email">
         <input type="password" placeholder="Пароль" id="reg-pass1">
         <input type="password" placeholder="Повторите пароль" id="reg-pass2">
         <div class="login-button">Зарегистрироваться</div>
      </div>
      `

      document.body.appendChild(modal)
      setTimeout(() => {
         modal.style.opacity = 100
      }, 1)

      modal.querySelector('.login-button').addEventListener('click', e => {
         const name = modal.querySelector('#reg-name').value
         const lastname = modal.querySelector('#reg-lastname').value
         const email = modal.querySelector('#reg-email').value
         const password1 = modal.querySelector('#reg-pass1').value
         const password2 = modal.querySelector('#reg-pass2').value

         if (!name) {
            return createErrorMessage('Необходимо ввести имя')
         }
         if (!lastname) {
            return createErrorMessage('Необходимо ввести фамилию')
         }
         if (!email) {
            return createErrorMessage('Необходимо ввести email')
         }

         if (password1 != password2) {
            return createErrorMessage('Введенные пароли не совпадают')
         }

         fetch(`${HOST}/api/auth/registration`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               first_name: name,
               last_name: lastname,
               email,
               password: password1
            })
         })
            .then((res) => res.json())
            .then(responce => {
               if (responce.message) {
                  return createErrorMessage(responce.message)
               }
               location.reload()
            })

      })



      modal.querySelector('.close').onclick = () => {
         modal.style.opacity = 0
         setTimeout(() => {
            modal.remove()
            document.body.style.overflow = ''
         }, 300)
      }
   })
}

function makeLogoutButtonActive() {
   if (document.querySelector('#user-logout') == null) return
   document.querySelector('#user-logout').addEventListener('click', e => {
      fetch(`${HOST}/api/auth/logout`)
         .then(() => location.reload())
   })
}

function createErrorMessage(text) {
   const message = document.createElement('div')
   message.classList.add('error-message')
   message.innerHTML = text
   document.body.appendChild(message)

   setTimeout(() => {
      message.style.opacity = 100
   }, 1)
   setTimeout(() => {
      message.style.opacity = 0
   }, 3000)
   setTimeout(() => {
      message.remove()
   }, 3300)
}

function createDoneMessage(text) {
   const message = document.createElement('div')
   message.classList.add('error-message')
   message.style.backgroundColor = '#48AD01'
   message.innerHTML = text
   document.body.appendChild(message)

   setTimeout(() => {
      message.style.opacity = 100
   }, 1)
   setTimeout(() => {
      message.style.opacity = 0
   }, 3000)
   setTimeout(() => {
      message.remove()
   }, 3300)
}

function makeSubscribeEmailIconActive() {
   document.querySelector('#gmail-icon').addEventListener('click', e => {
      console.log(2)
      const modal = document.createElement('div')
      modal.classList.add('registration-wrapper', 'email-wrapper')
      modal.innerHTML = 
      `
         <div class="login-block email-block">
            <div class="close">
               <svg height="512px" fill="white" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g class="st2" id="cross">
                     <g class="st0"><line class="st1" x1="112.5" x2="401" y1="112.5" y2="401"/>
                        <line class="st1" x1="401" x2="112.5" y1="112.5" y2="401"/>
                     </g>
                  </g>
                  <g id="cross_copy">
                     <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
                  </g>
               </svg>
            </div>
            <h2>Подписаться</h2>
            <input type="text" placeholder="Email" id="subscribe-email">
            
            <div class="login-button">Подписаться</div>
         </div>
      `

      document.body.appendChild(modal)
      setTimeout(() => {
         modal.style.opacity = 100
      }, 1)

      modal.querySelector('.close').onclick = () => {
         modal.style.opacity = 0
         setTimeout(() => {
            modal.remove()
         }, 300)
      }   
   })
}