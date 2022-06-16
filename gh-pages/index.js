import './index.scss'

class Item {
  constructor(data, itemSelector, handlers) {
    this.data = data
    this.itemSelector = itemSelector

    this.handleTextClick = handlers.onTextClick;
  }

  getTemplate() {
    const itemElement = document
      .querySelector(this.itemSelector)
      .content
      .querySelector('.drop-down__element')
      .cloneNode(true)

    return itemElement;
  }

  generateItem() {
    this.element = this.getTemplate();
    this.addEvents();

    this.element.querySelector('.drop-down__element-text').textContent = this.data;

    return this.element;
  }

  addEvents() {
    const dropDownElementText = this.element.querySelector('.drop-down__element-text')
    dropDownElementText.addEventListener('click', (e) => {
      this.handleTextClick(this.data)
    })
  }
}

class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.itemRenderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderer(direction = 'after') {
    this.container.innerHTML = '';

    this.items.forEach(itemData => {
      const itemElement = this.itemRenderer(itemData);
      this.addItem(itemElement, direction);
    })
    return this;
  }

  addItem(element, direction) {
    if (direction === 'after') {
      this.container.append(element);
    } else {
      this.container.prepend(element);
    }
    return this;
  }

  setItems(items) {
    this.items = items;
    return this;
  }
}

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


