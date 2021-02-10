const $board = document.getElementById('board'),
    $sex = document.getElementById('sex'),
    colors = ["orange", "yellow", "red", "violet", "green", "white", "blue", "purple", "black", "pink"],
    $audioTag = document.getElementById('audio'),
    soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    male: {
        orange: './src/male/Orange.mp3',
        yellow: './src/male/Yellow.mp3',
        red: './src/male/Red.mp3',
        violet: './src/male/Violet.mp3',
        green: './src/male/Green.mp3',
        white: './src/male/White.mp3',
        blue: './src/male/Blue.mp3',
        purple: './src/male/Purple.mp3',
        black: './src/male/Black.mp3',
        pink: './src/male/Pink.mp3'
    },
    female: {
        orange: './src/female/Orange.mp3',
        yellow: './src/female/Yellow.mp3',
        red: './src/female/Red.mp3',
        violet: './src/female/Violet.mp3',
        green: './src/female/Green.mp3',
        white: './src/female/White.mp3',
        blue: './src/female/Blue.mp3',
        purple: './src/female/Purple.mp3',
        black: './src/female/Black.mp3',
        pink: './src/female/Pink.mp3'
    }
};

const playSound = (sex, sound) => {
    $audioTag.src = soundsUrls[sex][sound];
    $audioTag.play();
};


const selectedAnswer = ($event) => {

    const isLiElement = $event.target.localName === "li";
    if (!isLiElement) { return false; }

    const currentSelectedAnswer = $event.target.dataset.id;
    const correctAnswer = $board.dataset.answer;

    const isPlayButton = $event.target.dataset.id === 'play-sound';
    if (isPlayButton) {

        return playSound($sex.value, correctAnswer);
    }


    if (currentSelectedAnswer === correctAnswer) {
        $board.classList.add('correct');

        $audioTag.src = soundsUrls.correct;
        $audioTag.play();

        setTimeout(() => {
            $board.classList.remove('correct');
            createLevel();
        }, 1300);

    } else {
        $board.classList.add('wrong');

        $audioTag.src = soundsUrls.wrong;
        $audioTag.play();

        setTimeout(() => {
            playSound($sex.value, currentSelectedAnswer);
        }, 2200);

        setTimeout(() => {
            $board.classList.remove('wrong');
        }, 3000);
    }
}

const shuffle = (colorArray) => {
    let counter = colorArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = colorArray[counter];
        colorArray[counter] = colorArray[index];
        colorArray[index] = temp;
    }
    return colorArray;
}
const createLevel = () => {
    $board.innerHTML = '';
    const random = Math.floor(Math.random() * 10);
    $board.dataset.answer = colors[random];


   playSound($sex.value, random);

    const randomColors = shuffle(colors); // return array of shuffled colors
    randomColors.forEach((color) => {
        const liElement = document.createElement('li');
        liElement.style.backgroundColor = color;
        liElement.dataset.id = color;
        $board.appendChild(liElement);
    });

    const playButton = document.createElement('li');
    playButton.classList.add('play-sound');
    playButton.dataset.id = 'play-sound';
    $board.appendChild(playButton);
}

createLevel();

$board.addEventListener('click', selectedAnswer);