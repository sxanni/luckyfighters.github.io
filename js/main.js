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

const gravity = 0.4

class Sprite {
  constructor({ position, velocity }) {
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.velocity = velocity; //added this arg to simulate gravity
    this.height = 150;
  }

  draw() {
    //define what your player looks like
    c.fillStyle = "red"; //color
    c.fillRect(
      this.position.x,
      this.position.y,
      50 /*px wide */,
      this.height /*px tall */
    );
  }

  update() {
    this.draw(); //calling the draw() method
    this.position.x += this.velocity.x //define how sprite move on x axis
    this.position.y += this.velocity.y; // ooo
    // this.velocity.y += 10// overtime position.y is going to have 10 pixels added to it for each frame that is looped over at a rate of 10pixels/second or per loop
    //if stratement to stop sprite falling off the page if its bottom touchesthe lower edge of the page, by seeting velocity to 0
    
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {// if the lowest point of the rectangle is equals to the canvas edge/height
      this.velocity.y = 0 // rdeuce velocity to 0
    }else this.velocity.y += gravity //if above isnt true, gravity is applied until bottom edge touches canvas (add acceleration by incrementing gravity value to fall speed and closes gap btwn sprite and canvas floor)
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
});

player.draw(); //display / draw player on canvas

const enemy = new Sprite({
  //create new object from sprite class
  position: {
    //create new object from sprite class
    x: 800, //x coordinate on canvas
    y: 200, //y coordinate on canvas
  },
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0, //y coordinate on canvas
  },
});

enemy.draw(); //display / draw enemy on canvas

console.log(player); //console log out to browser console

//create animation loop to simulate gravity constant
function animate() {
  window.requestAnimationFrame(animate); //this call represents whatever function we want to loop
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearlRect(0, 0, canvas.width, canvas.height)// clears/refreshes canvas to refresh the drawing and avoid object leaving residual/paint like effect(also clears background)
  player.update();
  enemy.update();
  // console.log('number of loops');<-- to see how many times its looping in chrome dev console
} //the above is an infinite animation loop

//making it a loop ensures its always acting on sprites
animate();//call above fuction to start animating

//add event to window object, for keydown/press event
window.addEventListener('keydown', (event)=> { //arrow function as second argument 
  switch (event.key) { //switch function to map keydown event to player movement on x axis of canvas 
    case 'ArrowLeft':
      player.velocity.x = -1 //player velocity is -1 so it moves left
      break;
    case 'ArrowRight':
      player.velocity.x = 1 //player velocity is 1 so it moves right
      break;
  }
  
  console.log(event.key)
}) 

//add event for when we release the key/ keyup event
window.addEventListener('keyup', (event)=> { //arrow function as second argument 
  switch (event.key) { //switch function to map keydown event to player movement on x axis of canvas 
    case 'ArrowLeft':
      player.velocity.x = 0 //player velocity is zero, so it stops
      break;
    case 'ArrowRight':
      player.velocity.x = 0 //player velocity is zero, so it stops
      break;
  }
  
  console.log(event.key)
}) 