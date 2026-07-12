import History from "../models/History.js";

// Fire-and-forget style logger — activity logging should never break the
// primary request, so failures are caught and logged instead of thrown.
export const logActivity = async ({
  userId,
  documentId = null,
  type,
  fileName,
  description,
}) => {
  try {
    await History.create({
      user: userId,
      document: documentId,
      type,
      fileName,
      description,
    });
  } catch (error) {
    console.error("Failed to log activity:", error.message);
  }
};
