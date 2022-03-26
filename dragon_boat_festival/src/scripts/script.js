function playPause() {
    var music = document.getElementById('audios');
    var music_btn = document.getElementById('music_btn2');
    if (music.paused) {
        music.play();
        music_btn.src = 'https://smartcinematw.neocities.org/dragon_boat_festival/image/speaker.png';
    }
    else {
        music.pause();
        music_btn.src = 'https://smartcinematw.neocities.org/dragon_boat_festival/image/mute.png';
    }
}
//--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
document.addEventListener('touchstart', function () {
    document.getElementById('audios').play()
})
//whoa, just noticed this no longer works (30-10-2015), tap once and it's immediate game over. Hope to fix this soon. apologies to all you  flap masters :D
//Entry for http://jams.gamejolt.io/lowrezjam2014/games
//sprite sheet : http://sakri.net/stuff/canvas/FlappyBird32x32Tall.png
var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initGame();
    }
}, 10);
var bgLoc = { x: 0, y: 0, width: 32, height: 32 };
var groundLoc = { x: 0, y: 31, width: 35, height: 1 };
var instructionsLoc = { x: 6, y: 49, width: 17, height: 21 };
var gameOverLoc = { x: 6, y: 32, width: 21, height: 17 };
var birdLocs = [{ x: 32, y: 0, width: 5, height: 3 }, { x: 32, y: 3, width: 5, height: 3 }, { x: 32, y: 6, width: 5, height: 3 }];
var tubeLoc = { x: 0, y: 32, width: 6, height: 44 };
var hiscoreLoc = { x: 6, y: 70, width: 30, height: 10 };
var scoreLocs = [32, 9, 27, 32, 32, 32, 27, 41, 32, 41, 27, 50, 32, 50, 27, 59, 32, 59, 32, 18];
var flappyBirdSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAABQCAYAAACecbxxAAAEkUlEQVRogcVaPWgVQRDefQmWgmVEIoJYCSpqJQgaE2Nlk8rGSrGxy0+R2uIZsbGxDYKVjZUxomCRMl2qEBBFY2+pyMkeby+zc/O3e/d8Hxz39m/uu5nZ2dm954eHG5WbLPzqzHJNYOuxD1z8ANK59+hD7+w0me/2t6obn2/V13Bpzp3/tlAlpF6/nG8NWjjY7ESKkgmJ3jm36NfefAw/fbj2ZrdTTVHYPnvf9PAc8pDou/0tN1yaC8RqN1p8UTmVFAdsFgt5hnggU5su3L/fvV2RpCy+RZlFA0U8mC+YLZrw1Nv3fjo2/vpyEzwwHQjbIo6f+ST2Ce1BM5EI1R4RTBdMGMt+fWd3oiFh589qUn71fMpNs70zcfrYlPv6+2/2uGA+GKf2Zp3vVVMlxJ5cu9yqm7imAqrqSC/e+6OQEIR2QSDURUYgE9GQ6io0yqCQKzfRVKn6NeS+cLamSrSZ+8JJRLcMLDFzsaasKDWzNgbOwGxSfUwIjDDz4qWS4h7edUJoLyWSKtWKNgbLDaaLl0qqi/9IxCi5ZPAsEZ7z0By5qqOPQ1OU3E6zL4eYFXDmjZWUFes7u76qKg+7N6mLJb21tIf8PuTvXHtMkakUOyLZIUeB/xl15um9b3iom1EJOXs9rW8w4ciM9GbU+jC8ZZK2ZtZNreMcnRJQshe0jImbhhYpi2Yk03LjS8Y47OgTRnR4cTfj106umAkPDzfE/lQ7qqvW3Er9Q3V0vIJT5YAonOuH5VF1sZ4138LBpr90fa8KHeESEMvw7kZLBf6NxvkYi8BYD+NTrB8AEhQ3EygSSBMe3jUMRidoOAx4WKZUboF1DJbPLciJNE4DGnLG4Rw9WfssoDQgEYh+A/2HKkeY1j5MgiJA+Qs30yiZsC8bp+IUxwRimbhXVD0YR8qj6sSjIHxEw4UDh0ICfpg0MynU5iN86ej8URGGU1lcpl4UmxWbtCYVfanrQb4FGmkH45TLzHkiLMtILgY4JkXZOW9OlYXoTpIu3mJpywnxII8JUuZjt1icP2mmsJhLage5eYMmJFD+pMUUq+lwlqHBa524pUAClw1QsoCJmzbTOboUJKlyDiiiJkenzCKZSHtBKnia1j4wIMkO+4DmqxM/4KBQTIpLSaxjpZWgmJQWAKVxmvnMX7EoJ8d368ZAgzUk1M7eRyjgzAzrs773UWsfldxpMrQ6s0/1ZRoLevsyagVlclxXk3r681lL/yd+zPsHVy6oj8pN6CgiDrkBa76HVy8G704uR8xCOMWp/ugFWmkKhQHWEtxEcCcs4GyAa7coDRNufrc0hTeklt1MH2itfeP431QXJFusPlC6k2HNR+XpzGFGRbVzyw8FacIkccqSp8PTOidHdJaRNAPrk7zVmWWxA3wAEQJaxPtwfGtET1RhzEbZUxYFvhWnHPAtLf5YTo65snSKbP4MwkE7dbEkg9QOuSmVxivsuCUZBVyCEp8qjVclG1ZBhh9QX5Eg+jhL0PrjuumRLSl1N7OHOzaU0hAOXPYKMa59Xydzdso8pcMvTouSnMYCUl+hLYwbz3dC5/w/9v9b8FYpGIMAAAAASUVORK5CYII=";
var spriteSheetImage = new Image();
spriteSheetImage.src = flappyBirdSource;
var spriteSheetCanvas = document.createElement("canvas");
spriteSheetCanvas.width = spriteSheetImage.width;
spriteSheetCanvas.height = spriteSheetImage.height;
var spriteSheetContext = spriteSheetCanvas.getContext("2d");
spriteSheetContext.drawImage(spriteSheetImage, 0, 0);
var renderCanvas = document.createElement("canvas");
renderCanvas.width = renderCanvas.height = 32;
var renderContext = renderCanvas.getContext("2d");
renderContext.globalCompositeOperation = "destination-over";
var collisionCanvas = document.createElement("canvas");
function drawSpriteSheetImage(context, locRect, x, y) {
    context.drawImage(spriteSheetImage, locRect.x, locRect.y, locRect.width, locRect.height, x, y, locRect.width, locRect.height);
}
var canvas, context, gameState, score, groundX = 0, birdY, birdYSpeed, birdX = 5, birdFrame = 0, activeTube, tubes = [], collisionContext, scale, scoreLoc = { width: 5, height: 9 }, hiScore = 0;
var HOME = 0, GAME = 1, GAME_OVER = 2, HI_SCORE = 3;
function initGame() {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    scale = Math.floor(Math.min(window.innerHeight, window.innerWidth) / 32);
    canvas.width = scale * 32;
    canvas.height = scale * 32;
    canvas.style.left = window.innerWidth / 2 - (scale * 32) / 2 + "px";
    // canvas.style.top = window.innerHeight / 2 - (scale * 32) / 2 + "px";
    canvas.style.top = 0 + "px";
    window.addEventListener("keydown", handleUserInteraction, false);
    canvas.addEventListener('touchstart', handleUserInteraction, false);
    canvas.addEventListener('mousedown', handleUserInteraction, false);
    collisionCanvas.width = birdX + 8;
    collisionCanvas.height = 32;
    collisionContext = collisionCanvas.getContext("2d");
    collisionContext.globalCompositeOperation = "xor";
    startGame();
    setInterval(loop, 60);
}
function startGame() {
    gameState = HOME;
    birdYSpeed = score = 0;
    birdY = 14;
    for (var i = 0; i < 2; i++) {
        tubes[i] = { x: Math.round(48 + i * 19) };
        setTubeY(tubes[i]);
    }
}
function loop() {
    switch (gameState) {
        case HOME: renderHome();
            break;
        case GAME: renderGame();
            break;
        case GAME_OVER: renderGameOver();
            break;
        case HI_SCORE: renderHiScore();
            break;
    }
}
function handleUserInteraction(event) {
    switch (gameState) {
        case HOME: gameState = GAME;
            break;
        case GAME: birdYSpeed = -1.4;//"tap boost"
            break;
        case HI_SCORE: startGame();
            break;
    }
    if (event) {
        event.preventDefault();//stop propagation chain
    }
}
function renderHome() {
    renderContext.clearRect(0, 0, 32, 32);
    drawSpriteSheetImage(renderContext, instructionsLoc, 32 - instructionsLoc.width - 1, 1);
    updateBirdHome();
    renderGround(true);
    drawSpriteSheetImage(renderContext, bgLoc, 0, 0);
    renderToScale();
}
function renderGame() {
    renderContext.clearRect(0, 0, 32, 32);
    collisionContext.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    renderScore(score, renderScoreXGame, 1);
    renderGround(true);
    renderTubes();
    updateBirdGame();
    checkCollision();
    drawSpriteSheetImage(renderContext, bgLoc, 0, 0);
    renderToScale();
}
function renderGameOver() {
    renderContext.clearRect(0, 0, 32, 32);
    drawSpriteSheetImage(renderContext, gameOverLoc, 5, 7 - birdFrame);
    renderGround();
    drawSpriteSheetImage(renderContext, bgLoc, 0, 0);
    renderToScale();
    if (++score % 8 == 0) {
        birdFrame++;//this is a quick hack to move the game over logo
        birdFrame %= 2;
    }
}
function renderHiScore() {
    renderContext.clearRect(0, 0, 32, 32);
    drawSpriteSheetImage(renderContext, hiscoreLoc, 1, 5);
    renderScore(hiScore, renderScoreXHiScore, 16);
    renderGround();
    drawSpriteSheetImage(renderContext, bgLoc, 0, 0);
    renderToScale();
}
function renderToScale() {
    var i, data = renderContext.getImageData(0, 0, 32, 32).data;
    for (i = 0; i < data.length; i += 4) {
        context.fillStyle = "rgb(" + data[i] + "," + data[i + 1] + "," + data[i + 2] + ")";
        context.fillRect(((i / 4) % 32) * scale, Math.floor(i / 128) * scale, scale, scale);
    }
}
function checkCollision() {
    if (birdX == tubes[activeTube].x + 6) {
        score++;
    }
    var collisionData = collisionContext.getImageData(birdX, birdY, 5, 3).data;
    var data = renderContext.getImageData(birdX, birdY, 5, 3).data;
    for (var i = 0; i < collisionData.length; i += 4) {
        if (collisionData[i + 3] != data[i + 3]) {
            gameState = GAME_OVER;
            if (score > hiScore) {
                hiScore = score + 0;
            }
            setTimeout(function () { gameState = HI_SCORE }, 2500);
            break;
        }
    }
}
function renderScore(score, xFunction, y) {
    var parts = score.toString().split("");
    var i, index, length = parts.length;
    for (var i = 0; i < length; i++) {
        index = parseInt(parts.pop()) * 2;
        scoreLoc.x = scoreLocs[index];
        scoreLoc.y = scoreLocs[index + 1];
        //drawSpriteSheetImage(renderContext, scoreLoc, 25 - 5 * i, 1);
        drawSpriteSheetImage(renderContext, scoreLoc, xFunction(i, length), y);
    }
}
function renderScoreXGame(index, total) {
    return 25 - 5 * index;
}
function renderScoreXHiScore(index, total) {
    return 12 + Math.floor((total / 2) * 5) - 5 * index;
}
function renderGround(move) {
    if (move && --groundX < bgLoc.width - groundLoc.width) {
        groundX = 0;
    }
    drawSpriteSheetImage(renderContext, groundLoc, groundX, 31);
}
function updateBirdHome() {
    drawSpriteSheetImage(renderContext, birdLocs[birdFrame], birdX, birdY);
    birdFrame++;
    birdFrame %= 3;
}
function updateBirdGame() {
    birdY = Math.round(birdY + birdYSpeed);
    birdYSpeed += .25;//Gravity, change this to your likings
    if (birdY < 0) {
        birdY = 0;
        birdYSpeed = 0;
    }
    if (birdY + 3 > bgLoc.height) {
        birdY = 28;
        birdYSpeed = 0;
    }
    renderContext.save();
    collisionContext.save();
    renderContext.translate(birdX, birdY);
    collisionContext.translate(birdX, birdY);
    drawSpriteSheetImage(renderContext, birdLocs[birdFrame], 0, 0);
    drawSpriteSheetImage(collisionContext, birdLocs[birdFrame], 0, 0);
    renderContext.restore();
    collisionContext.restore();
    birdFrame++;
    birdFrame %= 3;
}
function renderTubes() {
    var i, tube;
    activeTube = tubes[0].x < tubes[1].x ? 0 : 1;
    for (i = 0; i < 2; i++) {
        tube = tubes[i];
        if (--tube.x <= -6) {
            tube.x = 32;
            setTubeY(tube);
        }
        drawSpriteSheetImage(renderContext, tubeLoc, tube.x, tube.y);
        drawSpriteSheetImage(collisionContext, tubeLoc, tube.x, tube.y);
    }
}
function setTubeY(tube) {
    tube.y = Math.floor(Math.random() * (bgLoc.height - tubeLoc.height));
}
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}