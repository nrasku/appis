const SHOOTING_TIMER =  _.range(15, 25);
const SHOOTING_WIDTH = 14;
const SHOOTING_HEIGHT = 10;
const SHOOTING_X_SPEED = 0.5;
const SHOOTING_Y_SPEED = 0;
const SHOOTER_COLOUR = "#4D88FF";
const SHOOTER_HUE = 240;
const SHOOTER_PARTICLES = 20;
const SHOOTER_IMAGE = "./assets/shooter_enemy.png";
    
function ShootingEnemy(parameters){
    let params = Object.assign(parameters, {height: SHOOTING_HEIGHT, width: SHOOTING_WIDTH, 
                                            xSpeed: SHOOTING_X_SPEED, ySpeed: SHOOTING_Y_SPEED, 
                                            colour: SHOOTER_COLOUR, hue: SHOOTER_HUE, 
                                            particles: SHOOTER_PARTICLES, src: SHOOTER_IMAGE});

    Enemy.call(this, params);

    this.missiles = [];
}

ShootingEnemy.prototype = Object.create(Enemy.prototype);
ShootingEnemy.prototype.constructor = ShootingEnemy;

ShootingEnemy.prototype.fire = function(){
    var yPos = this.y + this.image.height/2;
    let missile = {
        x: this.x,
		y: yPos,
    };
	this.missiles.push(new ShooterMissile(missile));
}

ShootingEnemy.prototype.canFire = function(){
	let m = onFieldCollection(this.missiles);
    return m.length === 0 || m[m.length-1].originalX - m[m.length-1].x > m[0].timing
}

ShootingEnemy.prototype.initHitboxes = function() {
    this.hitboxes = [
        new HitBox({x: this.x + 3, y: this.y + 13, width: 25, height: 19, checkBounds: false}),
        new HitBox({x: this.x + 25, y: this.y, width: 7, height: this.image.height, checkBounds: false})
    ];
}