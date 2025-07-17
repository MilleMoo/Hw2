document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dropForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const subject = document.getElementById("subject");
    const errMsg = document.getElementById("error");
    const confirm = document.getElementById("confirm"); 

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        [username, email, password, subject, confirm].forEach(el => el?.classList.remove("is-invalid"));
        errMsg.innerHTML = "";

        let errList = [];

        if (username.value.trim() === "") {
            errList.push("กรุณากรอก Username");
            username.classList.add("is-invalid");
        }

        if (email.value.trim() === "") {
            errList.push("กรุณากรอก Email");
            email.classList.add("is-invalid");
        } else if (!validateEmail(email.value)) {
            errList.push("รูปแบบอีเมลไม่ถูกต้อง");
            email.classList.add("is-invalid");
        }

        if (password.value.trim() === "") {
            errList.push("กรุณากรอกรหัสผ่าน");
            password.classList.add("is-invalid");
        } else if (password.value.length < 6) {
            errList.push("รหัสผ่านควรยาวอย่างน้อย 6 ตัว");
            password.classList.add("is-invalid");
        } else if (!validatePassword(password.value)) {
            errList.push("รหัสผ่านใช้ได้เฉพาะ A-Z, a-z และ 0-9 เท่านั้น");
            password.classList.add("is-invalid");
        }

        if (subject.value === "") {
            errList.push("กรุณาเลือกรายวิชา");
            subject.classList.add("is-invalid");
        }

        if (!confirm?.checked) {
            errList.push("กรุณายืนยันว่าคุณเข้าใจเงื่อนไข");
            confirm?.classList.add("is-invalid");
        }

        if (errList.length > 0) {
            errMsg.innerHTML = errList.join("<br>");
        } else {
            alert("ถอนรายวิชา Web Service สำเร็จ");
            form.submit();
        }
    });

    function validatePassword(password) {
        const reg = /^[a-zA-Z0-9]+$/;
        return reg.test(password);
    }

    function validateEmail(email) {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(email);
    }
});
