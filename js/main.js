const form = document.querySelector('.form-container');
const imgPreview = document.querySelector('.img-preview');
const title = document.querySelector('#title');
const photoURL = document.querySelector('#url');
const notes = document.querySelector('#notes');

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

  if(data.entries.length > 0) {
    toggleNoEntries();
  }
});
