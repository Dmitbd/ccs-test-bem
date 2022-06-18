const uploadInputFile = document.querySelector('#input-upload')
const uploadButtonText = document.querySelector('.input-upload__text')

const uploadButtonChange = () => {
  uploadInputFile.value ? uploadButtonText.textContent = 'Файл загружен' : uploadButtonText.textContent = 'Прикрепите файл';
}

uploadInputFile.addEventListener('change', (e) => {
  uploadButtonChange()
})
uploadInputFile.removeEventListener('change', (e) => {
  uploadButtonChange()
})
