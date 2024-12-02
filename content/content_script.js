const fillJcb = (CreditCard, EasyCard) => {
  // accept checkbox
  // accept_checkbox = document.getElementById('accept')
  // accept_checkbox.checked = true

  // Fill up creditCard
  let creditcard_txt1 = document.getElementById("txtCreditCard1");
  creditcard_txt1.value = CreditCard[0];

  let creditcard_txt2 = document.getElementById("txtCreditCard2");
  creditcard_txt2.value = CreditCard[1];

  let creditcard_txt3 = document.getElementById("txtCreditCard4");
  creditcard_txt3.value = CreditCard[3];

  // Fill up EasyCard
  let easycard_txt1 = document.getElementById("txtEasyCard1");
  easycard_txt1.value = EasyCard[0];

  let easycard_txt2 = document.getElementById("txtEasyCard2");
  easycard_txt2.value = EasyCard[1];

  let easycard_txt3 = document.getElementById("txtEasyCard3");
  easycard_txt3.value = EasyCard[2];

  let easycard_txt4 = document.getElementById("txtEasyCard4");
  easycard_txt4.value = EasyCard[3];

  // Send
  // send_button = document.getElementById("send")
  // send_button.click()
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillTextbox") {
    const success = fillJcb(request.credNo, request.easyNo);

    // Optional: Send response back to popup
    sendResponse({
      success: success,
      message: success ? "Text filled successfully" : "No suitable input found",
    });
  }
});
