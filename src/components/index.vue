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
      <h1 class="text-flicker-in-glow">
        "
        To make friends
        "
        <br />To play together ......
      </h1>
    </div>
    <div class="declaration">
      <p class="text-flicker-in-glow">
        Our wish is to help you meet new people
        <br />through face-to-face games
      </p>
    </div>
    <div :class="chatTogether" @click="beginMeet">
      <span>meet</span>
      <span>&nbsp;your</span>
      <span>&nbsp;sea</span>
    </div>
    <el-dialog title="匹配到辣~~~" :visible.sync="dialogVisible" width="30%">
      <div class="random-user">
        <div class="random-user-info">
          <!-- 偷懒一下 -->
          偷偷加个好友吧
          <br />
          ta&nbsp;叫
          {{randomInfo.username}}
          嗷~~
          <div style="width: 80%; margin: 1rem 0 0 10%;">
            <el-input v-model="checkInfo" placeholder="你有啥想对ta说的嘛~~"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">下一个更好</el-button>
        <el-button type="primary" @click="sendAddFriend">加个好友呗</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatTogether: ['chat-together', 'text-flicker-in-glow'],
      dialogVisible: false,
      randomInfo: {},
      checkInfo: '',
    };
  },
  methods: {
    sendAddFriend() {
      // 发送添加好友请求
      this.$http.post(`/v1/friends/${this.randomInfo.uid}`, {
        message: this.checkInfo,
      }).then((res) => {
        if (res.data.message === 'success') {
          this.$notify({
            message: '好友请求发送成功辣~~',
            timeout: 1500,
          });
          this.dialogVisible = false;
        }
      });
    },
    beginMeet() {
      this.$http.get('/v1/friends/random/1/alive/1').then((res) => {
        const user = res.data.data.users;
        if (user.length === 0) {
          this.$notify({
            message: '当前没有人在线欸~~待会再试试吧~~',
            timeout: 1500,
          });
        } else {
          //
          this.dialogVisible = true;
          // eslint-disable-next-line prefer-destructuring
          this.randomInfo = user[0];
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.chatTogether.pop();
      this.chatTogether.push('vibrate-2');
    }, 4000);
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
  font-size: 2rem;
  margin-top: 2rem;
  color: #ccc;
  cursor: pointer;
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

/* animation */
.text-flicker-in-glow {
  -webkit-animation: text-flicker-in-glow 4s linear both;
  animation: text-flicker-in-glow 4s linear both;
}
/* ----------------------------------------------
 * Generated by Animista on 2020-9-5 9:29:37
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-flicker-in-glow
 * ----------------------------------------
 */
@-webkit-keyframes text-flicker-in-glow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
    text-shadow: none;
  }
  10.1% {
    opacity: 1;
    text-shadow: none;
  }
  10.2% {
    opacity: 0;
    text-shadow: none;
  }
  20% {
    opacity: 0;
    text-shadow: none;
  }
  20.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
  }
  20.6% {
    opacity: 0;
    text-shadow: none;
  }
  30% {
    opacity: 0;
    text-shadow: none;
  }
  30.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.5% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.6% {
    opacity: 0;
    text-shadow: none;
  }
  45% {
    opacity: 0;
    text-shadow: none;
  }
  45.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  55% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  55.1% {
    opacity: 0;
    text-shadow: none;
  }
  57% {
    opacity: 0;
    text-shadow: none;
  }
  57.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35);
  }
  60% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35);
  }
  60.1% {
    opacity: 0;
    text-shadow: none;
  }
  65% {
    opacity: 0;
    text-shadow: none;
  }
  65.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75.1% {
    opacity: 0;
    text-shadow: none;
  }
  77% {
    opacity: 0;
    text-shadow: none;
  }
  77.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  85% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  85.1% {
    opacity: 0;
    text-shadow: none;
  }
  86% {
    opacity: 0;
    text-shadow: none;
  }
  86.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
}
@keyframes text-flicker-in-glow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
    text-shadow: none;
  }
  10.1% {
    opacity: 1;
    text-shadow: none;
  }
  10.2% {
    opacity: 0;
    text-shadow: none;
  }
  20% {
    opacity: 0;
    text-shadow: none;
  }
  20.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
  }
  20.6% {
    opacity: 0;
    text-shadow: none;
  }
  30% {
    opacity: 0;
    text-shadow: none;
  }
  30.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.5% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.6% {
    opacity: 0;
    text-shadow: none;
  }
  45% {
    opacity: 0;
    text-shadow: none;
  }
  45.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  55% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
      0 0 60px rgba(255, 255, 255, 0.25);
  }
  55.1% {
    opacity: 0;
    text-shadow: none;
  }
  57% {
    opacity: 0;
    text-shadow: none;
  }
  57.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35);
  }
  60% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35);
  }
  60.1% {
    opacity: 0;
    text-shadow: none;
  }
  65% {
    opacity: 0;
    text-shadow: none;
  }
  65.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75.1% {
    opacity: 0;
    text-shadow: none;
  }
  77% {
    opacity: 0;
    text-shadow: none;
  }
  77.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  85% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55),
      0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  85.1% {
    opacity: 0;
    text-shadow: none;
  }
  86% {
    opacity: 0;
    text-shadow: none;
  }
  86.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25),
      0 0 100px rgba(255, 255, 255, 0.1);
  }
}

.vibrate-2 {
  -webkit-animation: vibrate-2 0.3s linear infinite both;
  animation: vibrate-2 0.3s linear infinite both;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-9-5 9:32:11
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation vibrate-2
 * ----------------------------------------
 */
@-webkit-keyframes vibrate-2 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  40% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  60% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  80% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
@keyframes vibrate-2 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  40% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  60% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  80% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
</style>
