'use strict';

const button = document.querySelector('.Add');
const container = document.querySelector('.Container');

function createNewRect() {
  const htmlWidth = document.documentElement.clientWidth;
  const htmlHeight = document.documentElement.clientHeight;

  const maxWidth = htmlWidth * 0.5;
  const minWidth = htmlWidth * 0.05;
  const maxHeight = htmlHeight * 0.5;
  const minHeight = htmlHeight * 0.05;

  let red = 0;
  let green = 0;
  let blue = 0;

  const rect = document.createElement('div');

  rect.classList.add('Rect');

  rect.style.position = 'absolute';

  container.append(rect);

  rect.style.width = Math.floor(
    minWidth + Math.random() * (maxWidth - minWidth + 1)) + 'px';

  rect.style.height = Math.floor(
    minHeight + Math.random() * (maxHeight - minHeight + 1)) + 'px';

  const leftPosition = Math.floor(Math.random() * (htmlWidth + 1));
  const topPosition = Math.floor(Math.random() * (htmlHeight + 1));

  if ((htmlWidth - leftPosition) < parseFloat(rect.style.width)) {
    rect.style.left = htmlWidth - parseFloat(rect.style.width) + 'px';
  } else {
    rect.style.left = leftPosition + 'px';
  }

  if ((htmlHeight - topPosition) < parseFloat(rect.style.height)) {
    rect.style.top = htmlHeight - parseFloat(rect.style.height) + 'px';
  } else {
    rect.style.top = topPosition + 'px';
  }

  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);

  rect.style.background = `rgb(${red},${green},${blue})`;

  // ---------------- Add elements for change size -------

  const leftChangeSize = document.createElement('div');
  const rightChangeSize = document.createElement('div');
  const topChangeSize = document.createElement('div');
  const bottomChangeSize = document.createElement('div');

  rect.append(leftChangeSize);
  rect.append(rightChangeSize);
  rect.append(topChangeSize);
  rect.append(bottomChangeSize);

  // ------ Left side -------------

  leftChangeSize.classList.add('Rect__leftChangeSize');
  leftChangeSize.style.position = 'absolute';
  leftChangeSize.style.left = 0;
  leftChangeSize.style.top = 0;
  leftChangeSize.style.width = '5px';
  leftChangeSize.style.height = rect.style.height;
  leftChangeSize.style.cursor = 'w-resize';

  leftChangeSize.addEventListener('mousedown', startChangeLeftSize);

  function startChangeLeftSize() {
    window.addEventListener('mousemove', changeLeftSize);
    window.addEventListener('mouseup', endChangeLeftSize);
  }

  function changeLeftSize(event) {
    const right = rect.offsetLeft + rect.clientWidth;

    rect.style.left = event.clientX + 'px';
    rect.style.width = right - event.clientX + 'px';
    topChangeSize.style.width = rect.style.width;
    bottomChangeSize.style.width = rect.style.width;
  }

  function endChangeLeftSize() {
    window.removeEventListener('mousemove', changeLeftSize);
    window.removeEventListener('mouseup', endChangeLeftSize);
  }

  // ------------- Right side ---------------------

  rightChangeSize.classList.add('Rect__rightChangeSize');
  rightChangeSize.style.position = 'absolute';
  rightChangeSize.style.right = 0;
  rightChangeSize.style.top = 0;
  rightChangeSize.style.width = '5px';
  rightChangeSize.style.height = rect.style.height;
  rightChangeSize.style.cursor = 'e-resize';

  rightChangeSize.addEventListener('mousedown', startChangeRightSize, false);

  function startChangeRightSize() {
    window.addEventListener('mousemove', changeRightSize, false);
    window.addEventListener('mouseup', endChangeRightSize, false);
  }

  function changeRightSize(event) {
    rect.style.width = event.clientX - rect.offsetLeft + 'px';
    topChangeSize.style.width = rect.style.width;
    bottomChangeSize.style.width = rect.style.width;
  }

  function endChangeRightSize() {
    window.removeEventListener('mousemove', changeRightSize, false);
    window.removeEventListener('mouseup', endChangeRightSize, false);
  }

  // ------------ Top side --------------------------

  topChangeSize.classList.add('Rect__topChangeSize');
  topChangeSize.style.position = 'absolute';
  topChangeSize.style.left = 0;
  topChangeSize.style.top = 0;
  topChangeSize.style.width = rect.style.width;
  topChangeSize.style.height = '5px';
  topChangeSize.style.cursor = 'n-resize';

  topChangeSize.addEventListener('mousedown', startChangeTopSize);

  function startChangeTopSize() {
    window.addEventListener('mousemove', changeTopSize);
    window.addEventListener('mouseup', endChangeTopSize);
  }

  function changeTopSize(event) {
    const bottom = rect.offsetTop + rect.clientHeight;

    rect.style.top = event.clientY + 'px';
    rect.style.height = bottom - event.clientY + 'px';
    leftChangeSize.style.height = rect.style.height;
    rightChangeSize.style.height = rect.style.height;
  }

  function endChangeTopSize() {
    window.removeEventListener('mousemove', changeTopSize);
    window.removeEventListener('mouseup', endChangeTopSize);
  }

  // ------------ Bottom side -------------------

  bottomChangeSize.classList.add('Rect__bottomChangeSize');
  bottomChangeSize.style.position = 'absolute';
  bottomChangeSize.style.left = 0;
  bottomChangeSize.style.bottom = 0;
  bottomChangeSize.style.width = rect.style.width;
  bottomChangeSize.style.height = '5px';
  bottomChangeSize.style.cursor = 's-resize';

  bottomChangeSize.addEventListener('mousedown', startChangeBottomSize);

  function startChangeBottomSize() {
    window.addEventListener('mousemove', changeBottomSize);
    window.addEventListener('mouseup', endChangeBottomSize);
  }

  function changeBottomSize(event) {
    rect.style.height = (event.clientY - rect.offsetTop) + 'px';
    leftChangeSize.style.height = rect.style.height;
    rightChangeSize.style.height = rect.style.height;
  }

  function endChangeBottomSize() {
    window.removeEventListener('mousemove', changeBottomSize);
    window.removeEventListener('mouseup', endChangeBottomSize);
  }
}

button.addEventListener('click', createNewRect);

let lastTarget = null;

window.addEventListener('click', {
  handleEvent(event) {
    const target = event.target;

    if (!target.classList.contains('Rect')) {
      return;
    }

    if (target === lastTarget) {
      return;
    }

    if (target !== lastTarget && lastTarget) {
      lastTarget.style.zIndex = 0;
    }

    target.style.zIndex = 1;
    lastTarget = target;
  },
});
