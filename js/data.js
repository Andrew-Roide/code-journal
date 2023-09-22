/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const previousData = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', (event) => {
  const dataModel = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataModel)
});

document.addEventListener('DOMContentLoaded', function () {
  if (previousData !== null) {
    data = JSON.parse(previousData);
    data.entries.forEach((entry) => {
      renderEntry(entry);
    });
  } else {
    const entryList = document.querySelector('.entry-list');
    const newLi = document.createElement("li");
    newLi.innerHTML = 'No entries to show';
    newLi.classList.add('noEntries');
    entryList.appendChild(newLi);
  };
});

function renderEntry(entry) {
  const entryList = document.querySelector('.entry-list');


  const newLi = document.createElement("li");

  newLi.innerHTML = '<li> <img src= "' + entry.url + '" alt = ""/> <div>Title ' + entry.title + '</div> <div>notes ' + entry.notes + '</div></li > ' ; // You can also set other properties like className, id, etc.

  entryList.appendChild(newLi);
}

function toggleNoEntries() {
  const noEntries = document.querySelector('.noEntries');
  if (noEntries.classList.contains('hide')) {
      noEntries.classList.remove('hide');
  } else {
      noEntries.classList.add('hide');
  }
}

function viewSwap(elementToSwap) {
  const entryForm = document.querySelector('[data-view="entry-form"]');
  const entries = document.querySelector('[data-view="entries"]');

  if (elementToSwap === 'entries') {
    const previousData = localStorage.getItem('javascript-local-storage');
    const dataModel = JSON.stringify(data);
    dataModel.view = 'entries';
    localStorage.setItem('javascript-local-storage', dataModel);

    entries.classList.remove('hide');
    entryForm.classList.add('hide');

  } else {
    const previousData = localStorage.getItem('javascript-local-storage');
    const dataModel = JSON.stringify(data);
    dataModel.view = 'entry-form';
    localStorage.setItem('javascript-local-storage', dataModel);

    entries.classList.add('hide')
    entryForm.classList.remove('hdie');
  }
}
