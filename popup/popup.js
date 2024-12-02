async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
}

// get option index
function getSelectedOption() {
  const listItem = document.querySelector(".radio-list li.selected");
  const radioButton = listItem.querySelector('input[type="radio"]');
  return radioButton.value;
}

async function sendValueToContentScript() {
  const option = getSelectedOption();
  let index = parseInt(option);

  const tab = await getActiveTab();
  chrome.tabs.sendMessage(tab.id, {
    action: "fillTextbox",
    credNo: cards[index].CreditCard,
    easyNo: cards[index].EasyCard,
  });
}

function handleOptionClick(e) {
  // Find the closest li element
  const listItem = e.target.closest("li");

  if (listItem) {
    // Remove selected class from all items
    document.querySelectorAll(".radio-list li").forEach((item) => {
      item.classList.remove("selected");
    });

    // Add selected class to clicked item
    listItem.classList.add("selected");

    // Select the radio button (click <li>)
    const radioButton = listItem.querySelector('input[type="radio"]');
    radioButton.checked = true;
  }
}

function openSettingsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
}

function renderCards() {
  chrome.storage.sync.get("cards", (result) => {
    cards = result.cards || [];
    appendCardList(cards, document.getElementById("optionList"));
  });
}

function appendCardList(cards, parent) {
  console.log("appendCardList", cards);
  cards.forEach((card, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = `option${index}`;
    input.name = "singleOption";
    input.value = index;

    const label = document.createElement("label");
    label.htmlFor = `option${index}`;
    label.textContent = card.Name;

    li.appendChild(input);
    li.appendChild(label);
    parent.appendChild(li);
  });
}

function addEventListeners() {
  document
    .getElementById("fillButton")
    .addEventListener("click", sendValueToContentScript);

  document
    .querySelector("#go-to-options")
    .addEventListener("click", openSettingsPage);

  document
    .getElementById("optionList")
    .addEventListener("click", (e) => handleOptionClick(e));
}

document.addEventListener("DOMContentLoaded", renderCards);
addEventListeners();
