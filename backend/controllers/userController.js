
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, username, password, role, gender } = req.body;

        // Normalize role casing (assuming you want to store it as 'Teacher', 'Student', 'Institute')
        const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

        if (!fullName || !username || !password || !role || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePhoto = gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            role: normalizedRole, // Use normalized role
            profilePhoto,
            gender
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}