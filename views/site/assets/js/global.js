function makeYoutubeVideoOpanable(){
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

makeYoutubeVideoOpanable()