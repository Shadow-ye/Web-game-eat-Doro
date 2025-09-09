// 游戏初始化
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');const   常量 scoreDisplay = document.getElementById('score')；
const startButton = document.getElementById('startButton');const   常量 startButton = document.getElementById('startButton')；
const restartButton = document.getElementById('restartButton');const   常量 restartButton = document.getElementById('restartButton')；
const pauseButton = document.getElementById('pauseButton');const   常量 pauseButton =文档。
const autoPlayButton = document.getElementById('autoPlayButton');const   常量 autoPlayButton = document.getElementById('autoPlayButton')；
const musicToggle = document.getElementById('musicToggle');const   常量 musicToggle = document.getElementById('musicToggle')；
const volumeControl = document.getElementById('volumeControl');const体积控制=文档。
const speedControl = document.getElementById('speedControl');const   常量   速度控制 speedControl   速度控制 =文档。
const speedValue = document.getElementById('speedValue');
const bgMusic = document.getElementById('bgMusic');const   常量 bgMusic = document.getElementById('bgMusic')；

let score = 0;   设score = 0；
let snake = [];   Let    让snake   蛇 = []；
let food = {};   让food = {}；
let direction = 'right';   让direction = 'right'   “对”；
let gameInterval;   让gameInterval;
let isPaused = false;   let isPaused = false；   虚假的;
let isAutoPlay = false;   let isAutoPlay = false；   虚假的;
let gameSpeed = 1;   让gamesspeed = 1；

// 初始化游戏
function initGame() {   函数initGame() {
    snake = [{ x: 200, y: 200 }, { x: 180, y: 200 }];Snake = [{x: 200, y: 200}, {x: 180, y: 200}]；
    generateFood();
    score = 0;   得分= 0；
    scoreDisplay.textContent = score;scoreDisplay。textContent = score；   分数;
    direction = 'right';   方向= ‘右’；
    isPaused = false;   isPaused = false；   虚假的;
    isAutoPlay = false;   isAutoPlay = false；   虚假的;
    gameSpeed = 1;   gamesspeed = 1；
    speedControl.value = gameSpeed;转速控制。value = gamesspeed；
    speedValue.textContent = `${gameSpeed.toFixed(1)}x`;speedValue。textContent = ' ${gameSpeed.toFixed(1)}x '；
}

// 生成食物
function 函数generateFood() {generateFood() {
    food = {   食物= {
        x: Math.floor(Math.random() * 20) * 20,x: Math   数学.floor   地板上(数学。随机（）* 20)* 20，
        y: Math.floor(Math.random() * 20) * 20y: Math   数学.floor   地板上(数学。Random () * 20) * 20
    };
}

// 绘制蛇和食物
function    函数drawGame() {drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇身渐变颜色
    snake.forEach((segment, index) => {蛇。forEach((segment   段, index   指数) => {
        if (index !== 0) {   If    如果（index   (索引 !）== 0) {
            const gradient = ctx.createLinearGradient(segment.x, segment.y, segment.x + 20, segment.y + 20);const   常量   梯度 gradient   梯度 = ctx. createlineeargradient (segment。x   段。x,段。y,段。x20，分段。y 20);
            gradient.addColorStop(0, '#00ff00'); // 头部颜色
            gradient.addColorStop(1, '#006400'); // 尾部颜色
            ctx.fillStyle = gradient;   ctx.fillStyle = gradient；
            ctx.fillRect(segment.x, segment.y, 20, 20);ctx.fillRect (segment   段.x段。Y, 20,20)；
        }
    });
    
    // 绘制食物
    const foodImage = new Image();const   常量 fooimage = new   新    图像Image   图像()；
    foodImage.src = '/Web-game-eat-Doro/food-doro.png';foodImage。src = './food-doro.png'“/ Web   网络-game   游戏-eat   吃-Doro   氯 / food   食物-doro   氯.png”；
    ctx.drawImage(foodImage, food.x, food.y, 20, 20);ctx。drawImage (foodImage食物。x,食物。Y, 20,20)；
    
    // 绘制蛇头
    const headImage = new Image();const   常量 headImage = new   新    图像Image   图像()；
    headImage.src = '/Web-game-eat-Doro/headcapture.png';headImage。src = './headcapture.png'“/ Web   网络-game   游戏-eat   吃-Doro   氯 / headcapture.png”；
    const head = snake[0];   Const    常量head   头 = snake   蛇[0]；
    ctx.drawImage(headImage, head.x - 18, head.y - 18, 54, 54);ctx。drawImage (headImage头。X - 18，头部。Y - 18, 54, 54)；
}

// 移动蛇
function    函数moveSnake() {moveSnake() {
    const head = { ...snake[0] };   Const    常量head   头 ={…蛇[0]};
    if (isAutoPlay) {
        direction = findBestPath();direction   方向 = findBestPath()；
    }
    switch (direction) {   开关（方向）{
        case 'up': head.y -= 20; break;Case    情况下'up'   “了”：头。Y -= 20；打破;
        Case 'down'：头。Y = 20；打破;case 'down': head.y += 20; break;Case    情况下'down'   “下来”：Y = 20；Case 'down'   “下来”：头。Y = 20；打破;
        左：头。X -= 20；打破;case 'left': head.x -= 20; break;
        case 'right': head.x += 20; break;案例“右”：头部。X = 20；打破;
    }
    snake.unshift(head);   snake   蛇.unshift   平移(头);
    if (head.x === food.x && head.y === food.y) {如果(头。X ==食物。X头。Y ==食物。y) {
        score += 10;   得分= 10；
        scoreDisplay.textContent = score;scoreDisplay。textContent = score；
        generateFood();
    } else {
        snake.pop();
    }
}

// 寻找最佳路径
function 函数findBestPath() {findBestPath() {
    const head = snake[0];   Const    常量head   头 = snake   蛇[0]；
    const possibleDirections = ['up', 'down', 'left', 'right'];
    const safeDirections = possibleDirections.filter(dir => {
        const newHead = { ...head };   const   常量 newHead ={…头};
        switch (dir) {   Switch (dir) {
            case 'up': newHead.y -= 20; break;case   情况下 'up'   “了”: newHead。Y -= 20；打破;
            case 'down': newHead.y += 20; break;case   情况下 'down'   “下来”: newHead。Y = 20；打破;
            case 'left': newHead.x -= 20; break;case   情况下 'left'   “左”: newHead。X -= 20；打破;
            case 'right': newHead.x += 20; break;case   情况下 'right'   “对”: newHead。X = 20；打破;
        }
        // 检查是否撞墙或撞到自己
        if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
            return false;
        }
        for (let i = 0; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                return false;
            }
        }
        return true;
    });

    // 如果没有安全方向，随机选择一个方向
    if (safeDirections.length === 0) {
        return direction;
    }

    // 选择最接近食物的方向
    let bestDirection = safeDirections[0];
    let minDistance = Infinity;
    for (const dir of safeDirections) {
        const newHead = { ...head };
        switch (dir) {
            case 'up': newHead.y -= 20; break;
            case 'down': newHead.y += 20; break;
            case 'left': newHead.x -= 20; break;
            case 'right': newHead.x += 20; break;
        }
        const distance = Math.abs(newHead.x - food.x) + Math.abs(newHead.y - food.y);
        if (distance < minDistance) {
            minDistance = distance;
            bestDirection = dir;
        }
    }
    return bestDirection;
}

// 碰撞检测
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 游戏主循环
function gameLoop() {
    if (isPaused) return;
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('游戏结束！');
        return;
    }
    drawGame();
}

// 方向按钮事件监听
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

upBtn.addEventListener('click', () => {
    if (direction !== 'down') direction = 'up';
});

downBtn.addEventListener('click', () => {
    if (direction !== 'up') direction = 'down';
});

leftBtn.addEventListener('click', () => {
    if (direction !== 'right') direction = 'left';
});

rightBtn.addEventListener('click', () => {
    if (direction !== 'left') direction = 'right';
});

// 事件监听
startButton.addEventListener('click', () => {
    initGame();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200 / gameSpeed);
});

// 键盘控制
window.addEventListener('keydown', (e) => {
    e.preventDefault(); // 阻止默认行为
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '继续' : '暂停';
});

autoPlayButton.addEventListener('click', () => {
    isAutoPlay = !isAutoPlay;
    autoPlayButton.textContent = isAutoPlay ? '取消托管' : '电脑托管';
});

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = '暂停音乐';
    } else {
        bgMusic.pause();
        musicToggle.textContent = '播放音乐';
    }
});

volumeControl.addEventListener('input', () => {
    bgMusic.volume = volumeControl.value;
});

speedControl.addEventListener('input', () => {
    gameSpeed = parseFloat(speedControl.value);
    speedValue.textContent = `${gameSpeed.toFixed(1)}x`;
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 200 / gameSpeed);
    }
});

// 初始化
initGame();

// 动态调整Canvas尺寸
function resizeCanvas() {
    const size = Math.min(window.innerWidth - 40, window.innerHeight - 200);
    canvas.width = size;
    canvas.height = size;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 触控事件处理
function handleTouch(direction) {
    // 根据方向触发按键事件
    const event = new KeyboardEvent('keydown', { key: `Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}` });
    document.dispatchEvent(event);
}

function handleTouchEnd() {
    // 触控结束事件
    const event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
    document.dispatchEvent(event);
}
