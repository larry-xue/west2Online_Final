<template>
  <div class="home-body">
    <div class="seaWave">
      <canvas id="canvas">Your browser doesn't support canvas</canvas>

      <!-- SVG Goo filter from: https://css-tricks.com/gooey-effect/ -->
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </div>
    <div class="slogan">
      <h1>
        "
        To make friends
        "
        <br />To play together ......
      </h1>
    </div>
    <div class="declaration">
      <p>
        Our wish is to help you meet new people
        <br />through face-to-face games
      </p>
    </div>
    <div class="chat-together">
      <el-button type="primary">meet your sea</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    /**
     * Constants
     */
    const TWO_PI = Math.PI * 2;

    /**
     * Application Class
     */
    class Application {
      /**
       * Application constructor
       */
      constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.canvas.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.height = window.innerHeight;
        this.center = {
          x: this.width / 2,
          y: this.height / 2,
        };
        this.circleContainers = [];

        // Resize listener for the canvas to fill browser window dynamically
        window.addEventListener('resize', () => this.resizeCanvas(), false);
      }

      /**
       * Simple resize function. Reinitializes everything on the canvas while changing the width/height
       */
      resizeCanvas() {
        this.width = window.innerWidth;
        this.canvas.width = window.innerWidth;
        this.height = document.getElementsByClassName('seaWave')[0].offsetHeight;
        this.canvas.height = document.getElementsByClassName('seaWave')[0].offsetHeight;
        this.center = {
          x: this.width / 2,
          y: this.height / 2,
        };

        // Empty the previous container and fill it again with new CircleContainer objects
        this.circleContainers = [];
        this.initializeCircleContainers();
      }

      /**
       * Create a number of CircleContainer objects based on the numberOfContainers variable
       * @return void
       */
      initializeCircleContainers() {
        for (let x = 0; x < this.width + 100; x += 100) {
          for (let y = 0; y < this.height + 100; y += 100) {
            // Initialize a new instance of the CircleContainer class
            const circleContainer = new CircleContainer(this.context, x, y);

            // Let the CircleContainer initialize it's children
            circleContainer.initializeCircles();

            // Add the container to our array of CircleContainer objects
            this.circleContainers.push(circleContainer);
          }
        }
      }

      /**
       * Updates the application and every child of the application
       * @return void
       */
      update() {
        for (let i = 0; i < this.circleContainers.length; i += 1) {
          this.circleContainers[i].update();
        }
      }

      /**
       * Renders the application and every child of the application
       * @return void
       */
      render() {
        // Clear the entire canvas every render
        this.context.clearRect(0, 0, this.width, this.height);

        // Trigger the render function on every child element
        for (let i = 0; i < this.circleContainers.length; i += 1) {
          this.circleContainers[i].render();
        }
      }

      /**
       * Update and render the application at least 60 times a second
       * @return void
       */
      loop() {
        this.update();
        this.render();

        window.requestAnimationFrame(() => this.loop());
      }
    }

    /**
     * CircleContainer Class
     */
    class CircleContainer {
      /**
       * CircleContainer constructor
       * @param context - The context from the canvas object of the Application
       * @param x
       * @param y
       */
      constructor(context, x, y) {
        this.context = context;
        this.position = { x, y };

        this.numberOfCircles = 19;
        this.circles = [];

        this.baseRadius = 20;
        this.bounceRadius = 150;
        this.singleSlice = TWO_PI / this.numberOfCircles;
      }

      /**
       * Create a number of Circle objects based on the numberOfCircles variable
       * @return void
       */
      initializeCircles() {
        for (let i = 0; i < this.numberOfCircles; i += 1) {
          this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
      }

      /**
       * Try to update the application at least 60 times a second
       * @return void
       */
      update() {
        for (let i = 0; i < this.numberOfCircles; i += 1) {
          this.circles[i].update(this.context);
        }
      }

      /**
       * Try to render the application at least 60 times a second
       * @return void
       */
      render() {
        for (let i = 0; i < this.numberOfCircles; i += 1) {
          this.circles[i].render(this.context);
        }
      }
    }

    /**
     * Circle Class
     */
    class Circle {
      /**
       * Circle constructor
       * @param x - The horizontal position of this circle
       * @param y - The vertical position of this circle
       * @param baseRadius
       * @param bounceRadius
       * @param angleCircle
       */
      constructor(x, y, baseRadius, bounceRadius, angleCircle) {
        this.basePosition = { x, y };
        this.position = { x, y };
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = (x + y);
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
      }

      /**
       * Update the position of this object
       * @return void
       */
      update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;

        this.angle += this.speed;
      }

      /**
       * Renders this Circle object on the canvas
       * @param context - The context from the canvas object of the Application
       * @return void
       */
      render(context) {
        const temp = context;
        temp.fillStyle = `hsl(195, 100%,${this.size * 4}%)`;
        temp.beginPath();
        temp.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        temp.fill();
      }
    }

    /**
     * Onload function is executed whenever the page is done loading, initializes the application
     */
    // Create a new instance of the application
    const application = new Application();

    // Initialize the CircleContainer objects
    application.initializeCircleContainers();

    // Start the initial loop function for the first time
    application.loop();
  },
};
</script>

<style scoped>
.home-body {
  width: 100%;
  min-height: 50vh;
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.slogan {
  width: 100%;
  margin-top: 6rem;
  font-size: 2rem;
  color: white;
  z-index: 999;
}

.declaration {
  color: white;
  font-size: 1.5rem;
  padding-top: 2rem;
}

.chat-together {
  z-index: 999;
}

.seaWave {
  position: absolute;
  top: 4.5rem;
  left: 0;
  height: calc(100vh - 4.5rem);
  z-index: 0;
  overflow: hidden;
  background-color: hsl(195, 100%, 7%);
}

#canvas {
  margin: 0 auto;
  display: block;
  filter: url("#shadowed-goo");
}

svg {
  display: none;
}
</style>
