const sheet = document.getElementById('sheet__div');
function addNode(e) {
    const message = document.getElementById('sheet__input');
    createBlock(sheet, message.value);
    message.value = '';
}

function createBlock(root, textMessage) {
    const listBlock = document.createElement('div');
    listBlock.classList.add('sheet__list');
    root.prepend(listBlock);

    const innerBlock = document.createElement('div');
    innerBlock.classList.add('sheet__inner-list');
    listBlock.prepend(innerBlock);


    const listCheckbox = document.createElement('input');
    listCheckbox.type = "checkbox";
    listCheckbox.classList.add('sheet__checkbox');
    innerBlock.append(listCheckbox);

    const listText = document.createElement('label');
    listText.classList.add('sheet__label');
    listText.innerHTML = textMessage;
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
}

function destroy_oneListElement(root, list) {
    root.removeChild(list);
}

function delete_parentNode(currentNode) {

}

function delete_lastRow(currentNode) {
    currentNode.parentNode.parentNode.removeChild(currentNode.parentNode.parentNode.lastElementChild);
}