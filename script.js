const gameField = document.querySelector('#cards');
const resetBlock = document.querySelector('#reset');
const btnReset = document.querySelector('#reset-btn');
const levelList = document.querySelector('.level-list');
const [
  btnFirstLevel,
  btnSecondLevel,
  btnThirdLevel,
  btnFourthLevel,
  btnFifthLevel,
] = document.querySelectorAll('.level-btn');

let countCards = 16;
let selectedCards = [];
let deletedCardsQuantity = 0;
let imagesNumbers = [];
let pause = false;

initialize();

function initialize() {
  gameField.onclick = openCard;
  btnReset.onclick = resetGame;
  levelList.onclick = createLevel;
  imagesNumbers = createImagesNumbers(countCards);
  shuffleArray(imagesNumbers);
  console.log('imagesNumbers: ', imagesNumbers);
  generateCards();
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
      }
    }
  }
}

function refreshCards() {
  for (let i = 0; i < countCards; i += 1) {
    const card = gameField.children[i];
    card.className = '';
    card.style.backgroundImage = 'url("images/back.png")';
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
  const isActiveLevel = levelBtn.classList.contains('active');
  if (isActiveLevel || levelBtn.tagName !== 'BUTTON') return;
  setActiveLevel(e);
  gameField.innerHTML = '';
  switch (levelBtn.id) {
    case 'level1':
      countCards = 16;
      gameField.style.cssText =
        'width: 400px; height: 400px; min-height: 400px; min-width: 400px;';
      break;
    case 'level2':
      countCards = 24;
      gameField.style.cssText =
        'width: 600px; height: 400px; min-height: 400px; min-width: 600px;';
      break;
    case 'level3':
      countCards = 32;
      gameField.style.cssText =
        'width: 800px; height: 400px; min-width: 800px; min-height: 400px;';
      break;
    case 'level4':
      countCards = 40;
      gameField.style.cssText =
        'width: 800px; height: 500px; min-width: 800px; min-height: 500px;';
      break;
    case 'level5':
      countCards = 48;
      gameField.style.cssText =
        'width: 800px; height: 600px; min-width: 800px; min-height: 600px;';
      break;
    default:
      countCards = 16;
      gameField.style.cssText =
        'width: 400px; height: 400px; min-width: 400px; min-height: 400px;';
      break;
  }
  generateCards();
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
  [
    btnFirstLevel,
    btnSecondLevel,
    btnThirdLevel,
    btnFourthLevel,
    btnFifthLevel,
  ].forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
}

function generateCards() {
  for (let i = 0; i < countCards; i++) {
    const card = document.createElement('li');
    card.id = i;
    gameField.appendChild(card);
  }
}
