const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const passwordRepeatInput = document.querySelector('input[placeholder="Re-Enter Password"]');
const signUpButton = document.querySelector('button');
const UserInput = document.querySelector('input[type="text"]');

const emailRegex = /^\w+@gmail\.com$/;
// kiểm tra email có đúng định dạng không

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// kiểm tra password có đủ mạnh không, yêu cầu chữ thường, chữ hoa, số và ký tự đặc biệt, độ dài tối thiểu 8 ký tự

function checkUser() {
  if (UserInput.value.trim() === '') {
    document.getElementById('tbuser').innerHTML = 'Bắt buộc nhập user';
    document.getElementById('tbuser').classList.add('text-danger');
    UserInput.style.border = "2px solid red";
    return false;
  } else if (!/^[0-9a-zA-Z]{5,10}$/.test(UserInput.value.trim())) {
    document.getElementById('tbuser').innerHTML = 'User chỉ chứa kí tự và số, độ dài từ 5 đến 10 kí tự';
    document.getElementById('tbuser').classList.add('text-danger');
    UserInput.style.border = "2px solid red";
    return false;
  } else {
    document.getElementById('tbuser').innerHTML = '';
    return true;
  }
}
function checkEmail() {
  if (emailInput.value.trim() === '') {
    document.getElementById('tbmail').innerHTML = 'Bắt buộc nhập email';
    document.getElementById('tbmail').classList.add('text-danger');
    emailInput.style.border = "2px solid red";
    return false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    document.getElementById('tbmail').innerHTML = 'Email không đúng định dạng';
    document.getElementById('tbmail').classList.add('text-danger');
    emailInput.style.border = "2px solid red";
    return false;
  } else {
    document.getElementById('tbmail').innerHTML = '';
    return true;
  }
}

function checkPassword() {
  if (passwordInput.value.trim() === '') {
    document.getElementById('tbpass').innerHTML = 'Bắt buộc nhập mật khẩu';
    document.getElementById('tbpass').classList.add('text-danger');
    passwordInput.style.border = "2px solid red";
    return false;
  } else if (!passwordRegex.test(passwordInput.value.trim())) {
    document.getElementById('tbpass').innerHTML = 'Không hợp lệ';
    document.getElementById('tbpass').classList.add('text-danger');
    passwordInput.style.border = "2px solid red";
    return false;
  } else {
    document.getElementById('tbpass').innerHTML = '';
    return true;
  }
}

function checkPasswordRepeat() {
  if (passwordRepeatInput.value.trim() === '') {
    document.getElementById('tbpass-repeat').innerHTML = '* Bắt buộc nhập lại mật khẩu';
    document.getElementById('tbpass-repeat').classList.add('text-danger');
    passwordRepeatInput.style.border = "2px solid red";
    return false;
  } else if (passwordInput.value.trim() !== passwordRepeatInput.value.trim()) {
    document.getElementById('tbpass-repeat').innerHTML = '* Mật khẩu không trùng khớp';
    document.getElementById('tbpass-repeat').classList.add('text-danger');
    passwordRepeatInput.style.border = "2px solid red";
    return false;
  } else {
    document.getElementById('tbpass-repeat').innerHTML = '';
    return true;
  }
}

function handleSignUp() {
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkUser() && checkEmail() && checkPassword() && checkPasswordRepeat()) {

      // xử lý sự kiện thêm vào data
      let user = {
        user: UserInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        loged: '0'
      }
      localStorage.setItem('user_info', JSON.stringify(user))

      window.location.href = '../src/login.html';
    } else {
      console.log('Đăng kí không thành công');
    }
  });



}

handleSignUp();


