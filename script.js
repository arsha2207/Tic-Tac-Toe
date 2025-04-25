console.log("Welcome to TicTacToe");
let turn="X";
let gameover= false;
let reset = document.getElementById("reset");
let gameinfo=document.getElementsByClassName("gameinfo")[0];
let boxtexts = document.getElementsByClassName("boxtext");
let boxes = document.getElementsByClassName("box");
let winbox=document.getElementsByClassName("wingame");
let line= document.querySelector('.line');
let button= new Audio("Media/button.mp3");
let drawgame= new Audio("Media/gameover.mp3");
let wingame= new Audio("Media/win.mp3");
//Function tochange turn
const changeTurn = () =>{
    return turn === "X"?"O":"X"
}
//possibilities of win
let wins = [
    [0,1,2,'line-row-1'],
    [3,4,5,'line-row-2'],
    [6,7,8,'line-row-3'],
    [0,3,6,'line-col-1'],
    [1,4,7,'line-col-2'],
    [2,5,8,'line-col-3'],
    [0,4,8,'line-dia-2'],
    [2,4,6,'line-dia-1'],
]
//fn to check win
const checkWin =()=>{
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText=== boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== "")){
            gameinfo.innerText = boxtexts[e[0]].innerText + " WON ";
            gameover = true;
            //adding cross line
            line.classList.add(e[3]);
            //this timeout is set to let the user see the last inserted element and the crossline
            setTimeout(()=>{
                wingame.currentTime = 0;
                wingame.play();
                document.body.getElementsByClassName("who")[0].innerText = boxtexts[e[0]].innerText + " won ";
                winbox[0].classList.remove('hide');
                document.body.getElementsByTagName('img')[0].classList.remove('hide');
                document.body.classList.add('no-interaction');
            },200)
            //add listener to playagain
            document.body.getElementsByClassName('playagain')[0].addEventListener('click', function(){
                document.body.getElementsByTagName('img')[0].classList.add('hide');
                winbox[0].classList.add('hide');
                wingame.pause();
                //cancel all the interaction between the user and interface except for playagain button
                document.body.classList.remove('no-interaction');
                resetting();
            })
        }
    })
    //statements to excecute draw
    if((Array.from(boxtexts).every(box=>box.innerText!=="")) && (!gameover))
    {
        gameinfo.innerText= "It's a DRAW" ;
        drawgame.currentTime = 0;
        drawgame.play();
        document.body.getElementsByClassName("who")[0].innerText =" Draw! ";
        winbox[0].classList.remove('hide');
        document.body.classList.add('no-interaction');
        document.body.getElementsByClassName('playagain')[0].addEventListener('click', function() {
            winbox[0].classList.add('hide');
            drawgame.pause();
            document.body.classList.remove('no-interaction');
            resetting();
        })
        gameover = true;
    }
}
//fn to reset
const resetting =() =>{
    Array.from(boxtexts).forEach(e =>{
        e.innerText = "";
    })
    turn= "X";
    gameover = false;
    gameinfo.innerText = "Turn for "+ turn;
    wins.forEach(e =>{line.classList.remove(e[3]);})
}
//game logic
Array.from(boxes).forEach(e => {
  let boxtext = e.querySelector(".boxtext");
  e.addEventListener("click", ()=>{
      if(boxtext.innerText === ""){
          boxtext.innerText = turn;
          button.play();
          turn= changeTurn();
          checkWin();
          if(!gameover) {
              gameinfo.innerText = "Turn for " + turn;
          }
      }
  })
})
//add listener to reset button
reset.addEventListener("click",()=> {
    resetting()
});