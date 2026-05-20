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
const formChecklist = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  phone: false,
};
const Submit = (e) => {
  e.preventDefault();
  alert("Hello World");
};
form.onsubmit = (e) => Submit(e);
const validators = {
  name: (v) => v.trim().length > 0,
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(v);
  },
  phone: (v) => {
    const phoneRegex = /^(0[35789])[0-9]{8}$/;
    return phoneRegex.test(v);
  },
  password: (v) => {
    let score = checkPassword(v);
    updatePasswordStrength(score);
    return score === 4;
  },
  confirmn: (v) => password.value === v,
};
function validateField(
  inputElement,
  errorElement,
  validatorFunction,
  errorMessage,
) {
  inputElement.addEventListener("blur", () => {
    const isValid = validatorFunction(inputElement.value);
    if (!isValid) {
      errorElement.textContent = errorMessage;
      formChecklist[inputElement.id] = false;
    }
    checkFormValidity();
  });
  inputElement.addEventListener("input", () => {
    const isValid = validatorFunction(inputElement.value);
    if (isValid) {
      errorElement.textContent = "";
      formChecklist[inputElement.id] = true;
    } else {
      errorElement.textContent = errorMessage;
      formChecklist[inputElement.id] = false;
    }
    checkFormValidity();
    if (inputElement.id == "password") {
      if (confirmm.value.length > 0) confirmm.dispatchEvent(new Event("input"));
    }
  });
}
const checkFormValidity = () => {
  const isValid = Object.values(formChecklist).every((v) => v === true);
  if (isValid) btn.disabled = false;
  else btn.disabled = true;
};
validateField(
  email,
  emailError,
  validators.email,
  "Email không đúng định dạng",
);
validateField(name, nameError, validators.name, "Tên không được để trống!");
validateField(
  phone,
  phoneError,
  validators.phone,
  "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0",
);
validateField(password, passwordError, validators.password, "");
validateField(
  confirmm,
  confirmError,
  validators.confirmn,
  "Confirm không hợp lệ",
);

const checkPassword = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};
const updatePasswordStrength = (score) => {
  if (score === 4) {
    meter.style.width = "100%";
    meter.style.backgroundColor = "#2ecc71";
    text.textContent = "Mật khẩu mạnh";
  } else if (score >= 2) {
    meter.style.width = "60%";
    meter.style.backgroundColor = "#ffa500";
    text.textContent =
      "Mật khẩu trung bình (Cần thêm ký tự đặc biệt/chữ hoa/số)";
  } else {
    meter.style.width = "25%";
    meter.style.backgroundColor = "#ff4d4d";
    text.textContent = "Mật khẩu quá yếu";
  }
};
