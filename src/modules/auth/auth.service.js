//import { userModel } from "../../DB/model";
import { userModel } from "../../DB/model/user.model.js";

export const signup = async (inputs) => {
  const { name, email, password, role } = inputs;

  const existingUser = await userModel.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = userModel.build({ name, email, password, role });

  await user.save();

  return user;
};
