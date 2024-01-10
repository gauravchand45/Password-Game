const rules = [
    "Your password must conatin the length of your password",
    "Your password must contain the word 'password'",
    "The length of your password must be a prime number",
    "Password must contain one of the following affirmations: I am loved | I am worthy | I am enough",
    "Your password is not strong enough 🏋️‍♂️",
    "Password must include a month of the year",
    "Password must contain the full moon emoji",
    "Password must contain date in the format MMYYYY",
    "Password must not be a palindrome",
    "Password must contain a combination of letters, numbers, and special characters",
    "The digits in password must add upto 25",
    "Password must not contain common sequences (e.g., '123', 'abc')",
    "Password must contain at least two special characters",
    "Password must contain at least two uppercase letters",
    "Password must contain at least two numbers",
    "Password must be at least 8 characters",
    // Add more rules here...
];

const textarea = document.getElementById("pass");
const emsg = document.getElementById("emsg");
const counter = document.getElementById('counter');

pass.addEventListener('keyup', e => {
    textarea.style.height = "76px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;

});


textarea.addEventListener("keyup", function () {
    const characters = textarea.value.length;
    if (characters > 0) {
        counter.style.display = "block";
    }
    else {
        counter.style.display = "none";
    }
    counter.textContent = `${characters}`;



    const pass = document.getElementById("pass").value;
    const message = document.getElementById("emsg");

    let isValid = true;
    let errorMessage = "";


    rules.forEach((rule) => {
        if (!isValidPassword(pass, rule)) {
            isValid = false;
            errorMessage = rule;
        }
    });
    if (isValid) {
        message.style.color = "green";
        message.textContent = "✅ Congratulations! You've created a strong password.";

    } else {
        message.style.color = "black";
        message.textContent = `❌ ${errorMessage}`;
    }

    message.style.display = "block";
});

function isValidPassword(password, rule) {
    if (rule === "Password must be at least 8 characters") {
        return password.length >= 8;
    }
    else if (rule === "Password must contain at least two numbers") {
        return (password.match(/\d/g) || []).length >= 2;
    }
    else if (rule === "Password must contain at least two uppercase letters") {
        return (password.match(/[A-Z]/g) || []).length >= 2;
    }
    else if (rule === "Password must contain at least two special characters") {
        return (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g) || []).length >= 2;
    }
    else if (rule === "Password must not contain common sequences") {
        return !/(123|234|345|abc|bcd|cde)/i.test(password);
    }
    else if (rule === "Password must contain a combination of letters, numbers, and special characters") {
        return /[a-zA-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    }
    else if (rule === "Password must not be a palindrome") {
        const reversedPassword = password.split('').reverse().join('');
        return password !== reversedPassword;
    }
    else if (rule === "Password must contain date in the format MMYYYY") {
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;
        return password.includes(formattedDate);
    }
    else if (rule === "Password must contain the full moon emoji") {
        // Implement logic to fetch current moon phase or use a predefined sequence
        const currentMoonPhase = "🌕"; // Placeholder for the current moon phase emoji
        return password.includes(currentMoonPhase);
    }
    else if (rule === "The digits in password must add upto 25") {
        const digitRegex = /\d/g; // Regular expression to match digits
        const digitMatches = password.match(digitRegex);
        let sum = 0;

        if (digitMatches) {
            for (let i = 0; i < digitMatches.length; i++) {
                sum += parseInt(digitMatches[i]); // Convert each digit to a number and add to the sum
            }
            return sum == 25;
        }
    }
    else if (rule === "Password must include a month of the year") {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const regex = new RegExp(months.join('|'), 'gi');
        const matches = password.match(regex);

        if (matches && matches.length > 0) {
            // Displaying unique month names found in the text
            const uniqueMonths = Array.from(new Set(matches));
            return true;
        } else {
            return false;
        }
    }
    else if (rule === "Your password is not strong enough 🏋️‍♂️") {
        const regex = new RegExp("🏋️‍♂️", 'g');
        const occurrences = (password.match(regex) || []).length;
        return occurrences >= 5;
    }

    else if (rule === "Password must contain one of the following affirmations: I am loved | I am worthy | I am enough") {
        const affirmations = ['I am loved', 'I am worthy', 'I am enough'];
        let c = 0;
        for (let i = 0; i < affirmations.length; i++) {
            if (password.includes(affirmations[i])) {
                c = 1;
            }
        }
        if (c == 0) {
            return false;
        }
    }

    else if (rule === "The length of your password must be a prime number") {
        if (password.length <= 1) {
            return false;
        }
        for (let i = 2; i * i <= password.length; i++) {
            if (password.length % i === 0) {
                return false;
            }
        }
    }

    else if (rule === "Your Password must contain the word 'password'") {
        let c = 0;
        let regex = new RegExp("password", 'g'); // Using word boundary and case insensitive flag
        if (regex.test(password)) {
            c = 1;
        }
        if (c == 0) {
            return false;
        }
    }

    else if (rule === "Your password must conatin the length of your password") {
        let l = password.length;
        let c = 0;
        let regex = new RegExp(l, 'g');
        if (regex.test(password)) {
            c = 1;
        }
        if (c == 0) {
            return false;
        }
    }


    // Add more rule validations here...
    return true;
}
