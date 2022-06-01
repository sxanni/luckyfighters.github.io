//---------------------create player and enemy--------------------------//

//create sprite class for sprites, whenver theres a sprite object created from sprite class it will execute the constructor
//a main property in gane dev is position, each spritewill have its own indeopendent position so we


class Sprite {
  constructor({ position, width, height, imageSrc, scale = 1, frameMax = 1 }) {
    //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.width = width;
    this.height = height;
    this.image = new Image() //create new html image whenever sprite is created
    this.image.src = imageSrc
    this.scale = scale
    this.frameMax = frameMax
    this.frameCurrent = 0
  }

  draw() {
      c.drawImage(
        this.image, //draw image in canvas
        0,// this.frameCurrent * (this.width/this.framesMax),
        0,
        this.width / this.frameMax, //initiate crop to one frame
        this.height,
        this.position.x, 
        this.position.y, 
        (this.width / this.frameMax) * this.scale, 
        this.height * this.scale
        )  //multiply height by scale
  }

  update() {
    this.draw(); //calling the draw() method
  }
}

class Fighter {
  constructor({ position, velocity, color = "red", offset }) {
    //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.velocity = velocity; //added this arg to simulate gravity
    this.width = 50;
    this.height = 150;
    this.lastKey;
    (this.attackBox = {
      //arg represents attack box property
      // position: this.position , //position is same as sprite position as attacl comes from player body
      position: {
        x: this.position.x, //attack box position updates manually based on position of the parent
        y: this.position.y,
      },
      offset,
      width: 100, //default width and height of attack box
      height: 50,
    }),
      (this.color = color); //color property for sprite class so we can differentiate between player and enemy
    this.isAttacking; //property to show when player is attacking- arm this by adding an attack method right afyter update method
    this.health = 100;
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
    if (this.isAttacking) {
      //if statement to only draw attackbox when this.isattacking property is true
      c.fillStyle = "white";
      c.fillRect(
        this.attackBox.position.x, // this argument is - position of attck box on x axis
        this.attackBox.position.y, //position of attackbox on y axis
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw(); //calling the draw() method
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x; //define how sprite move on x axis
    this.position.y += this.velocity.y; // ooo
    // this.velocity.y += 10// overtime position.y is going to have 10 pixels added to it for each frame that is looped over at a rate of 10pixels/second or per loop
    //if stratement to stop sprite falling off the page if its bottom touchesthe lower edge of the page, by seeting velocity to 0

    if (this.position.y + this.height + this.velocity.y >= canvas.height -20) { //added -20 to make fighter stand on ground instead of canvas edge
      // if the lowest point of the rectangle is equals to the canvas edge/height
      this.velocity.y = 0; // rdeuce velocity to 0
    } else this.velocity.y += gravity; //if above isnt true, gravity is applied until bottom edge touches canvas (add acceleration by incrementing gravity value to fall speed and closes gap btwn sprite and canvas floor)
  }

  attack() {
    this.isAttacking = true; //when we call attack method this is = 2 true

    setTimeout(() => {
      //use settimeout to time limit attack when this method is triggerd
      this.isAttacking = false; //set this.isAttacking back to false after 100 milliseconds
    }, 100);
  }
}
