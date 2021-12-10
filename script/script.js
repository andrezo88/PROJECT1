window.onload = () => {


    class GameArea {
        constructor() {
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.cars = [];
            this.frames = 0;
            this.points = 0;
        };
    }
    const gameArea = GameArea();

    class Background {
        constructor() {
          this.img = new Image();
          this.img.src = "IMG ADDRESS";
        }
    
        draw = () => {
          gameArea.context.drawImage(
            this.img,
            0,
            0,
            gameArea.canvas.width,
            gameArea.canvas.height
          );
        };
      }
    
      const background = new Background();

      class Car {
        constructor(x, y, width, height) {
          this.posX = x;
          this.posY = y;
          this.width = width;
          this.height = height;
          this.img = new Image();
          this.img.src = "CAR ADDRESS";
          this.speed = 8;
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
              if (this.posX > 60) {
                this.posX -= this.speed;
              }
              break;
            case "ArrowRight":
              if (this.posX < gameArea.canvas.width - 60 - this.width) {
                this.posX += this.speed;
              }
              break;
          }
        };
    
        top = () => {
          return this.posY;
        }
    
        bottom = () => {
          return this.posY + this.height;
        }
    
        left = () => {
          return this.posx;
        }
    
        right = () => {
          return this.posx + this.width;
        }
    
        crashWith = (obstacle) => {
            const freeLeft = this.left() > obstacle.right();
            const freeRight = this.right() < obstacle.left();
            const freeTop = this.top() > obstacle.bottom();
            const freeBottom = this.bottom() < obstacle.top();
            return !(freeLeft || freeRight || freeTop || freeBottom);
        };
      }

      const player1 = new Car(220, 550, 60, 120);

      class Obstacle {
        constructor(x, width, color) {
          this.posX = x;
          this.posY = -40;
          this.width = width;
          this.height = 40;
          this.speed = 5;
          this.color = color;
        }
    
        draw = () => {
          gameArea.context.fillStyle = this.color;
          gameArea.context.fillRect(
            this.posX,
            this.posY,
            this.width,
            this.height,
            this.color
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
          return this.posx;
        }
    
        right = () => {
          return this.posx + this.width;
        }
      }

      function updateGameArea() {
       
      }
    


    document.getElementById('start-button').onclick = () => {

    };

};