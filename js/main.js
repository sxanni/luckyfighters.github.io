const canvas = document.querySelector("canvas"); //conect canvas to constant
const c = canvas.getContext("2d"); //grabbing 2d context with (const"c") as its a 2d game

//canvas size
canvas.width = 1024;
canvas.height = 576;

//create canvas contact so we can draw on canvas using canvas api
c.fillRect(0, 0, canvas.width, canvas.height); //<---set x and y positions to = 0

//---------------------create player and enemy--------------------------//

//create sprite class for sprites, whenver theres a sprite object created from sprite class it will execute the constructor
//a main property in gane dev is position, each spritewill have its own indeopendent position so we

const gravity = 0.4;

class Sprite {
  constructor({ position, velocity, color = 'red' }) { //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.velocity = velocity; //added this arg to simulate gravity
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = { //arg represents attack box property
      position: this.position , //position is same as sprite position as attacl comes from player body
      width: 100,
      height: 50
    }
    this.color = color //color property for sprite class so we can differentiate between player and enemy
  }

  draw() {
    //define what your player looks like
    c.fillStyle = this.color; //color
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width /*px wide */,
      this.height /*px tall */
    );

    //attack box
    c.fillStyle = "white"
    c.fillRect(
      this.attackBox.position.x, // this argument is - position of attck box on x axis
      this.attackBox.position.y, //position of attackbox on y axis
      this.attackBox.width,
      this.attackBox.height
      )
  }

  update() {
    this.draw(); //calling the draw() method
    this.position.x += this.velocity.x; //define how sprite move on x axis
    this.position.y += this.velocity.y; // ooo
    // this.velocity.y += 10// overtime position.y is going to have 10 pixels added to it for each frame that is looped over at a rate of 10pixels/second or per loop
    //if stratement to stop sprite falling off the page if its bottom touchesthe lower edge of the page, by seeting velocity to 0

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      // if the lowest point of the rectangle is equals to the canvas edge/height
      this.velocity.y = 0; // rdeuce velocity to 0
    } else this.velocity.y += gravity; //if above isnt true, gravity is applied until bottom edge touches canvas (add acceleration by incrementing gravity value to fall speed and closes gap btwn sprite and canvas floor)
  }
}

const player = new Sprite({
  position: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0, //y coordinate on canvas
  },
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 5, //y coordinate on canvas
  },
  color: 'blue'
});

player.draw(); //display / draw player on canvas

const enemy = new Sprite({
  //create new object from sprite class
  position: {
    //create new object from sprite class
    x: 800, //x coordinate on canvas
    y: 200, //y coordinate on canvas
  },
  // width:10,
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0, //y coordinate on canvas
  },
  color: 'red'
});

enemy.draw(); //display / draw enemy on canvas

console.log(player); //console log out to browser console

const keys = {
  //add all keys used in control to keys list
  ArrowLeft: {
    pressed: false, //pressed property
  },
  ArrowRight: {
    pressed: false, //pressed property
  },
  ArrowUp: {
    pressed: false, //pressed property
  },
  a: {
    pressed: false, //pressed property
  },
  d: {
    pressed: false, //pressed property
  },
  w: {
    pressed: false, //pressed property
  }
};

let lastKey; // const used to grab the last key that waas pressed, fixing left and rigt button press bug

//create animation loop to simulate gravity constant
function animate() {
  window.requestAnimationFrame(animate); //this call represents whatever function we want to loop
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearlRect(0, 0, canvas.width, canvas.height)// clears/refreshes canvas to refresh the drawing and avoid object leaving residual/paint like effect(also clears background)
  player.update();
  enemy.update();
  // console.log('number of loops');<-- to see how many times its looping in chrome dev console

  player.velocity.x = 0
  enemy.velocity.x = 0

  //if last key is left aro, and left key is pressed, player moves left
  //player movement
  if (keys.ArrowLeft.pressed && player.lastKey === "ArrowLeft") {
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && player.lastKey === "ArrowRight") {
    player.velocity.x = 6;
  }

  //enemy movement
  if (keys.a.pressed && enemy.lastKey === 'a') {
    enemy.velocity.x = -5
  } else if (keys.d.pressed && enemy.lastKey === 'd') {
    enemy.velocity.x = 6
  }

  //detect for collision below
  if (player.attackBox.position.x + 
    player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width ) {
    console.log('hit')
  }
} //the above is an infinite animation loop

//making it a loop ensures its always acting on sprites
animate(); //call above fuction to start animating

//add event to window object, for keydown/press event
window.addEventListener("keydown", (event) => {
  //arrow function as second argument
  switch (
    event.key //switch function to map keydown event to player movement on x axis of canvas
  ) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      player.lastKey = "ArrowLeft"; //last key value is current btn press down: ArrowLeft
      // player.velocity.x = -1 //player velocity is -1 so it moves left
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      player.lastKey = "ArrowRight";
      // player.velocity.x = 1 //player velocity is 1 so it moves right
      break;
    case "ArrowUp":
      player.velocity.y = -10; //player velocity is -12 so it jumps to -12, before gravity acts to pull it back down
      break;

    case "a":
      keys.a.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.lastKey = "a";
      break;

    case "d":
      keys.d.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.lastKey = "d";
      break;

    case "w":
      // keys.w.pressed = true //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.velocity.y = -10;
      break;
  }
  
  console.log(event.key);
});

//add event for when we release the key/ keyup event
window.addEventListener("keyup", (event) => {
  //arrow function as second argument
  switch (
    event.key //switch function to map keydown event to player movement on x axis of canvas
  ) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      player.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      player.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;

      //enemy key up cases to stop movement on keyup/ key release below
    case "a":
      keys.a.pressed = false;
      enemy.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "d":
      keys.d.pressed = false;
      enemy.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }

  console.log(event.key);
});
