let valid_email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

export default function isValidEmail(email) {

    return valid_email_pattern.test(email);
};