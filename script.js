const gameField = document.querySelector('#cards');
const resetBlock = document.querySelector('#reset');
const btnReset = document.querySelector('#reset-btn');
gameField.onclick = openCard;
btnReset.onclick = resetGame;

let countCards = 16;
let selectedCards = [];
let deletedCardsQuantity = 0;
let imagesNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
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
