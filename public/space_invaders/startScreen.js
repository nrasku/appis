const BUTTON_X_VALUES = [240, 190];
const BUTTON_Y_VALUES = [160, 205];
const BUTTON_HEIGHTS = [38, 38];
const BUTTON_WIDTHS = [102, 212];

var iconX = [0, 0];
var iconY = [0, 0];
var iconWidth = 45;
var iconHeight = 45;

var iconVisible = false;
var iconSize = iconWidth;
var iconRotate = 0;

var iconImage = new Image();
iconImage.src = "assets/star.png"

var frames = 30;
var timerId = 0;

var fadeId = 0;

function startScreen() {
    background = new Background({x: 0, y: 0, width: 1000, src: "./backdrop/start-screen.jpg"})

    timerId = setInterval(updateStartScreen, 1000/frames);
}

function updateStartScreen() {
    clear();
    background.update();
    background.draw();
    ctx.beginPath();
    ctx.font = "38px SpaceMono";
    ctx.fillStyle = "#ff7e33 ";
    ctx.fillText("WORKING TITLE", 140, 40);
    ctx.font = "30px SpaceMono";
    ctx.fillText("START", BUTTON_X_VALUES[0], BUTTON_Y_VALUES[0]);
    ctx.font = "30px Spacemono";
    ctx.fillText("HOW-TO-PLAY", BUTTON_X_VALUES[1], BUTTON_Y_VALUES[1]);

    ctx.strokeStyle = "orange";
    //ctx.strokeRect(235, 130, BUTTON_WIDTHS[0], BUTTON_HEIGHTS[0]);
    //ctx.strokeRect(185, 175, BUTTON_WIDTHS[1], BUTTON_HEIGHTS[1]);

    if(iconSize == iconWidth){
        iconRotate = -1;
    }
    if(iconSize == 0){
        iconRotate = 1;
    }
    iconSize += iconRotate;

    if(iconVisible == true){
        ctx.drawImage(iconImage, iconX[0] - (iconSize/2), iconY[0], iconSize, iconHeight);
        ctx.drawImage(iconImage, iconX[1] - (iconSize/2), iconY[1], iconSize, iconHeight);
    }
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Selection Icon

function checkPos(mouseEvent) {
    if (mouseEvent.pageX || mouseEvent.pageY == 0) {
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    } else if (mouseEvent.offsetX || mouseEvent.offsetY == 0) {
        mouseX = mouseEvent.offsetX;
        mmouseY = mouseEvent.offsetY
    }

    for(i = 0; i < BUTTON_X_VALUES.length; i++) {
        if(mouseX > BUTTON_X_VALUES[i] && mouseX < BUTTON_X_VALUES[i] + BUTTON_WIDTHS[i]) {
            if(mouseY < BUTTON_Y_VALUES[i] && mouseY > BUTTON_Y_VALUES[i] - BUTTON_HEIGHTS[i]) {
                iconVisible = true;
                iconX[0] = BUTTON_X_VALUES[i] - (iconWidth/2) - 2;
                iconY[0] = BUTTON_Y_VALUES[i] - 30;
                iconX[1] = BUTTON_X_VALUES[i] + BUTTON_WIDTHS[i] + (iconWidth/2) - 4; 
                iconY[1] = BUTTON_Y_VALUES[i] - 30;
            }
        } else {
            iconVisible = false;
        }
    }
}

function checkClick(mouseEvent){
	for(i = 0; i < BUTTON_X_VALUES.length; i++){
		if(mouseX > BUTTON_X_VALUES[i] && mouseX < BUTTON_X_VALUES[i] + BUTTON_WIDTHS[i]){
			if(mouseY < BUTTON_Y_VALUES[i] && mouseY > BUTTON_Y_VALUES[i] - BUTTON_HEIGHTS[i]){
                fadeId = setInterval(`fadeOut(${i})`, 1000/frames);
                clearInterval(timerId);
                canvas.removeEventListener("mousemove", checkPos);
                canvas.removeEventListener("mouseup", checkClick);
			}
		}
	}
}

var time = 0.0;

function fadeOut(btn){
	ctx.fillStyle = "rgba(0,0,0, 0.2)";
	ctx.fillRect (0, 0, 600, 400);
	time += 0.1;
	if(time >= 2){
		clearInterval(fadeId);
        time = 0;
        if (btn === 0) { // Start-button pressed
            startGame();
        } else { // Resetting start screen for now - before we implement other features
            timerId = setInterval("updateStartScreen()", 1000/frames);
            canvas.addEventListener("mousemove", checkPos);
            canvas.addEventListener("mouseup", checkClick);
        }
	}
}