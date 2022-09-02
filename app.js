const wins = document.querySelector('#winner');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');

//grid-items
const item1 = document.querySelector('.item-1');
const item2 = document.querySelector('.item-2');
const item3 = document.querySelector('.item-3');
const item4 = document.querySelector('.item-4');
const item5 = document.querySelector('.item-5');
const item6 = document.querySelector('.item-6');
const item7 = document.querySelector('.item-7');
const item8 = document.querySelector('.item-8');
const item9 = document.querySelector('.item-9');

//audio for marks
let mark = new Audio('audio/tap.mp3');
let win = new Audio('audio/win.wav');
let draw = new Audio('audio/draw.wav');

const MAX_MOVES = 9;
let moves = 0;

const items = [item1, item2, item3, item4, item5, item6, item7, item8, item9];

const matrix = [//      0      1       2
                /*0*/[item1, item2, item3],
                /*1*/[item4, item5, item6],
                /*2*/[item7, item8, item9]
];

function createBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    // if odd
    if ((moves % 2) !== 0) {
        block.innerHTML = '<i class="fa-solid fa-xmark" style="font-size: 95px;"></i>';
        // if even
    } else {
        block.innerHTML = '<i class="fa-regular fa-circle" style="font-size: 80px;"></i>';
    }
    return block;
}

HTMLDivElement.prototype.getItem = function () {
    let symbol;
    try {
        symbol = this
            .firstChild
            .firstChild
            .classList
            .contains('fa-xmark');
        // if there is X mark(true)
        if (symbol) {
            return 'x';
        } else {
            return 'o';
        }
    } catch {
        return null;
    }
}

function check() {

    // checking rows here
    for (let O = 0; O <= 2; O++) {
        let checkList = [];
        for (let i = 0; i <= 2; i++) {
            if (i == 0) {
                const symbol = matrix[O][i].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                }
            } else if (i == 1) {
                const symbol = matrix[O][i].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                    if (checkList[i - 1] == checkList[i]) {
                        continue;
                    } else {
                        break;
                    }
                }
            } else if (i == 2) {
                const symbol = matrix[O][i].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                    if (checkList[i - 1] == checkList[i]) {
                        return `${checkList[i]} wins`;
                    }
                }
            }
        }
    }

    // checking columns here
    for (let O = 0; O <= 2; O++) {
        let checkList = [];
        for (let i = 0; i <= 2; i++) {
            if (i == 0) {
                const symbol = matrix[i][O].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                }
            } else if (i == 1) {
                const symbol = matrix[i][O].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                    if (checkList[i - 1] == checkList[i]) {
                        continue;
                    } else {
                        break;
                    }
                }
            } else if (i == 2) {
                const symbol = matrix[i][O].getItem();
                // if here is no mark just skip the row
                if (symbol === null) {
                    break;
                } else {
                    checkList.push(symbol);
                    if (checkList[i - 1] == checkList[i]) {
                        return `${checkList[i]} wins`;
                    }
                }
            }
        }
    }

    // checking diagonal here [From top left]
    checkList = [];
    for (let i = 0; i <= 2; i++) {
        if (i == 0) {
            const symbol = matrix[i][i].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
            }
        } else if (i == 1) {
            const symbol = matrix[i][i].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
                if (checkList[i - 1] == checkList[i]) {
                    continue;
                } else {
                    break;
                }
            }
        } else if (i == 2) {
            const symbol = matrix[i][i].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
                if (checkList[i - 1] == checkList[i]) {
                    return `${checkList[i]} wins`;
                }
            }
        }
    }

    // checking diagonal here [From top right]
    checkList = [];
    for (let i = 0; i <= 2; i++) {
        if (i == 0) {
            // ITS A DIAGONAL REMEMBER THIS
            const symbol = matrix[i][matrix[i].length - (i + 1)].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
            }
        } else if (i == 1) {
            // ITS A DIAGONAL REMEMBER THIS
            const symbol = matrix[i][matrix[i].length - (i + 1)].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
                if (checkList[i - 1] == checkList[i]) {
                    continue;
                } else {
                    break;
                }
            }
        } else if (i == 2) {
            // ITS A DIAGONAL REMEMBER THIS
            const symbol = matrix[i][matrix[i].length - (i + 1)].getItem();
            // if here is no mark just skip the row
            if (symbol === null) {
                break;
            } else {
                checkList.push(symbol);
                if (checkList[i - 1] == checkList[i]) {
                    return `${checkList[i]} wins`;
                }
            }
        }
    }
}

function addBlock() {
    moves++;
    const block = createBlock();
    mark.play();
    this.append(block);

    // i use {once: ture} so need of bellow statement
    // this.removeEventListener('click', addBlock);
    
    if (moves >= 5) {
        // start check if winner found prompt if not do nothing
        const winner = check() || false;
        // if winner found alert winner. if not just check until max moves are moved
        if (winner) {

            win.play();
            //confetti
            start();
            stop();

            // remove all event handlers here if winner found
            items.forEach(function (element) {
                element.removeEventListener('click', addBlock)
            });
        } else {
            if (moves == MAX_MOVES) {
                wins.innerText = '!!! TIE !!!';
                draw.play();
            }
        }
    }
}

// for starting the confetti
const start = () => {
    setTimeout(function () {
        confetti.start()
    }); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti 
const stop = () => {
    setTimeout(function () {
        confetti.stop()
        wins.style.display = 'none';
    }, 700); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

//reset game
resetButton.addEventListener('click', function () {
    location.reload();
});

//start game
startButton.addEventListener('click', function () {
    items.forEach(function (element) {
        element.addEventListener('click', addBlock , {once: true});
    });
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
})