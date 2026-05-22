import {
  Submit,
  checkFormValidity,
  checkPassword,
  formChecklist,
  updatePasswordStrength,
  validateField,
  validators,
} from "./function.js";
const form = document.getElementById("form");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const name = document.getElementById("name");
const nameError = document.getElementById("name-error");
const phone = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const confirmm = document.getElementById("confirm");
const confirmError = document.getElementById("confirm-error");
const meter = document.getElementById("strength-meter");
const text = document.getElementById("strength-text");
const btn = document.getElementById("confirm-btn");
form.onsubmit = (e) => Submit(e);
validateField(
  email,
  emailError,
  validators.email,
  "Email không đúng định dạng",
  {
    btn: btn,
  },
);
validateField(name, nameError, validators.name, "Tên không được để trống!", {
  btn: btn,
});
validateField(
  phone,
  phoneError,
  validators.phone,
  "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0",
  {
    btn: btn,
  },
);
validateField(password, passwordError, validators.password, "", {
  btn: btn,
  param1: meter,
  param2: text,
  confirm: confirmm,
});
validateField(
  confirmm,
  confirmError,
  validators.confirmn,
  "Confirm không hợp lệ",
  {
    btn: btn,
    param1: password,
  },
);
