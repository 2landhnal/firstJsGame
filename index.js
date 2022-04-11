<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>I'm Nak</title>
    <link rel="shortcut icon" href="assets/favicon/favicon.ico" type="image/x-icon">
    <audio style="display: none" id="myAudio">
        <source src="./assets/audio/audio.mp3" type="audio/mpeg">
    </audio>
    <audio autoplay loop style="display: none" id="bgSound">
        <source src="./assets/audio/bg.mp3" type="audio/mpeg">
    </audio>
    <link rel="font-family" href="">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@900&family=Rubik+Moonrocks&display=swap" rel="stylesheet">
    <style>
        @font-face {
            font-family: "airstrike";
            src: url(./space_ranger/spaceranger.ttf) format("truetype");
        }
        html {
            font-size: 62.5%;
            box-sizing: border-box;
        }
        * {
            font-family: 'Londrina Solid', cursive;
            margin: 0;
            padding: 0;
        }
        #score {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            color: white;
            user-select: none;
            display: flex;
            justify-content: center;
            font-size: 3rem;
            padding-top: 1rem;
        }
        .white-bg {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: auto;
            background-color: white;
            width: 500px;
            height: 250px;
            padding: 20px;
            max-width: 50%;
            max-height: 40%;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
            border-radius: 5px;
            animation: fade ease .5s;
        }
        @keyframes fade {
            from {
                transform: scale(0.1);
                opacity: 0;
            }  
            to {
                transform: scale(1);
                opacity: 1;
            }          
        }
        button {
            background-color: blue;
            border: none;
            border-radius: 50px;
            padding: 10px;
            color: white;
            cursor: pointer;
            width: 450px;
            font-size: 2rem;
        }
        .total-score {
            font-size: 6rem;
        }
        .text-point {
            font-size: 2rem;
            line-height: 5rem;
        }
        canvas {
            background-color: black;
        }
        .score {
            font-size: 3rem;
            line-height: 6rem;
        }
        .brand {
            text-decoration: none;
            font-size: 5rem;
            transition: .2s;
            color: rgba(0,0,255, 1)
        }

        .brand:hover {
            color: #ffd500;
        }
        @media (max-width: 739px) {
            button {
                width: 200px;
            }
            .brand {
                font-size: 3rem;
            }
        }
    </style>
</head>
<body>
    <p id="score">Score: 0</p>
    <div class="white-bg" id="modalEl">
        <a href="https://github.com/2landhnal" class="brand">Hi there</a>
        <h1 class="total-score" id="totalScore">0</h1>
        <p class="text-point">Points</p>
        <div>
            <button id="startGameBtn">
                Start Game
            </button>
        </div>
    </div>
    <canvas></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/gsap.min.js" integrity="sha512-kVlGhj2qFy+KBCFuvjBJTGUMxbdqJKs4yK2jh0e0VPhWUPiPC87bzm4THmaaIee3Oj7j6sDpTTgm2EPPiESqBg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="./index.js"></script>
</body>
</html>
