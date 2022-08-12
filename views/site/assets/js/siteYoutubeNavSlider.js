let isMobile
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
   isMobile = true
}

let page = 1
const itemsVisible = document.querySelector('.youtube-nav__visible_items')
const itemsVisibleWidth = itemsVisible.offsetWidth
const itemsAllContainer = document.querySelector('.youtube-nav__items')
const items = document.querySelectorAll('.youtube-nav__item')

let itemsWidth = 0
let pageCount = 1
for (let i = 0; i < items.length; i++) {
   if (itemsVisibleWidth - itemsWidth < items[i].offsetWidth) {
      pageCount++
      itemsWidth = items[i].offsetWidth
   } else itemsWidth += items[i].offsetWidth
}

itemsWidth = 0

let _i = 0

for (let j = 1; j <= pageCount; j++) {
   const itemsContainer = document.createElement('div')
   itemsContainer.classList.add('itemsContainer')

   for (let i = _i; i < items.length; i++) {
      if (itemsVisibleWidth - itemsWidth < items[i].offsetWidth) {
         itemsWidth = 0
         _i = i
         break
      } else {
         itemsContainer.appendChild(items[i].cloneNode(true))
         itemsWidth += items[i].offsetWidth
      }
   }
   itemsVisible.appendChild(itemsContainer)
}
items.forEach(node => node.remove())

let pageWidth = 0
page = 0
document.querySelector('.icon_next').addEventListener('click', e => {
   moveNavSliderRight()
})

document.querySelector('.icon_prev').addEventListener('click', e => {
   moveNavSliderLeft()
})

function convertRemToPixels(rem) {
   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
itemsWidth = 0

function checkPageButton() {
   const next = document.querySelector('.icon_next')
   const prev = document.querySelector('.icon_prev')
   if (page == 0) {
      prev.style.display = 'none'
   } else {
      prev.style.display = 'block'
   }

   if (page == pageCount - 1) {
      next.style.display = 'none'
   } else {
      next.style.display = 'block'
   }
   if (isMobile) {
      prev.style.display = 'none'
      next.style.display = 'none'
   }
}

checkPageButton()

function moveNavSliderRight() {
   page++
   const coor = itemsVisibleWidth * page
   document.querySelectorAll('.itemsContainer').forEach(page => page.style.transform = `translateX(-${coor}px)`)
   checkPageButton()
}

function moveNavSliderLeft() {
   page--
   const coor = itemsVisibleWidth * page
   document.querySelectorAll('.itemsContainer').forEach(page => page.style.transform = `translateX(-${coor}px)`)
   checkPageButton()
}


let navX1
let navX2
let dNavX

const youtubeNavElement = document.querySelector('.youtube-nav')

youtubeNavElement.addEventListener('touchstart', e => {
   navX1 = e.touches[0].clientX
})

youtubeNavElement.addEventListener('touchmove', e => {
   navX2 = e.touches[0].clientX
   dNavX = navX2 - navX1
   const coor = itemsVisibleWidth * page - dNavX
   if (page != pageCount-1) document.querySelectorAll('.itemsContainer').forEach(page => page.style.transform = `translateX(-${coor}px)`)
   if (page == pageCount-1 && dNavX > 0) document.querySelectorAll('.itemsContainer').forEach(page => page.style.transform = `translateX(-${coor}px)`)
})
youtubeNavElement.addEventListener('touchend', e => {
   if (dNavX < 0) {
      if (page != pageCount-1) moveNavSliderRight()
   } else {
      if (page != 0) moveNavSliderLeft()
   }
})


