const form = document.querySelector('.form-container');
const imgPreview = document.querySelector('.img-preview');
const title = document.querySelector('#title');
const photoURL = document.querySelector('#url');
const notes = document.querySelector('#notes');
const viewEntries = document.querySelector('.entries-link');
const viewEntryForm = document.querySelector('.new');

photoURL.addEventListener('input', (event) => {
  imgPreview.setAttribute('src', event.target.value);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newObject = {
    title: title.value,
    url: imgPreview.getAttribute('src'),
    notes: notes.value,
    entryId: data.nextEntryId

  };

  data.nextEntryId++;
  data.entries.unshift(newObject);
  imgPreview.setAttribute('src', './images/placeholder-image-square.jpg');
  form.reset();
  renderEntry(newObject);
  viewSwap('entries');

  if (data.entries.length > 0) {
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
    viewSwap(data.view)
  }
});

function renderEntry(entry) {
  const entryList = document.querySelector('.entry-list');
  const newLiContainer = document.createElement("li");

  const newLi = document.createElement('li');
  newLi.setAttribute('class', 'row entry-container');

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

  const entryNotes = document.createElement('div');
  entryNotes.setAttribute('class', 'entry-notes');
  entryNotes.textContent = entry.notes;

  columnHalf.appendChild(imgPreview);
  entryInfoContainer.appendChild(entryTitle);
  entryInfoContainer.appendChild(entryNotes);
  newLi.appendChild(columnHalf);
  newLi.appendChild(entryInfoContainer);
  newLiContainer.appendChild(newLi);
  entryList.appendChild(newLiContainer);
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
})

function viewSwap(elementToSwap) {
  const entryForm = document.querySelector('[data-view="entry-form"]');
  const entries = document.querySelector('[data-view="entries"]');

  if (elementToSwap === 'entries') {
    data.view = 'entries';

    entries.classList.remove('hidden');
    entryForm.classList.add('hidden');

  } else {
    data.view = 'entry-form';

    entries.classList.add('hidden')
    entryForm.classList.remove('hidden');
  }
}
