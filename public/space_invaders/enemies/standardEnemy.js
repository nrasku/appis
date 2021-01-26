const STANDARD_TIMER = _.range(1, 21);
const STANDARD_HEIGHT = 14;
const STANDARD_WIDTH = 22;
const STANDARD_X_SPEED = 1;
const STANDARD_Y_SPEED = 0;
const STANDARD_HUE = 120;
const STANDARD_IMAGE = "./assets/standard_enemy.png";

function StandardEnemy(parameters){
    let params = Object.assign(parameters, {height: STANDARD_HEIGHT, width: STANDARD_WIDTH, 
                                            xSpeed: STANDARD_X_SPEED, ySpeed: STANDARD_Y_SPEED,
                                            hue: STANDARD_HUE, src: STANDARD_IMAGE});

    Enemy.call(this, params);
}


StandardEnemy.prototype = Object.create(Enemy.prototype);
StandardEnemy.prototype.constructor = StandardEnemy;

StandardEnemy.prototype.initHitboxes = function() {
    this.hitboxes = [
        new HitBox({x: this.x + 3, y: this.y + 8, width: 25, height: 19, checkBounds: false}),
        new HitBox({x: this.x + 25, y: this.y, width: 7, height: this.image.height, checkBounds: false})
    ];
}