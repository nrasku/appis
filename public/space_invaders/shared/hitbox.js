function HitBox(box) {
    this.x = box.x;
    this.y = box.y;
    this.originalX = this.x;
    this.originalY = this.y;
    this.width = box.width;
    this.height = box.height;

    this.topLimit = box.topLimit || 0;
    this.bottomLimit = box.bottomLimit || 0;
    this.leftLimit = box.leftLimit || 0;
    this.rightLimit = box.rightLimit || 0; 

    this.checkBounds = box.checkBounds;
}

HitBox.prototype.update = function(x, y) {
    this.x += x;
    this.y += y;

    if(!this.checkBounds) { return 0; }

    if(this.x + this.width + this.rightLimit > canvas.width) {
    	this.x = canvas.width - (this.width + this.rightLimit) ;
	} 
	if(this.y + this.height + this.topLimit > canvas.height) {
		this.y = canvas.height - (this.height + this.topLimit);
	}
	if(this.x - this.leftLimit < 0) {
		this.x = this.leftLimit;
	}
	if(this.y - this.bottomLimit < 0) {
		this.y = this.bottomLimit;
	}
}

HitBox.prototype.reset = function() {
    this.x = this.originalX;
    this.y = this.originalY;
}