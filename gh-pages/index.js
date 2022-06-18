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

const dropDownButton = document.querySelector('.input-drop-down')
const dropDownElements = document.querySelector('.input-drop-down__elements')

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
}, '.input-drop-down__elements');

cardListSection.renderer();

// выпадающее меню
const openDropDownContainer = (e) => {
  e.preventDefault()
  dropDownButton.classList.add('input-drop-down_dark')
  dropDownButton.classList.remove('input')
  dropDownElements.classList.add('input-drop-down__elements_opened')
}

const closeDropDownContainer = () => {
  dropDownButton.classList.remove('input-drop-down_dark')
  dropDownButton.classList.add('input')
  dropDownElements.classList.remove('input-drop-down__elements_opened')
}

//слушатели выпадающего меню
dropDownButton.addEventListener('click', (openDropDownContainer))
dropDownButton.removeEventListener('click', (closeDropDownContainer))

const inputRange = document.getElementById('input-range')
const inputRangeProcent = document.querySelector('.input-range__title-procent')

inputRangeProcent.innerHTML = inputRange.value + ' %'
inputRange.oninput = function () {
  inputRangeProcent.innerHTML = this.value + ' %'
}

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
