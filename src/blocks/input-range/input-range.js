const inputRange = document.getElementById('input-range')
const inputRangeProcent = document.querySelector('.input-range__title-procent')

inputRangeProcent.innerHTML = inputRange.value + ' %'
inputRange.oninput = function () {
  inputRangeProcent.innerHTML = this.value + ' %'
}
