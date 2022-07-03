function App() {
   let storage = window.localStorage;
   let minutes = 0;
   let seconds = 0; 
   let deck = [
      { name: 'card1', image: 'img/card1.jpg' },
      { name: 'card2', image: 'img/card2.jpg' },
      { name: 'card3', image: 'img/card3.jpg' },
      { name: 'card4', image: 'img/card4.jpg' },
      { name: 'card5', image: 'img/card5.jpg' },
      { name: 'card6', image: 'img/card6.jpg' },
      { name: 'card7', image: 'img/card7.jpg' },
      { name: 'card8', image: 'img/card8.jpg' },
      { name: 'card1', image: 'img/card1.jpg' },
      { name: 'card2', image: 'img/card2.jpg' },
      { name: 'card3', image: 'img/card3.jpg' },
      { name: 'card4', image: 'img/card4.jpg' },
      { name: 'card5', image: 'img/card5.jpg' },
      { name: 'card6', image: 'img/card6.jpg' },
      { name: 'card7', image: 'img/card7.jpg' },
      { name: 'card8', image: 'img/card8.jpg' }
   ];
   let pickedCards = [];
   let board = document.getElementById('tabuleiro');
   let blockedPick = false;
   let score = 0;
   let record = document.getElementById('record');
   if(storage.min == undefined){
      record.innerHTML = 'Tempo recorde: ' + '--';
   }else{
      record.innerHTML = 'Tempo recorde: ' + storage.min + ':' + storage.sec;
   }
   const timer = new Timer('#timer');
   let startButton = document.getElementById('start');
   startButton.addEventListener('click', createBoard);
   
   function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex--;
         [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
      }
      return array;
   }

   function createBoard() {
      board.innerHTML = '';
      score = 0;
      shuffle(deck);
      for (let i = 0; i < deck.length; i++) {
         let card = document.createElement('img');
         card.id = i;
         card.name = deck[i].name;
         card.src = 'img/verso.png';
         card.style.width = '115px';
         board.appendChild(card);
         showCard(card);
      }
         timer.start();
   }
   
   function showCard(card) {
      card.src = deck[card.id].image;
      setTimeout(() => {
         card.src = 'img/verso.png'
         card.addEventListener('click', pickCard);
      }, 3000);
   }
   
   function pickCard() {
      if (blockedPick == true) {
         return;
      } else {
         let card = this;
         card.src = deck[card.id].image;
         card.removeEventListener('click', pickCard);
         pickedCards.push(card);
         if (pickedCards.length == 2) {
            blockedPick = true;
            let card1 = pickedCards[0];
            let card2 = pickedCards[1];
            if (card1.name == card2.name) {
               card1.removeEventListener('click', pickCard);
               card2.removeEventListener('click', pickCard);              
               blockedPick = false;
               score++;
            } else {
               setTimeout(() => {
                  card1.src = "img/verso.png";
                  card1.addEventListener('click', pickCard);
                  card2.src = "img/verso.png";
                  card2.addEventListener('click', pickCard);

                  blockedPick = false;
               }, 1500);
            }
            checkVictory();
            pickedCards = [];
         }
      }
   }
   
   function checkVictory() {
      if (score == 8) {
         timer.stop();
         console.log('Timer stop')
         alert('Você ganhou.');
      }
   }
   
   function Timer(e){
      this.element = e;
      this.time = 0;
      this.control = null;
      this.start = () => {
         this.time = 0;
         this.control = setInterval(()=>{
            this.time++;
            minutes = Math.trunc(this.time/60);
            seconds = this.time % 60;
            const gameTime = 'Tempo: ' + minutes + ':' + (seconds < 10 ?'0' : '') + seconds;
            document.querySelector(this.element).innerHTML = gameTime;
         }, 1000);
      };
      this.stop = () => {
         let new_min = minutes;
         let new_sec = seconds;
         if(new_min <= parseInt(storage.min) && new_sec < parseInt(storage.sec)){
            storage.min = new_min;
            storage.sec = new_sec;
         }else{
            storage.min = new_min;
            storage.sec = new_sec;
         }
         record.innerHTML = 'Tempo recorde: ' + storage.min + ':' + storage.sec;

         clearInterval(this.control);
         this.control = null;
      };
   }
};
App();