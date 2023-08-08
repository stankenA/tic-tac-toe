export default class App {
  constructor() {
    // Переменные для работы с формой
    this._form = document.querySelector('.game__form');
    this._firstInput = this._form.querySelector('#player-1');
    this._secondInput = this._form.querySelector('#player-2');
    this._playBtn = this._form.querySelector('.game__button');
    this._firstRadio = this._form.querySelector('#player-1-radio');
    this._secondRadio = this._form.querySelector('#player-2-radio');

    // Переменные для работы с информацией об игроках
    this._currentPlayer = document.querySelector('.game__player');
    this._firstPlayer = 'Player 1';
    this._secondPlayer = 'Player 2';
    this._isFirstPlayer = true;

    // Данные для логики самой игры
    this._cellsCounter = 0;
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

    // Перменные результата
    this._result = document.querySelector('.game__result');
    this._resultTxt = this._result.querySelector('.game__subtitle');
    this._playAgainBtn = document.querySelector('.game__button_again');
  }

  // Обработка при нажатии на кнопку "Play"
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

  // Проверка активного игрока и подстановка соответствующего имени для отображения в интерфейсе
  _checkActivePlayer() {
    if (this._isFirstPlayer === true) {
      this._currentPlayer.textContent = this._firstPlayer;
    } else {
      this._currentPlayer.textContent = this._secondPlayer;
    }
  }

  // Изменение активного игрока
  _changeActivePlayer() {
    this._isFirstPlayer = !this._isFirstPlayer;
    this._checkActivePlayer();
  }

  // Проверка массива игрока с данными о заполненных клетках:
  // 1. Если у игрока среди значений его массива присутствуют значения из массива с выигрышной комбинацией, то он побеждает и высвечивается соответствующий попап с его именем
  // 2. Если число заполненных клеток = 9, но ни у одного из игроков не выполняется предыдущее условие, то объявляется ничья
  _checkArray(targetArr) {
    let winner = false;

    this._winConditions.forEach((arr) => {
      if (arr.every(item => targetArr.includes(item))) winner = true;
    });

    if (winner && targetArr === this._firstPlayerArr) {
      this._showResult(`${this._firstPlayer} won!`);
      return;
    } else if (winner && targetArr === this._secondPlayerArr) {
      this._showResult(`${this._secondPlayer} won!`);
      return;
    }

    if (this._cellsCounter === 9) {
      this._showResult('Draw!');
    }
  }

  // Обработка клика по клетке
  _handleCellClick(evt) {
    if (this._isFirstPlayer === true) {
      evt.target.textContent = 'x';
      this._firstPlayerArr.push(Number(evt.target.dataset.number));
      this._cellsCounter++;
      this._checkArray(this._firstPlayerArr);
    } else {
      evt.target.textContent = 'o';
      this._secondPlayerArr.push(Number(evt.target.dataset.number));
      this._cellsCounter++;
      this._checkArray(this._secondPlayerArr);
    }

    evt.target.classList.add('game__cell_disabled');
  }

  // Показать результат
  _showResult(value) {
    this._result.classList.add('game__result_opened');
    this._resultTxt.textContent = value;
  }

  // Спрятать результат
  _closeResult() {
    this._result.classList.remove('game__result_opened');
  }

  // Сбросить игру
  _resetGame() {
    this._form.classList.remove('game__form_closed');
    this._cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('game__cell_disabled');
    });
    this._firstPlayerArr = [];
    this._secondPlayerArr = [];
    this._cellsCounter = 0;
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

    this._playAgainBtn.addEventListener('click', () => {
      this._resetGame();
      this._closeResult();
    });
  }
}
