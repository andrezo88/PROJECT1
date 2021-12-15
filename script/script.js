window.onload = () => {


  class GameArea {
    constructor() {
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      this.obstacles = [];
      this.frames = 0;
      this.points = 0;
      this.gameStarted = false;
      this.intervalID = null;
      this.speed = 5;
      this.fuel = 100;
      this.refillGas = []; // variavel para gerar refil de gasolina randomicamente
    };

    start = () => {
      this.gameStarted = true;
      this.intervalID = setInterval(updateGameArea, 20);

      document.getElementById('start-button').innerText = "Try Again";
    };

    stop = () => {
      clearInterval(this.intervalID)
      this.gameOver();
    };

    clear = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    score = () => {
      this.context.fillStyle = "white";
      this.context.font = "bold 30px courier";
      this.context.fillText(`Score: ${this.points}`, 65, 65);
      this.context.strokeStyle = 'black';
      this.context.fillText(`Score: ${this.points}`, 65, 65);
      this.context.fillStyle = "white";
      this.context.font = "bold 30px courier";
      this.context.fillText(`Fuel: ${this.fuel}`, 65, 100);
      this.context.strokeStyle = 'black';
      this.context.fillText(`Fuel: ${this.fuel}`, 65, 100);

    };

    gameOver = () => {
      this.clear();
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.fillStyle = 'red';
      this.context.textAlign = 'center';
      this.context.font = 'bold 60px courier';
      this.context.fillText('GAME OVER', 450, 250);
      this.context.fillStyle = 'white';
      this.context.font = 'bold 40px courier';
      this.context.fillText(`Score: ${this.points}`, 450, 350)
    };
    reset = () => {
      clearInterval(this.intervalID);
      this.points = 0;
      this.obstacles = [];
      this.fuel = 100;
      this.clear();
      this.start();
    };

    increaseSpeedUp = () => {
      this.speed += 1;
      this.fuel -= 5;
    }
  };
  const gameArea = new GameArea();

  class Background {
    constructor() {
      this.img = new Image();
      this.img.src = "./images/road.png";
      this.speed = 5;
      this.y = 0;
    }

    move = () => {
      this.y += this.speed;
      this.y %= gameArea.canvas.height;
    }

    draw = () => {
      gameArea.context.drawImage(
        this.img,
        0,
        0,
        gameArea.canvas.width,
        gameArea.canvas.height
      );
      gameArea.context.drawImage(this.img, 0, this.y, gameArea.canvas.width, gameArea.canvas.height);
    };
  }

  function updateBackgroundCanvas() {
    background.move();
    background.draw();
  }

  const background = new Background();

  class Car {
    constructor(x, y, width, height) {
      this.posX = x;
      this.posY = y;
      this.width = width;
      this.height = height;
      this.img = new Image();
      this.img.src = "./images/lamboCar.png";
      this.speed = 100;
      this.resetPosX = x;
      this.resetPosY = y;
      this.fuel = 100;
    }


    draw = () => {
      gameArea.context.drawImage(
        this.img,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    };

    move = (command) => {
      switch (command) {
        case "ArrowLeft":
          if (this.posX > 100) {
            this.posX -= this.speed;
          }
          break;
        case "ArrowRight":
          if (this.posX < gameArea.canvas.width - 100 - this.width) {
            this.posX += this.speed;
          }
          break;
      };
    };

    reset = () => {
      this.posX = this.resetPosX;
      this.posY = this.resetPosY;
    }

    top = () => {
      return this.posY;
    }

    bottom = () => {
      return this.posY + this.height;
    }

    left = () => {
      return this.posX;
    }

    right = () => {
      return this.posX + this.width;
    }

    crashWith = (obstacle) => {
      const freeLeft = this.left() > obstacle.right();
      const freeRight = this.right() < obstacle.left();
      const freeTop = this.top() > obstacle.bottom();
      const freeBottom = this.bottom() < obstacle.top();
      return !(freeLeft || freeRight || freeTop || freeBottom);
    };
  }

  const player1 = new Car(470, 450, 60, 120);

  class Obstacle {
    constructor(x, width, speed) {
      this.posX = x;
      this.posY = -121;
      this.width = width;
      this.height = 120;
      this.speed = speed;
      this.img = new Image();
      this.cars = ["./images/f1Car.png", "./images/yellowCar.png", "./images/grayCar.png", "./images/graycar.png", "./images/lamboCar.png"]
      this.img.src = this.cars[Math.floor(Math.random() * this.cars.length)];
    }

    draw = () => {
      gameArea.context.drawImage(
        this.img,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    };
    updatePos = () => {
      this.posY += this.speed;
    };

    top = () => {
      return this.posY;
    }

    bottom = () => {
      return this.posY + this.height;
    }

    left = () => {
      return this.posX;
    }

    right = () => {
      return this.posX + this.width;
    }
  }

  class RefillGas {
    constructor(x, width, speed) {
      this.posX = x;
      this.posY = -121;
      this.width = width;
      this.height = 20;
      this.speed = speed;
      this.img = new Image();
      this.img.src = ["./images/refillGas.png"];
    }
    draw = () => {
      gameArea.context.drawImage(
        this.img,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    }
    updatePos = () => {
      this.posY += this.speed;
    };

    top = () => {
      return this.posY;
    }

    bottom = () => {
      return this.posY + this.height;
    }

    left = () => {
      return this.posX;
    }

    right = () => {
      return this.posX + this.width;
    }
  }

  function resetAll() {
    gameArea.reset();
    player1.reset();
  }

  function updateGameArea() {
    gameArea.clear();
    updateBackgroundCanvas();
    updateObstacles();
    player1.draw();
    gameArea.score();
    fillGas();
    checkGameOver();
  }

  function createObstacle() {
    const maxX = gameArea.canvas.width - 60;
    const posX = Math.floor(Math.random() * maxX);
    const width = 60;
    const obs = new Obstacle(posX, width, gameArea.speed);
    const fuelGas = new RefillGas(posX, width, gameArea.speed)
    gameArea.obstacles.push(obs);
  }

  function createFuel() {
    const maxX = gameArea.canvas.width - 60;
    const posX = Math.floor(Math.random() * maxX);
    const width = 30;
    const fuelGas = new RefillGas(posX, width, gameArea.speed)
    gameArea.refillGas.push(fuelGas);
  }

  function updateObstacles() {
    gameArea.frames += 1;
    if (!(gameArea.frames % 60)) {
      createObstacle();

    }

    if (!(gameArea.frames % 360)) {
      createFuel();

    }
    gameArea.obstacles.forEach((obstacle, index) => {
      obstacle.updatePos();
      obstacle.draw();
      

      if (obstacle.posY > gameArea.canvas.height) {
        gameArea.obstacles.splice(index, 1);
        gameArea.points += 1;
        if (!(gameArea.points % 10))
          gameArea.increaseSpeedUp();
      }
    });

    gameArea.refillGas.forEach((fuel, index) => {
      fuel.updatePos();
      fuel.draw();

      if (fuel.posY > gameArea.canvas.height) {
        gameArea.refillGas.splice(index, 1);
      }
    });
      
  }

  function checkGameOver() {
    gameArea.obstacles.forEach((obstacle) => {
      const crashed = player1.crashWith(obstacle);
      if (crashed || gameArea.fuel === 0) {
        console.log('run of gas!')
        gameArea.stop();
      }
    })
  }

  function fillGas() {
    gameArea.refillGas.forEach((gas) => {
      const bottle = player1.crashWith(gas);
      if (bottle) {
        console.log('refill gas')
        gameArea.fuel += 1;
      }
    })
  }

  document.getElementById('start-button').onclick = () => {
    if (!gameArea.gameStarted) {
      gameArea.start();
    } else {
      resetAll();
    }
  };
  document.addEventListener('keydown', (e) => {
    player1.move(e.key);
  });
};