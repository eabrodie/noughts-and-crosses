(function app($) {
    $(function app() {
        var empty=0;
        var nought = 1;
        var cross = 2;

        var currentGameState;
        var currentPlayer = nought;

        $('#game-board td').click(onClick);

        function onClick() {
            //alert(getColumn(this) + getRow(this));
            var x = getColumn(this);
            var y = getRow(this);
            console.log(x + ', ' + y);
            if (currentGameState[y][x] === empty) {
                currentGameState[y][x] = currentPlayer;
                if (currentPlayer === nought) {
                    $(this).html('o').addClass('player-o').removeClass('empty');
                    currentPlayer = cross;
                } else {
                    $(this).html('x').addClass('player-x').removeClass('empty');
                    currentPlayer = nought;
                }
                checkWinner();
                checkDraw();
            }
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
                    if (state([x,y]) === empty) {
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
            $('#game-board td').html('').addClass('empty').removeClass('player-x').removeClass('player-o');
        }
        resetGame();
    });
}(jQuery));