//functions declaration
function randomShip(cell) {
  //cell is an array representing a position in the board like this -> [0,1]
  let ship = [];
  ship.push(cell);
  let isHorizontal = randomFromRange(0,1);
  //isHorizontal is just a random 0 or 1 to decide the direction of the ship position, if 0 the ship is vertical if 1 horizontal
  if (isHorizontal) {
    //if the ship position is horizontal
    if (cell[1] >= 4) {
      //the board is 7x7 counting from 0, if the giving cell is positioned on the 4th column it will add two more cells before it to avoid giving a position outside of the board lenght
      ship.push([cell[0], cell[1] - 1]);
      ship.push([cell[0], cell[1] - 2]);
    } else {
      //else adds the two positions after
      ship.push([cell[0], cell[1] + 1]);
      ship.push([cell[0], cell[1] + 2]);
    }
  } else {
    //if the ship position is vertical
    if (cell[0] >= 4) {
      ship.push([cell[0] - 1, cell[1]]);
      ship.push([cell[0] - 2, cell[1]]);
    } else {
      ship.push([cell[0] + 1, cell[1]]);
      ship.push([cell[0] + 2, cell[1]]);
    }
  }
  return ship;
}
function randomFromRange(bottomLimit, upperLimit) {
  //creates a random integer between bottomLimit and upperLimit
    let myRange = upperLimit - bottomLimit;
    return (Math.round((Math.random() * myRange) + bottomLimit));
}
function randomCell() {
  //returns a random cell in a 7x7 board starting from 0
  return [randomFromRange(0,6), randomFromRange(0,6)];
}
function numToChar(num) {
  //returns the ordered alphabetic letter equivalent to the giving number 'num' starting from 0. i.e '1 -> B'
  let template = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G'};
  return template[num];
}
function charToNum(char) {
    //giving a string identifying the cell it returns an array
    let template = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6};
    if (typeof(char) == 'boolean') {
        return false;
    } else {
        return [template[char[0]], Number(char[1])];
    }
}
function validateInput(userInput) {
    //validates user input. If userInput is a string that is not a cell in the board it returns false, else returns the cell in the format 'A1'. if the cell is valid but in lowercase it returns the first letter in uppercase 'a1' -> 'A1'.
    let validStrings = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
                        'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
                        'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
                        'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
                        'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6',
                        'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
                        'G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
    for (each of validStrings) {
        if (String(userInput).toUpperCase() == each) {
            return each;
        }
    }
    return false;
}
function randomShipsArray(amountOf=5) {
  //returns and array of non overlapping ships. 'amountOf' is the amount of ships returned, default is 5 ships.
  let shipArray = [];
  shipArray.push(randomShip(randomCell()));
  while (shipArray.length < amountOf) {
    let tempShip = randomShip(randomCell());
    let boolCount = 0; // this variable will be bigger than 0 if any cell in tempShip is already occupied by other ship in shipArray
    for (let eachShip of shipArray) {
      for (let eachCell1 of eachShip) {
        for (let eachCell2 of tempShip) {
          if (eachCell1.toString() == eachCell2.toString()) {
            boolCount++;
          }
        }
      }
    }
    if (!boolCount) {
      shipArray.push(tempShip);
    }
  }
  return shipArray;
}
function hitOrMiss(userString, arrayOfShips) {
    //checks if the user input cell hits or misses any ship. if hit returns the user cell and true, if miss returns the user cell and false.
    let cellArr = charToNum(validateInput(userString));
    if (typeof(cellArr) == 'boolean') {
        //if the user input string is not a valid cell in the board, raise alert window asking for valid input. Maybe this validation should be done in a previous function?
        alert('Enter a valid cell in the board');
        return false;
    } else {
        //if the user input string is a valid cell in the board
        for (eachShip of arrayOfShips) {
            for (eachCell of eachShip) {
                if (eachCell.toString() == cellArr.toString()) {
                    alert('You HIT!');
                    return [cellArr, true];
                }
            }
        }
        alert('You MISS!');
        return [cellArr, false];
    }
}
function drawOnBoard([cellArray, isHit]) {
    //if isHit == true, draws 'HIT' on the giving cellArray in the board, else draws 'MISS'
    if (isHit) {
        //boardObj is a global variable
        boardObj[cellArray[0]][cellArray[1]].innerHTML = 'HIT';
    } else {
        boardObj[cellArray[0]][cellArray[1]].innerHTML = 'MISS';
    }
}
function newPlayedCell(arr) {
  //check if the user input cell has been played before, if not returns true, else return false.
  if (cellsPlayed.length > 0) {
    for (each of cellsPlayed) {
      if (String(each) == String(arr)) {
        return false;
      } 
    }
  } else {
    return true;
  }
  return true;
}
function gameLoop() {
    //loops that runs every time the user enters a cell and hits the button.
    //when user clicks on button,take input from cell and validate it
    cellToPlay = document.getElementById('input1').value;
    cellToPlayIsValid = validateInput(cellToPlay);
    console.log(cellToPlayIsValid);
    console.log(typeof(cellToPlayIsValid));
    //if input is a valid cell in the board continue with sequence, else raise alert
    if (typeof(cellToPlayIsValid) == 'string') {
        let cellToArr = charToNum(cellToPlayIsValid);
//      console.log(cellToArr);
      if (newPlayedCell(cellToArr)) {
        //if the cell havent been played before
        cellsPlayed.push(cellToArr);
      } else {
        alert('you already played that cell');
      }
    } else {
        alert('Enter a valid cell in the board');
    }
    //
}
//initializing game
//retrieving the board from the DOM
boardObj = {
    '0': {
        '0': document.getElementById('board').rows['1'].cells['1'],
        '1': document.getElementById('board').rows['1'].cells['2'],
        '2': document.getElementById('board').rows['1'].cells['3'],
        '3': document.getElementById('board').rows['1'].cells['4'],
        '4': document.getElementById('board').rows['1'].cells['5'],
        '5': document.getElementById('board').rows['1'].cells['6'],
        '6': document.getElementById('board').rows['1'].cells['7'],
    },
    '1': {
        '0': document.getElementById('board').rows['2'].cells['1'],
        '1': document.getElementById('board').rows['2'].cells['2'],
        '2': document.getElementById('board').rows['2'].cells['3'],
        '3': document.getElementById('board').rows['2'].cells['4'],
        '4': document.getElementById('board').rows['2'].cells['5'],
        '5': document.getElementById('board').rows['2'].cells['6'],
        '6': document.getElementById('board').rows['2'].cells['7'],
    },
    '2': {
        '0': document.getElementById('board').rows['3'].cells['1'],
        '1': document.getElementById('board').rows['3'].cells['2'],
        '2': document.getElementById('board').rows['3'].cells['3'],
        '3': document.getElementById('board').rows['3'].cells['4'],
        '4': document.getElementById('board').rows['3'].cells['5'],
        '5': document.getElementById('board').rows['3'].cells['6'],
        '6': document.getElementById('board').rows['3'].cells['7'],
    },
    '3': {
        '0': document.getElementById('board').rows['4'].cells['1'],
        '1': document.getElementById('board').rows['4'].cells['2'],
        '2': document.getElementById('board').rows['4'].cells['3'],
        '3': document.getElementById('board').rows['4'].cells['4'],
        '4': document.getElementById('board').rows['4'].cells['5'],
        '5': document.getElementById('board').rows['4'].cells['6'],
        '6': document.getElementById('board').rows['4'].cells['7'],
    },
    '4': {
        '0': document.getElementById('board').rows['5'].cells['1'],
        '1': document.getElementById('board').rows['5'].cells['2'],
        '2': document.getElementById('board').rows['5'].cells['3'],
        '3': document.getElementById('board').rows['5'].cells['4'],
        '4': document.getElementById('board').rows['5'].cells['5'],
        '5': document.getElementById('board').rows['5'].cells['6'],
        '6': document.getElementById('board').rows['5'].cells['7'],
    },
    '5': {
        '0': document.getElementById('board').rows['6'].cells['1'],
        '1': document.getElementById('board').rows['6'].cells['2'],
        '2': document.getElementById('board').rows['6'].cells['3'],
        '3': document.getElementById('board').rows['6'].cells['4'],
        '4': document.getElementById('board').rows['6'].cells['5'],
        '5': document.getElementById('board').rows['6'].cells['6'],
        '6': document.getElementById('board').rows['6'].cells['7'],
    },
    '6': {
        '0': document.getElementById('board').rows['7'].cells['1'],
        '1': document.getElementById('board').rows['7'].cells['2'],
        '2': document.getElementById('board').rows['7'].cells['3'],
        '3': document.getElementById('board').rows['7'].cells['4'],
        '4': document.getElementById('board').rows['7'].cells['5'],
        '5': document.getElementById('board').rows['7'].cells['6'],
        '6': document.getElementById('board').rows['7'].cells['7'],
    }
    
};
//setting up random ships on the board and initial empty variables
randShips = randomShipsArray();
cellsPlayed = [];
countsOfHit = 0;
countsOfMiss = 0;
cellsLeftToDestroy = randShips.length * 3;
//bound button click to function
btn1 = document.getElementById('button1');
btn1.onclick = function(){gameLoop()};