const CreditCardLengthsLimit = ["0000", "00", "", "0000"].map(
  (value) => value.length
);
const EasyCardLengthsLimit = ["0000", "0000", "0000", "0000"].map(
  (value) => value.length
);
let cards = [];

// Save cards to Chrome storage
const saveOptions = () => {
  chrome.storage.sync.set({ cards: cards }, (error) => {
    if (error) {
      console.error("Error saving cards:", error);
      // Optional: Show error message to user
      showNotification("Failed to save cards", "error");
    } else {
      console.log("Cards saved successfully");
      // Optional: Show success message
      showNotification("Cards saved successfully", "success");
    }
  });
};

// Restore cards from Chrome storage when page loads
const restoreOptions = () => {
  chrome.storage.sync.get("cards", (result) => {
    cards = result.cards || [];
    renderCards(); // Render existing cards
  });
};

// Optional: Notification function
const showNotification = (message, type) => {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification", type);
  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
};

// Function to render all cards
function renderCards() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; // Clear existing cards

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card-container";

    cardElement.innerHTML = `
                <div class="card-header">
                    <input 
                        type="text" 
                        value="${card.Name}" 
                        placeholder="Card Name"
                        data-card-name="${index}"
                        class="card-name-input"
                    >
                    <button class="remove-card-btn" data-index="${index}">Remove Card</button>
                </div>
                
                <div class="input-group">
                    <label>Credit Card Numbers</label>
                    <div class="card-numbers">
                        ${card.CreditCard.map(
                          (num, numIndex) => `
                            <input 
                                type="text" 
                                value="${num}" 
                                maxlength="${CreditCardLengthsLimit[numIndex]}"
                                ${
                                  CreditCardLengthsLimit[numIndex] === 0
                                    ? "disabled"
                                    : ""
                                }
                                placeholder="length ${
                                  CreditCardLengthsLimit[numIndex]
                                }"
                                data-card-index="${index}" 
                                data-credit-index="${numIndex}"
                                class="credit-card-input"
                            >
                        `
                        ).join("")}
                    </div>
                </div>
                
                <div class="input-group">
                    <label>Easy Card Numbers</label>
                    <div class="card-numbers">
                        ${card.EasyCard.map(
                          (num, numIndex) => `
                            <input 
                                type="text" 
                                value="${num}" 
                                maxlength="${EasyCardLengthsLimit[numIndex]}"
                                placeholder="length ${EasyCardLengthsLimit[numIndex]}"
                                data-card-index="${index}" 
                                data-easy-index="${numIndex}"
                                class="easy-card-input"
                            >
                        `
                        ).join("")}
                    </div>
                </div>
            `;

    container.appendChild(cardElement);
  });

  // Add event listeners
  addEventListeners();
}

// Add event listeners for inputs and buttons
function addEventListeners() {
  // Card name changes
  document.querySelectorAll(".card-name-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const cardIndex = e.target.dataset.cardName;
      cards[cardIndex].Name = e.target.value;
    });
  });

  // Credit card number changes
  document.querySelectorAll(".credit-card-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const cardIndex = e.target.dataset.cardIndex;
      const numberIndex = e.target.dataset.creditIndex;
      cards[cardIndex].CreditCard[numberIndex] = e.target.value;
    });
  });

  // Easy card number changes
  document.querySelectorAll(".easy-card-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const cardIndex = e.target.dataset.cardIndex;
      const numberIndex = e.target.dataset.easyIndex;
      cards[cardIndex].EasyCard[numberIndex] = e.target.value;
    });
  });

  // Remove card buttons
  document.querySelectorAll(".remove-card-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cards.splice(index, 1);
      renderCards();
    });
  });

  // Add new card button
  document.getElementById("addCardBtn").addEventListener("click", () => {
    cards.push({
      Name: `Card ${cards.length + 1}`,
      CreditCard: ["", "", "", ""],
      EasyCard: ["", "", "", ""],
    });
    renderCards();
  });

  document.getElementById("saveBtn").addEventListener("click", saveOptions);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
