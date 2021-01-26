const ZIG_ZAG_TIMER = _.range(10, 21);
const ZIG_ZAG_HEIGHT = 10;
const ZIG_ZAG_WIDTH = 20;
const X_SPEED = 1;
const Y_SPEED = 0.7;
const VERTICAL_MOVEMENT = 40;
const ZIG_ZAG_COLOUR = "purple"
const ZIG_ZAG_HUE = 300;
const ZIGZAG_PARTICLES = 25;
const ZIGZAG_IMAGE = "./assets/zigzag.png"

function ZigZagEnemy(parameters){
    let params = Object.assign(parameters, {height: ZIG_ZAG_HEIGHT, width: ZIG_ZAG_WIDTH, colour: ZIG_ZAG_COLOUR, 
                                            hue: ZIG_ZAG_HUE, particles: ZIGZAG_PARTICLES, src: ZIGZAG_IMAGE,
                                            ySpeed: Y_SPEED, xSpeed: X_SPEED});

    Enemy.call(this, params);

    this.originalY = this.y;
    this.verticalMovement = VERTICAL_MOVEMENT;
}


ZigZagEnemy.prototype = Object.create(Enemy.prototype);
ZigZagEnemy.prototype.constructor = ZigZagEnemy;

ZigZagEnemy.prototype.initHitboxes = function() {
    this.hitboxes = [
        new HitBox({x: this.x + 2, y: this.y + 7, width: 20, height: 15, checkBounds: false}),
        new HitBox({x: this.x + 20, y: this.y, width: 8, height: this.image.height, checkBounds: false})
    ];
}