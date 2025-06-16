import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Entry } from "../models/entry.model.js";
import { encrypt, decrypt } from "../utils/encryption.js";

// Add a new diary entry
const addDiaryEntry = asyncHandler(async (req, res) => {
    const { content, date, mood } = req.body;

    if (!content && !date && !mood) {
        throw new ApiError(400, "All fields are mandatory");
    }

    const encryptedContent = encrypt(content);

    const entry = await Entry.create({ content : encryptedContent, date, mood });

    if (!entry) {
        throw new ApiError(400, "Error occurred, please try again");
    }

    entry.content = decrypt(entry.content);

    return res.status(201).json(
        new ApiResponse(201, entry, "Successfully added a new diary entry")
    );
});

// Get all diary entries
const getAllDiaryEntries = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalEntries = await Entry.countDocuments();
    const totalPages = Math.ceil(totalEntries / limit);

    const entries = await Entry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const decryptedEntries = entries.map(entry => ({
        ...entry._doc,
        content : decrypt(entry.content)
    }))

    return res.status(200).json(
        new ApiResponse(200, {
            entries : decryptedEntries,
            pagination: {
                totalEntries,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }, "Fetched paginated diary entries")
    );
});


// Get a single diary entry by ID
const getDiaryEntryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const entry = await Entry.findById(id);

    if (!entry) {
        throw new ApiError(404, "Diary entry not found");
    }
    entry.content = decrypt(entry.content);

    return res.status(200).json(
        new ApiResponse(200, entry, "Fetched diary entry by ID")
    );
});

// Update a diary entry by ID
const updateDiaryEntry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content, date, mood } = req.body;

    const updatedData = {
        ...(content && { content : encrypt(content) }),
        ...(date && {date}),
        ...(mood && { mood})
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true }
    );

    if (!updatedEntry) {
        throw new ApiError(404, "Diary entry not found or failed to update");
    }

    updatedEntry.content = decrypt(updatedEntry.content);


    return res.status(200).json(
        new ApiResponse(200, updatedEntry, "Diary entry updated successfully")
    );
});

// Delete a diary entry by ID
const deleteDiaryEntry = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedEntry = await Entry.findByIdAndDelete(id);

    if (!deletedEntry) {
        throw new ApiError(404, "Diary entry not found or failed to delete");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedEntry, "Diary entry deleted successfully")
    );
});

export {
    addDiaryEntry,
    getAllDiaryEntries,
    getDiaryEntryById,
    updateDiaryEntry,
    deleteDiaryEntry
};
