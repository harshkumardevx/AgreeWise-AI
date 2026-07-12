import History from "../models/History.js";

function formatTime(date) {
  const d = new Date(date);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();

  const timeStr = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Today • ${timeStr}`;
  if (isYesterday) return `Yesterday • ${timeStr}`;

  return `${d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })} • ${timeStr}`;
}

// GET /api/history
export const getUserHistory = async (req, res) => {
  try {
    const activities = await History.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities: activities.map((a) => ({
        id: a._id,
        type: a.type,
        fileName: a.fileName,
        description: a.description,
        time: formatTime(a.createdAt),
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/history
export const clearUserHistory = async (req, res) => {
  try {
    await History.deleteMany({ user: req.user._id });

    return res.status(200).json({
      success: true,
      message: "History cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
