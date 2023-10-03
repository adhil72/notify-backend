import bcrypt from 'bcryptjs';

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        if (!password || password == '') throw new Error("email already exists")
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw error;
    }
};

export { hashPassword, comparePassword };
