const gameField = document.querySelector('#cards');
const resetBlock = document.querySelector('#reset');
const btnReset = document.querySelector('#reset-btn');
const levelList = document.querySelector('.level-list');
const btnFirstLevel = document.querySelector('#level1');
const btnSecondLevel = document.querySelector('#level2');
const btnThirdLevel = document.querySelector('#level3');
gameField.onclick = openCard;
btnReset.onclick = resetGame;
levelList.onclick = createLevel;
// btnSecondLevel.onclick = createSecondLevel;
// btnThirdLevel.onclick = createThirdLevel;

let countCards = 16;
let selectedCards = [];
let deletedCardsQuantity = 0;
let imagesNumbers = [];
imagesNumbers = createImagesNumbers(16);
console.log('imagesNumbers : ', imagesNumbers);
let pause = false;
shuffleArray(imagesNumbers);
console.log(imagesNumbers);

for (let i = 0; i < countCards; i++) {
  const card = document.createElement('li');
  card.id = i;
  gameField.appendChild(card);
}

function openCard(e) {
  const element = e.target;
  if (!pause) {
    if (element.tagName === 'LI' && element.className !== 'active') {
      selectedCards.push(element);
      element.className = 'active';
      const imgNumber = imagesNumbers[element.id];
      element.style.backgroundImage = `url(images/${imgNumber}.png)`;
      if (selectedCards.length === 2) {
        pause = true;
        if (
          imagesNumbers[selectedCards[0].id] ===
          imagesNumbers[selectedCards[1].id]
        ) {
          selectedCards[0].style.visibility = 'hidden';
          selectedCards[1].style.visibility = 'hidden';
          deletedCardsQuantity += 2;
        }
        setTimeout(refreshCards, 600);

        selectedCards = [];
      }
    }
  }
}

function refreshCards() {
  for (let i = 0; i < countCards; i += 1) {
    gameField.children[i].className = '';
    gameField.children[i].style.backgroundImage = 'url("images/back.png")';
  }
  if (deletedCardsQuantity === countCards) {
    resetBlock.style.display = 'block';
  }
  selectedCards = [];
  pause = false;
}

function resetGame() {
  location.reload();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createLevel(e) {
  const levelBtn = e.target;
  if (levelBtn.tagName !== 'BUTTON') return;
  setActiveLevel(e);
  gameField.innerHTML = '';
  switch (levelBtn.id) {
    case 'level1':
      countCards = 16;
      gameField.style.width = '400px';
      break;
    case 'level2':
      countCards = 24;
      gameField.style.width = '600px';
      break;
    case 'level3':
      countCards = 32;
      gameField.style.width = '800px';
      break;
    default:
      countCards = 16;
      gameField.style.width = '400px';
      break;
  }
  for (let i = 0; i < countCards; i++) {
    const card = document.createElement('li');
    card.id = i;
    gameField.appendChild(card);
  }
  imagesNumbers = createImagesNumbers(countCards);
  shuffleArray(imagesNumbers);
  console.log(imagesNumbers);
}

function createImagesNumbers(cardsQuantity) {
  imagesNumbers = [];
  const maxCardNumber = cardsQuantity / 2;
  for (let i = 1; i <= maxCardNumber; i++) {
    imagesNumbers.push(i);
    imagesNumbers.push(i);
  }

  return imagesNumbers;
}

function setActiveLevel(e) {
  const isActiveLevel = e.target.classList.contains('active');
  if (isActiveLevel) return;
  btnFirstLevel.classList.remove('active');
  btnSecondLevel.classList.remove('active');
  btnThirdLevel.classList.remove('active');
  e.target.classList.add('active');
}
