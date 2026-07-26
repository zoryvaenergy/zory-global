export function validateRegistration(data) {

    const fullName = data.fullName?.trim();
    const mobile = data.mobile?.trim();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    // Full Name
    if (!fullName) {
        throw new Error("Full Name is required");
    }

    // Mobile
    if (!mobile) {
        throw new Error("Mobile Number is required");
    }

    // Password
    if (!password) {
        throw new Error("Password is required");
    }

    // Confirm Password
    if (!confirmPassword) {
        throw new Error("Confirm Password is required");
    }

    // Password Match
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    return true;
}