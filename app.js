var field = document.getElementById('field'),
    moveLabel,
    infoLabel = document.getElementById('info'),
    canvas = field.getContext('2d'),
    cellSize = 50,
    x = new Image(),
    o = new Image(),
    coords,
    move,
    game;

function initialize() {
    field.width = 150;
    field.height = 150;

    field.onclick = userClick;

    x.src = 'images/x.png';
    o.src = 'images/o.png';

    game = true;
    move = false;

    infoLabel.innerHTML = 'Сейчас ходит <span id="move">крестик</span>';
    moveLabel = document.getElementById('move');

    coords = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    drawField();
    drawXO();
}

function userClick(e) {
    var y = parseInt(Math.ceil(e.pageY/cellSize))-1,
        x = parseInt(Math.ceil(e.pageX/cellSize))-1;

    if (coords[x][y] != 0 || !game)
        return;

    if (move) {
        coords[x][y] = 1;
        moveLabel.innerHTML = 'крестик';
    }
    else {
        coords[x][y] = -1;
        moveLabel.innerHTML = 'нолик';
    }

    move = !move;

    drawField();
    drawXO();
    checkWin();
}

function checkWin() {
    if (coords[0][0] == 1 && coords[0][1] == 1 && coords[0][2] == 1 ||
        coords[1][0] == 1 && coords[1][1] == 1 && coords[1][2] == 1 ||
        coords[2][0] == 1 && coords[2][1] == 1 && coords[2][2] == 1 ||
        coords[0][0] == 1 && coords[1][0] == 1 && coords[2][0] == 1 ||
        coords[0][1] == 1 && coords[1][1] == 1 && coords[2][1] == 1 ||
        coords[0][2] == 1 && coords[1][2] == 1 && coords[2][2] == 1 ||
        coords[0][0] == 1 && coords[1][1] == 1 && coords[2][2] == 1 ||
        coords[0][2] == 1 && coords[1][1] == 1 && coords[2][0] == 1
        )
    {
        infoLabel.innerHTML = 'Нолик победил';
        game = false;
    } else {
        if (coords[0][0] == -1 && coords[0][1] == -1 && coords[0][2] == -1 ||
            coords[1][0] == -1 && coords[1][1] == -1 && coords[1][2] == -1 ||
            coords[2][0] == -1 && coords[2][1] == -1 && coords[2][2] == -1 ||
            coords[0][0] == -1 && coords[1][0] == -1 && coords[2][0] == -1 ||
            coords[0][1] == -1 && coords[1][1] == -1 && coords[2][1] == -1 ||
            coords[0][2] == -1 && coords[1][2] == -1 && coords[2][2] == -1 ||
            coords[0][0] == -1 && coords[1][1] == -1 && coords[2][2] == -1 ||
            coords[0][2] == -1 && coords[1][1] == -1 && coords[2][0] == -1) {
            infoLabel.innerHTML = 'Крестик победил';
            game = false;
        }
    }
}

function drawField() {
    for (var i = 0; i < field.width / cellSize; i++)
        for (var j = 0; j < field.height / cellSize; j++) {
            canvas.clearRect(cellSize * i, cellSize * j, cellSize, cellSize);
            canvas.strokeRect(cellSize * i, cellSize * j, cellSize, cellSize);
        }
}

function drawXO() {
    for (var i = 0; i < field.width / cellSize; i++)
        for (var j = 0; j < field.height / cellSize; j++) {
            switch (coords[i][j]) {
                case -1 :
                    canvas.drawImage(x, cellSize * i, cellSize * j);
                    break;
                case 1 :
                    canvas.drawImage(o, cellSize * i, cellSize * j);
                    break;
            }
        }
}

initialize();