const form = document.querySelector('.form-container');
const imgPreview = document.querySelector('.img-preview');
const title = document.querySelector('#title');
const photoURL = document.querySelector('#url');
const notes = document.querySelector('#notes');
const viewEntries = document.querySelector('.entries-link');
const viewEntryForm = document.querySelector('.new');
const ulElement = document.querySelector('.entry-list');
const deleteButton = document.querySelector('.delete-button');
const submitBttnContainer = document.querySelector('.submit-button-container');

photoURL.addEventListener('input', (event) => {
  if (event.target.value === '') {
    imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    imgPreview.setAttribute('src', event.target.value);
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newObject = {
    title: title.value,
    url: imgPreview.getAttribute('src'),
    notes: notes.value,
    entryId: data.nextEntryId
  };

  if (data.editing !== null) {
    newObject.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = newObject;
      }
    }

    const existingLi = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
    existingLi.replaceWith(renderEntry(newObject));
    data.editing = null;
    document.querySelector('.title-switch').textContent = 'New Entry';
    imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
    form.reset();
    toggleDeleteButton();
    viewSwap('entries');
  } else {
    data.nextEntryId++;
    data.entries.unshift(newObject);
    imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
    form.reset();
    renderEntry(newObject);
    viewSwap('entries');
    toggleNoEntries();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const previousData = localStorage.getItem('javascript-local-storage');

  if (previousData !== null) {
    data = JSON.parse(previousData);
    data.entries.forEach((entry) => {
      renderEntry(entry);
    });
    viewSwap(data.view);
    if (data.entries.length > 0) {
      toggleNoEntries();
    }
  } else {
    viewSwap(data.view);
  }
});

function renderEntry(entry) {
  const entryList = document.querySelector('.entry-list');
  const newLi = document.createElement('li');
  newLi.setAttribute('class', 'row entry-container');
  newLi.setAttribute('data-entry-id', entry.entryId);

  const columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  const imgPreview = document.createElement('img');
  imgPreview.setAttribute('class', 'img-preview');
  imgPreview.src = entry.url;

  const entryInfoContainer = document.createElement('div');
  entryInfoContainer.setAttribute('class', 'column-half entry-info-container');

  const entryTitle = document.createElement('div');
  entryTitle.setAttribute('class', 'entry-title');
  entryTitle.textContent = entry.title;

  const editImg = document.createElement('i');
  editImg.setAttribute('class', 'fa-solid fa-pen');


  const entryNotes = document.createElement('div');
  entryNotes.setAttribute('class', 'entry-notes');
  entryNotes.textContent = entry.notes;

  columnHalf.appendChild(imgPreview);
  entryInfoContainer.appendChild(entryTitle);
  entryTitle.appendChild(editImg);
  entryInfoContainer.appendChild(entryNotes);
  newLi.appendChild(columnHalf);
  newLi.appendChild(entryInfoContainer);
  entryList.appendChild(newLi);

  return newLi;
}

function toggleNoEntries() {
  const noEntries = document.querySelector('.noEntries');

  if (data.entries.length > 0) {
    noEntries.classList.add('hidden');
  } else {
    noEntries.classList.remove('hidden');
  }
}

viewEntries.addEventListener('click', () => {
  viewSwap('entries');
});

viewEntryForm.addEventListener('click', () => {
  viewSwap('entry-form');
});

function viewSwap(elementToSwap) {
  const entryForm = document.querySelector('[data-view="entry-form"]');
  const entries = document.querySelector('[data-view="entries"]');

  if (elementToSwap === 'entries') {
    data.view = 'entries';

    entries.classList.remove('hidden');
    entryForm.classList.add('hidden');
    const dataModel = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', dataModel);

  } else {
    data.view = 'entry-form';

    entries.classList.add('hidden');
    entryForm.classList.remove('hidden');
    const dataModel = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', dataModel);
  }
}

ulElement.addEventListener('click', (event) => {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    const clickedEntry = event.target.closest('.row .entry-container');
    const dataEntryIdString = clickedEntry.getAttribute('data-entry-id');
    const dataEntryIdNumber = parseInt(dataEntryIdString);
    toggleDeleteButton();

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntryIdNumber) {
        data.editing = data.entries[i];
        document.querySelector('.title-switch').textContent = 'Edit Entry';
        title.value = data.editing.title;
        url.value = data.editing.url;
        notes.value = data.editing.notes;
        imgPreview.src = data.editing.url;
        const dataModel = JSON.stringify(data);
        localStorage.setItem('javascript-local-storage', dataModel);
      }
    }
  }
});

function toggleDeleteButton() {
  if (submitBttnContainer.classList.contains('submit-button-container')) {
    deleteButton.classList.remove('hidden');
    submitBttnContainer.setAttribute('class','submit-button-container-with-delete')
  } else {
    deleteButton.classList.add('hidden');
    submitBttnContainer.setAttribute('class', 'submit-button-container');
  }
}

deleteButton.addEventListener('click', (event) => {
  event.preventDefault();
  renderModal();

  const yesButton = document.querySelector('.modal-button-yes');
  const noButton = document.querySelector('.modal-button-no');
  const modal = document.querySelector('.modal');
  const existingLi = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
  const entryIdToRemove = data.editing.entryId;

  noButton.addEventListener('click', (event) => {
    modal.remove();
  });

  yesButton.addEventListener('click', (event) => {
    const indexToRemove = data.entries.findIndex(entry => entry.entryId === entryIdToRemove);
    const dataModel = JSON.stringify(data);

    localStorage.setItem('javascript-local-storage', dataModel);
    data.entries.splice(indexToRemove, 1);
    data.editing = null;
    existingLi.remove();
    modal.remove();
    viewSwap('entries');
    document.querySelector('.title-switch').textContent = 'New Entry';
    imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
    form.reset();
    toggleDeleteButton();
    toggleNoEntries();
  });
});


function renderModal() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const paragraph = document.createElement('p');
  paragraph.textContent = 'Are you sure you want to delete entry?';

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('modal-button-container');

  const yesButton = document.createElement('button');
  yesButton.setAttribute('class', 'modal-button-yes');
  yesButton.textContent = 'Yes';

  const noButton = document.createElement('button');
  noButton.setAttribute('class','modal-button-no');
  noButton.textContent = 'No';

  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  modalContent.appendChild(paragraph);
  modalContent.appendChild(buttonContainer);
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
  return modalContainer;
}
