import User from "../model/user.model.js";

export const getCurrUser = async (userId) => {

  const currUser = await User.findById({_id: userId});
  if(!currUser){
    return null;
  }
  console.log("Current User: ", currUser);
  return currUser;
}
