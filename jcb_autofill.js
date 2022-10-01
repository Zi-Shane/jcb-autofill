// accept checkbox
// accept_checkbox = document.getElementById('accept')
// accept_checkbox.checked = true

let CreditCard = ["1111", "22", "", "4444"]
let EasyCard = ["1111", "2222", "3333", "4444"]

// Fill up creditCard
creditcard_txt = document.getElementById("txtCreditCard1")
creditcard_txt.value = CreditCard[0]

creditcard_txt = document.getElementById("txtCreditCard2")
creditcard_txt.value = CreditCard[1]

creditcard_txt = document.getElementById("txtCreditCard4")
creditcard_txt.value = CreditCard[3]

// Fill up EasyCard
easycard_txt = document.getElementById("txtEasyCard1")
easycard_txt.value = EasyCard[0]

easycard_txt = document.getElementById("txtEasyCard2")
easycard_txt.value = EasyCard[1]

easycard_txt = document.getElementById("txtEasyCard3")
easycard_txt.value = EasyCard[2]

easycard_txt = document.getElementById("txtEasyCard4")
easycard_txt.value = EasyCard[3]

// Send
send_button = document.getElementById("send")
send_button.click()
