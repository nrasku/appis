var enemyYPositions = [40, 80, 120, 160, 200, 240, 280, 320, 360];

function initializeStandardEnemies(start, stop) {
    let timer = _.range(start, stop);
    let enemies = []
    for(var e=0;e<20;e++) {
        let enemy = new StandardEnemy(uniquePositionByTiming(enemies, timer))
        enemy.initHitboxes();
        enemies.push(enemy);
    }

    return enemies;
}

function initializeZigzagEnemies(start, stop) {
    let timer = _.range(start, stop);
    let zigzagEnemies = [];
    for(var e=0;e<11;e++) {
        let zigzag = new ZigZagEnemy(uniquePositionByTiming(enemies, timer));
        zigzag.initHitboxes();
        zigzagEnemies.push(zigzag);
    }

    return zigzagEnemies;
    
}

function initializeShootingEnemies(start, stop) {
    var timer = _.range(start, stop);
    let shootingEnemies = [];
    for(var s=0;s<8;s++) {
        let shooter = new ShootingEnemy(uniquePositionByTiming(enemies, timer));
        shooter.missiles = [];
        shooter.initHitboxes();
        shootingEnemies.push(shooter);
    }

    return shootingEnemies;
}

function uniquePositionByTiming (collection, timer) {
    let enemyPosition = { y: _.sample(enemyYPositions), timing: _.sample(timer) }
    let occupied = collection.some(element => element.y === enemyPosition.y && element.timing === enemyPosition.timing)

    if (occupied) {
        return uniquePositionByTiming(collection, timer);
    } else {
        return enemyPosition;
    }
}