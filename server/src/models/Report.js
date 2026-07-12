import mongoose from "mongoose";

const clauseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    risk: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    description: { type: String, required: true },
  },
  { _id: true }
);

const recommendationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: true }
);

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    clauses: [clauseSchema],

    recommendations: [recommendationSchema],

    // Which AnalysisOptions the user selected when this report was
    // generated (summary/risk/recommendation/highlight).
    analysisOptions: {
      type: [String],
      default: [],
    },

    // AI model used, useful for debugging / re-analysis comparisons.
    model: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
