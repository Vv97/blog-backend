import bcyrpt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 5;
        const hash = bcyrpt.hash(password, saltRounds);
        return hash
    } catch (error) {
        console.log("Error while hasing password", error)
    }
};


export const comparePassword = async (password, hashedPassword) => {
    return await bcyrpt.compare(password, hashedPassword);
};


