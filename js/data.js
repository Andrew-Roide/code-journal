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

if (previousData !== null) {
  data = JSON.parse(previousData);
}
