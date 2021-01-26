var enemyYPositions = [40, 80, 120, 160, 200, 240, 280, 320, 360];

function initializeStandardEnemies(start, stop) {
    let timer = _.range(start, stop);
    let enemies = []
    for(var e=0;e<20;e++) {
        let enemy = new StandardEnemy({y: _.sample(enemyYPositions), timing: _.sample(timer)})
        enemy.initHitboxes();
        enemies.push(enemy);
    }

    return enemies;
}

function initializeZigzagEnemies(start, stop) {
    let timer = _.range(start, stop);
    let zigzagEnemies = [];
    for(var e=0;e<11;e++) {
        let zigzag = new ZigZagEnemy({y: _.sample(enemyYPositions), timing: _.sample(timer)});
        zigzag.initHitboxes();
        zigzagEnemies.push(zigzag);
    }

    return zigzagEnemies;
    
}

function initializeShootingEnemies(start, stop) {
    var timer = _.range(start, stop);
    let shootingEnemies = [];
    for(var s=0;s<8;s++) {
        let shooter = new ShootingEnemy({y: _.sample(enemyYPositions), timing: _.sample(timer), missiles: []});
        shooter.initHitboxes();
        shootingEnemies.push(shooter);
    }

    return shootingEnemies;
}