function setupHandlers() {
  document.querySelector('#filter-input').addEventListener('search', handleSearch);
  document.querySelector('#filter-clear').addEventListener('click', handleClear);
  document.querySelector('#gift-form').addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', setupHandlers);

function handleSearch(e) {
  searchGifts(e.target.value);
}

function handleClear(e) {
  clearSearch();
}

function handleSubmit(e) {
  e.preventDefault();

  const name = e.target.querySelector('input[name="name"]');
  const image = e.target.querySelector('input[name="image"]');
  const id = e.target.querySelector('input[name="id"]');
  const submit = e.target.querySelector('button[type="submit"]');

  if (!id.value)
    newGift(name.value, image.value);
  else
    updateGift(id.value, name.value, image.value);

  submit.innerText = 'Create Gift';
  name.value = '';  
  image.value = '';  
  id.value = '';  
}

function handleEdit(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  editGift(parseInt(id));
}

function handleDelete(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  deleteGift(parseInt(id));
}
