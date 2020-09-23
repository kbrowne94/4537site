const lab1Quiz = {
    quiz: [
      {
        question: "What does html stand for?",
        choices: [
          "Hyper Text Markup Language",
          "High Text Markup Language",
          "Hyper Tabular Markup Language"
        ]
      },
      {
        question: "Markup tags tell the web browser",
        choices: [
          "How to organise the page",
          "How to display the page",
          "How to display message box on page",
          "None of these"
        ]
      },
      {
        question: "Which of these are not a javascript datatype?",
        choices: [
          "undefined",
          "hexadecimal",
          "null",
          "string"
        ]
      },
      {
        question: "What Method is used to remove the last value of an array?",
        choices: [
          ".shift()",
          ".unshift()",
          ".pop()"
        ]
      },
      {
        question: "which is the correct method for adding 4 and 3?",
        choices: [
          "\"4\" + \"3\"",
          "4 + \"3\"",
          "4 + 3"
        ]
      }
    ],
    answers: [1, 1, 2, 3, 3]
  }

const choice = parseInt(window.prompt("please enter value from 0-5 inclusive"),10);

for(let i = 0; i < choice; i++){
    $("body").append( $('<div/>', {class: 'question', id: `q${i}`}).append(
        $('<h3/>', {text: lab1Quiz.quiz[i].question})
        )
    );
    

}
for(let i = 0; i < choice; i++) {
    for(let j = 0; j < lab1Quiz.quiz[i].choices.length; j++){
        $(`#q${i}`).append( 
            $('<div/>', {class: 'answer'}).append(
                $('<input/>', {type: 'radio', name: `q${i}`, value: `${lab1Quiz.quiz[i].choices[j]}`})
            ).append(
                $('<label/>',{for: "${lab1Quiz.quiz[i].choices[j]}", text:`${lab1Quiz.quiz[i].choices[j]}` })
            )
        )
    }
}


