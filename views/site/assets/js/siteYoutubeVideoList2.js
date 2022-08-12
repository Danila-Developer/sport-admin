
const videoBlock = document.querySelector('.youtube__video-block')
const videoBlockWidth = videoBlock.clientWidth

const prevVideo = document.querySelector('.icon-video_prev')
const nextVideo = document.querySelector('.icon-video_next')

nextVideo.addEventListener('click', e => {
   moveVideoPageRight()
   checkVideoPageButtons()
})

prevVideo.addEventListener('click', e => {
   moveVideoPageLeft()
   checkVideoPageButtons()
})

let pageVideo = 0
let pageVideoNumber = 0
const allVideoContainer = document.querySelector('.youtube__all-videos')

document.querySelectorAll('.youtube__video-block').forEach(node => pageVideoNumber++)

function moveVideoPageRight() {
   pageVideo++
   const coorVideo = videoBlockWidth * pageVideo
   //allVideoContainer.style.transform = `translateX(-${coorVideo}px)`

   //allVideoContainer.style.transform = `none`
   allVideoContainer.style.left = -coorVideo + 'px'
   
      
      
   
   
}

function moveVideoPageLeft() {
   pageVideo--
   const coorVideo = videoBlockWidth * pageVideo
   //allVideoContainer.style.transform = `translateX(-${coorVideo}px)`

  
   //allVideoContainer.style.transform = `none`
   allVideoContainer.style.left = -coorVideo + 'px'
   
   
   
}

function checkVideoPageButtons() {
   if (pageVideo == 0) {
      prevVideo.style.display = 'none'
   } else {
      prevVideo.style.display = 'block'
   }

   if (pageVideo == pageVideoNumber - 1) {
      nextVideo.style.display = 'none'
   } else {
      nextVideo.style.display = 'block'
   }
   if (isMobile) {
      prevVideo.style.display = 'none'
      nextVideo.style.display = 'none'
   }
}

checkVideoPageButtons()

let videoX1
let videoX2
let dVideoX

allVideoContainer.addEventListener('touchstart', e => {
   videoX1 = e.touches[0].clientX
})


allVideoContainer.addEventListener('touchmove', e => {
   videoX2 = e.touches[0].clientX
   dVideoX = videoX2 - videoX1
   const coor = videoBlockWidth * pageVideo - dVideoX
   if (Math.abs(dVideoX) > 10) {
      if (dVideoX < 0) {
         if (pageVideo == pageVideoNumber-1) return
         allVideoContainer.style.left = -coor + 'px'
      } else {
         if (pageVideo == 0) return
         allVideoContainer.style.left = -coor + 'px'
      }
   }
    
   //if (pageVideo == pageVideoNumber-1 && dVideoX > 0) allVideoContainer.style.left = -coor + 'px'
})

allVideoContainer.addEventListener('touchend', e => {
   if (!dVideoX) return
   if (dVideoX < 0) {
      if (pageVideo != pageVideoNumber-1) moveVideoPageRight()
   } else {
      if (pageVideo != 0) moveVideoPageLeft()
   }
   dVideoX = 0
})






var player;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.querySelectorAll('.youtube__video-block').forEach(block => {
   block.addEventListener('click', e => {
      const playerWrapper = document.createElement('div')
      playerWrapper.classList.add('youtube-player-wrapper')
      playerWrapper.innerHTML = `
      <div class="youtube-player-close">
         <img src="assets/img/player-close.svg" alt="">
         <span>Закрыть</span>
      </div>`
      playerWrapper.style.zIndex = 100

      const vid = block.querySelector('.main-block').dataset['vid']
      const playerElement = document.createElement('div')
      playerElement.classList.add('youtube-iframe')
      playerElement.setAttribute('id', 'player')
      const blockCopy = block.querySelector('div').cloneNode(true)
      
      document.body.appendChild(playerWrapper)
      setTimeout(() => playerWrapper.style.opacity = 1, 1)

      const closePlayerButton = document.querySelector('.youtube-player-close')
      closePlayerButton.style.top = (block.parentNode.parentNode.offsetTop - closePlayerButton.clientHeight) + 'px'

      closePlayerButton.style.right = (document.body.clientWidth - block.querySelector('img').clientWidth)/2 + 2 + 'px'

      Array.from(block.childNodes).forEach(node => node.remove())
      playerElement.style.zIndex = 1000000
      block.appendChild(playerElement)
      

      


      player = new YT.Player('player', {
         height: '360',
         width: '640',
         videoId: vid,
         events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
         }
      });
      
      closePlayerButton.addEventListener('click', e => {
         playerWrapper.style.opacity = 0
         setTimeout(() => playerWrapper.remove(), 300)
         block.querySelector('#player').remove()
         block.appendChild(blockCopy)
      })
      


      function onPlayerReady(event) {
         player.playVideo();
      }


      var done = false;
      function onPlayerStateChange(event) {
         if (event.data = 5) {
            //player.loadVideoById("bHQqvYy5KYo", 5, "large")
         }
         
      }

      function stopVideo() {
      player.stopVideo();
      }
   })
})