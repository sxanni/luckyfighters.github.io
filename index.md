<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LUCKY FIGHTER</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <div class="bg"></div>
    <div id="centerAll">
      <div class="main-div">
        <div class="bar-container">
          <!-- player health -->
          <div id="playerHp">
            <div id="healthBowl"></div>
            <!-- red bar health that depletes -->
            <div id="playerHealth"></div>
          </div>
          <!-- timer-->
          <div id="timer">15</div>

          <!-- enemy health -->
          <div id="enemyHp">
            <div id="healthBowl"></div>
            <div id="enemyHealth"></div>
          </div>
        </div>
        <!-- --------------------Game Result Displays-------------------------------------------------------------- -->
        <div class="endGame" id="endGame">D R A W</div>
        <!-- <div class="endGame" id="playerWin">PLAYER IS VICTORIOUS</div>
        <div class="endGame" id="enemyWin">ENEMY IS VICTORIOUS</div> -->

        <!-- --------------------Canvas display-------------------------------------------------------------- -->
        <div id="canvasContainer">
          <canvas> </canvas>
        </div>
      </div>
    </div>

    <script src="js/utils.js"></script>
    <script src="js/classes.js"></script>
    <script src="main.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js "></script> -->
  </body>
</html>
