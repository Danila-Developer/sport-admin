const buttonsBlock = document.querySelector('.next-prev-buttons')
const HOST = document.querySelector('#host').dataset['host']
if (buttonsBlock) {
   fetch(`http://${HOST}/youtube-channels/list`)
   .then(res => res.json())
   .then(channels => {
      const next = buttonsBlock.querySelector('.next-button.next')
      const prev = buttonsBlock.querySelector('.next-button.prev')
      const pageCount = channels.length
      let page = 1

      next.addEventListener('click', e => {
         
         
         if (page +1 <= pageCount) {
            page++
            next.classList.remove('button_inactive')
            next.classList.add('button_active')
            document.querySelector('.blog-container-wrapper').style.height = document.querySelector('.blog-container-wrapper').offsetHeight + 'px'
            document.querySelector('#blog-container-youtube').style.height = document.querySelector('#blog-container-youtube').offsetHeight + 'px'
            document.querySelector('#blog-container-youtube').style.opacity = 0
            setTimeout(() => {
               Array.from(document.querySelector('#blog-container-youtube').childNodes).forEach(node => node.remove())
               fetch(`http://${HOST}/youtube-videos/list/${channels[page-1].id}`)
               .then(res => res.json())
               .then(videos => {
                  document.querySelector('#blog-container-youtube').style.opacity = 1
                  document.querySelector('.blog-container-wrapper').style.height = 'auto'
                  document.querySelector('#blog-container-youtube').style.height = 'auto'
                  document.querySelector('#blog-container-youtube').innerHTML = `
                  
                  
                  <div class="title2">${videos[0].author}</div>
                  <div class="blog-wrapper">
                     <a href="/youtube/${videos[0].channel_id}?vid=${videos[0].id}" class="blog__first">
                        <img src="${videos[0].preview_url}" alt="" class="blog__img">
                        <div class="blog__info blog__info_first">
                           <div class="blog__info__title blog__info__title_first">${videos[0].video_name }</div>
                           <div class="video-preview__info__bottom">
                              <div class="video-preview__info__bottom__author">${videos[0].channel }</div>
                              <div class="video-preview__info__bottom__date">${videos[0].date }</div>
                           </div>
                        </div>
                     </a>
                     <div class="blog__sider">
                        <a href="/youtube/${videos[1].channel_id}?vid=${videos[1].id}" class="blog__side">
                           <div class="blog__img_side-wrapper">
                              <img src="${videos[1].preview_url}" alt="" class="blog__img blog__img_side">
                           </div>
                           
                           <div class="blog__info blog__info_side">
                              <div class="blog__info__title blog__info__title_side">${videos[1].video_name }</div>
                           </div>
                        </a>
                        <a href="/youtube/${videos[2].channel_id}?vid=${videos[2].id}" class="blog__side">
                           <div class="blog__img_side-wrapper">
                              <img src="${videos[2].preview_url}" alt="" class="blog__img blog__img_side">
                           </div>
                           
                           <div class="blog__info blog__info_side">
                              <div class="blog__info__title blog__info__title_side">${videos[2].video_name }</div>
                              
                           </div>
                        </a>
                     </div>
                  </div>
               
                  `
                  if (page == pageCount) {
                     next.classList.add('button_inactive')
                  }
                  if (page-1 >= 1) {
                     prev.classList.remove('button_inactive')
                  }
               })
            }, 500)
         } 
         
         
      })

      prev.addEventListener('click', e => {
         
         
         if (page-1 >= 1) {
            page--
            prev.classList.remove('button_inactive')
            prev.classList.add('button_active')
            document.querySelector('.blog-container-wrapper').style.height = document.querySelector('.blog-container-wrapper').offsetHeight + 'px'
            document.querySelector('#blog-container-youtube').style.height = document.querySelector('#blog-container-youtube').offsetHeight + 'px'
            document.querySelector('#blog-container-youtube').style.opacity = 0
            setTimeout(() => {
               Array.from(document.querySelector('#blog-container-youtube').childNodes).forEach(node => node.remove())
               fetch(`http://${HOST}/youtube-videos/list/${channels[page-1].id}`)
               .then(res => res.json())
               .then(videos => {
                  document.querySelector('#blog-container-youtube').style.opacity = 1
                  document.querySelector('.blog-container-wrapper').style.height = 'auto'
                  document.querySelector('#blog-container-youtube').style.height = 'auto'
                  document.querySelector('#blog-container-youtube').innerHTML = `
                  
                  <div class="title2">${videos[0].author}</div>
                  <div class="blog-wrapper">
                     <a href="/youtube/${videos[0].channel_id}?vid=${videos[0].id}" class="blog__first">
                        <img src="${videos[0].preview_url}" alt="" class="blog__img">
                        <div class="blog__info blog__info_first">
                           <div class="blog__info__title blog__info__title_first">${videos[0].video_name }</div>
                           <div class="video-preview__info__bottom">
                              <div class="video-preview__info__bottom__author">${videos[0].channel }</div>
                              <div class="video-preview__info__bottom__date">${videos[0].date }</div>
                           </div>
                        </div>
                     </a>
                     <div class="blog__sider">
                        <a href="/youtube/${videos[1].channel_id}?vid=${videos[1].id}" class="blog__side">
                           <div class="blog__img_side-wrapper">
                              <img src="${videos[1].preview_url}" alt="" class="blog__img blog__img_side">
                           </div>
                           
                           <div class="blog__info blog__info_side">
                              <div class="blog__info__title blog__info__title_side">${videos[1].video_name }</div>
                           </div>
                        </a>
                        <a href="/youtube/${videos[2].channel_id}?vid=${videos[2].id}" class="blog__side">
                           <div class="blog__img_side-wrapper">
                              <img src="${videos[2].preview_url}" alt="" class="blog__img blog__img_side">
                           </div>
                           
                           <div class="blog__info blog__info_side">
                              <div class="blog__info__title blog__info__title_side">${videos[2].video_name }</div>
                              
                           </div>
                        </a>
                     </div>
                  </div>
               
                  `
                  if (page == 1) {
                     prev.classList.add('button_inactive')
                  }
                  if (page == pageCount) {
                     next.classList.add('button_inactive')
                  } else {
                     next.classList.remove('button_inactive')
                  }
               })
            }, 500)
         } 
         
         
      })
   })
   
   
   
}