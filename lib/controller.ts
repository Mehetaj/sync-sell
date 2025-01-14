// import User from "@/model/user.model";
// import { connectToDatabase } from "./mongodb";


// // get all users
// export const getAllUser = async () => {
//   await connectToDatabase();
//   return User.find({});
// };

// // get user by Id
// export const getUserById = async (userId: string) => {
//   await connectToDatabase();
//   return User.findById(userId);
// };

// // post or save a user in MongoDB database
// export const postUser = async (userData: Object) => {
//   await connectToDatabase();
//   const newUser = new User({
//     ...userData,
//   });
//   return newUser.save();
// };

// // update user by Id
// export const updateUserById = async (userId: string, updateDoc: any) => {
//   await connectToDatabase();
//   return User.findOneAndUpdate({ _id: userId }, updateDoc);
// };

// // delete user by id
// export const deleteUserById = async (userId: string) => {
//   await connectToDatabase();
//   return User.deleteOne({ _id: userId });
// };

// // get user by email
// export const getUserByEmail = async (email: string) => {
//   await connectToDatabase();
//   return User.findOne({ email });
// };