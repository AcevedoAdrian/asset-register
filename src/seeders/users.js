import bcrypt from "bcrypt";
const user = [
  {
    name: "adrian",
    email: "adrian@adrian.com",
    password: bcrypt.hashSync("adrian", 10),
    confirmed: true,
  },
];

export default user;
