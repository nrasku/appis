const SHIP_HUE = 0;
const SHIP_PARTICLES = 40;

function Ship(ship) {
	this.x = ship.x;
	this.y = ship.y;
	this.originalX = this.x;
	this.originalY = this.y;

	this.speed = 1.5;
	this.height = 10;
	this.width = 20;
	this.lives = 3;
	this.missiles = [];
	this.touchable = true;
	this.blinkTimer = null;
	this.blinkTime = 5;
	this.particles = SHIP_PARTICLES;

	this.src = ship.src
	this.lowOpacitySrc = ship.lowOpacitySrc;
	this.image = new Image();
	this.image.src = this.src;

	this.spriteSheetRows = 1;
	this.spriteSheetColumns= 3;
	this.currentFrame = 0;

	console.log(this.image.width);
}

Ship.prototype.initHitboxes = function() {
	this.hitboxes = [new HitBox({x: this.x, y: this.y, width: 15, height: this.image.height, rightLimit: 15, checkBounds: true}), 
					 new HitBox({x: this.x + 15, y: this.y + 13, width: 20, height: 16, leftLimit: 14, topLimit: 13, bottomLimit: 13, checkBounds: true})];
}

Ship.prototype.draw = function() {
	this.currentFrame++;

    let maxFrame = this.spriteSheetColumns * this.spriteSheetRows - 1;
    if (this.currentFrame > 29){
        this.currentFrame = 0;
	}

	let elapsed = (new Date() - this.blinkTimer)/1000;
	let decimal = Math.round(elapsed * 10);
	if (!this.blinkTimer || decimal % 2 == 1) {
		this.image.src = this.src;
		// Slower frames achieved by using higher frame value
		if (this.currentFrame < 10) {
			ctx.drawImage(this.image, 0, 0, this.image.width * 0.33, 60, this.x, this.y, this.image.width * 0.33, 60);
		} else if (this.currentFrame < 20) {
			ctx.drawImage(this.image, this.image.width * 0.33, 0, this.image.width * 0.33, 60, this.x, this.y, this.image.width * 0.33, 60);
		} else if (this.currentFrame < 30) {
			ctx.drawImage(this.image, this.image.width * 0.66, 0, this.image.width * 0.33, 60, this.x, this.y, this.image.width * 0.33, 60);
		}
	} else {
		this.image.src = this.lowOpacitySrc;
		ctx.drawImage(this.image, this.x, this.y);
	}
	if (elapsed >= this.blinkTime) {
		this.touchable = true;
		this.blinkTimer = null;
	}
}

Ship.prototype.update = function(x, y) {
    this.x += x;
	this.y += y;
	this.updateHitboxes(x, y);
    if(this.x + this.image.width > canvas.width) {
		this.x = canvas.width - this.image.width;
	} 
	if(this.y + this.image.height > canvas.height) {
		this.y = canvas.height - this.image.height;
	}
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.y < 0) {
		this.y = 0;
	}
}

Ship.prototype.updateHitboxes = function(x, y) {
	if(!this.hitboxes) {return null;}
	for(var i = 0; i < this.hitboxes.length; i++) {
		let hitbox = this.hitboxes[i];
		hitbox.update(x, y);
	}
}

Ship.prototype.hitByEnemy = function(enemy) {
	let collision = this.hitboxes.map(function (item) {return collides(item, enemy)})
	if(collision.includes(true) && this.touchable) {
		this.lives -= 1;
		this.touchable = false;
		this.blinkTimer = new Date();
		this.explode();
		enemy.explode();
		enemy.onField = false;
		if(!this.lives) {
			gameOver = true;
		} else {
			this.x = this.originalX;
			this.y = this.originalY; 
			this.hitboxes.forEach(function (hitbox) {hitbox.reset()});
		}
	}
}

Ship.prototype.explode = function() {
	let particleCount = this.particles;
	while(particleCount--) {
		particles.push(new Particle(this.x, this.y, SHIP_HUE));
	}
}

Ship.prototype.canFire = function() {
	let onFieldMissiles = this.missiles.filter(function(m) { return m.onField; });
	return onFieldMissiles.length === 0 || onFieldMissiles[onFieldMissiles.length-1].x - onFieldMissiles[onFieldMissiles.length-1].originalX > onFieldMissiles[0].timing
}

Ship.prototype.fire = function() {
	let bow = this.x + this.image.width * 0.33;
	let missile = {
		x: bow,
		y: this.y + this.image.height/2
	};
	this.missiles.push(new BasicMissile(missile));
}