import express from "express";
import {
    addDiaryEntry,
    getAllDiaryEntries,
    getDiaryEntryById,
    updateDiaryEntry,
    deleteDiaryEntry
} from "../controllers/entry.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(verifyAuth);

router.post("/entries",  addDiaryEntry);
router.get("/entries",  getAllDiaryEntries);
router.get("/entries/:id",  getDiaryEntryById);
router.put("/entries/:id",  updateDiaryEntry);
router.delete("/entries/:id",  deleteDiaryEntry);

export default router;
