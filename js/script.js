//tic-tac-toe script

const gridBlocks = document.querySelectorAll(".gridBlock")
//console.log(gridBlocks)
const resetButtonElement = document.querySelector('button')
//console.log(resetButtonElement)
const playerElement = document.querySelector("#player")
//console.log(playerElement)
let blueBlocks = []
let redBlocks = []
let turn = ''
let win = ''
let hits = 0

nextPlayer = "red"
let counter = 0
const winningArrays = [
    ['11','12','13'],['21','22','23'],['31','32','33'],
    ['11','21','31'],['12','22','32'],['13','23','33'],
    ['11','22','33'],['13','22','31']
]

//console.log(gridBlocks)
function winCheck(turn,blockClicked) {
    // turn==="red" ? redBlocks.push(blockClicked) : blueBlocks.push(blockClicked)
    // // console.log(redBlocks)
    // // console.log(blueBlocks)
    // redBlocks.length===3 ? evalWin(turn) : ''
    // console.log(redBlocks.length)
    // blueBlocks.length===3 ? evalWin(turn) : ''

    if (turn==="red") {
        redBlocks.push(blockClicked)
        redBlocks.length>=3 ? evalWin(redBlocks) : ''
    } else {
        blueBlocks.push(blockClicked)
        blueBlocks.length>=3 ? evalWin(blueBlocks) : ''
    }
}

function evalWin (blocks) {
  //console.log("check")
  hits=0
//   turn==="red" ? array = redBlocks : array = blueBlocks
//debugger
//   return xyz = function checkit(array) {
//       //loop through each winning seq
      for (let i=0;i<winningArrays.length;i++) {
          //console.log(winningArrays[i])
        let s = winningArrays[i]
        hits=0

        //check if values in players array are in the winning sequence
            for (let j=0;j<blocks.length;j++) {
            s.includes(blocks[j]) 
            //? console.log(`${blocks[j]} Y`) 
            ? hits++
            : ''
            hits===3 ? stopGame() : ''
            //console.log (hits)
        }       
      } 
    }
    //   checkit(array)

//Reset game function: clear colors, enable listners again, (update win/loss counters)
const resetGame = function (event) {
    //console.log(event)
    //console.log(this)
    nextPlayer = "red"
    playerElement.innerHTML = `its your turn, ${nextPlayer}!`
    gridBlocks.forEach(gridBlock => {
        //console.log(gridBlock)
        gridBlock.removeAttribute("style")
        redBlocks = []
        blueBlocks = []
        counter=0
        startGame()
    })
}

resetButtonElement.addEventListener("click", resetGame)


const playATurn = function (event) {
    
    let gridClick = ''
    gridClick = event.target.id
    //console.log(gridClick)
    turn = counter % 2 === 0 ? "red" : "blue"
    turn==="red" ? nextPlayer = "blue" : nextPlayer = "red"
    //console.log(win)
    playerElement.innerHTML = `its your turn, ${nextPlayer}!`
    // win==='win' ? playerElement.innerHTML = `its your turn, ${nextPlayer}!` : playerElement.innerHTML = `you won, ${turn}!` 
    //console.log(turn)
    //console.log(document.querySelector(`#${gridClick}`))
    document.querySelector(`#${gridClick}`).style.background = turn
    //document.querySelector(`#${gridClick}`).removeAttribute("class")
    counter++
    //console.log(counter)
    //console.log(this)
    disableListen(document.querySelector(`#${gridClick}`))
    winCheck(turn,gridClick.substring(9))
}

const disableListen = function (block) {
    block.removeEventListener("click", playATurn)
}

//click on a block
function startGame () { 
    win = ''
    gridBlocks.forEach(gridBlock => {
    gridBlock.addEventListener("click", playATurn)
    })
}

function stopGame () { gridBlocks.forEach(gridBlock => {
    win = 'win'
    playerElement.innerHTML = `you won, ${turn}!`
    gridBlock.removeEventListener("click", playATurn)
    })
}
startGame()
