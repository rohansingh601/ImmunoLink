const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");


const API_KEY = "AIzaSyB7ew2MQyWNbZwzX0Fjqo_FNKjwkzQcZ_k";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

let userMessage = ""
const chatHistory =[]
const createMsgElement= (content,...classes) => {
    const div = document.createElement("div");
    div.classList.add("message",...classes);
    div.innerHTML= content;
    return div
}

const generateResponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    chatHistory.push({
        role:"user",
        parts: [{text :userMessage}]
    })
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({contents: chatHistory})
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);
        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g,"$1").trim();
        textElement.textContent = responseText;
    } catch (error) {
        console.log(error)
    }
}


const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.value.trim();
    if(!userMessage) return;

    promptInput.value=""

    const userMsgHtml = '<p class="message-text"></p>'; 
    const userMsgDiv = createMsgElement(userMsgHtml,"user-message");

    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);

    setTimeout(()=> {
        const botMsgHtml = '<img src="../assets/images/gemini.svg" class="avatar"><p class="message-text"></p>'; 
        const botMsgDiv = createMsgElement(botMsgHtml,"bot-message","loading");
        chatsContainer.appendChild(botMsgDiv);
        generateResponse(botMsgDiv);
    },600);

}
promptForm.addEventListener("submit",handleFormSubmit);


const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const logoText = document.querySelector('.logo-text');

// Define observer options
const options = {
  root: null, // Observes viewport
  threshold: 0.5, // Trigger when 50% of the section is visible
};

// Callback function for Intersection Observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'hero') {
        // Apply light styles for hero section
        hamMenu.classList.add('light');
        hamMenu.classList.remove('dark');
        logoText.classList.add('light');
        logoText.classList.remove('dark');
      } else if (entry.target.id === 'content') {
        // Apply dark styles for content section
        hamMenu.classList.add('dark');
        hamMenu.classList.remove('light');
        logoText.classList.add('dark');
        logoText.classList.remove('light');
      } else if (entry.target.id == 'about') {
        hamMenu.classList.add('light');
        hamMenu.classList.remove('dark');
        logoText.classList.add('light');
        logoText.classList.remove('dark');
      } else if (entry.target.id == 'services') {
        hamMenu.classList.add('dark');
        hamMenu.classList.remove('light');
        logoText.classList.add('dark');
        logoText.classList.remove('light');
      }
    }
  });
};


hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});

// Smooth scroll for section navigation (optional)
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('href');
      window.location.href = page; // Redirect to the selected page
    });
  });
  
  const predefinedOptions = [
    "Your Profile",
    "Journal",
    "Book a Consultation",
    "Chat with AI",
    "Community Support",
    "About",
    "Services",
    "Symptoms"
  ];
  
  function showSuggestions(value) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = "";
  
    if (value) {
      const filteredOptions = predefinedOptions.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
  
      filteredOptions.forEach(option => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.onclick = () => {
          document.getElementById("name").value = option;
          suggestionsList.innerHTML = "";
        };
        suggestionsList.appendChild(listItem);
      });
    }
  }
  