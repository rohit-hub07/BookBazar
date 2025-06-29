import { getCurrUser } from "../middleware/getCurrUser.js";
import Books from "../model/book.model.js";
import Review from "../model/review.model.js";
import User from "../model/user.model.js";

export const deleteReviewController = async (req, res) => {
  const { id } = req.params;
  try {
    // await Books.findByIdAndDelete(id,{$pull: {review: id}})

    //Only the user who has created the review can delete it and the admin
    const loggedInUserId = await getCurrUser(req.userId);
    const review = await Review.findById({ _id: id });
    if (!review) {
      return res.status(404).json({
        message: "Review doesn't exist!",
        success: false,
      });
    }

    if (loggedInUserId._id.toString() !== review.user._id.toString()) {
      return res.status(403).json({
        message: "You can not delete other's review!",
        success: false,
      });
    }

    await Books.findByIdAndUpdate(
      { _id: review.book },
      { $pull: { review: id } }
    );
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
