for( let i = 0; i < 26; i++) {
    $('body').append(`<button>${String.fromCharCode(i+65)}</button>`);
    if(i === 12) {
        $('body').append(`<br>`);
    }
    
}

$("button").click(function (e) { 
    e.preventDefault();
    alert(e.target.innerHTML);
    
});