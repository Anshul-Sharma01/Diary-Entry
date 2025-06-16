import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// If using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point to root .env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const algorithm = "aes-256-cbc";
const ivLength = 16;

// Convert any secret key string into a secure 32-byte Buffer using SHA-256
const rawKey = process.env.DIARY_ENCRYPTION_KEY;
const secretKey = crypto.createHash("sha256").update(rawKey).digest(); // 32-byte Buffer

export function encrypt(text) {
    if (typeof text !== "string") {
        throw new TypeError("Encryption input must be a string");
    }

    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(text) {
    if (!text || typeof text !== "string" || !text.includes(":")) {
        throw new TypeError("Invalid encrypted string format");
    }

    const [ivHex, encryptedData] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
