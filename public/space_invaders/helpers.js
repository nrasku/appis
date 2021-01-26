function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function onFieldCollection(array) {
    if(array.length > 0) {
        return array.filter(function(a) { return a.onField; });
    } else {
        return array
    }
}

function elapsedSeconds(start) {
   return (new Date() - start)/1000;
}