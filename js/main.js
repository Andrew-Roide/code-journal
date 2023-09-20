const form = document.querySelector('.form-container');
const imgPreview = document.querySelector('.img-preview');
const title = document.querySelector('#title');
const photoURL = document.querySelector('#url');
const notes = document.querySelector('#notes');

// targets image preview and updates it given url
photoURL.addEventListener('input', (event) => {
  imgPreview.setAttribute('src', event.target.value);
});


/* targets submit button, assigns new object for each input id, increments nextEntryId
   property of data model so that entryId will increase if another entry is submitted,
   adds the new object to the data object's entries array, resets image and form.
*/
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
});
