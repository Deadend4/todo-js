'use strict';

const sheet = document.querySelector('.list');
const sheetInput = document.querySelector('.sheet__input');
const sheetBottom = document.querySelector('.sheet__bottom');
const sheetItemsLeft = document.querySelector('#sheet__items-left');
const sheetToggleAll = document.querySelector('.sheet__toggle-all');
const sheetToggleAllLabel = document.querySelector('.sheet__toggle-all-label');

const sheetFilterAll = document.querySelector('#sheet__filter-all');

const sheetFilterActive = document.querySelector('#sheet__filter-active');
const sheetFilterCompleted = document.querySelector('#sheet__filter-completed');
const sheetFilterLabels = document.querySelectorAll('.sheet__filter-label');

const sheetFilterAllLabel = document.querySelector('#sheet__filter-all-label');
const sheetFilterActiveLabel = document.querySelector('#sheet__filter-active-label');
const sheetFilterCompletedLabel = document.querySelector('#sheet__filter-completed-label');

const sheetClearComplete = document.querySelector('.sheet__clear-complete');

let index = 0;
let leftCounter = 0;
let sheetToggles = [];
let filterStatus = 'all';

sheetFilterAll.addEventListener('click', (e) => {
  e.preventDefault();
  filterStatus = 'all';
  sheetFilterAllLabel.classList.add('sheet__filter-label_active');
  sheetFilterActiveLabel.classList.remove('sheet__filter-label_active');
  sheetFilterCompletedLabel.classList.remove('sheet__filter-label_active');
  showAll(sheetToggles);

  return false;
});

sheetFilterActive.addEventListener('click', (e) => {
  e.preventDefault();
  filterStatus = 'active';
  sheetFilterActiveLabel.classList.add('sheet__filter-label_active');
  sheetFilterAllLabel.classList.remove('sheet__filter-label_active');
  sheetFilterCompletedLabel.classList.remove('sheet__filter-label_active');
  showActive(sheetToggles);
  return false;
});


sheetFilterCompleted.addEventListener('click', (e) => {
  e.preventDefault();
  filterStatus = 'complete';
  sheetFilterCompletedLabel.classList.add('sheet__filter-label_active');
  sheetFilterActiveLabel.classList.remove('sheet__filter-label_active');
  sheetFilterAllLabel.classList.remove('sheet__filter-label_active');
  showComplete(sheetToggles);
  return false;
});

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
    sheetToggles = document.querySelectorAll('.list__checkbox');
    if (this.checked) {
      leftCounter--;
      if (filterStatus === 'active') {
        showActive(sheetToggles);
      }
    } else {
      if (filterStatus === 'complete') {
        showComplete(sheetToggles);
      }
      leftCounter++;
    }
    showHideClearComplete(sheetToggles.length, leftCounter);
    updateLeftItems(sheetItemsLeft, leftCounter);
  });
  innerBlock.append(listCheckbox);
  sheetToggles = document.querySelectorAll('.list__checkbox');
  switch (filterStatus) {
    case 'active':
      showActive(sheetToggles);
      break;
    case 'complete':
      showComplete(sheetToggles);
    default:
      break;
  }
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

function showHideClearComplete(length, counter) {
  if (counter < length) {
    sheetClearComplete.classList.remove('sheet__clear-complete-label_hidden');
  } else {
    sheetClearComplete.classList.add('sheet__clear-complete-label_hidden');
  }
}

function showAll(checkboxes) {
  checkboxes.forEach((item) => {
    item.parentNode.parentNode.classList.remove('list__item_hidden');
  });
}

function showActive(checkbox) {
  if (checkbox.toString() === '[object NodeList]') {
    checkbox.forEach((item) => {
      if (item.checked) {
        item.parentNode.parentNode.classList.add('list__item_hidden');
      } else {
        item.parentNode.parentNode.classList.remove('list__item_hidden');
      }
    });
  } else {
    checkbox.parentNode.parentNode.classList.add('list__item_hidden');
  }

}

function showComplete(checkbox) {
  if (checkbox.toString() === '[object NodeList]') {
    checkbox.forEach((item) => {
      if (!item.checked) {
        item.parentNode.parentNode.classList.add('list__item_hidden');
      } else {
        item.parentNode.parentNode.classList.remove('list__item_hidden');
      }
    });
  } else {
    checkbox.parentNode.parentNode.classList.add('list__item_hidden');
  }
}

function clearCompleted(root, checkboxes) {
  checkboxes.forEach((item) => {
    if (item.checked) {
      destroyOneListElement(root, item.parentNode.parentNode);
    }
  });
}

function listIsEmpty(root) {
  if (root.lastElementChild === null) {
    index = 0;
    sheetBottom.classList.add('sheet__bottom_hidden');
    sheetInput.classList.remove('sheet__input_listed');
    sheetToggleAllLabel.classList.add('sheet__toggle-all-label_hidden');
  }
}

function destroyOneListElement(root, list) {
  root.removeChild(list);
  listIsEmpty(root);
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
