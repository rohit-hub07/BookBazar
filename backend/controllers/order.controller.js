import { getCurrUser } from "../middleware/getCurrUser.js";
import Books from "../model/book.model.js";
import Orders from "../model/order.model.js";

export const placeOrdersController = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const book = await Books.findById({ _id: id });
    if (!book) {
      return res.status(404).json({
        message: "Book doesn't exist!",
        success: false,
      });
    }

    console.log("Book details inside order: ", book);
    const loggedInUser = await getCurrUser(req.userId);
    console.log("LoggedInuser: ", loggedInUser);
    const order = await Orders.create({
      bookDetail: book,
      user: loggedInUser,
      quantity,
    });
    if (!order) {
      return res.status(500).json({
        message: "Something went wrong!",
        success: false,
      });
    }

    console.log("Placed order: ", order);

    res.status(200).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log("Error while ordering", error);
    return res.status(500).json({
      success: false,
      message: "Error while ordering!",
    });
  }
};

export const allOrdersController = async (req, res) => {
  const allOrders = await Orders.find({})
    .populate({ path: "user", select: "-password" })
    .populate("bookDetail");
  try {
    if (!allOrders) {
      return res.status(404).json({
        message: "No order available!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      allOrders,
    });
  } catch (error) {
    console.log("Error while fetching orders", error);
    return res.status(404).json({
      message: "No order available!",
      success: false,
    });
  }
};

export const getOrderDetailsController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).json({
        message: "Order doesn't exist!",
        success: false,
      });
    }
    const orderDetails = await Orders.findById({ _id: id }).populate({path: "user", select: "-password"}).populate("bookDetail");
    if (!orderDetails) {
      return res.status(401).json({
        message: "Order doesn't exist!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Order detail fetched successfully",
      success: true,
      orderDetails,
    });
  } catch (error) {
    console.log("Error getting the order details", error);
    return res.status(500).json({
      message: "Error getting the order details",
      success: false,
    });
  }
};
