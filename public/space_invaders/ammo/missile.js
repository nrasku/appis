function Missile(missile) {
    this.x = missile.x;
    this.y = missile.y;
    this.height = missile.height;
    this.width = missile.width;
    this.colour = missile.colour;
    this.originalX = missile.x;
    this.timing = missile.timing;
    this.speed = missile.speed;
	this.enemyFire = missile.enemyFire;
	this.onField = true;
}

Missile.prototype.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
}

Missile.prototype.update = function() {
	if(!this.onField) {
		return null;
	} else if(this.x < canvas.width + this.timing) {
		this.x += this.speed;
	}
}

Missile.prototype.outOfBounds = function() {
	return this.x > canvas.width + this.timing || this.x + this.width < 0
}

Missile.prototype.explode = function() {
    /* TODO missile explosion */
    return null;
}