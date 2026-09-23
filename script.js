//değişken tanımlamalarım //
const studentId = document.getElementById('studentId');
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const feedbackText = document.getElementById('feedbackText');
const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');


//kullanıcı numarasını yazmaya başladığında çalışır
studentId.addEventListener('input', () => {
    // eğer numara kutusunda yazı varsa
    if (studentId.value.trim().length > 0) {
        // şifre kutusunun kilidini açar ve karakter yazılabilir
        passwordInput.disabled = false;
        document.getElementById('inputHint').style.display = 'none';
    } else {
        passwordInput.disabled = true;
        location.reload(); // kutu boşaltılırsa sayfayı sıfırlar
    }
});

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;
    // istenilen tüm özellikler 
    const tests = {
        ruleLength: val.length >= 8, // 8 karakter ister
        ruleUpper: /[A-Z]/.test(val), // en az 1 büyük harf ister
        ruleLower: /[a-z]/.test(val), // en az 1 küçük harf ister
        ruleNumber: /[0-9]/.test(val), // en az 1 rakam ister 
        ruleSymbol: /[#\-_?\*]/.test(val) // en az 1 sembol ister tahmin edilmesi daha zor bir şifre oluşturmak için
    };
    //tekrarlayan kodları önlemek için döngüsel bir kontrol sağlar
    Object.keys(tests).forEach(id => {
        const el = document.getElementById(id);
        if (tests[id]) {
            el.classList.replace('invalid', 'valid');
            score++;
        } else {
            el.classList.replace('valid', 'invalid');
        }
    });


// şifrenin kriterlere uyup uymadığını kontrol eden if else if bloklarım
    strengthBar.className = 'bar';
    if (val.length === 0) {
        feedbackText.innerText = "Şifre Durumu: Bekleniyor"; // feedbacktext satırlarım şifre durumunu kullanıcıya anlık olarak bildiriyor
    } else if (score <= 2) {
        strengthBar.classList.add('bg-zayif');
        feedbackText.innerText = "Durum: Zayıf";
        submitBtn.disabled = true;
    } else if (score <= 4) {
        strengthBar.classList.add('bg-orta');
        feedbackText.innerText = "Durum: Orta";
        submitBtn.disabled = true;
    } else {
        strengthBar.classList.add('bg-guclu');
        feedbackText.innerText = "Durum: Güçlü (Harika bir şifre!)";
        submitBtn.disabled = false;
    }
});


// şifre gücü durumunu görsel olarak kullanıcıya renklerle gösteriyor
submitBtn.addEventListener('click', () => {
    successModal.classList.add('active');
});

modalCloseBtn.addEventListener('click', () => {
    location.reload(); 
});