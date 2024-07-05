document.addEventListener("DOMContentLoaded", function () {
    // Event listener untuk memastikan kode dijalankan setelah seluruh konten halaman selesai dimuat.

    const board = document.getElementById('board');
    // Mengambil elemen dengan ID 'board' yang akan digunakan sebagai papan permainan.

    const message = document.getElementById('message');
    // Mengambil elemen dengan ID 'message' untuk menampilkan pesan status permainan.

    const restartBtn = document.getElementById('restartBtn');
    // Mengambil elemen dengan ID 'restartBtn' untuk tombol restart permainan.

    const vsPlayerBtn = document.getElementById('vsPlayer');
    // Mengambil elemen dengan ID 'vsPlayer' untuk tombol mode bermain melawan pemain lain.

    const vsAIBtn = document.getElementById('vsAI');
    // Mengambil elemen dengan ID 'vsAI' untuk tombol mode bermain melawan AI.

    const levelSelect = document.getElementById('level');
    // Mengambil elemen dengan ID 'level' untuk memilih tingkat kesulitan AI.

    const roundsSelect = document.getElementById('rounds');
    // Mengambil elemen dengan ID 'rounds' untuk memilih jumlah ronde permainan.

    const startGameBtn = document.getElementById('startGame');
    // Mengambil elemen dengan ID 'startGame' untuk tombol memulai permainan.

    const optionsContainer = document.getElementById('options');
    // Mengambil elemen dengan ID 'options' yang berisi opsi-opsi permainan.

    const boardContainer = document.getElementById('boardContainer');
    // Mengambil elemen dengan ID 'boardContainer' yang berisi papan permainan.

    const playerXScoreEl = document.getElementById('playerXScore');
    // Mengambil elemen dengan ID 'playerXScore' untuk menampilkan skor pemain X.

    const playerOScoreEl = document.getElementById('playerOScore');
    // Mengambil elemen dengan ID 'playerOScore' untuk menampilkan skor pemain O.

    const backBtn = document.getElementById('backBtn');
    // Mengambil elemen dengan ID 'backBtn' untuk tombol kembali ke menu utama.

    const playerXNameInput = document.getElementById('playerXName');
    // Mengambil elemen dengan ID 'playerXName' untuk input nama pemain X.

    const playerONameInput = document.getElementById('playerOName');
    // Mengambil elemen dengan ID 'playerOName' untuk input nama pemain O.

    const playerNamesContainer = document.getElementById('playerNames');
    // Mengambil elemen dengan ID 'playerNames' yang berisi input nama pemain.

    const playerXDisplay = document.getElementById('playerXDisplay');
    // Mengambil elemen dengan ID 'playerXDisplay' untuk menampilkan nama pemain X.

    const playerODisplay = document.getElementById('playerODisplay');
    // Mengambil elemen dengan ID 'playerODisplay' untuk menampilkan nama pemain O.

    const backsound = document.getElementById('backsound');
    // Mengambil elemen dengan ID 'backsound' untuk suara latar belakang.

    const soundWin = document.getElementById('sound-win');
    // Mengambil elemen dengan ID 'sound-win' untuk suara kemenangan.

    const soundLose = document.getElementById('sound-lose');
    // Mengambil elemen dengan ID 'sound-lose' untuk suara kekalahan.

    const soundMove = document.getElementById('sound-move');
    // Mengambil elemen dengan ID 'sound-move' untuk suara ketika pemain melakukan langkah.

    let currentPlayer = 'X';
    // Menyimpan pemain yang sedang bermain ('X' atau 'O').

    let gameMode = 'player';
    // Menyimpan mode permainan saat ini ('player' untuk melawan pemain lain, 'ai' untuk melawan AI).

    let aiLevel = 1;
    // Menyimpan tingkat kesulitan AI (1: Mudah, 2: Sedang, 3: Sulit).

    let rounds = 1;
    // Menyimpan jumlah ronde permainan yang dipilih.

    let currentRound = 0;
    // Menyimpan ronde permainan saat ini.

    let isGameOver = false;
    // Menyimpan status permainan apakah sudah berakhir atau belum.

    let playerXScore = 0;
    // Menyimpan skor pemain X.

    let playerOScore = 0;
    // Menyimpan skor pemain O.

    let playerXName = 'Player X';
    // Menyimpan nama pemain X.

    let playerOName = 'Player O';
    // Menyimpan nama pemain O.

    // Initialize board
    const squares = [];
    // Menyimpan elemen kotak papan permainan.

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = document.createElement('div');
            // Membuat elemen div untuk setiap kotak di papan permainan.

            square.classList.add('square');
            // Menambahkan kelas 'square' pada elemen div.

            square.dataset.row = i;
            // Menyimpan indeks baris kotak ke dalam atribut data.

            square.dataset.col = j;
            // Menyimpan indeks kolom kotak ke dalam atribut data.

            square.addEventListener('click', () => {
                if (!isGameOver && !square.textContent) {
                    handleMove(square);
                }
            });
            // Menambahkan event listener pada kotak untuk menangani klik jika permainan belum berakhir dan kotak belum terisi.

            board.appendChild(square);
            // Menambahkan kotak ke dalam elemen papan permainan.

            squares.push(square);
            // Menambahkan kotak ke dalam array squares.
        }
    }

    // Add event listeners to buttons
    vsPlayerBtn.addEventListener('click', () => {
        gameMode = 'player';
        levelSelect.disabled = true;
        vsPlayerBtn.classList.add('selected');
        vsAIBtn.classList.remove('selected');
        playerNamesContainer.style.display = 'block'; 
        startGameBtn.disabled = false;
    });
    // Menambahkan event listener pada tombol vsPlayer untuk mengatur mode permainan ke 'player', menonaktifkan pemilihan level AI, menampilkan input nama pemain, dan mengaktifkan tombol mulai permainan.

    vsAIBtn.addEventListener('click', () => {
        gameMode = 'ai';
        levelSelect.disabled = false;
        vsPlayerBtn.classList.remove('selected');
        vsAIBtn.classList.add('selected');
        playerNamesContainer.style.display = 'none';
        startGameBtn.disabled = false;
    });
    // Menambahkan event listener pada tombol vsAI untuk mengatur mode permainan ke 'ai', mengaktifkan pemilihan level AI, menyembunyikan input nama pemain, dan mengaktifkan tombol mulai permainan.

    levelSelect.addEventListener('change', (e) => {
        aiLevel = parseInt(e.target.value);
    });
    // Menambahkan event listener pada dropdown level untuk mengubah tingkat kesulitan AI sesuai pilihan.

    roundsSelect.addEventListener('change', (e) => {
        rounds = parseInt(e.target.value);
    });
    // Menambahkan event listener pada dropdown rounds untuk mengubah jumlah ronde permainan sesuai pilihan.

    startGameBtn.addEventListener('click', () => {
        playerXName = playerXNameInput.value || 'Player X';
        playerOName = playerONameInput.value || 'Player O';
        playerXDisplay.textContent = playerXName;
        playerODisplay.textContent = playerOName;
        optionsContainer.style.display = 'none';
        boardContainer.style.display = 'flex';
        restartGame();
    });
    // Menambahkan event listener pada tombol startGame untuk memulai permainan, menetapkan nama pemain, menyembunyikan opsi, menampilkan papan permainan, dan me-restart permainan.

    restartBtn.addEventListener('click', () => {
        restartGame();
    });
    // Menambahkan event listener pada tombol restart untuk me-restart permainan.

    function restartGame() {
        isGameOver = false;
        message.textContent = '';
        currentPlayer = 'X';
        currentRound = 0;
        playerXScore = 0;
        playerOScore = 0;
        updateScores();
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('blink');
        });
        backsound.play();
        if (gameMode === 'ai' && currentPlayer === 'O') {
            makeAiMove();
        }
    }
    // Fungsi untuk me-restart permainan, mengatur ulang status permainan, skor, papan, dan memainkan suara latar belakang.

    function handleMove(square) {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        square.textContent = currentPlayer;
        soundMove.play();
        if (checkWin(row, col)) {
            message.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins this round!`;
            isGameOver = true;
            updateScore(currentPlayer);
            if (currentPlayer === 'X') {
                soundWin.play();
            } else {
                soundLose.play();
            }
            backsound.pause();
            currentRound++;
            if (currentRound < rounds) {
                setTimeout(resetBoard, 2000);
            } else {
                setTimeout(() => {
                    message.textContent += ` Final Score - ${playerXName}: ${playerXScore}, ${playerOName}: ${playerOScore}`;
                }, 2000);
            }
        } else if (checkDraw()) {
            message.textContent = 'Draw!';
            isGameOver = true;
            currentRound++;
            if (currentRound < rounds) {
                setTimeout(resetBoard, 2000);
            } else {
                setTimeout(() => {
                    message.textContent += ` Final Score - ${playerXName}: ${playerXScore}, ${playerOName}: ${playerOScore}`;
                }, 2000);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'ai' && currentPlayer === 'O') {
                setTimeout(makeAiMove, 500);
            }
        }
    }
    // Fungsi untuk menangani langkah pemain, memeriksa kemenangan atau hasil seri, mengupdate skor, dan mengubah giliran pemain.

    function checkWin(row, col) {
        const player = currentPlayer;
        const winPatterns = [
            [squares[row * 3], squares[row * 3 + 1], squares[row * 3 + 2]],
            [squares[col], squares[col + 3], squares[col + 6]],
            [squares[0], squares[4], squares[8]],
            [squares[2], squares[4], squares[6]]
        ];

        for (const pattern of winPatterns) {
            if (pattern.every(square => square.textContent === player)) {
                pattern.forEach(square => square.classList.add('blink'));
                return true;
            }
        }

        return false;
    } 
    // Fungsi untuk memeriksa apakah pemain saat ini menang dengan memeriksa pola kemenangan di baris, kolom, dan diagonal.

    function checkDraw() {
        return squares.every(square => square.textContent !== '');
    }
    // Fungsi untuk memeriksa apakah permainan seri dengan memeriksa apakah semua kotak sudah terisi.

    function makeAiMove() {
        let bestMove;
        let bestScore = -Infinity;
    
        for (let square of squares) {
            if (square.textContent === '') {
                square.textContent = currentPlayer;
                let score = minimax(squares, 0, false);
                square.textContent = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = square;
                }
            }
        }
    
        // Tambahkan logika untuk level easy di sini
            if (aiLevel === 1) { // Level mudah
                // 30% kemungkinan AI akan memilih langkah acak yang kurang optimal
                if (Math.random() < 0.3) {
                    const emptySquares = squares.filter(square => square.textContent === '');
                    bestMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                }
            }
        
            if (bestMove) {
                handleMove(bestMove);
            }
        }
    
    // Fungsi untuk membuat langkah AI menggunakan algoritma minimax.

    function minimax(board, depth, isMaximizing) {
        const scores = {
            X: -1,
            O: 1,
            draw: 0
        };

        if (checkWinCondition(board, 'O')) {
            return scores['O'];
        } else if (checkWinCondition(board, 'X')) {
            return scores['X'];
        } else if (checkDrawCondition(board)) {
            return scores['draw'];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let square of board) {
                if (square.textContent === '') {
                    square.textContent = 'O';
                    let score = minimax(board, depth + 1, false);
                    square.textContent = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let square of board) {
                if (square.textContent === '') {
                    square.textContent = 'X';
                    let score = minimax(board, depth + 1, true);
                    square.textContent = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    // Fungsi minimax untuk menentukan langkah terbaik AI dengan menggunakan rekursi untuk memeriksa semua kemungkinan langkah dan mengembalikan skor terbaik.

    function checkWinCondition(board, player) {
        const winPatterns = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
        ];

        return winPatterns.some(pattern => pattern.every(square => square.textContent === player));
    }
    // Fungsi untuk memeriksa kondisi kemenangan di papan permainan untuk pemain tertentu.

    function checkDrawCondition(board) {
        return board.every(square => square.textContent !== '');
    }
    // Fungsi untuk memeriksa kondisi seri di papan permainan.

    function updateScore(player) {
        if (player === 'X') {
            playerXScore++;
        } else {
            playerOScore++;
        }
        updateScores();
    }
    // Fungsi untuk mengupdate skor pemain berdasarkan siapa yang menang.

    function updateScores() {
        playerXScoreEl.textContent = playerXScore;
        playerOScoreEl.textContent = playerOScore;
    }
    // Fungsi untuk menampilkan skor pemain di elemen HTML.

    function resetBoard() {
        isGameOver = false;
        message.textContent = '';
        currentPlayer = 'X';
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('blink');
        });
        backsound.play();
        if (gameMode === 'ai' && currentPlayer === 'O') {
            makeAiMove();
        }
    }
    // Fungsi untuk mengatur ulang papan permainan untuk ronde berikutnya.

    backBtn.addEventListener('click', () => {
        optionsContainer.style.display = 'flex';
        boardContainer.style.display = 'none';
        backsound.pause();
        backsound.currentTime = 0;
    });
    // Event listener untuk tombol kembali yang akan menampilkan opsi, menyembunyikan papan permainan, dan menghentikan suara latar belakang.

    const pixelArts = document.querySelectorAll('.pixel-art1, .pixel-art2, .pixel-art3, .pixel-art4');
    // Mengambil semua elemen dengan kelas 'pixel-art1', 'pixel-art2', 'pixel-art3', dan 'pixel-art4'.

    function moveImageRandomly(element) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const imageWidth = element.offsetWidth;
        const imageHeight = element.offsetHeight;

        const randomX = Math.floor(Math.random() * (screenWidth - imageWidth));
        const randomY = Math.floor(Math.random() * (screenHeight - imageHeight));

        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
    }
    // Fungsi untuk memindahkan gambar pixel art secara acak di layar.

    pixelArts.forEach(moveImageRandomly);
    // Memindahkan semua gambar pixel art secara acak ketika halaman dimuat.

    setInterval(() => {
        pixelArts.forEach(moveImageRandomly);
    }, 450);
    // Memindahkan semua gambar pixel art secara acak setiap 450 milidetik.

    const buttons = document.querySelectorAll('.sound-button');
    // Mengambil semua elemen dengan kelas 'sound-button'.

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sound = button.getAttribute('data-sound');
            const audio = new Audio(sound);
            audio.play();
        });
    });
    // Menambahkan event listener pada tombol suara untuk memainkan suara yang ditentukan dalam atribut data-sound ketika tombol diklik.
});
