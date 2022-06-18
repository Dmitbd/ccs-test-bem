import Item from "../../components/Item";
import Section from "../../components/Section";

const dropDownButton = document.querySelector('.input-drop-down')
const dropDownElements = document.querySelector('.input-drop-down__elements')

// массив элементов (допустим с сервера)
const items = ["Sed ut perspiciatis", "Nemo enim ipsam", "Et harum quidem", "Temporibus autem", "Itaque earum rerum", "Sed ut perspiciatis", "Nemo enim ipsam", "Et harum quidem", "Temporibus autem", "Itaque earum rerum"];

// выбор элемента
const textClickHandler = (data) => {
  dropDownButton.value = data;
  closeDropDownContainer()
}

// генерирует элемент текста для выпадающего списка 
const itemRenderer = (data) => {
  const item = new Item(data, '#input-drop-down', {
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
  dropDownButton.classList.add('input-drop-down_opened')
  dropDownButton.classList.remove('input')
  dropDownElements.classList.add('input-drop-down__elements_opened')
}

const closeDropDownContainer = () => {
  dropDownButton.classList.remove('input-drop-down_')
  dropDownButton.classList.add('input')
  dropDownElements.classList.remove('input-drop-down__elements_opened')
}

//слушатели выпадающего меню
dropDownButton.addEventListener('click', (openDropDownContainer))
dropDownButton.removeEventListener('click', (closeDropDownContainer))
