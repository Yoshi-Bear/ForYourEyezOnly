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

    heart.textContent = Math.random() > 0.5 ? "1" : "0";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}


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


/* =========================
   DIABOLICAL SECRET MISSION
   ========================= */

const secretOverlay = document.getElementById("secretOverlay");
const secretClose = document.getElementById("secretClose");
const unlockButton = document.getElementById("unlockButton");
const secretCode = document.getElementById("secretCode");
const secretError = document.getElementById("secretError");
const secretMessage = document.getElementById("secretMessage");
const secretClue = document.getElementById("secretClue");

const secretSteps = [
    document.querySelector(".album-art"),
    document.querySelector(".intro h1"),
    document.querySelector(".attraction-game h2")
];

let currentSecretStep = 0;
let secretMissionFound = false;


// THE HIDDEN SEQUENCE:
// 1. Click the music icon.
// 2. Click the main page heading.
// 3. Click the attraction-game heading.

secretSteps.forEach((element, index) => {

    element.addEventListener("click", () => {

        if (secretMissionFound) return;

        if (index === currentSecretStep) {

            currentSecretStep++;

            if (currentSecretStep === secretSteps.length) {

                secretMissionFound = true;

                secretOverlay.classList.add("active");

                secretClue.classList.add("active");

                secretCode.value = "";
                secretError.textContent = "";

                secretMessage.classList.remove("active");

                secretCode.style.display = "";
                unlockButton.style.display = "";

                document.querySelector(".secret-lock").textContent = "🔐";

                secretCode.focus();

            }

        } else {

            // Wrong order? Start again.
            currentSecretStep = index === 0 ? 1 : 0;

        }

    });

});


// FINAL LOCK

function unlockSecret() {

    const code = secretCode.value.trim();
    const correctCode = "09032026";

    if (code === correctCode) {

        secretError.textContent = "";

        secretMessage.classList.add("active");

        secretCode.style.display = "none";
        unlockButton.style.display = "none";

        document.querySelector(".secret-lock").textContent = "💗";

        createFirework();
        setTimeout(createFirework, 400);
        setTimeout(createFirework, 800);

    } else {

        secretError.textContent =
            "😂 Incorrect. Our memories deserve better detective work.";

        secretCode.value = "";
        secretCode.focus();

    }

}

unlockButton.addEventListener("click", unlockSecret);

secretCode.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        unlockSecret();
    }

});


// CLOSE THE SECRET WINDOW


/* CLOSE AND RESET THE SECRET MISSION */

function resetSecretMission() {

    currentSecretStep = 0;
    secretMissionFound = false;

    secretOverlay.classList.remove("active");

    secretClue.classList.remove("active");

    secretCode.value = "";
    secretCode.style.display = "";

    unlockButton.style.display = "";

    secretError.textContent = "";

    secretMessage.classList.remove("active");

    document.querySelector(".secret-lock").textContent = "🔐";
}


secretClose.addEventListener("click", resetSecretMission);


secretOverlay.addEventListener("click", (event) => {

    if (event.target === secretOverlay) {
        resetSecretMission();
    }

});

/* FLOATING BINARY ANIMATION */

const binaryContainer = document.querySelector(".hearts-container");

function createBinaryDigit() {
    const digit = document.createElement("span");

    digit.className = "binary-digit";
    digit.textContent = Math.random() > 0.5 ? "1" : "0";

    digit.style.left = Math.random() * 100 + "vw";
    digit.style.fontSize = (14 + Math.random() * 18) + "px";
    digit.style.animationDuration = (6 + Math.random() * 6) + "s";

    binaryContainer.appendChild(digit);

    setTimeout(() => {
        digit.remove();
    }, 12000);
}



// Show some numbers immediately


/* =====================================
   MISSION 02 — PROJECT AYESHA
   ===================================== */

const prankOverlay = document.getElementById("prankOverlay");
const prankClose = document.getElementById("prankClose");
const prankQuestion = document.getElementById("prankQuestion");
const prankInput = document.getElementById("prankInput");
const prankSubmit = document.getElementById("prankSubmit");
const prankError = document.getElementById("prankError");
const prankPuzzle = document.getElementById("prankPuzzle");
const prankResult = document.getElementById("prankResult");

// Secret sequence: final envelope -> music title -> small intro text
const prankTargets = [
    document.querySelector(".envelope.final"),
    document.querySelector(".song-info h2"),
    document.querySelector(".envelope-intro")
];
let prankSequence = 0;
let prankStage = 0;

const prankQuestions = [
    {
        question: "LEVEL 01: Which jacket did I wear when we first met?",
        answers: ["adidas", "adidas jacket"]
    },
    {
        question: "LEVEL 02: What is the name of the ginger cat that chose me?",
        answers: ["garfielda"]
    },
    {
        question: "LEVEL 03: What type of milk do I like drinking?",
        answers: ["cold milk", "cold"]
    }

   


];

function openPrankMission() {
    prankStage = 0;
    prankPuzzle.style.display = "block";
    prankResult.classList.remove("active");
    prankOverlay.classList.add("active");
    showPrankQuestion();
}

function showPrankQuestion() {
    prankQuestion.textContent = prankQuestions[prankStage].question;
    prankInput.value = "";
    prankError.textContent = "";
    prankInput.focus();
}

prankTargets.forEach((target, index) => {

    if (!target) {
        console.error("Missing prank target:", index + 1);
        return;
    }

    target.addEventListener("click", () => {

        console.log("Clicked target:", index + 1);
        console.log("Expected target:", prankSequence + 1);

        if (index === prankSequence) {

            prankSequence++;

            if (prankSequence === prankTargets.length) {
                prankSequence = 0;
                console.log("MISSION 02 UNLOCKED!");
                openPrankMission();
            }

        } else {
            prankSequence = index === 0 ? 1 : 0;
        }

    });
});
function checkPrankAnswer() {
    const answer = prankInput.value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    const validAnswers = prankQuestions[prankStage].answers;

    if (validAnswers.includes(answer)) {
        prankStage++;

        if (prankStage >= prankQuestions.length) {
            prankPuzzle.style.display = "none";
            prankResult.classList.add("active");

            document.querySelector(".prank-terminal")
                .classList.add("prank-shake");

            setTimeout(() => {
                document.querySelector(".prank-terminal")
                    .classList.remove("prank-shake");
            }, 600);

            createFirework();
            setTimeout(createFirework, 400);
            setTimeout(createFirework, 800);
        } else {
            showPrankQuestion();
        }
    } else {
        prankError.textContent =
            "ACCESS DENIED. Try again, genius. 🤡";
        prankInput.value = "";
        prankInput.focus();
    }
}

prankSubmit.addEventListener("click", checkPrankAnswer);

prankInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPrankAnswer();
    }
});

function closePrankMission() {
    prankOverlay.classList.remove("active");
    prankSequence = 0;
}

prankClose.addEventListener("click", closePrankMission);

prankOverlay.addEventListener("click", (event) => {
    if (event.target === prankOverlay) {
        closePrankMission();
    }
});
/* TEMPORARY TEST FOR MISSION 02 */

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {
        openPrankMission();
    }
});
/* Haunted scenery controls — independent of the letters and games. */
(() => {
 const toggle = document.getElementById('atmosphereToggle');
 toggle.addEventListener('click', () => {
  const paused = document.body.classList.toggle('haunt-paused');
  toggle.textContent = paused ? 'Resume hauntings' : 'Pause hauntings';
  toggle.setAttribute('aria-pressed', String(paused));
 });
 document.addEventListener('keydown', e => {
  if(e.key !== 'Escape') return;
  overlay.classList.remove('active');
  resetSecretMission(); closePrankMission();
 });
})();
/* NEW AYESHA / ZIYAAD BUTTON BEHAVIOUR */
(() => {
    const oldAyesha = document.getElementById("ayeshaChoice");
    const oldZiyaad = document.getElementById("ziyaadChoice");
    const result = document.getElementById("attractionResult");

    if (!oldAyesha || !oldZiyaad || !result) return;

    // Remove the previous escape/click listeners.
    const ayesha = oldAyesha.cloneNode(true);
    const ziyaad = oldZiyaad.cloneNode(true);

    oldAyesha.replaceWith(ayesha);
    oldZiyaad.replaceWith(ziyaad);

    ayesha.removeAttribute("style");
    ziyaad.removeAttribute("style");

    ayesha.textContent = "♡ Ayesha";
    ziyaad.textContent = "♛ Ziyaad";

    let escapes = 0;
    let ready = false;
    let moving = false;
    let settleTimer;

    const teasing = [
        "Too slow 😂",
        "Almost had me.",
        "You’re really trying, huh?",
        "Okay, okay. Catch me now 😏"
    ];

    function settle() {
        clearTimeout(settleTimer);
        ayesha.removeAttribute("style");
        moving = false;

        if (escapes >= 4) {
            ready = true;
            ayesha.classList.add("catchable");
        }
    }

    function escape() {
        if (ready || moving) return;

        moving = true;
        escapes++;

        const width = ayesha.offsetWidth;
        const height = ayesha.offsetHeight;

        const maxX = Math.max(8, window.innerWidth - width - 8);
        const maxY = Math.max(8, window.innerHeight - height - 8);

        ayesha.style.position = "fixed";
        ayesha.style.left =
            (8 + Math.random() * Math.max(0, maxX - 8)) + "px";
        ayesha.style.top =
            (8 + Math.random() * Math.max(0, maxY - 8)) + "px";
        ayesha.style.zIndex = "10000";

        result.textContent = teasing[escapes - 1];

        settleTimer = setTimeout(() => {
            moving = false;

            if (escapes >= 4) {
                settle();
            }
        }, 650);
    }

    ayesha.addEventListener("mouseenter", escape);

    ayesha.addEventListener("touchstart", event => {
        if (ready) return;

        event.preventDefault();
        escape();
    }, { passive: false });

    ayesha.addEventListener("click", event => {
        // Keyboard users can choose without chasing.
        if (!ready && event.detail !== 0) {
            escape();
            return;
        }

        settle();
        result.textContent =
            "Fine. You win. Don’t let it go to your head 😂❤️";
    });

    ziyaad.addEventListener("click", () => {
        result.textContent =
            "Correct. Finally, something we agree on 😌";
    });

    window.addEventListener("resize", settle);

    // Stop the button lingering over another dashboard section.
    document.querySelectorAll(".dash-nav-button").forEach(button => {
        button.addEventListener("click", settle);
    });
})();
