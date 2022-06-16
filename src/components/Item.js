export default class Item {
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
