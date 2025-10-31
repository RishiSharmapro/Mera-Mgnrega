import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    state_code: {
        type: String,
        required: true,
        unique: true,
    },
    fin_year: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        english: {
            goodPoints: { type: [String] },
            canBeBetter: { type: [String] },
            needsImprovement: { type: [String] }
        },
        hindi: {    
            goodPoints: { type: [String] },
            canBeBetter: { type: [String] },
            needsImprovement: { type: [String] }
        }
    }
}, { timestamps: true });

export const Summary = mongoose.model("Summary", summarySchema);