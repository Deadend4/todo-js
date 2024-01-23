const sheet = document.getElementById('sheet__div');
const sheet__input = document.getElementById('sheet__input');
const sheet__bottom = document.getElementById('sheet__bottom');
let index = 0;
function addNode(e) {
    const message = document.getElementById('sheet__input');
    if (index === 0) {
        sheet__bottom.classList.remove('sheet__bottom_hidden');
        sheet__input.classList.add('sheet__input_listed');
    }
    createBlock(sheet, message.value);
    message.value = '';
}

function createBlock(root, textMessage) {
    /* the main container for a list item */
    const listBlock = document.createElement('div');
    listBlock.classList.add('sheet__list');
    root.prepend(listBlock);
    /* a flex block for a list item content */
    const innerBlock = document.createElement('div');
    innerBlock.classList.add('sheet__inner-list');
    listBlock.prepend(innerBlock);
    /* checkbox */
    const listCheckbox = document.createElement('input');
    listCheckbox.type = "checkbox";
    listCheckbox.id = `chechbox${index}`;
    listCheckbox.classList.add('sheet__checkbox');
    innerBlock.append(listCheckbox);
    /* label for checkbox */
    const labelCheckbox = document.createElement('label');
    labelCheckbox.innerHTML = '';
    labelCheckbox.classList.add('sheet__checkbox-label');
    labelCheckbox.htmlFor = `chechbox${index}`;
    innerBlock.append(labelCheckbox);
    /* todo text  */
    const listText = document.createElement('label');
    listText.classList.add('sheet__label');
    listText.innerHTML = textMessage;
    listText.contentEditable = true;
    innerBlock.append(listText);

    const listDelete = document.createElement('button');

    listDelete.innerHTML = '×';
    listDelete.type = 'button';
    listDelete.addEventListener('click', (e) => {
        e.preventDefault();
        destroy_oneListElement(sheet, listBlock);
        delete_parentNode(listDelete);
        return false;
    });
    listDelete.classList.add('sheet__delete');
    listBlock.append(listDelete);
    index++;
}

function destroy_oneListElement(root, list) {
    root.removeChild(list);
    if (root.lastElementChild === null) {
        index = 0;
        sheet__bottom.classList.add('sheet__bottom_hidden');
        sheet__input.classList.remove('sheet__input_listed');
    }
}

function delete_parentNode(currentNode) {

}

function delete_lastRow(currentNode) {
    currentNode.parentNode.parentNode.removeChild(currentNode.parentNode.parentNode.lastElementChild);
}