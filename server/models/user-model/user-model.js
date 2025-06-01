const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: 1,
      maxLength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "E-mail is required"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [4, "At least 4 symbols requred"],
      trim: true,
    },

    avatar: {
      type: String,
      default:
        "https://images.mubicdn.net/images/cast_member/332867/cache-209837-1489990521/image-w856.jpg?size=800x",
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  if (password?.trim()?.length < 4) {
    throw new Error("Password must contain 4 symbols at least");
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
};

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setUniqueUserName = function (username) {
  this.username =
    username.split(" ").join("").toLowerCase() +
    Math.random().toString(36).slice(-3);
};

const User = model("User", userSchema);

module.exports = User;
