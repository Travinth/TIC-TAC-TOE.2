const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameOver = false;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    if (gameOver) return;
    const cell = e.target;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;
    if (checkWin()) {
        document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        showCelebration();
    } else if (checkDraw()) {
        document.getElementById('message').textContent = 'It\'s a draw!';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function showCelebration() {
    const celebration = document.querySelector('.celebration');
    celebration.innerHTML = '';

    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random()}s`;
        celebration.appendChild(confetti);
    }

    celebration.classList.add('active');
}
