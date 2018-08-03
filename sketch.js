//
//  sketch.js
//  CastleBuilder
//
//  Created by Haluk Isik on 8/3/18.

var blockSize = 20;
var w = 8;
var h = 5;
var probability = 1;
var heightConstraint = true;
var slider1, slider2, slider3, slider4, checkbox1;

function setup() {
  createCanvas(600, 300);
  background(51);
  // fill(0);
  // textSize(15);

	generateNewCastle();

  var button = createButton('generate');
  createP("");
  // button.position(0, 65);
  slider1 = createSlider(10, 60, 20, 1);
  var pos = slider1.position();
  // text("block size", pos.x * 2 + 200, pos.y, 100, 100);
  // text("block size", 0, 0, 100, 100);
  createDiv("block size");
	createP("");
  // console.log(pos.y);
  // blockSize = slider1.value();

  slider2 = createSlider(2, 30, 8, 1);
  createDiv("width");
	createP("");

  slider3 = createSlider(2, 30, 5, 1);
  createDiv("height");
	createP("");

	slider4 = createSlider(0, 1, 1, 0.1);
  createDiv("empty space probability weight");
	createP("");

	checkbox1 = createCheckbox("maximum height constraint", true);
  // createDiv("maximum height constraint");
	createP("");

  button.mousePressed(generateNewCastle);

}

function generateNewCastle() {
  background(51);
  fill(255, 122, 122);
  var castle = new Castle(w, h);
  castle.blockSize = blockSize;
	// console.log("probability = " + probability);
	// castle.asd = probability;
	castle.probability = probability;
	castle.heightConstraint = heightConstraint;

	castle.generate();
	castle.render();

  // console.log(castle.blockSize);
}

function draw() {

  blockSize = slider1.value();
  w = slider2.value();
  h = slider3.value();
	probability = slider4.value();
	heightConstraint = checkbox1.checked();

  // var button = createButton('generate');
  // // button.position(0, 65);
  // var slider1 = createSlider(10, 60, 20, 1);
  // blockSize = slider1.value();
  //
  // button.mousePressed(generateNewCastle);

  // var castle = new Castle(8, 5);
  //
  // castle.setBlockSize(20);
  // console.log(castle.blockSize);

}
