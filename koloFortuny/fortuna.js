let game = {
  zdobyte: 0,
  zycia: 1,
};
let chooseCountry = getRandomInt(0, data.length)
//alert(data[0]['country']);
console.log(data[chooseCountry]['country']);
let elem = document.getElementById("panstwa");
elem.innerHTML = data[chooseCountry]['country'];

//alert(data.length);
//console.log(data.length);
//alert(data[0]['country'][2]);
console.log(data[chooseCountry]['country'][2]);

 for (let i = 0; i < data[chooseCountry]['country'].length; i += 1) {
   //alert(data[0]['country'][i]);
   console.log(data[chooseCountry]['country'][i]);
  }


addElement("wrap");
//LISTENERS

document.getElementById("graj").addEventListener("click", Sprawdz_Litery); 
//alert(game.zycia);
console.log(game.zycia);


//FUNKCJE
function Sprawdz_Litery(){
  let litera = document.getElementById("wpisz_litere").value;
  //alert(litera);
  console.log(litera);
  //alert(getRandomInt(10,20));
  console.log(getRandomInt(10,20));
}


function addElement(mydiv)
{

  let newDiv = document.createElement("span");
  newDiv.innerHTML = "jasiokotek";

  let my_div = document.getElementById(mydiv);
  document.body.insertBefore(newDiv, my_div);

  let newDiv2 = document.createElement("span");
  newDiv2.innerHTML = "jasiokotek2";
  document.body.insertBefore(newDiv2, my_div.nextSibling);

  newDiv.classList.add("mystyle");  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
