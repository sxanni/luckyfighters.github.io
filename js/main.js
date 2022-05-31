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
  constructor({ position, velocity, color = 'red', offset }) { //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.velocity = velocity; //added this arg to simulate gravity
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = { //arg represents attack box property
      // position: this.position , //position is same as sprite position as attacl comes from player body
      position: {
        x:this.position.x, //attack box position updates manually based on position of the parent
        y:this.position.y
      },  
      offset,
      width: 100, //default width and height of attack box
      height: 50
    },
  
    this.color = color //color property for sprite class so we can differentiate between player and enemy
    this.isAttacking //property to show when player is attacking- arm this by adding an attack method right afyter update method
    this.health = 100
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
    if (this.isAttacking){ //if statement to only draw attackbox when this.isattacking property is true
    c.fillStyle = "white"
    c.fillRect(
      this.attackBox.position.x, // this argument is - position of attck box on x axis
      this.attackBox.position.y, //position of attackbox on y axis
      this.attackBox.width,
      this.attackBox.height
      )
    }
  }

  update() {
    this.draw(); //calling the draw() method
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x; //define how sprite move on x axis
    this.position.y += this.velocity.y; // ooo
    // this.velocity.y += 10// overtime position.y is going to have 10 pixels added to it for each frame that is looped over at a rate of 10pixels/second or per loop
    //if stratement to stop sprite falling off the page if its bottom touchesthe lower edge of the page, by seeting velocity to 0

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      // if the lowest point of the rectangle is equals to the canvas edge/height
      this.velocity.y = 0; // rdeuce velocity to 0
    } else this.velocity.y += gravity; //if above isnt true, gravity is applied until bottom edge touches canvas (add acceleration by incrementing gravity value to fall speed and closes gap btwn sprite and canvas floor)
  }

  attack() {
    this.isAttacking = true //when we call attack method this is = 2 true

    setTimeout(() => { //use settimeout to time limit attack when this method is triggerd
      this.isAttacking = false //set this.isAttacking back to false after 100 milliseconds
    }, 100);
  }
}

const player = new Sprite({
  position: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0 //y coordinate on canvas
  },
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 5 //y coordinate on canvas
  },
  offset: {
    x: 0,
    y: 0
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
  offset: {
    x: -50,
    y: 0
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
    pressed: false, //pressed property to monitor when button is pressed is false by default
  }
};

let lastKey; // const used to grab the last key that waas pressed, fixing left and rigt button press bug


//seperate and reusable function to monitor collision between attack box and opoponent box/body
function rectangularCollision({rectangle1, rectangle2}) { // initially player = rect1 and enemy = rect2 inside animatoion function, but that was not reusable
  return(
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && //handle collission from left to right side of enemy/ hit box
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <=  rectangle2.position.y + rectangle2.height //handle colision on top and bottom of hit/attackBox 
    
  )
  
}

//decrease timer
let timer =10 //set total imer time
function decreaseTimer() {
  setTimeout(decreaseTimer, 1500)// decreases timer
  if (timer > 0) {
    timer-- //decrease by 1/ decrement
    document.querySelector('#timer').innerHTML = timer //set html id as value of timer after every decrement
  }else
  //after timer hits 0 with above code
  if (player.health === enemy.health) {
    document.querySelector('#draw').style.display = "flex" //incase of draw display draw text
    console.log('Draw') 
  }else
  if (player.health > enemy.health) {
    document.querySelector('#playerWin').style.display = "flex"// if player has more health player wins
    console.log('Draw') 
  }else
  if (player.health < enemy.health) {
    document.querySelector('#enemyWin').style.display = "flex"//if enemy has more health enemy wins
    console.log('Draw') 
  }
  
}
decreaseTimer()

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
  if (rectangularCollision({ //call rectangular collision
    rectangle1: player,
    rectangle2: enemy
  }) && //handle colision on top and bottom of hit/attackBox 
    player.isAttacking //handles the action of attacking so the above only count wwhnen player is attacking
    ) {
      player.isAttacking = false
      enemy.health -= 20 //minus 20 from health when player hits enemy
    console.log('player attack successful')
    document.querySelector('#enemyHealth').style.width = enemy.health +'%' // select width of bar and take away the % value of enemy.health 
  }
  if (rectangularCollision({ //call rectangular collision
    rectangle1: enemy,
    rectangle2: player
  }) && //handle colision on top and bottom of hit/attackBox 
    enemy.isAttacking //handles the action of attacking so the above only count wwhnen player is attacking
    ) {
      enemy.isAttacking = false
      player.health -= 20 //minus 20 from health when player hits enemy

    console.log('enemy attack succesful')
    document.querySelector('#playerHealth').style.width = player.health +'%' // select width of bar and take away the % value of player.health when enemy attacks


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
    case " ":
      player.attack()
      break
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
      case "f":
        enemy.attack()
        break
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
