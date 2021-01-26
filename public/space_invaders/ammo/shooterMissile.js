const SHOOTER_MISSILE_HEIGHT = 2;
const SHOOTER_MISSILE_WIDTH = 5;
const SHOOTER_MISSILE_SPEED = -3;
const SHOOTER_MISSILE_COLOUR = "#4D88FF";
const SHOOTER_MISSILE_FIRE_RATE = 300;

function ShooterMissile(parameters){
    let params = Object.assign(parameters, {height: SHOOTER_MISSILE_HEIGHT, width: SHOOTER_MISSILE_WIDTH, 
                                            speed: SHOOTER_MISSILE_SPEED, colour: SHOOTER_MISSILE_COLOUR, 
                                            timing: SHOOTER_MISSILE_FIRE_RATE, enemyFire: true})

    Missile.call(this, params);
}

ShooterMissile.prototype = Object.create(Missile.prototype);
ShooterMissile.prototype.constructor = ShooterMissile;

ShooterMissile.prototype.update = function() {
    if(!this.onField) {
		return null;
	} else if(this.x > -this.timing) {
		this.x += this.speed;
	}
}
