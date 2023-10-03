const form = document.querySelector('.form-container');
const imgPreview = document.querySelector('.img-preview');
const title = document.querySelector('#title');
const photoURL = document.querySelector('#url');
const notes = document.querySelector('#notes');
const viewEntries = document.querySelector('.entries-link');
const viewEntryForm = document.querySelector('.new');
const ulElement = document.querySelector('.entry-list');

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
    viewSwap('entries');
  } else {
    data.nextEntryId++;
    data.entries.unshift(newObject);
    imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
    form.reset();
    renderEntry(newObject);
    viewSwap('entries');

    if (data.entries.length > 0) {
      toggleNoEntries();
    }
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

  if (noEntries.classList.contains('hide')) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
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

  } else {
    data.view = 'entry-form';

    entries.classList.add('hidden');
    entryForm.classList.remove('hidden');
  }
}

ulElement.addEventListener('click', (event) => {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    const clickedEntry = event.target.closest('.row .entry-container');
    const dataEntryIdString = clickedEntry.getAttribute('data-entry-id');
    const dataEntryIdNumber = parseInt(dataEntryIdString);

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntryIdNumber) {
        data.editing = data.entries[i];
        document.querySelector('.title-switch').textContent = 'Edit Entry';
        title.value = data.editing.title;
        url.value = data.editing.url;
        notes.value = data.editing.notes;
        imgPreview.src = data.editing.url;
      }
    }
  }
});
