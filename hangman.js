var students_names = [
  "AYTƏN",
  "CAVAD",
  "CƏBRAYIL",
  "FƏTƏLİ",
  "HÜSEYN",
  "JALƏ",
  "MƏTİN",
  "NİCAT",
  "PƏRVANƏ",
  "LAMİYƏ",
  "RÖVŞANƏ",
  "RUSLAN",
  "SƏLİM",
  "TARİYEL",
  "ÜZEYİR",
  "XALİD",
  "YAZGÜL",
];

const picture = document.getElementById("hangmanPic");
const guessed_letters = document.getElementById("info");
const student_name = document.getElementById("student_name");
const reset_btn = document.getElementById("reset");
const result_info = document.getElementById("result-info");

let answer = "",
  chances = 6,
  guessed = [],
  wordStatus = null,
  game_end = false;

const randomName = () =>
  (answer = students_names[Math.floor(Math.random() * students_names.length)]);

const Guess = (chosenLetter) => {
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);

    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      updateGuessedLetter(chosenLetter, "badge-success");
      checkWIN_OR_LOST();
    } else {
      chances--;
      updateChances();
      updateGuessedLetter(chosenLetter, "badge-danger");
      checkWIN_OR_LOST();
      updateHangmanPicture();
    }
  }
};

const updateGuessedLetter = (elem, color) => {
  let letter = document.createElement("span");
  letter.innerHTML = elem;
  letter.classList.add("badge");
  letter.classList.add(color);
  info.append(letter);
  letter.style.marginRight = "4px";
};

const updateHangmanPicture = () =>  (picture.src = `./images/${6 - chances}.jpg`);

const checkWIN_OR_LOST = () => {
  if (wordStatus === answer) {
    result_info.innerHTML = `
    <div class="alert alert-success font-weight-bolder" role="alert">
    YOU WON!!! YOU GOT THE ANSWER IN <span style="color:red; font-size: 20px">${chances}</span> GUESSES
  </div>`;
    game_end = true;
    setTimeout(reset, 6000);
  } else if (chances == 0) {
    game_end = true;
    result_info.innerHTML = `
    <div class="alert alert-danger font-weight-bold" role="alert">
    YOU LOST!!! THE ANSWER IS <span style="color:green">${answer}</span>
  </div>`;
    setTimeout(reset, 6000);
  }
};

const guessedWord = () => {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  student_name.innerHTML = wordStatus;
};

const updateChances = () => (document.getElementById("chances").innerHTML = chances);

const reset = () => {
  game_end = false;
  chances = 6;
  guessed = [];
  picture.src = "./images/0.jpg";
  result_info.innerHTML = "";
  guessed_letters.innerHTML = `<strong>GUESSED LETTERS: </strong>`

  randomName();
  guessedWord();
  updateChances();
};

randomName();
guessedWord();

document.addEventListener("keypress", (e) => {
  if (!game_end) Guess(e.key.toUpperCase());
});

reset_btn.addEventListener("click", reset);
