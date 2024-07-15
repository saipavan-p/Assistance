const chatContainer = document.getElementById("chat-container");
const userMessageInput = document.getElementById("user-input");
const enterButton = document.getElementById("enter-button");

enterButton.addEventListener("click", sendMessage);
userMessageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

function appendMessage(role, content) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(role);

  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card");
  messageCard.textContent = content;

  messageElement.appendChild(messageCard);

  const chatLog = chatContainer.querySelector("#chat-log");
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;  
}

function addRecommendationToInput(message) {
  userMessageInput.value = message;
  userMessageInput.focus();
}

async function sendMessage() {
  const userMessage = userMessageInput.value;
  if (userMessage.trim() === "") {
    return;
  }

  appendMessage("User", userMessage);
  userMessageInput.value = "";
  userMessageInput.focus();

  try {
    const response = await fetch("/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        message_body: userMessage
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const botMessage = data.message;
      appendMessage("Bot", botMessage);
    } else {
      console.error("Server error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}











// const chatContainer = document.getElementById("chat-container");
// const userMessageInput = document.getElementById("user-input");
// const enterButton = document.getElementById("enter-button");

// enterButton.addEventListener("click", sendMessage);
// userMessageInput.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     sendMessage();
//   }
// });

// // function appendMessage(role, content) {
// //   const messageElement = document.createElement("div");
// //   messageElement.classList.add("message");
// //   messageElement.classList.add(role);

// //   const messageCard = document.createElement("div");
// //   messageCard.classList.add("message-card");
// //   messageCard.textContent = content;

// //   messageElement.appendChild(messageCard);

// //   chatContainer.querySelector("#chat-log").appendChild(messageElement);
// //   chatContainer.scrollTop = chatContainer.scrollHeight;
// // }

// function appendMessage(role, content) {
//   const messageElement = document.createElement("div");
//   messageElement.classList.add("message");
//   messageElement.classList.add(role);

//   const messageCard = document.createElement("div");
//   messageCard.classList.add("message-card");
//   messageCard.textContent = content;

//   messageElement.appendChild(messageCard);

//   const chatLog = chatContainer.querySelector("#chat-log");
//   chatLog.appendChild(messageElement);
//   chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;  
// }




// function addRecommendationToInput(message) {
//   userMessageInput.value = message;
//   userMessageInput.focus();
// }

// async function sendMessage() {
//   const userMessage = userMessageInput.value;
//   if (userMessage.trim() === "") {
//     return;
//   }

//   appendMessage("User", userMessage);
//   userMessageInput.value = "";
//   userMessageInput.focus();

//   const response = await fetch("/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ content: userMessage }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     const botMessage = data.message;
//     appendMessage("Bot", botMessage);
//     speakText(botMessage);
//   } else {
//     // Handle server error
//     console.error("Server error:", response.status);
//   }
// }

// function getBotResponse(userMessage) {
//   // Here you can add your logic to generate the bot's response based on the user's message
//   // This is just a simple example
//   if (userMessage.toLowerCase().includes("hello")) {
//     return "Hello! How can I assist you today?";
//   } else {
//     return "I'm sorry, but I don't have the information you're looking for.";
//   }
// }
