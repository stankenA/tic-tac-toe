class Form {
  constructor(formSelector) {
    this._form = document.querySelector(formSelector);
    this._firstInput = this._form.querySelector('#player-1');
    this._secondInput = this._form.querySelector('#player-2');
    this._playBtn = this._form.querySelector('.game__button');
    this._firstRadio = this._form.querySelector('#player-1-radio');
    this._secondRadio = this._form.querySelector('#player-2-radio');

    this._currentPlayer = document.querySelector('.game__player');
    this._firstPlayer = 'Player 1';
    this._secondPlayer = 'Player 2';
    this._isFirstPlayer = true;

    this._winConditions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    this._firstPlayerArr = [];
    this._secondPlayerArr = [];

    this._cells = document.querySelectorAll('.game__cell');
  }

  _handlePlay() {
    this._firstPlayer = this._firstInput.value;
    this._secondPlayer = this._secondInput.value;

    if (this._firstRadio.checked) {
      this._isFirstPlayer = true;
    } else if (this._secondRadio.checked) {
      this._isFirstPlayer = false;
    }

    if (this._isFirstPlayer) {
      this._currentPlayer.textContent = this._firstPlayer;
    } else {
      this._currentPlayer.textContent = this._secondPlayer;
    }

    this._form.classList.add('game__form_closed');
  }

  _checkActivePlayer() {
    if (this._isFirstPlayer === true) {
      this._currentPlayer.textContent = this._firstPlayer;
    } else {
      this._currentPlayer.textContent = this._secondPlayer;
    }
  }

  _changeActivePlayer() {
    this._isFirstPlayer = !this._isFirstPlayer;
    this._checkActivePlayer();
  }


  _handleCellClick(evt) {
    evt.target.classList.add('game__cell_disabled');
    evt.target.disabled = true;

    if (this._isFirstPlayer === true) {
      evt.target.textContent = 'x';
      this._firstPlayerArr.push(Number(evt.target.dataset.number));
      this._checkArray(this._firstPlayerArr);
    } else {
      evt.target.textContent = 'o';
      this._secondPlayerArr.push(Number(evt.target.dataset.number));
      this._checkArray(this._secondPlayerArr);
    }
  }

  _checkArray(targetArr) {
    let winner = false;
    this._winConditions.forEach((arr) => {
      if (arr.every(item => targetArr.includes(item))) winner = true;
    });

    if (winner && targetArr === this._firstPlayerArr) {
      alert(`${this._firstPlayer} won!`);
      this._resetGame();
      return;
    } else if (winner && targetArr === this._secondPlayerArr) {
      alert(`${this._secondPlayer} won!`);
      this._resetGame();
      return;
    }
  }

  _resetGame() {
    this._form.classList.remove('game__form_closed');
    this._firstPlayer = 'Player 1';
    this._secondPlayer = 'Player 2';
    this._cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('game__cell_disabled');
    });
    this._firstPlayerArr = [];
    this._secondPlayerArr = [];
  }

  setEventListeners() {
    this._playBtn.addEventListener('click', () => {
      this._handlePlay();
      this._checkActivePlayer();
    });

    this._cells.forEach((cell) => {
      cell.addEventListener('click', (evt) => {
        this._handleCellClick(evt);
        this._changeActivePlayer();
      })
    });
  }
}

const form = new Form('.game__form');
form.setEventListeners();
