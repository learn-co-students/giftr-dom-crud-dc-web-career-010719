document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)
  init()
})


function init(){
  displayGifts()
  filterGifts()
  handleGiftForm()
}

function displayGifts() {
  let giftContainer = document.querySelector(".gift-list")
  giftContainer.innerHTML = ""
  
  gifts.forEach(gift => {
    let li = document.createElement("li")
    let gImg = document.createElement("img")
    let delBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    
    delBtn.innerText = 'DELETE'
    editBtn.innerText = 'EDIT'
    gImg.src = gift.image
    giftContainer.appendChild(li)
    li.innerHTML = `<p>${gift.name}</p> <br></br>`
    li.append(gImg, delBtn, editBtn)

    delBtn.addEventListener('click', () => giftContainer.removeChild(li))
    editBtn.addEventListener('click', () => editGift(li))
  })
}
