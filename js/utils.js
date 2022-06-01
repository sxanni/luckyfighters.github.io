//seperate and reusable function to monitor collision between attack box and opoponent box/body
function rectangularCollision({ rectangle1, rectangle2 }) {
    // initially player = rect1 and enemy = rect2 inside animatoion function, but that was not reusable
    return (
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width && //handle collission from left to right side of enemy/ hit box
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height //handle colision on top and bottom of hit/attackBox
    );
  }
  
  function determineWinner({player, enemy, timerId}) { //if function to display aproprite thingd when game over
    clearTimeout(timerId)
    document.querySelector("#endGame").style.display = "flex"; //change display frome nonde to flex to make it visible
    if (player.health === enemy.health) {
      console.log("Draw");
    } else if (player.health > enemy.health) {
      document.querySelector("#endGame").innerHTML = "PLAYER IS VICTORIOUS"; // if player has more health player wins
      console.log("player wins");
      // reload() TRIED TO REFRESH PAGE AFTER GAME
    } else if (player.health < enemy.health) {
      document.querySelector("#endGame").innerHTML = "ENEMY IS VICTORIOUS"; // if player has more health player wins
      console.log("Enemy wins");
    }
  }
  
  //decrease timer
  let timer = 61; //set total imer time
  let timerId //necessary to stop timer safter gameover, add as input to determineWinner function
  
  function decreaseTimer() {
    
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1500); // decreases timer
      timer--; //decrease by 1/ decrement
      document.querySelector("#timer").innerHTML = timer; //set html id as value of timer after every decrement
    }
    //after timer hits 0 with above code
    if (timer === 0) {
      determineWinner({player, enemy})
    } 
  
  } 