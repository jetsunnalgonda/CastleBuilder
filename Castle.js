//
//  Castle.js
//  CastleBuilder
//
//  Created by Haluk Isik on 8/3/18.

class Castle {
  constructor(w, h) {
    this.h = h;
    this.w = w;
    this._blockSize = 10;
    this._probability = 1;
    this._heightConstraint = true;
    this.rowData = [];
    // this.generate();
  }

  get blockSize() {
    return this._blockSize;
  }

  set blockSize(newBlockSize) {
    this._blockSize = newBlockSize;
  }

  get probability() {
    return this._probability;
  }

  set probability(newProbability) {
    this._probability = newProbability;
    // this.generate();
  }

  get heightConstraint() {
    return this._heightConstraint;
  }

  set heightConstraint(newValue) {
    this._heightConstraint = newValue;
  }

  generate() {
    var bottomRow = [];
    // Bottom row
    for (var i = 0; i < this.w; i++) {
      bottomRow.push(1);
    }
    this.rowData.push(bottomRow);

    var previousEmptyCellLocations = [];
    var length = (this.w - 1) * this.probability;
    // console.log("length before rounding = " + length);
    length = round(length);

    // console.log("length = " + length);

    for (var row = 1; row <= this.h; row++) {
      // We need this many empty spaces
      // console.log("length 2 = " + length);
      var emptySpaces = floor(random(length));
      // console.log("emptySpaces = " + emptySpaces);
      // var previousEmptyRow = [];
      // if (row == 1) {
      //   previousEmptyRow = [];
      // } else {
      //   previousEmptyRow = emptyLocationsForRows[row - 2];
      // }
      // console.log("exclusionRow.length = " + exclusionRow.length);

      // Randomly distribute the empty spaces. When moving along the next row, make sure that we don't place filled cells over empty cells, so copy the previous empty cells to the next row.
      var emptyLocations = makeCastleRandomNumbers(emptySpaces, this.w, previousEmptyCellLocations);

      previousEmptyCellLocations = emptyLocations;
      fillArray(this.rowData, this.w, row, emptyLocations);

      if (heightConstraint) {
        length -= emptySpaces;
        if (length <= 0) { length = 1; }
      }

      // console.log(row);

      // console.log("emptyLocations for row " + row + " = " + emptyLocations);
    }
  }

  render() {
    // console.log(this.rowData);
    for (var i = 0; i < this.rowData.length; i++) {
      // console.log("rowData[" + i + "] = " + this.rowData[i]);
    }

    for (var i = 0; i <= this.h; i++) {
      for (var j = 0; j <= this.w; j++) {
        var fillRow = this.rowData[i][j];
        if (fillRow == 1) {
          rect(this.blockSize * j, this.blockSize * (this.h - i), this.blockSize, this.blockSize);
        }
      }
    }
  }
}

function makeCastleRandomNumbers(number, length, previous) {

  // var _exclusions = exclusions ? exclusions : null;
  var possibleNumbers = [];
  var randomNumbers = [];
  for (var i = 0; i < length; i++) {
    possibleNumbers.push(i);
  }
  // console.log("possibleNumbers = " + possibleNumbers);
  // console.log("previous = " + previous);
  for (var i = 0; i < previous.length; i++) {
    var index = possibleNumbers.indexOf(previous[i]);
    possibleNumbers.splice(index, 1);

    // console.log("previous.length = " + previous.length);
    //
    // console.log("previous[" + i + "] = " + previous[i]);
    // console.log("possibleNumbers = " + possibleNumbers);

  }

  // console.log("possibleNumbers = " + possibleNumbers);
  //
  // console.log("possibleNumbers.lemgth = " + possibleNumbers.length);

  var numberOfRandoms = number < possibleNumbers.length ? number : possibleNumbers.length;

  // console.log("numberOfRandoms = " + numberOfRandoms);
  for (var i = 0; i < numberOfRandoms; i++) {
    var randomNumber = floor(random(possibleNumbers.length));
    randomNumbers.push(possibleNumbers[randomNumber]);
    possibleNumbers.splice(randomNumber, 1);
    // console.log("randomNumber = " + randomNumber);
  }
  // console.log("Adding zeroes from the previous row");
  // Add zeroes from the previous row
  for (var i = 0; i < previous.length; i++) {
    var notFound = true;
    for (var j = 0; j < randomNumbers.length; j++) {
      if (randomNumbers[j] == previous[i]) {
        notFound = false;
      }
    }
    if (notFound) {
      randomNumbers.push(previous[i]);
    }
  }
  // console.log("randomNumbers = " + randomNumbers);


  return randomNumbers;
}

function fillArray(theArray, col, row, zeroLocations) {

  // console.log("zeroLocations = " + zeroLocations);
  // Write ones
  var rowArray = []
  for (var i = 0; i < col; i++) {
    rowArray.push(1);
  }
  theArray.push(rowArray);

  // Write zeroes
  for (var i = 0; i < zeroLocations.length; i++) {
    theArray[row][zeroLocations[i]] = 0;
  }



}
