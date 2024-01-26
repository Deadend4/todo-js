'use strict';

const sheet = document.getElementById('list');
const sheetInput = document.getElementById('sheet__input');
const sheetBottom = document.getElementById('sheet__bottom');
const sheetItemsLeft = document.getElementById('sheet__items-left');
const sheetToggleAll = document.querySelector('.sheet__toggle-all');
const sheetToggleAllLabel = document.querySelector('.sheet__toggle-all-label');
const sheetFilterAll = document.getElementById('sheet__filter-all');
const sheetFilterActive = document.getElementById('sheet__filter-active');
const sheetFilterCompleted = document.getElementById('sheet__filter-completed');
const sheetFilterLabels = document.querySelectorAll('.sheet__filter-label');
const sheetClearComplete = document.querySelector('.sheet__clear-complete');

let index = 0;
let leftCounter = 0;
let sheetToggles = [];

sheetToggleAllLabel.addEventListener('click', (e) => {
  e.preventDefault();
  toggleAll();
  return false;
});

sheetClearComplete.addEventListener('click', (e) => {
  e.preventDefault();
  clearCompleted(sheet, sheetToggles);
  return false;
});

function toggleAll() {
  sheetToggles = document.querySelectorAll('.list__checkbox');
  sheetToggleAll.checked =
    leftCounter > 0 &&
    (leftCounter === sheetToggles.length || !sheetToggleAll.checked);
  sheetToggles.forEach((item) => {
    item.checked = sheetToggleAll.checked;
  });
  leftCounter = sheetToggleAll.checked ? 0 : sheetToggles.length;
  showHideClearComplete(sheetToggles.length, leftCounter);
  updateLeftItems(sheetItemsLeft, leftCounter);
}

function addNode() {
  if (sheetInput.value !== '') {
    if (index === 0) {
      sheetBottom.classList.remove('sheet__bottom_hidden');
      sheetInput.classList.add('sheet__input_listed');
      sheetToggleAllLabel.classList.remove('sheet__toggle-all-label_hidden');
    }
    if (sheetInput.value !== '') {
      createBlock(sheet, sheetInput.value);
    }
    sheetInput.value = '';
  }
}

function createBlock(root, textSheetInput) {
  /* the main container for a list item */
  const listBlock = document.createElement('div');
  listBlock.classList.add('list__item');
  root.prepend(listBlock);
  /* a flex block for a list item content */
  const innerBlock = document.createElement('div');
  innerBlock.classList.add('list__item-content');
  listBlock.prepend(innerBlock);
  /* checkbox */
  const listCheckbox = document.createElement('input');
  listCheckbox.type = 'checkbox';
  listCheckbox.id = `chechbox${index}`;
  listCheckbox.classList.add('list__checkbox');
  listCheckbox.addEventListener('change', function () {
    if (this.checked) {
      leftCounter--;
    } else {
      leftCounter++;
    }
    sheetToggles = document.querySelectorAll('.list__checkbox');
    showHideClearComplete(sheetToggles.length, leftCounter);
    updateLeftItems(sheetItemsLeft, leftCounter);
  });
  innerBlock.append(listCheckbox);
  /* label for checkbox */
  const labelCheckbox = document.createElement('label');
  labelCheckbox.innerHTML = '';
  labelCheckbox.classList.add('list__checkbox-label');
  labelCheckbox.htmlFor = `chechbox${index}`;
  innerBlock.append(labelCheckbox);
  /* todo text  */
  const listText = document.createElement('label');
  listText.classList.add('list__item-text');
  listText.innerHTML = textSheetInput;
  listText.contentEditable = true;
  innerBlock.append(listText);

  const listDelete = document.createElement('button');

  listDelete.innerHTML = '×';
  listDelete.type = 'button';
  listDelete.addEventListener('click', (e) => {
    e.preventDefault();
    destroyOneListElement(sheet, listBlock);
    return false;
  });
  listDelete.classList.add('list__delete-item');
  listBlock.append(listDelete);
  /*update ui*/
  index++;
  leftCounter++;
  updateLeftItems(sheetItemsLeft, leftCounter);
}

function updateLeftItems(node, counter) {
  const counterStrings = node.innerHTML.split(' ');
  counterStrings[0] = counter;
  node.innerHTML = counterStrings.join(' ');
}

function switchFilters() {
  /*in progress*/
}

function showHideClearComplete(length, counter) {
  if (counter < length) {
    sheetClearComplete.classList.remove('sheet__clear-complete-label_hidden');
  } else {
    sheetClearComplete.classList.add('sheet__clear-complete-label_hidden');
  }
}

function clearCompleted(root, checkboxes) {
  checkboxes.forEach((item) => {
    if (item.checked) {
      destroyOneListElement(root, item.parentNode.parentNode);
    }
  });
}

function destroyOneListElement(root, list) {
  root.removeChild(list);
  if (root.lastElementChild === null) {
    index = 0;
    sheetBottom.classList.add('sheet__bottom_hidden');
    sheetInput.classList.remove('sheet__input_listed');
    sheetToggleAllLabel.classList.add('sheet__toggle-all-label-hidden');
  }
  if (!list.querySelector('.list__checkbox').checked) {
    leftCounter--;
  }
  updateLeftItems(sheetItemsLeft, leftCounter);
}

function destroyLastRow(currentNode) {
  currentNode.parentNode.parentNode.removeChild(
    currentNode.parentNode.parentNode.lastElementChild
  );
}
