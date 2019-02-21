document.addEventListener('DOMContentLoaded', () => {
  resetGifts();
  reloadGifts();
})

let active_gifts = gifts;

function resetGifts() {
  active_gifts = gifts;
}

function reloadGifts() {
  renderGifts(active_gifts);
}

function filterGifts(query) {
  return gifts.filter(g => g.name.match(new RegExp(query, 'gi')))
}

function searchGifts(query) {
  active_gifts = filterGifts(query);
  console.log(active_gifts);
  renderGifts(active_gifts);
  toggleClearSearch();
}

function clearSearch() {
  toggleClearSearch();
  resetGifts();
  reloadGifts();  
}

function toggleClass(elem, className) {
  if (elem.classList.contains(className))
    elem.classList.remove(className);
  else
    elem.classList.add(className);
}

function toggleClearSearch() {
  const clearElem = document.querySelector('#filter-clear');
  toggleClass(clearElem, 'enabled')
}

function renderGifts(giftList) {
  const list = document.querySelector('.gift-list');
  list.innerHTML = ''; // remove any existing gifts

  giftList.forEach(gift => {
    list.appendChild(createGiftElement(gift));
  });

  list.querySelectorAll('li').forEach(li => {
    const edit = li.querySelector('.button-edit');
    const del = li.querySelector('.button-delete');
    edit.addEventListener('click', handleEdit);
    del.addEventListener('click', handleDelete);
  });
}

function createGiftElement(gift) {
  const elem = document.createElement('li');
  elem.classList.add('gift', 'ui', 'card');
  elem.dataset.id = gift.id;
  
  let html = `<div class="image gift-image"><img src="${gift.image}" /></div>`;
  html += `<div class="content gift-content"><a class="gift-name header">${gift.name}</a></div>`;

  const editBtn = document.createElement('a')
  editBtn.classList.add('ui', 'button', 'button-edit', 'mini');
  editBtn.dataset.id = gift.id
  editBtn.innerText = 'Edit'
  // editBtn.addEventListener('click', handleEdit);

  const deleteBtn = document.createElement('a')
  deleteBtn.classList.add('ui', 'button', 'button-delete', 'mini', 'negative');
  deleteBtn.dataset.id = gift.id
  deleteBtn.innerText = 'Delete'
  // deleteBtn.addEventListener('click', handleDelete);

  html += `<div class="extra content">${editBtn.outerHTML}${deleteBtn.outerHTML}</div>`;

  elem.innerHTML = html;
  return elem;
}

function lastGiftID() {
  const id = gifts[gifts.length-1].id;
  return id ? id : 0;
}

function newGift(name, image) {
  createGift(name, image);
  reloadGifts();
}

function createGift(name, image) {
  const id = lastGiftID() + 1;
  const gift = {id: id, name: name, image: image};
  console.log('new', gift);
  gifts.push(gift);
  return gift;
}

function editGift(gift_id) {
  const form = document.querySelector('#gift-form');
  const name = form.querySelector('input[name="name"]');
  const image = form.querySelector('input[name="image"]');
  const id = form.querySelector('input[name="id"]');
  
  const submit = form.querySelector('button[type="submit"]');
  submit.innerText = 'Update Gift';
  
  const gift = findGift(gift_id);
  name.value = gift.name;
  image.value = gift.image;
  id.value = gift.id;
}

function updateGift(gift_id, name, image = undefined) {
  const gift = setGift(gift_id, name, image);
  reloadGifts();
} 

function setGift(gift_id, name, image = undefined) {
  const gift = findGift(gift_id);
  if (typeof image !== 'undefined') image = gift.image;
  gift.name = name;
  gift.image = image;
  return gift;
}

function findGift(gift_id) {
  const results = gifts.filter(g => g.id === parseInt(gift_id));
  if (results.length) return results[0];
}

function findGiftIndex(gift_id) {
  gifts.forEach((gift, i) => {
    if (gift.id === gift_id) return i;
  });
}

function deleteGift(gift_id) {
  gifts.forEach((gift, i) => {
    if (gift.id === gift_id) delete gifts[i];
  });
  reloadGifts();
}