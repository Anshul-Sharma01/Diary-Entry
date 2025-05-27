import express from "express";
import {
    addDiaryEntry,
    getAllDiaryEntries,
    getDiaryEntryById,
    updateDiaryEntry,
    deleteDiaryEntry
} from "../controllers/entry.controller.js";

const router = express.Router();

router.post("/entries", addDiaryEntry);
router.get("/entries", getAllDiaryEntries);
router.get("/entries/:id", getDiaryEntryById);
router.put("/entries/:id", updateDiaryEntry);
router.delete("/entries/:id", deleteDiaryEntry);

export default router;
