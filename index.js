require('dotenv').config();

const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");



const { GoogleGenerativeAI } = require("@google/generative-ai");


const apiKey = process.env.API_KEY;
const genAi = new GoogleGenerativeAI(apiKey);

let userMassage;
let chatInputHeight = chatInput.scrollHeight;
const generatResponse = async (incomingChat) => {

    let messageContent = incomingChat.querySelector("p");



    const model = await genAi.getGenerativeModel({ model: "gemini-pro" });


    let result = model.generateContent(userMassage);

    let response = (await result).response;

    let text = response.text();

    messageContent.textContent = text;
    chatBox.scrollTo(0, chatBox.scrollHeight+10);








}

const creaChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = (className === "outgoing") ? `<p> </p>` : ` <span class="material-symbols-outlined"><img src="./chatbot.png" alt="" style="height: 32px; width: 32px;"></span> <p></p>`

    chatLi.innerHTML = chatContent;

    chatLi.querySelector("p").textContent = message;

    return chatLi;
}



const handleChat = () => {

    userMassage = chatInput.value;

    (!userMassage) ? null : chatBox.appendChild(creaChatLi(userMassage, "outgoing"));

    chatInput.value = "";

    heightResizerInput();


    chatBox.scrollTo(0, chatBox.scrollHeight);
    setTimeout(() => {

        const incomingChat = creaChatLi("thinking..", "incoming");

        chatBox.appendChild(incomingChat);



        generatResponse(incomingChat);





    }, 600)





}


sendBtn.addEventListener("click", handleChat);
const heightResizerInput = () => {

    chatInput.style.height = `${chatInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    chatInput.scrollTo(0, chatInput.scrollHeight);
}

chatInput.addEventListener("input", () => {
    heightResizerInput();
})


chatInput.addEventListener("keydown", (e) => {

    if(e.key=="Enter"  && !e.shiftkey ){
        e.preventDefault();
        handleChat();
    }
})