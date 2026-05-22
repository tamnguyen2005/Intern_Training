export const formChecklist = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  phone: false,
};
export const Submit = (e) => {
  e.preventDefault();
  alert("Hello World");
};
export const validators = {
  name: (v) => v.trim().length > 0,
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(v);
  },
  phone: (v) => {
    const phoneRegex = /^(0[35789])[0-9]{8}$/;
    return phoneRegex.test(v);
  },
  password: (v, meter, text) => {
    let score = checkPassword(v);
    updatePasswordStrength(score, meter, text);
    return score === 4;
  },
  confirmn: (v, password) => password.value === v,
};
export function validateField(
  inputElement,
  errorElement,
  validatorFunction,
  errorMessage,
  extraParams = {},
) {
  inputElement.addEventListener("blur", () => {
    const isValid = validatorFunction(
      inputElement.value,
      extraParams.param1,
      extraParams.param2,
    );
    if (!isValid) {
      errorElement.textContent = errorMessage;
      formChecklist[inputElement.id] = false;
    }
    checkFormValidity(extraParams.btn);
  });
  inputElement.addEventListener("input", () => {
    const isValid = validatorFunction(
      inputElement.value,
      extraParams.param1,
      extraParams.param2,
    );
    if (isValid) {
      errorElement.textContent = "";
      formChecklist[inputElement.id] = true;
    } else {
      errorElement.textContent = errorMessage;
      formChecklist[inputElement.id] = false;
    }
    checkFormValidity(extraParams.btn);
    if (inputElement.id == "password") {
      if (extraParams.confirm.value.length > 0)
        extraParams.confirm.dispatchEvent(new Event("input"));
    }
  });
}
export const checkPassword = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};
export const updatePasswordStrength = (score, meter, text) => {
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
export const checkFormValidity = (btn) => {
  const isValid = Object.values(formChecklist).every((v) => v === true);
  if (isValid) btn.disabled = false;
  else btn.disabled = true;
};
