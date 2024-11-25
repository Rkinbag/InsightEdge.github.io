//Gemini Code
// const typingForm = document.querySelector(".typing-form");
// const chatList = document.querySelector(".chat-list");

// let userMessage = null;

// // API Configuration
// const API_KEY = "AIzaSyD1VuZWEHUIjUoirnirkmcTybeaghjnbvg"; // Replace with your actual API key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

// // Create a new message element and return it
// const createMessageElement = (content, ...classes) => {
//     const div = document.createElement("div");
//     div.classList.add("message", ...classes);
//     div.innerHTML = content;
//     return div;
// };

// const generateAPIResponse = async (incomingMessageDiv) => {
//     const textElement = incomingMessageDiv.querySelector(".text"); // Get text element

//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [
//                             {
//                                 text: userMessage, // Pass user input here
//                             },
//                         ],
//                     },
//                 ],
//             }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Error details:", errorData);
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const apiResponse = data?.candidates[0]?.content?.parts[0]?.text || "I'm sorry, I couldn't process that.";
//         textElement.innerText = apiResponse;
//         console.log(apiResponse);

//         const loadingElement = chatList.querySelector(".loading");
//         if (loadingElement) {
//             chatList.removeChild(loadingElement);
//         }

//         // Append the API response to the chat
//         const html = `<div class="message-content">
//                         <img src="gemini.svg" alt="Gemini Image" class="avatar">
//                         <p class="text">${apiResponse}</p>
//                       </div>
//                       <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
//         const incomingMessageDivNew = createMessageElement(html, "incoming");
//         chatList.appendChild(incomingMessageDivNew);
//         chatList.scrollTop = chatList.scrollHeight; // Scroll to the latest message
//     } catch (error) {
//         console.error("Error fetching API response:", error);
//         alert("An error occurred while processing your request. Please check the console for more details.");
//     } finally {
//         incomingMessageDiv.classList.remove("loading");
//     }
// };

// // Show a loading animation while waiting for the API response
// const showLoadingAnimation = () => {
//     const html = `<div class="message-content">
//                 <img src="gemini.svg" alt="Gemini Image" class="avatar">
//                 <p class="text"></p>
//                 <div class="loading-indicator">
//                     <div class="loading-bar"></div>
//                     <div class="loading-bar"></div>
//                     <div class="loading-bar"></div>
//                 </div>
//             </div>
//             <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
//     const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
//     chatList.appendChild(incomingMessageDiv);

//     generateAPIResponse(incomingMessageDiv);
// };

// // Copy message text to the clipboard
// const copyMessage = (copyIcon) => {
//     const messageText = copyIcon.parentElement.querySelector(".text").innerText;
//     navigator.clipboard.writeText(messageText).then(() => {
//         copyIcon.innerText = "done"; // Show tick icon
//         setTimeout(() => (copyIcon.innerText = "content_copy"), 1000); // Revert icon after 1 second
//     }).catch(err => console.error("Failed to copy text: ", err));
// };

// // Send outgoing chat messages
// const handleOutgoingChat = () => {
//     userMessage = typingForm.querySelector(".typing-input").value.trim();
//     if (!userMessage) return;

//     const html = `<div class="message-content">
//                 <img src="user.jpg" alt="User Image" class="avatar">
//                 <p class="text"></p>
//             </div>`;
//     const outgoingMessageDiv = createMessageElement(html, "outgoing");
//     outgoingMessageDiv.querySelector(".text").innerText = userMessage;
//     chatList.appendChild(outgoingMessageDiv);
//     typingForm.reset(); // Clear input field
//     setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
// };

// // Prevent default form submission and handle outgoing chat
// typingForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     handleOutgoingChat();
// });

//Own API Code
const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;

// API Configuration
const API_URL = `http://127.0.0.1:8000/ask/`;

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Generate API response
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userMessage }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const apiResponse = data.response || "I'm sorry, I couldn't process that.";
        textElement.innerText = apiResponse;

        // Remove loading animation and append API response
        const loadingElement = chatList.querySelector(".loading");
        if (loadingElement) {
            chatList.removeChild(loadingElement);
        }

        const html = `<div class="message-content">
                        <img src="https://pbs.twimg.com/profile_images/1772331192085274624/PlbkwMwX_400x400.png" alt="Bot Image" class="avatar">
                        <p class="text">${apiResponse}</p>
                      </div>
                      <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
        const incomingMessageDivNew = createMessageElement(html, "incoming");
        chatList.appendChild(incomingMessageDivNew);
        chatList.scrollTop = chatList.scrollHeight;
    } catch (error) {
        console.error("Error fetching API response:", error);
        alert("An error occurred while processing your request. Please check the console for more details.");
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
};

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                <img src="https://pbs.twimg.com/profile_images/1772331192085274624/PlbkwMwX_400x400.png" alt="Loading Image" class="avatar">
                <p class="text"></p>
                <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
            </div>
            <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    generateAPIResponse(incomingMessageDiv);
};

// Copy message text to the clipboard
const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;
    navigator.clipboard
        .writeText(messageText)
        .then(() => {
            copyIcon.innerText = "done";
            setTimeout(() => (copyIcon.innerText = "content_copy"), 1000);
        })
        .catch((err) => console.error("Failed to copy text: ", err));
};

// Send outgoing chat messages
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if (!userMessage) return;

    const html = `<div class="message-content">
                <img src="user.jpg" alt="User Image" class="avatar">
                <p class="text"></p>
            </div>`;
    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);
    typingForm.reset();
    setTimeout(showLoadingAnimation, 500);
};

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});






