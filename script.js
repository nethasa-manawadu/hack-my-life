const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const rainDrops = Array(columns).fill(1);

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}
setInterval(drawMatrixRain, 30);

// typing style...
const initialText = [
    "> WELCOME TO MY DIGITAL DEN - TAP INTO THE TERMINAL, FEEL THE HACKER VIBE, AND EXPLORE THE MIND BEHIND THE CODE :)",
    "> PORTFOLIO LOADING..."
];

const aboutMeText = [
    "> TO CONTINUE, PRESS ENTER AND TYPE 'HELP'"
];

let currentLine = 0;
let currentChar = 0;
const typingSpeed = 50;
const terminalContent = document.querySelector('.content');

function typeWriter() {
    if (currentLine < initialText.length) {
        if (currentChar === 0) {
            terminalContent.innerHTML += '<p>> </p>';
        }
        
        const line = initialText[currentLine];
        if (currentChar < line.length) {
            terminalContent.lastElementChild.innerHTML += line.charAt(currentChar);
            currentChar++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            currentLine++;
            currentChar = 0;
            setTimeout(typeWriter, typingSpeed * 2);
        }
    } else {
        typeAboutMe();
    }
}

function typeAboutMe() {
    currentLine = 0;
    currentChar = 0;
    
    function type() {
        if (currentLine < aboutMeText.length) {
            if (currentChar === 0) {
                terminalContent.innerHTML += '<p>> </p>';
            }
            
            const line = aboutMeText[currentLine];
            if (currentChar < line.length) {
                terminalContent.lastElementChild.innerHTML += line.charAt(currentChar);
                currentChar++;
                setTimeout(type, typingSpeed);
            } else {
                currentLine++;
                currentChar = 0;
                setTimeout(type, typingSpeed * 2);
            }
        } else {
            initGlitchEffects();
        }
    }
    
    type();
}

function initGlitchEffects() {
    gsap.to(".glitch", { 
        duration: 1.5, 
        opacity: 0.3, 
        yoyo: true, 
        repeat: -1, 
        ease: "power1.inOut" 
    });
}

// commands 
let isFirstEnter = true;
const terminal = document.querySelector('.terminal');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isFirstEnter) {
        showCommandPrompt();
        isFirstEnter = false;
    }
});

function showCommandPrompt() {
    const existingInput = document.querySelector('.command-line');
    if (existingInput) existingInput.remove();
    
    terminal.innerHTML += `
        <div class="command-line">
            <span class="prompt">root@nethasa:~$</span>
            <input type="text" id="command-input" autofocus />
        </div>
    `;
    
    const input = document.getElementById('command-input');
    input.focus();
    
    input.addEventListener('keydown', handleInputSubmit);
}

function handleInputSubmit(e) {
    if (e.key === 'Enter') {
        const command = e.target.value.toLowerCase().trim();
        handleCommand(command);
        e.target.removeEventListener('keydown', handleInputSubmit);
    }
}

function handleCommand(command) {
    const lastCmdLine = document.querySelector('.command-line');
    if (lastCmdLine) lastCmdLine.remove();
    
    let output = "";
    switch(command) {
        case 'ls':
            output = createOutput([
                "> ***",
                "> skills.txt",
                "> projects/",
                "> about.md",
                "> ***"
            ]);
            break;

        case 'cat about.md':
            output = createOutput([
                ">",
                "> ///////////////////////////////////////////////////////////////////////",
                "> /------------------------------ABOUT_ME-------------------------------/",
                "> ///////////////////////////////////////////////////////////////////////",
                "> Name: Nethasa",
                "> Role: Student | Future Software Engineer",
                "> Passionate about: Tech, Anime, Creative Coding, Helping others",
                "> Goals: To build cool stuff that actually helps people",
                "> Motto: 'Don’t just glance. Decode the depth'",
                "> ///////////////////////////////////////////////////////////////////////",
                ">",
            ]);
            break;
            
        case 'view skills':
            output = createOutput([
                ">",
                "> ///////////////////////////////////////////////////////////////////////",
                "> /----------------------------TECH_SKILLS------------------------------/",
                "> ///////////////////////////////////////////////////////////////////////",
                "> [JAVA]...........[■■■■■■■□□□] 70%",
                "> [PYTHON].........[■■■■■■□□□□] 60%",
                "> [HTML]...........[■■■■■■■■■□] 95%",
                "> [CSS]............[■■■■■■■■■□] 90%",
                "> [JAVASCRIPT].....[■■■■■■□□□□] 60%",
                "> [PHP]............[■■■■■■■■□□] 80%",
                "> [REACT]..........[■■■■■□□□□□] 50%",
                "> [NODE.JS]........[■■■■■□□□□□] 50%",
                "> [SPRING_BOOT]....[■■■□□□□□□□] 30%",
                "> [MYSQL]..........[■■■■■■□□□□] 60%",
                "> [MONGODB]........[■■■■■□□□□□] 50%",
                "> ///////////////////////////////////////////////////////////////////////",
                ">",
                ">",
                ">",
                "> ///////////////////////////////////////////////////////////////////////",
                "> /-------------------------UNFILTERED_TRUTH----------------------------/",
                "> ///////////////////////////////////////////////////////////////////////",
                "> [MULTITASKING]......[■■■■■■■■■■] 100% (I can do 50 things at once)",
                "> [CREATIVITY]........[■■■■■■■■■□] 95% (CEO of delulu land)",
                "> [TEAMWORK]..........[■■■■■■■■□□] 80% (Loves people! *side eye*)",
                "> [PATIENCE]..........[■■■■■■■■□□] 80% (Except with lazy NPCs)",
                "> [CRITICAL_THINKING].[■■■■■■■■■□] 98% (Overthinks risky text @1AM)",
                "> [SELF_AWARNESS].....[■■■■■■■■■■] 100% (Knows damn well this portfolio is crap)",
                "> ///////////////////////////////////////////////////////////////////////",
                ">",
            ]);
            break;
            
        case 'cd projects':
            output = createOutput([
                ">",
                "> ///////////////////////////////////////////////////////////////////////",
                "> /------------------------ACADEMIC_WARCRIMES---------------------------/",
                "> ///////////////////////////////////////////////////////////////////////",
                "> TAX_AND_ECONOMIC_RELATED_WEB_APP (09/2024 - 04/2025)",
                ">    - A smart tax web app for Sri Lanka",
                ">    - Simplifying tax calculations, updates",
                ">    [TypeScript, JavaScript, HTML, CSS, Node.js | RESTFUL APIs, React]",
                ">",
                "> REAL-TIME_EVENT_TICKETING_SYSTEM (11/2024 - 12/2024)",
                ">    - A real-time event ticketing system using OOP, multithreading",
                ">    [React, Spring Boot, Multi-threading, Realtime Data Synchronization]",
                ">",
                "> BASIC_WEB_APP_SHOWCASING_A_U.N._SUSTAINABLE_DEVELOPMENT_GOAL (03/2024 - 04/2024)",
                ">    - A user-friendly site for a marine biodiversity platform",
                ">    [HTML, CSS, JavaScript]",
                ">",
                "> AIRLINE_BOOKING_SYSTEM (02/2024 - 03/2024)",
                ">    -  A plane seat booking system with reservation, cancellation, sorting, and file handling using OOP",
                ">    [Java]",
                ">",
                "> PROGRAM_FOR_PREDICTING_ACADEMIC_PROGRESSION (11/2023 - 12/2023)",
                ">    -  A program to process student credits",
                ">    -  Determine progression",
                ">    -  Save data, and generate a marks histogram",
                ">    [Python]",
                "> ///////////////////////////////////////////////////////////////////////",
                ">",
            ]);
            break;

        case 'sudo meme': // easter egg
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            return;

        case 'help':
            output = createOutput([
                "> COMMANDS:",
                "> ls - Show files",
                "> view skills - Display skills",
                "> cd projects - Show projects",
                "> cat about.md - Learn about the developer",
                "> clear - Wipe terminal",
                "> sudo [REDACTED] - * SECRET *"
            ]);
            break;

        case 'clear':
            terminal.innerHTML = `
                <div class="header">
                    <span class="glitch" data-text="root@nethasa:~$">root@nethasa:~$</span>
                </div>
                <div class="content"></div>
            `;
            isFirstEnter = true;
            return;
            
        default:
            output = createOutput([`> ERROR: "${command}" NOT FOUND. TRY "ls"`]);
    }
    
    terminal.innerHTML += output;
    showCommandPrompt();
    terminal.scrollTop = terminal.scrollHeight;
}

function createOutput(lines) {
    return `<div class="output">${lines.map(line => `<p>${line}</p>`).join('')}</div>`;
}

// initialize everything
typeWriter();
gsap.to(".glitch", { 
    duration: 2, 
    opacity: 0.5, 
    yoyo: true, 
    repeat: -1, 
    ease: "power1.inOut" 
});
