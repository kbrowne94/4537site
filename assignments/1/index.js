let score = 0;
let deck = [];


$("document").ready(function() {
    $(".card").trigger('click');
    setTimeout(function() {
        $(".card").trigger('click');
        score = 0
        $("#score").text(score);
        $("#score").css("visibility", "visible");;

    },4000)
});

class Card {
    constructor(color){
        this.color = color;
    }
}
for( let i = 0; i < 49; i++) {
    $('.memory-game').append(`<div class="card"></div>`);
    let x = Math.floor(Math.random()*10);
    if (x%2==0) {
        deck.push(new Card("red"))
    } else {
        deck.push(new Card("blue"))
    }
    
};


let showCard1 = function() {
    this.classList.toggle("open-hit");
    // this.classList.toggle("disabled");
};

let showCard2 = function() {
    this.classList.toggle("open-miss");
    // this.classList.toggle("disabled");
};


let card = document.getElementsByClassName("card");
let cards = [...card];
for (let i = 0; i < cards.length; i++){
    if (deck[i].color == "blue"){
        cards[i].addEventListener("click", showCard1);
    }else {
        cards[i].addEventListener("click", showCard2);
    }

 };



 
$(".card").on("click", function(e){
    const cardClasses = e.currentTarget.classList;
    if(cardClasses[1] == 'open-hit') {
        score++;
        
    }
    else {
        score--;
    }
    $("#score").text(score)
});

