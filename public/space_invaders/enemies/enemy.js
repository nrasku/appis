const ENEMY_Y_POSITIONS = [40, 80, 120, 160, 200, 240, 280, 320, 360];
const ENEMY_X = 650;
const STANDARD_COLOUR = "green";
const EXPLOSION_PARTICLES = 30;

function Enemy(parameters) {
    this.x = parameters.x || ENEMY_X;
    this.y = parameters.y;
    this.height = parameters.height;
    this.width = parameters.width;
    this.ySpeed = parameters.ySpeed;
    this.xSpeed = parameters.xSpeed;

    this.timing = parameters.timing;
    this.colour = parameters.colour || STANDARD_COLOUR;
    this.hue = parameters.hue || 0;
    this.particles = parameters.particles || EXPLOSION_PARTICLES;
    this.onField = true
    if(parameters.src) {
        this.image = new Image();
        this.image.src = parameters.src;
    }
}

Enemy.prototype.draw = function() {
    if(this.image) {
        ctx.drawImage(this.image, this.x, this.y);
        this.hitboxes.forEach(function (item) { item.update(-this.xSpeed, this.ySpeed); }.bind(this));
    } else {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }
}

Enemy.prototype.shouldDraw = function(elapsed) {
    return elapsed >= this.timing && this.x + this.width > 0
}

Enemy.prototype.offGrid = function() {
    return this.x + this.width <= 0
}

Enemy.prototype.isHit = function(missile) {
    if(this.hitboxes) {
        let collision = this.hitboxes.map(function (hitbox) {return collides(hitbox, missile)})
        return collision.includes(true);
    } else {
        return missile.x + missile.width > this.x && 
            missile.x < this.x + this.width && 
            missile.y + missile.height > this.y && 
            missile.y < this.y + this.height;
    }
}

Enemy.prototype.explode = function() {
    let particleCount = this.particles;
  	while(particleCount--) {
  		particles.push(new Particle(this.x, this.y, this.hue));
  	}
}