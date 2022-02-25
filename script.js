const btn = document.getElementById("restartButton");
const winMessage = document.getElementById("winner")
const WIN_COMBINATION = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
var xturn = true;
const cellEl = document.querySelectorAll("[data-cell]");


startGame();

btn.addEventListener("click",reset);

function startGame() {
  
  cellEl.forEach(cell =>{
    cell.classList.remove("x");
    cell.classList.remove("circle");
    winMessage.innerHTML = "";
    cell.removeEventListener('click',handleClick);
    cell.addEventListener('click',handleClick,{ once: true})
  })
}


  function handleClick(e) {
    const cell = e.target;
    var currentClass = xturn ? "x" : "circle"; 
    placeMark(cell,currentClass); 

    if(checkWin(currentClass)){                      
      gameOver(false);
    }else if(isDraw()){
      gameOver(true);
    } else{
      swapClass();   
    }
  }


  function placeMark(cell,currentClass) {
    cell.classList.add(currentClass);    
  }

  function swapClass() {
    xturn = !xturn; 
  }

  function checkWin(currentClass) {
    return WIN_COMBINATION.some(combination =>{
      return combination.every(index =>{
        return cellEl[index].classList.contains(currentClass)
      } )
    })
  }

  function gameOver(draw) {
    if(draw){
      winMessage.innerHTML = `Draw!`;
    }else{
      // addi(); 
      currentClass = xturn ? "x" : "circle"; 
      winMessage.innerHTML = `${currentClass} Wins!`;
    }  
  }
 
  // function addi() {
  //   [...cellEl].every(cell =>{
  //     if(!(cell.classList.contains("x") || cell.classList.contains("circle"))){
  //       cell.classList.add("i");
  //       console.log("i");
  //     }
  //   })
  // }

  function isDraw(){
    return [...cellEl].every(cell => {
      return cell.classList.contains("x") || cell.classList.contains("circle")
    })
  }

  function reset() {
    startGame();
  }