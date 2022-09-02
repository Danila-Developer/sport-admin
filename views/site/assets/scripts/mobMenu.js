const open = document.querySelector('.mob-menu')

if (open) {
   const wrapper = document.querySelector('.menu-mob-wrapper')
   const container = document.querySelector('.menu-mob-container')

   open.addEventListener('click', e => {
      wrapper.style.display = 'block'
      setTimeout(() => {
         wrapper.style.opacity = 1
         container.style.transform = 'translateX(0)'
      }, 1)

      container.querySelector('.menu-mob-container__close').addEventListener('click', e => {
         wrapper.style.opacity = 0
         container.style.transform = 'translateX(-100%)'
         setTimeout(() => {
            wrapper.style.display = 'none'
         }, 400)
      })

      
   })
}

document.querySelectorAll('.header__nav__ul__user__name').forEach(user => {
   user.addEventListener('click', e => {
      fetch(`http://${HOST}/api/auth/logout`)
      .then(() => location.reload())
   })
})