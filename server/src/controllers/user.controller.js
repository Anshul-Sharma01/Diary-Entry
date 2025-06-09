import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerAccount = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }
    const user = await User.create({ username, email, password });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(201).json(new ApiResponse(201, {
        user: { _id: user._id, username: user.username, email: user.email },
        accessToken,
        refreshToken
    }, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(200).json(new ApiResponse(200, {
        user: { _id: user._id, username: user.username, email: user.email },
        accessToken,
        refreshToken
    }, "Login successful"));
});

export { registerAccount, login };
