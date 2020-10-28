function getData() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080", true);
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
    let score = document.getElementById("score").innerHTML;
    score = parseInt(score);
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            alert('Your score was submitted') ? "" : location.reload()
        }
    }
    xhttp.send(JSON.stringify({ "name": name, "score": score }));

})