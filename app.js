
var empty = 0;
var nought = 1;
var cross = 2;

var currentGameState;
//var currentPlayer = nought;

$('#game-board button').click(onClick);

function onClick() {
    //alert(getColumn(this) + getRow(this));
    var x = getColumn(this);
    var y = getRow(this);
    if (currentGameState[y][x] === empty) {
        currentGameState[y][x] = nought;
        renderGame();

        setTimeout(function () {
            checkWinner();
            checkDraw();

            playX();

            setTimeout(function () {
                checkWinner();
                checkDraw();
            }, 100);
        }, 100);
    }
}

function playX () {
    while (true) {
        var x = getRandom(0, 2);
        var y = getRandom(0, 2);
        console.log(x + ', ' + y);
        if (currentGameState[y][x] === empty) {
            currentGameState[y][x] = cross;
            renderGame();
            break;
        }
    }
}

function getRandom (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRow(cell) {
    return $(cell).attr('data-loc').charAt(2);
}
function getColumn(cell) {
    return $(cell).attr('data-loc').charAt(0);
}
function checkWinner() {
    checkGroup([0,0], [1,0], [2,0]);
    checkGroup([0,1], [1,1], [2,1]);
    checkGroup([0,2], [1,2], [2,2]);
    checkGroup([0,0], [0,1], [0,2]);
    checkGroup([1,0], [1,1], [1,2]);
    checkGroup([2,0], [2,1], [2,2]);
    checkGroup([0,0], [1,1], [2,2]);
    checkGroup([0,2], [1,1], [2,0]);
}
function checkGroup(p1, p2, p3) {
    if (state(p1) === state(p2) && state(p2) === state(p3) && state(p1) !== empty) {
        if (state(p1) === nought) {
            alert('Nought wins!');
        } else {
            alert('Cross wins!');
        }
        resetGame();
    }
}
function state(point) {
    var x = point[0];
    var y = point[1];
    return currentGameState[y][x];
}
function checkDraw() {
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (state([x, y]) === empty) {
                return;
            }
        }
    }
    alert('It\'s a draw');
    resetGame();
}
function resetGame() {
    currentGameState = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]];
    renderGame();
}

function renderGame() {
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (currentGameState[y][x] === empty)
                $('[data-loc="' + x + ',' + y + '"]').html('').removeClass('player-x').removeClass('player-o').addClass('empty')
            else if (currentGameState[y][x] === nought)
                $('[data-loc="' + x + ',' + y + '"]').html('o').removeClass('player-x').addClass('player-o').removeClass('empty')
            else if (currentGameState[y][x] === cross)
                $('[data-loc="' + x + ',' + y + '"]').html('x').addClass('player-x').removeClass('player-o').removeClass('empty')
        }
    }
}
resetGame();



$(window).resize(resizeCells);
resizeCells();
function resizeCells() {
    //resize font and height to match width
    var cw = $('#game-board td').width();
    $('#game-board td').css({'height':cw+'px', 'font-size': (cw / 1.5) + 'px'});
}