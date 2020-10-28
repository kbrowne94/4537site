const url = "https://blooming-ocean-45270.herokuapp.com"
document.getElementById("yourscore").innerHTML = sessionStorage.getItem('score');
function getData() {
    let xhttp = new XMLHttpRequest();
    // let url = "http://localhost:8080"
    
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText)
                // console.log(data)
                // console.log(data[0].NAME);
                let table = document.getElementById("highscores");
                data.forEach(element => {
                    let row = table.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let name = element.NAME;
                    let score = element.score;
                    cell1.id = 'highscores';
                    cell2.id = 'highscores';
                    cell1.innerHTML = name;
                    cell2.innerHTML = score;
                    
                });
        }
    };
}

document.getElementById("userform").addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById("yourName").value;
    let score = sessionStorage.getItem('score');
    score = parseInt(score);
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            alert('Your score was submitted') ? "" : document.getElementById('restart').click();
        }
    }
    xhttp.send(JSON.stringify({ "name": name, "score": score }));

})


document.getElementById('restart').onclick = function () {
        window.location.href = "index.html";
}