
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Send message on button click
  sendBtn.addEventListener("click", sendMessage);

  // Send message on Enter key
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";

    setTimeout(() => {
      const botReply = getBotResponse(message.toLowerCase());
      addMessage(botReply, "bot");
    }, 500);
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className =
      sender === "user"
        ? "message-user-message"
        : "message-bot-message";
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getBotResponse(input) {

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! 👋 Welcome to LoanMaster. How can I assist you today?";
    }

    if (input.includes("loan types")) {
      return "We offer Personal Loans, Emergency Loans and Salary Loans.";
    }

    if (input.includes("interest")) {
      return "Our interest rates range from 7% to 15% depending on the loan type and eligibility.";
    }

    if (input.includes("eligibility")) {
      return "Eligibility depends on your age (18+), income, employment status, and credit history.";
    }

    if (input.includes("documents")) {
      return "You typically need an ID, proof of income, bank statements, and proof of address.";
    }

    if (input.includes("repayment")) {
      return "Repayment periods range from 6 months to 5 years, depending on your loan type.";
    }

    if (input.includes("apply")) {
      return "You can apply online by filling out our application form. Would you like the steps?";
    }

    if (input.includes("contact")) {
      return "You can contact our support team at support@loanmaster.com or call 0800‑123‑456.";
    }

    return "I'm not sure I understood that 🤔. Please ask about loan types, interest rates, eligibility, or repayment.";
  }