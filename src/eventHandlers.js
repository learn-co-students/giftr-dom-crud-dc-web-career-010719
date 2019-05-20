function filterGifts() {
  const filter = document.querySelector('#filter-input')

  filter.addEventListener('keydown', (e) => {
    document.querySelector('.gift-list').childNodes.forEach(g => {
      if (!g.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
        g.style = 'display:none'
      } else {
        g.style = ''
      }
    })
  })
}

function handleGiftForm() {
  const form = document.querySelector('#gift-form')
  const giftList = document.querySelector('.gift-list')
  
  form.addEventListener('submit', e => {
    e.preventDefault()
    
    const li = document.createElement('li')
    const img = document.createElement('img')
    const name = form.name.value
    const image = form.image.value
    const delBtn = document.createElement('button')
    const editBtn = document.createElement('button')

    if (name === '' || image === '') {
      alert('please fill out the form')
    } else {
      delBtn.innerText = 'DELETE'
      editBtn.innerText = 'EDIT'
      img.src = image
      li.innerHTML = `<p>${name}</p> <br><br>`
  
      li.append(img, delBtn, editBtn)
      giftList.appendChild(li)

      delBtn.addEventListener('click', () => giftList.removeChild(li))
      editBtn.addEventListener('click', () => editGift(li))
  
      form.reset()
    }
  })

}

function editGift(li) {
  console.log('edit this thing!', name)

  const inputName = document.createElement('input')
  const inputImg = document.createElement('input')
  const p = document.createElement('p')
  const br = document.createElement('br')
  const submitBtn = document.createElement('button')

  inputName.value = li.querySelector('p').innerText
  inputImg.value = li.querySelector('img').src
  submitBtn.innerText = 'Submit'

  li.append(p, inputName, br , inputImg, submitBtn)

  submitBtn.addEventListener('click', () => {
    console.log(li.querySelector('p'))
    li.querySelector('p').innerText = inputName.value
    li.querySelector('img').src = inputImg.value

    li.removeChild(inputName)
    li.removeChild(inputImg)
    li.removeChild(submitBtn)
  })
}