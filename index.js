let global_board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

function check_moveable(callback, board) {
    let first = board.slice();
    let second = callback(board).slice();
    let flag = false;
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (first[y][x] != second[y][x]) {
                flag = true;
            }
        }
    }
    return flag;
}

function randomly_choose(ns) {
    return ns[Math.floor(Math.random() * ns.length)];
}

function randomly_add_number(board) {
    zeros = [];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (board[y][x] == 0) {
                zeros.push([x, y]);
            }
        }
    }
    let added = randomly_choose(zeros);
    board[added[1]][added[0]] = 2;
    return board;
}

function move_one_line(ns) {
    new_ns = ns.reduce((acc, now) => {
        if (acc === []) {
            acc.push(now);
        } else if (now === 0) {
        } else if (acc[acc.length - 1] === now) {
            acc.pop();
            acc.push(now * 2);
            acc.push(0);
        } else {
            acc.push(now);
        }
        return acc;
    }, []);

    new_list = new_ns.filter((x) => x !== 0);
    new_list = new_list.concat([0, 0, 0, 0]);
    return new_list.slice(0, 4);
}

function render(board) {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let tile = document.getElementById(`x${x}y${y}`);
            n = board[y][x];
            tile.innerHTML = `<div class="tile n${n}">${n}</div>`;
        }
    }
}

function reverse_board(board) {
    return board.reduce(
        (acc, y) => {
            for (let i = 0; i < 4; i++) {
                acc[i].push(y[i]);
            }
            return acc;
        },
        [[], [], [], []]
    );
}

function move_left(board) {
    board = board.map((y) => move_one_line(y));
    return board;
}

function reverse_list(li) {
    let new_li = [];
    for (let i = li.length - 1; i >= 0; i--) {
        new_li.push(li[i]);
    }
    return new_li;
}
function move_right(board) {
    board = board.map((y) => reverse_list(y));
    board = board.map((y) => move_one_line(y));
    board = board.map((y) => reverse_list(y));
    return board;
}

function move_up(board) {
    board = reverse_board(board);
    board = board.map((y) => move_one_line(y));
    board = reverse_board(board);
    return board;
}

function move_down(board) {
    board = reverse_board(board);
    board = board.map((y) => move_one_line(y.reverse()).reverse());
    board = reverse_board(board);
    return board;
}

function new_board() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    board = randomly_add_number(board).slice();
    board = randomly_add_number(board).slice();
    return board;
}

window.onkeydown = function () {
    console.log(global_board);
    let callback;
    switch (event.keyCode) {
        case 37:
            callback = move_left;
            break;
        case 38:
            callback = move_up;
            break;
        case 39:
            callback = move_right;
            break;
        case 40:
            callback = move_down;
            break;
    }
    if (check_moveable(callback, global_board)) {
        global_board = randomly_add_number(callback(global_board)).slice();
        render(global_board);
    }
};
