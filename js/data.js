/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', (event) => {
  const dataModel = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataModel);
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
  const newLi = document.createElement("li");

  newLi.innerHTML = '<li class="row entry-container"> <div class="column-half"><img class="img-preview" src= "' + entry.url + '"/></div> <div class="column-half entry-info-container"><div class="entry-title">' + entry.title + '</div> <div class="entry-notes">' + entry.notes + '</div></div></li > ' ;
  entryList.appendChild(newLi);
}

function toggleNoEntries() {
  const noEntries = document.querySelector('.noEntries');
  if (noEntries.classList.contains('hidden')) {
      noEntries.classList.remove('hidden');
  } else {
      noEntries.classList.add('hidden');
  }
}

function viewSwap(elementToSwap) {
  const entryForm = document.querySelector('[data-view="entry-form"]');
  const entries = document.querySelector('[data-view="entries"]');

  if (elementToSwap === 'entries') {
      data.view = 'entries';

    const dataModel = JSON.stringify(data);

    localStorage.setItem('javascript-local-storage', dataModel);
    entries.classList.remove('hidden');
    entryForm.classList.add('hidden');

  } else {
    data.view = 'entry-form';

    const dataModel = JSON.stringify(data);

    localStorage.setItem('javascript-local-storage', dataModel);
    entries.classList.add('hidden')
    entryForm.classList.remove('hidden');
  }
}
