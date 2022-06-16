import './index.scss'

import Item from '../components/Item';
import Section from '../components/Section';

const formInput = document.querySelector('.form__input')

const dropDownButton = document.querySelector('.form__input-drop-down')
const dropDownElements = document.querySelector('.form__input-drop-down-elements')

const inputRange = document.getElementById('input-range')
const inputRangeProcent = document.querySelector('.form__input-range-procent')

const uploadInputFile = document.querySelector('#input-upload')
const uploadButtonText = document.querySelector('.form__input-upload-text')

// инпут ползунок
inputRangeProcent.innerHTML = inputRange.value + ' %'
inputRange.oninput = function () {
  inputRangeProcent.innerHTML = this.value + ' %'
}

const items = ["Sed ut perspiciatis", "Nemo enim ipsam", "Et harum quidem", "Temporibus autem", "Itaque earum rerum", "Sed ut perspiciatis", "Nemo enim ipsam", "Et harum quidem", "Temporibus autem", "Itaque earum rerum"];

// обьект данных с формы
const formData = {
  typeSystem: '',
  email: '',
  name: ''
}

const textClickHandler = (data) => {
  dropDownButton.value = data;
  closeDropDownContainer()
}

// генерирует элемент текста для выпадающего списка 
const itemRenderer = (data) => {
  const item = new Item(data, '#drop-down', {
    onTextClick: textClickHandler
  });

  return item.generateItem();
}

itemRenderer(items);

// отрисовывает элементы выпадающего списка
const cardListSection = new Section({
  items,
  renderer: itemRenderer
}, '.form__input-drop-down-elements');

cardListSection.renderer();

// выпадающее меню
const openDropDownContainer = (e) => {
  e.preventDefault()
  dropDownButton.classList.add('form__input-drop-down_dark')
  dropDownButton.classList.remove('form__input')
  dropDownElements.classList.add('form__input-drop-down-elements_opened')
}

const closeDropDownContainer = () => {
  dropDownButton.classList.remove('form__input-drop-down_dark')
  dropDownButton.classList.add('form__input')
  dropDownElements.classList.remove('form__input-drop-down-elements_opened')
}
// инпут загрузки файлов
const uploadButtonChange = () => {
  uploadInputFile.value ? uploadButtonText.textContent = 'Файл загружен' : uploadButtonText.textContent = 'Прикрепите файл';
}

//слушатели выпадающего меню
dropDownButton.addEventListener('click', (openDropDownContainer))
dropDownButton.removeEventListener('click', (closeDropDownContainer))

// слушатели загрузки файла
uploadInputFile.addEventListener('change', (e) => {
  uploadButtonChange()
})
uploadInputFile.removeEventListener('change', (e) => {
  uploadButtonChange()
})


