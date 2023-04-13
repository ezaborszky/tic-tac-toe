
// ------------ DATA --------------
const Table = (() => {

        let turn = 0;

        let tableArray = [];

        function createTable() {for(let i = 0; i < 3 ; i++) {
            let tableColumns = []
            for (let j = 0; j < 3; j++) {
                let tablerows = []
                tableColumns.push(tablerows)
            }
            tableArray.push(tableColumns)
        }}
        createTable();

        function checkForWinner() {

            //ROWS
            for(let i = 0; i < 3; i++){
                let firstELement = tableArray[i][0]
                let hasSameValue = true

                for(let j = 1; j < 3; j++) {
                    if(tableArray[i][j] !== firstELement) {
                        hasSameValue = false;
                        break;
                    }
                }
                if(hasSameValue) {
                    return firstELement;
                }
            }

            //COLUMNS
            for(let j = 0; j < 3; j++){
                let firstELement = tableArray[0][j]
                let hasSameValue = true

                for(let i = 1; i < 3; i++) {
                    if(tableArray[i][j] !== firstELement) {
                        hasSameValue = false;
                        break;
                    }
                }
                if(hasSameValue) {
                    return firstELement;
                }
            }

            //DIAGONALS

            //first diagonal
            let firstDiagonalElement = tableArray[0][0]
            let hasSameValue = true

            for(let i = 1; i < 3; i++) {
                if(tableArray[i][i] !== firstDiagonalElement) {
                    hasSameValue = false;
                    break;
                }
            }
            if(hasSameValue) {
                return firstDiagonalElement;
            }

            //second digonal
            let secondDiagonalElement = tableArray[0][2]
            hasSameValue = true

            for(let i = 1; i < 3; i++) {
                if(tableArray[i][2-i] !== secondDiagonalElement) {
                    hasSameValue = false;
                    break;
                }
            }
            if(hasSameValue) {
                return secondDiagonalElement;
            }

        return null;

        }

        function resetTurn() {
            turn = 0;
        }

    return {
            value : (a,b) => {return tableArray[a][b] },
            setX : (a,b) => {tableArray[a][b] = 'x'},
            setO : (a,b) => {tableArray[a][b] = 'o'},
            reset : () => {tableArray = []; createTable(), resetTurn()},
            wholeTable : () => {return tableArray},
            checkForWinner : () => {return checkForWinner()},
            currentTurn : () => {return turn},
            nextTurn : () => {return turn++},
    }


})();

 
 

//---------------DISPLAY -----------------

const Display = ( () => {

    const tiles = document.querySelectorAll('.columns')
    const winner = document.querySelector('.winner')
    const resetButton = document.getElementById('reset')
    const isAutoButton = document.getElementById('is-auto')
    const isAutoButtonX = document.getElementById('is-auto-x')

    function selectTile(i,j) {
        const list = []
        let selected;
        tiles.forEach(tile => {
            
            if (Number(tile.dataset.x) === i) {
                 
                list.push(tile)
                
            }
           
            })

        list.forEach(tile => {
                
                if(Number(tile.dataset.y) === j) {
                   
                    selected = tile }
            })
             
    return selected;
    }

    function refreshScreen(){
        for(let i = 0; i < 3; i++) {
            for(let j =0; j < 3; j++){
                selectTile(i,j).textContent = Table.value(i,j)
            }
        }
        if(Table.checkForWinner() !== null) {
            console.log(Table.checkForWinner())
            winner.textContent = `Winner: ${Table.checkForWinner()}`
        } else if(Table.currentTurn() > 8){
            winner.textContent = 'Winner: No one :('
        }

    }

    function makeMove(){
        tiles.forEach(tile => {
             

             
            tile.addEventListener('click',() => {
                
                refreshScreen();
                console.log(Table.currentTurn())
              
                let x = tile.dataset.x
                let y = tile.dataset.y

                if (Table.checkForWinner() === null) {
                if (Table.value(x,y) !== "x" && Table.value(x,y) !== "o" && Table.currentTurn() <= 8) {
                
                if(Number(Table.currentTurn()) % 2 === 0) {
                    Table.setX(x,y);
                    if(isAutoButton.checked) { Computer.ComputerRandomMove(); Table.nextTurn(); refreshScreen();}
                } else {
                    Table.setO(x,y);
                     
                    
                }
                Table.nextTurn();   
                refreshScreen();}}
                

            })
            
        })
    }

   

    resetButton.addEventListener('click', () =>{
        Table.reset();
        Display.refreshScreen();
        winner.textContent = "Winner:";
    })

    return {
        tile : (x,y) => {return selectTile(x,y)},
        refreshScreen : () => {return refreshScreen()},
        makeMove : () => {return makeMove()}
    }

})();


const Computer = (() => {

    const deepCopy = (arr) => {
        let copy = [];
        arr.forEach(elem => {
          if(Array.isArray(elem)){
            copy.push(deepCopy(elem))
          }else{
            if (typeof elem === 'object') {
              copy.push(deepCopyObject(elem))
          } else {
              copy.push(elem)
            }
          }
        })
        return copy;
      }

      

      function checkForTerminal(array) {
        
        //ROWS
        for(let i = 0; i < 3; i++){
            let firstELement = array[i][0]
            let hasSameValue = true

            for(let j = 1; j < 3; j++) {
                if(array[i][j] !== firstELement) {
                    hasSameValue = false;
                    break;
                }
            }
            if(hasSameValue) {
                return 10;
            }
        }

        //COLUMNS
        for(let j = 0; j < 3; j++){
            let firstELement = array[0][j]
            let hasSameValue = true

            for(let i = 1; i < 3; i++) {
                if(array[i][j] !== firstELement) {
                    hasSameValue = false;
                    break;
                }
            }
            if(hasSameValue) {
                return 10;
            }
        }

        //DIAGONALS

        //first diagonal
        let firstDiagonalElement = array[0][0]
        let hasSameValue = true

        for(let i = 1; i < 3; i++) {
            if(array[i][i] !== firstDiagonalElement) {
                hasSameValue = false;
                break;
            }
        }
        if(hasSameValue) {
            return 10;
        }

        //second digonal
        let secondDiagonalElement = array[0][2]
        hasSameValue = true

        for(let i = 1; i < 3; i++) {
            if(array[i][2-i] !== secondDiagonalElement) {
                hasSameValue = false;
                break;
            }
        }
        if(hasSameValue) {
            return 10;
        }

    return 0;

    }
    
    function ifTerminal(){
        let arrayCopy = deepCopy(Table.wholeTable())

        for(let i = 0; i < 3; i++) {
            for(let j =0; j < 3; j++){
                
                if(arrayCopy[i][j] !== "x" && arrayCopy[i][j] !== "o"){
                    arrayCopy[i][j] = "o";
                    console.log(arrayCopy)
                    return arrayCopy;
                }
            }
        }
    }

    function ComputerRandomMove(){
         
        

            if(Table.currentTurn() > 4) {
                
                for(let i = 0; i < 3; i++) {
                    for(let j =0; j < 3; j++){
                        if(Table.value(i,j)!== "x" && Table.value(i,j) !== "o"){
                        Table.setO(i,j);
                        return 0;}
                    }}

            } else {

            for (let x = 0; x < 1; x){            
               let i = (Math.floor(Math.random() * 3))
               let j = (Math.floor(Math.random() * 3))
               
               if(Table.value(i,j)!== "x" && Table.value(i,j) !== "o"){
                    Table.setO(i,j);
                    x = 2;
                    return 0;
                    
                }}
            

    }
        }
        
    

    return {
        checkTerminal : () => {return ifTerminal()},
        ComputerRandomMove : () => {return ComputerRandomMove()}
    }



})();

 
 Display.makeMove();



 
