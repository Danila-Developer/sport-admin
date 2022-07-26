///const HOST = 'localhost:3000'


makePublicationButtonActive()


async function makePublicationButtonActive() {
   document.querySelector('.publication-button').addEventListener('click', async e => {
      const title = document.querySelector('#title-input').value
      const content = document.querySelector('#content-area').value
      const category = document.querySelector('#category-input').value
      const imgFiles = document.querySelector('#image-upload-input').files
      
      if (!title) {
         createErrorMessage('Укажите заголовок публикации')
         return
      }
      if (!content) {
         createErrorMessage('Укажите текст публикации')
         return
      }
      if (!category) {
         createErrorMessage('Укажите категорию публикации')
         return
      }
      
      
      let img = false

      if (Array.from(imgFiles).length > 0) {
         console.log('ok')
         let img = imgFiles[0]
         const Reader = new FileReader()
         Reader.readAsDataURL(img)
         Reader.onload = () => {
            img = Reader.result
            fetch(`${HOST}/blog/create`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  title,
                  content,
                  category,
                  img
               })
            })
            .then( () => {
               setTimeout(() => location.replace(HOST), 1500)
               createDoneMessage('Ваша публикация успешно добавлена')
            } )
            
         }
         return
      } 
      
      fetch(`${HOST}/blog/create`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            title,
            content,
            category,
            img
         })
      })
      .then( () => {
         setTimeout(() => location.replace(HOST), 1500)
         createDoneMessage('Ваша публикация успешно добавлена')
      } )
      

      

      
   })
}

document.querySelector('#image-upload-input').onchange = () => {
   document.querySelector('#upload-done-img').style.display = 'block'
}