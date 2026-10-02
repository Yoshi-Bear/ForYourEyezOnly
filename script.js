const envelopes = document.querySelectorAll(".envelope");

const overlay = document.getElementById("messageOverlay");

const closeButton = document.getElementById("closeButton");

const messageIcon = document.getElementById("messageIcon");

const messageTitle = document.getElementById("messageTitle");

const messageText = document.getElementById("messageText");
const music = document.getElementById("music");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        playButton.textContent = "❚❚";
        document.querySelector(".album-art").classList.add("playing");
    } else {

        music.pause();

        playButton.textContent = "▶";
        document.querySelector(".album-art").classList.remove("playing");
    }

});

const messages = {

    "Open when you miss me": {

        icon: "😌",

        title: "Aww... you miss me?",

        text:
            "I knew it.\n\n" +
            "It's okay, I understand. Being away from someone as amazing as me must be difficult. 😂\n\n" +
            "But honestly...\n\n" +
            "I miss you more. ❤️\n\n" +
            "Don't get too excited though. I still win."

    },


    "Open when you need reassurance": {

        icon: "😏",

        title: "Relax, I've got you.",

        text:
            "First of all, stop overthinking. 😂\n\n" +
            "Second, yes, I know I'm right most of the time.\n\n" +
            "But this isn't about me being right for once.\n\n" +
            "You're loved. You're appreciated. And you're stuck with me.\n\n" +
            "So breathe.\n\n" +
            "Everything is going to be okay. ❤️"

    },


    "Open when you need to smile": {

        icon: "😂",

        title: "I knew you'd open this one.",

        text:
            "Congratulations.\n\n" +
            "You have officially fallen for my trap.\n\n" +
            "I could have written something incredibly romantic here...\n\n" +
            "But honestly, knowing that I'm the funniest person you know should already make you smile. 😌\n\n" +
            "You're welcome. ❤️"

    },


    "Open before you sleep": {

        icon: "🌙",

        title: "Okay, go to sleep.",

        text:
            "Yes, I'm telling you what to do.\n\n" +
            "No, you don't get to argue.\n\n" +
            "And yes, I already know you're going to argue anyway. 😂\n\n" +
            "So goodnight, Dingus.\n\n" +
            "Sleep well, dream big, and remember that someone out there loves you very, very much.\n\n" +
            "Unfortunately for you...\n\n" +
            "it's me. ❤️🌙"

    },


    "Open this one last...": {

        icon: "❤️",

        title: "Okay... jokes aside.",

        text:
            "If you've made it all the way here, then I guess you deserve something without the teasing for once.\n\n" +
            "I know I annoy you. A lot. 😂\n\n" +
            "I know we argue about who's better, who's right, who's funnier, and basically anything we can turn into a competition.\n\n" +
            "And honestly... I wouldn't change that.\n\n" +
            "Because somewhere between all the teasing, laughing, arguing, and annoying each other, you became someone incredibly important to me.\n\n" +
            "I don't just love the easy moments with you. I love the chaos, the jokes, the random conversations, the little arguments, and all the moments that somehow become memories.\n\n" +
            "You make my life feel different in a way I can't really explain.\n\n" +
            "And if I had to choose all over again...\n\n" +
            "I'd still choose you.\n\n" +
            "Every single time.\n\n" +
            "So yes, I might annoy you for the rest of my life.\n\n" +
            "I might still argue that I'm better than you.\n\n" +
            "And I will absolutely refuse to let you have the last word. 😂\n\n" +
            "But underneath all of that...\n\n" +
            "I love you.\n\n" +
            "More than these little jokes can explain.\n\n" +
            "And I'm really grateful that I get to call you mine. ❤️"
    }

};



envelopes.forEach((envelope) => {

    envelope.addEventListener("click", () => {

        envelope.classList.add("opened");
        if (envelope.classList.contains("final")) {
            createFirework();
            setTimeout(createFirework, 500);
            setTimeout(createFirework, 1000);
        }


        const title =
            envelope.querySelector("strong").textContent;


        const message = messages[title];


        messageIcon.textContent = message.icon;

        messageTitle.textContent = message.title;

        messageText.textContent = message.text;


        setTimeout(() => {

            overlay.classList.add("active");

        }, 250);


        setTimeout(() => {

            envelope.classList.remove("opened");

        }, 600);

    });

});


closeButton.addEventListener("click", () => {

    overlay.classList.remove("active");

});


overlay.addEventListener("click", (event) => {

    if (event.target === overlay) {

        overlay.classList.remove("active");

    }

});
const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}

setInterval(createHeart, 900);
function createFirework() {

    const fireworks = document.getElementById("fireworks");

    const centerX = 20 + Math.random() * 60;
    const centerY = 20 + Math.random() * 40;

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("div");

        particle.classList.add("firework");

        particle.style.left = centerX + "%";
        particle.style.top = centerY + "%";

        particle.style.setProperty(
            "--x",
            Math.random() * 100
        );

        particle.style.setProperty(
            "--y",
            Math.random() * 100
        );

        fireworks.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1300);
    }

}
const ayeshaChoice = document.getElementById("ayeshaChoice");
const ziyaadChoice = document.getElementById("ziyaadChoice");
const attractionResult = document.getElementById("attractionResult");

function moveAyeshaButton() {

    const maxX = window.innerWidth - ayeshaChoice.offsetWidth - 20;
    const maxY = window.innerHeight - ayeshaChoice.offsetHeight - 20;

    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);

    ayeshaChoice.style.position = "fixed";
    ayeshaChoice.style.left = randomX + "px";
    ayeshaChoice.style.top = randomY + "px";
    ayeshaChoice.style.zIndex = "10000";
}

ayeshaChoice.addEventListener("mouseenter", moveAyeshaButton);

ayeshaChoice.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveAyeshaButton();
});

ziyaadChoice.addEventListener("click", () => {

    attractionResult.textContent =
        "😎 Correct. I knew you had good taste. ❤️";

});

ayeshaChoice.addEventListener("click", () => {

    attractionResult.textContent =
        "😂 You actually caught me?! Fine... you win this one. ❤️";

});