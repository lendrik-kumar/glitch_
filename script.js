// ===== Reveal Sections on Interaction =====
let sectionsRevealed = false;

function revealSections() {
  if (!sectionsRevealed) {
    document.querySelectorAll('.reveal').forEach(section => {
      section.classList.remove('hidden');
    });

    const hint = document.querySelector('.hint');
    if (hint) {
      setTimeout(() => {
        hint.style.transition = 'opacity 0.5s ease';
        hint.style.opacity = 0;
      }, 5000);
    }

    sectionsRevealed = true;
  }
}

// Listen for keyboard press
document.addEventListener('keydown', revealSections);

// Listen for mouse click or touch
document.addEventListener('click', revealSections);
document.addEventListener('touchstart', revealSections);

// Update the hint text to reflect both interactions
const hint = document.querySelector('.hint');
if (hint) {
  hint.textContent = '[ Press any key or tap anywhere to uncover the fragments ]';
}

// ===== Avatar Glitch on Hover =====
const avatar = document.getElementById('avatar');
const card = document.getElementById('glitch-card');

if (avatar && card) {
  card.addEventListener('mouseenter', () => {
    avatar.style.animation = 'glitchPhoto 2s ease';
  });

  avatar.addEventListener('animationend', () => {
    avatar.style.animation = '';
  });
}

// ===== Loader Fade Out =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = 0;
      loader.style.transform = 'scale(1.2)';
      setTimeout(() => loader.style.display = 'none', 500);
    }

    // Start rotating thoughts after loader
    setTimeout(() => {
      rotateThoughts();
    }, 1000);

  }, 1000); 
});


// ===== Mood Affirmations =====
const affirmations = {
  happy: [
    "Keep spreading that joy!",
    "Your happiness is contagious.",
    "Today is a reflection of your bright spirit."
  ],
  sad: [
    "It’s okay to feel this way.",
    "Your emotions are valid.",
    "Brighter days are coming."
  ],
  ignored: [
    "You matter, even if it doesn't feel like it.",
    "Someone out there hears you.",
    "Your voice deserves to be heard."
  ],
  anxious: [
    "Breathe in peace, breathe out tension.",
    "You are safe in this moment.",
    "One step at a time."
  ],
  overwhelmed: [
    "You’re doing your best — that’s enough.",
    "Pause. Breathe. Continue.",
    "You’re stronger than this wave."
  ],
  confused: [
    "It’s okay not to have all the answers.",
    "Clarity comes with time.",
    "You're learning. You're growing."
  ]
};

document.querySelectorAll('.mood-card').forEach(card => {
  card.addEventListener('click', () => {
    const mood = card.getAttribute('data-mood');
    const box = document.getElementById('affirmation-box');
    const list = document.getElementById('affirmation-list');

    list.innerHTML = ""; // clear old affirmations
    affirmations[mood].forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });

    box.classList.remove('hidden');
  });
});

// ===== Hero Background Blur on Scroll =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const maxBlur = 8; // max blur in pixels
  const scrollY = window.scrollY;

  // Calculate blur based on scroll (adjust the divisor for strength)
  const blurValue = Math.min(scrollY / 60, maxBlur);

  hero.style.filter = `blur(${blurValue}px)`;
});

// ===== Section Highlight on Scroll (Shrink/Enlarge) =====
const allSections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      entry.target.classList.remove('inactive');
    } else {
      entry.target.classList.remove('active');
      entry.target.classList.add('inactive');
    }
  });
}, {
  threshold: 0.6,
});

allSections.forEach(section => observer.observe(section));

// ===== Typing Thought Rotation System =====
const heroTypedEl = document.getElementById("typed-thought");
const reflectionTypedEl = document.getElementById("reflection-thought");

const rotatingThoughts = [
  "Initiating thought process...",
  "Why does silence feel so loud online?",
  "I reply fast. But they take forever.",
  "Every scroll makes me feel more lost.",
  "I deleted what I wanted to say... again.",
  "Some days, I glitch just to feel something."
];

let thoughtIndex = 0;

function typeThought(targetEl, text, speed = 50) {
  if (!targetEl) return;
  let i = 0;
  targetEl.innerHTML = "";
  function typing() {
    if (i < text.length) {
      targetEl.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

function rotateThoughts() {
  // Show the first thought immediately
  typeThought(heroTypedEl, rotatingThoughts[thoughtIndex]);
  typeThought(reflectionTypedEl, rotatingThoughts[thoughtIndex]);

  // Continue rotating every 6 seconds
  setInterval(() => {
    thoughtIndex = (thoughtIndex + 1) % rotatingThoughts.length;
    typeThought(heroTypedEl, rotatingThoughts[thoughtIndex]);
    typeThought(reflectionTypedEl, rotatingThoughts[thoughtIndex]);
  }, 6000);
}


// ===== Hover Glitch Thoughts on Hero Title =====
const heroTitle = document.getElementById('hero-title');

const hoverThoughts = [
  "Am I even real here?",
  "No one cares.",
  "I'm tired of pretending.",
  "Everyone's watching. No one's listening.",
  "Do I matter?",
  "Echoes. That's all I get.",
  "Is this all just noise?",
  "Someone hear me.",
  "404: Emotion not found.",
  "How did I get here?",
  "I post. I vanish.",
  "They scroll past me.",
  "Who am I online?"
];

heroTitle?.addEventListener('mouseenter', () => {
  for (let i = 0; i < 7; i++) {
    const thought = document.createElement('div');
    thought.className = 'floating-thought';
    thought.textContent = hoverThoughts[Math.floor(Math.random() * hoverThoughts.length)];

    const x = window.innerWidth / 2 + (Math.random() * 300 - 150);
    const y = window.innerHeight / 2 + (Math.random() * 300 - 150);

    thought.style.left = `${x}px`;
    thought.style.top = `${y}px`;

    document.body.appendChild(thought);

    setTimeout(() => {
      document.body.removeChild(thought);
    }, 4000);
  }
});

// ===== Socket.io Chat Integration =====
const socket = io('http://localhost:4000');

document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      socket.emit('chat message', message);
      messageInput.value = '';
    }
  }

  // Event listeners for sending messages
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Receive messages
  socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = msg;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add glitch effect to new messages
    messageElement.style.animation = 'messageAppear 0.3s ease-out, glitch 0.2s ease-out';
  });
});
