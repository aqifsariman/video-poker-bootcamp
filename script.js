/*
 * A function that returns a fixed number of i
 * @param cardInHand = [] to store all cards drawn
 * @param push cards drawn into cardInHand
 * @return number of i that the user scored for the cards in hand
 */

let cardInHand = [];
let userPoints = 0;
let moneyInHand = 100;
let bettingMoney = 0;
let balanceAmount = 0;
let container;
let playerCardHand = [];
let playerHandRank = [];
let cardHeld = false;
let readyButton = document.createElement("button");
let gameMessage = document.createElement("div");
let betOneButton = document.createElement("button");
let betAllButton = document.createElement("button");

// Removes an element from the document.
function removeElement(elementId) {
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

// deal button will be at the start of the game
let dealButton = document.createElement("button");
dealButton.id = "deal-button";
dealButton.innerHTML = "DEAL";

// hold button will be on every card
// hold button will be put on every card
// when user clicks card, message will show on top of the card to show that it is being held
// if clicked, cardHeld = true
// if cardHeld = false, clicking DEAL will replace those unheld cards.
const holdButton = document.createElement("div");
holdButton.id = "hold-button";
/* holdButton.innerHTML = "HOLD"; */

// Inputting username and then amount to wager
const startOfGame = () => {
  gameMessage.id = "game-message";
  gameMessage.innerHTML = " Y O U &nbsp R E A D Y ?";
  document.body.appendChild(gameMessage);

  // indicate ready to begin
  readyButton.id = "ready-button";
  readyButton.innerHTML = "R E A D Y";
  document.body.appendChild(readyButton);
  readyButton.addEventListener("click", initGame);
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = (cardAmount) => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ["❤", "♦", "♣", "♠"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    /* console.log(`current suit: ${currentSuit}`); */

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }
      if (currentSuit === "❤" || currentSuit === "♦") {
        var color = "red";
      } else if (currentSuit === "♣" || currentSuit === "♠") {
        var color = "black";
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardColor: color,
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("inner-card");
  const suit = document.createElement("div");
  suit.classList.add("front-card", "suit", cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement("div");
  name.classList.add("front-card", "name");
  name.innerText = cardInfo.name;
  const backCard = document.createElement("div");
  backCard.classList.add("back-card");
  const card = document.createElement("div");
  card.id = "card";
  card.classList.add("card");
  innerCard.appendChild(name);
  innerCard.appendChild(suit);
  innerCard.appendChild(backCard);
  card.appendChild(innerCard);

  return card;
};

// calling 5 cards out onto container
const playerClick = () => {
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  for (i = 0; i < 5; i++) {
    playerCard = deck.pop();
    playerCardHand.push(playerCard); // for displaying sorted full display cards
    playerHandRank.push(playerCard.rank); // for comparing sorted cards rank
    let cardElement = createCard(playerCard);
    cardElement.appendChild(holdButton);
    container.appendChild(cardElement);
  }
  calcHandScore(playerHandRank);
  console.log(playerHandRank);
  console.log(userPoints);
};

const initGame = () => {
  gameMessage.innerHTML = "";
  removeElement("ready-button");
  playerClick();
};

startOfGame();

const calcHandScore = (handRank) => {
  for (let i = 0; i < handRank.length; i++) {
    // runs through the whole array of cards in hand to get total points in hand
    userPoints += handRank[i];
  }
  return userPoints;
};
