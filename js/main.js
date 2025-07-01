// Navbar scroll background effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 20) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Typing Effect (optional for hero section)
const typedText = [
  "Web Development",
  "SEO Optimization",
  "Website Management",
  "Performance Boost"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typingTarget = document.querySelector(".typing-effect");
if (typingTarget) {
  function typeEffect() {
    if (index >= typedText.length) index = 0;
    currentText = typedText[index];
    
    if (isDeleting) {
      typingTarget.textContent = currentText.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        index++;
      }
    } else {
      typingTarget.textContent = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        isDeleting = true;
      }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}
function toggleChat() {
  const box = document.getElementById('chat-box');
  if (box) box.classList.toggle('hidden');
}

function handleChat() {
  const input = document.getElementById('user-input');
  const messages = document.getElementById('chat-messages');
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('🧑 You', userText);
  const reply = getBotReply(userText.toLowerCase());
  appendMessage('🤖 WAZASTO Bot', reply);
  input.value = '';
}

function appendMessage(sender, text) {
  const messages = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> <span>${text}</span>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function getBotReply(input) {
  const replies = [
    { keywords: ['hello', 'how are you', 'hi'], reply: "Hello how can i help you todays " },
    { keywords: ['price', 'cost', 'charge'], reply: "You can check all our pricing on the Pricing page. We offer plans from ₹1999 to ₹9999+ based on project needs." },
    { keywords: ['delivery', 'time', 'duration'], reply: "Delivery depends on your package. Starter takes ~2 days, Premium may take up to 7–10 days." },
    { keywords: ['seo', 'optimize', 'search'], reply: "Yes, SEO optimization is available in Standard and Premium packages." },
    { keywords: ['bug', 'error', 'issue'], reply: "If there's any bug, we'll fix it free within the support period (usually 1 month after delivery)." },
    { keywords: ['service', 'offer', 'feature'], reply: "We offer services like Web Development, SEO, Site Management, Speed Optimization, and more." },
    { keywords: ['custom', 'special', 'customize'], reply: "Yes, custom websites are available! Contact us with your idea and we'll make it happen." },
    { keywords: ['support', 'help', 'contact'], reply: "You can contact us anytime via the Contact page or here in chat. We'll respond as fast as possible." },
    { keywords: ['revision', 'changes', 'update'], reply: "Revisions are included! You get 1-2 free changes depending on the plan. Extra revisions may cost extra." },
    { keywords: ['payment', 'pay', 'money', 'upi'], reply: "We accept payment via UPI, bank transfer, or Paytm. 50% advance, 50% after preview approval." },
    { keywords: ['not working', 'broke', 'crash'], reply: "Don't worry! If the website breaks after delivery within support time, we'll fix it for free." },
    { keywords: ['late', 'delay', 'slow'], reply: "We try our best to deliver fast. If there’s any delay, we’ll always keep you informed." },
    { keywords: ['no reply', 'not replying', 'waiting'], reply: "We respond within 12 hours max. If you haven’t received a reply, please try contacting via WhatsApp or email too." }
  ];

  for (const { keywords, reply } of replies) {
    if (keywords.some(keyword => input.includes(keyword))) return reply;
  }

  return "Sorry, I didn't understand that. Try asking about pricing, delivery, bugs, or support issues.";
}
function update() {
  const boxes = document.querySelectorAll('.service-checkbox');
  const summaryList = document.getElementById('summary-list');
  const totalPriceEl = document.getElementById('total-price');
  const waLink = document.getElementById('whatsapp-link');

  let total = 0;
  let lines = [];

  summaryList.innerHTML = '';

  boxes.forEach(cb => {
    if (cb.checked) {
      const name = cb.dataset.name;
      const price = parseInt(cb.dataset.price);
      total += price;
      lines.push(`${name}: ₹${price}`);
      const li = document.createElement('li');
      li.textContent = `${name} – ₹${price}`;
      summaryList.appendChild(li);
    }
  });

  totalPriceEl.textContent = total;
  const text = encodeURIComponent(`Package Request:\n${lines.join('\n')}\nTotal: ₹${total}`);
  waLink.href = `https://wa.me/919045281493?text=${text}`;
}
