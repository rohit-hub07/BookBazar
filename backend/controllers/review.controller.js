import Books from "../model/book.model.js";
import Review from "../model/review.model.js";

export const deleteReviewController = async (req, res) => {
  const { id } = req.params;
  try {
    // await Books.findByIdAndDelete(id,{$pull: {review: id}})
    const deletedReview = await Review.findByIdAndDelete({ _id: id });
    if (!deletedReview) {
      return res.status(404).json({
        message: "Review doesn't exist!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Review deleted successfully",
      success: true,
      deletedReview,
    });
  } catch (error) {
    console.log("Error deleting the review", error);
    return res.status(404).json({
      message: "Error deleting the review!",
      success: false,
    });
  }
};