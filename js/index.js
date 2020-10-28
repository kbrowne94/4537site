let score = 0;
let num_false_cards = 6;
let num_positive_cards = 9 -num_false_cards;
let dim = 3;
let gamestate = true;
let trial = 0;


// function to grab highscores for leaderboard

class Card {
    constructor() {
        this.isClicked = false;
        this.isFalseCard = false;
    }
}


function draw_board(dim) {
    let b = new Array(dim);
    for (let i =0; i< b.length; i++){
        b[i] = new Array(dim);
    }
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j< dim; j++) {
            b[i][j] = new Card();
        }
    }
    return b;
}

function setFalseCards(board, falseCardCount) {
    let falseCards = 0;
    while (falseCards < falseCardCount){
        let x = Math.floor(Math.random()*board.length);
        let y = Math.floor(Math.random()*board[0].length);
        if(!board[x][y].isFalseCard){
            board[x][y].isFalseCard = true;
            falseCards+=1;
        }
    }
}

document.getElementById("start").onclick = function () {
    if(score > 0 && num_false_cards < dim*dim){
        num_false_cards+=4;
        if (dim < 7){
            dim++;
        }
    }
    this.classList.add('hide');
    num_positive_cards = dim*dim - num_false_cards;
    board = draw_board(dim);
    setFalseCards(board, num_false_cards);
    create_table(board);
    setTimeout(function () {
        let table = document.getElementById("MemoryGame");
        table.classList.remove('disabled');
    },3000)
}

function endGame() {
    alert('YOU LOST') ? "" : location.reload();
}

document.getElementById('terminate').onclick = function () {
    if(score >= 0){
        let r = window.confirm("are you sure?");
        if(r) {
            
            sessionStorage.setItem('score', score);
            window.location.href = "summary.html";
        }

    } else {
        alert('YOU LOST') ? "" : location.reload();
    }
    
}



function create_table(board) {
    trial +=1;
    document.getElementById('trial').innerHTML = trial;
    let total_rows = dim;
    let total_cols = dim;
    let gameBoard = document.getElementById("board");
    gameBoard.querySelectorAll('*').forEach(n => n.remove());
    
    let table1 = document.createElement("table");
    table1.id = "MemoryGame";
    table1.classList.add('center');
    table1.classList.add('disabled');
    for(let r = 0; r < total_rows; r++){
        let row = document.createElement("tr");
        row.classList.add('boardrow');
        for(let c = 0; c < total_cols; c++){
            let cell = document.createElement("td");
            cell.classList.add("card")
            if(board[r][c].isFalseCard){
                cell.classList.toggle('open-miss');
                setTimeout(function(){
                    cell.classList.toggle('open-miss');
                },3000)
            } else {
                cell.classList.toggle('open-hit');
                setTimeout(function(){
                    cell.classList.toggle('open-hit');
                },3000)
            }

            cell.onclick = function () {
                if(!board[r][c].isClicked) {
                    board[r][c].isClicked = true

                    if(board[r][c].isFalseCard) {
                        cell.classList.toggle('open-miss');
                        score--;
                        document.getElementById('score').innerHTML = score;
                        if(score < 0){
                            endGame();

                        }
                    }else {
                        cell.classList.toggle('open-hit');
                        num_positive_cards--;
                        score++;
                        document.getElementById('score').innerHTML = score;
                        if(num_positive_cards === 0){
                            setTimeout(function(){
                                document.getElementById("start").click();
                            }, 500);
                            
                        }
                    }
                }
            }
            row.appendChild(cell);
        }
        table1.appendChild(row)
    }
    gameBoard.appendChild(table1);
}

