/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

var previousData = localStorage.getItem('javascript-local-storage');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', (event) => {
  const dataModel = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataModel);
});
