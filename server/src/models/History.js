import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      default: null,
    },

    // upload -> document uploaded
    // analysis -> first AI analysis completed
    // reanalysis -> document analyzed again
    // report_view -> user opened a report's detail page
    // download -> user downloaded a report/contract
    // delete -> document deleted
    type: {
      type: String,
      enum: [
        "upload",
        "analysis",
        "reanalysis",
        "report_view",
        "download",
        "delete",
      ],
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);

export default History;
