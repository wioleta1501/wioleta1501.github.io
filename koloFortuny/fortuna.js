let game = {
  zdobyte: 0,
  zycia: 3,
};

let chooseCountry = 0;

//LISTENERS

document.getElementById("graj").addEventListener("click", Sprawdz_Litery);
document.getElementById("right").addEventListener("click", toggleAutor);
//alert(game.zycia);


//FUNKCJE
function startGame() {

  let newDiv = document.createElement("button");
  newDiv.classList.add('button');
  newDiv.setAttribute("id", "start");
  newDiv.innerHTML = "START";
  newDiv.addEventListener("click", startBoard);
  document.getElementById("panstwa").append(newDiv);

  newDiv = document.createElement("button");
  newDiv.classList.add('button');
  newDiv.setAttribute("id", "autorB");
  newDiv.innerHTML = "AUTOR";
  newDiv.addEventListener("click", toggleAutor);
  document.getElementById("panstwa").append(newDiv);
  document.getElementById("wrap").style.display = "none";

}

function toggleAutor() {
  if (document.getElementById("autor").style.display === "none")
    document.getElementById("autor").style.display = "";
  else
    document.getElementById("autor").style.display = "none";
}

function startBoard() {
  document.getElementById("panstwa").innerHTML = "";
  document.getElementById("podaj").style.display = "block";
  document.getElementById("wrong").innerHTML = ""
  document.getElementById("wrap").style.display = "";

  chooseCountry = getRandomInt(0, data.length)
  console.log(data[chooseCountry]['country']);

  let newDiv = document.createElement("div");
  document.getElementById("panstwa").append(newDiv);
  newDiv.classList.add("line");

  for (let i = 0; i < 2; i += 1) {
    addLetter(newDiv, "a", "unactive");
  }
  for (let i = 0; i < data[chooseCountry]['country'].length; i += 1) {
    let style = "hidden"
    if (data[chooseCountry]['country'][i].localeCompare(' ') === 0) {
      for (let i = 0; i < 2; i += 1) {
        addLetter(newDiv, "", "unactive");
      }
      newDiv = document.createElement("div");
      document.getElementById("panstwa").append(newDiv);
      newDiv.classList.add("line");
      for (let i = 0; i < 2; i += 1) {
        addLetter(newDiv, "", "unactive");
      }
    } else
      addLetter(newDiv, data[chooseCountry]['country'][i], style);
  }
  for (let i = 0; i < 2; i += 1) {
    addLetter(newDiv, "", "unactive");
  }
  changeLife(0);
}

function changeLife(change) {
  game.zycia += change;
  document.getElementById("zycie").innerHTML = ('Życia: ' + game.zycia);
}

function changePoints(change) {
  game.zdobyte += change;
  document.getElementById("punkty").innerHTML = ('Odgadnięte państwa: ' + game.zdobyte);
}

function Sprawdz_Litery() {
  let litera = document.getElementById("wpisz_litere").value;
  let letters = document.getElementsByClassName("letter");
  let guessed = false;
  for (let i = 0; i < letters.length; i += 1) {
    if (letters[i].innerHTML.toUpperCase().localeCompare(litera.toUpperCase()) === 0) {
      letters[i].classList.remove("hidden");
      guessed = true;
    }
  }

  if (guessed) {
    if (win()) {
      alert("Wygrana!");
      startBoard();
      changeLife(5);
      changePoints(1)
    }
  } else {
    changeLife(-1);
    document.getElementById("wrong").innerHTML += " " + (litera);
    if (game.zycia === 0) {
      alert("Przegrana! \nPoprawna odpowiedź to: " + (data[chooseCountry]['country']).toString());
      startBoard();
      changeLife(3);
    }
  }
}

function win() {
  let letters = document.getElementsByClassName("letter");
  for (let i = 0; i < letters.length; i += 1) {
    if (letters[i].classList.contains("hidden")) {
      return false;
    }
  }
  return true;
}



function addLetter(node, letter, style) {

  let newDiv = document.createElement("span");
  newDiv.innerHTML = letter.toUpperCase();
  node.append(newDiv);

  newDiv.classList.add("letter");
  newDiv.classList.add(style);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

startGame();
