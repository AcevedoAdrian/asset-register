import bcrypt from 'bcrypt';
const user = [
  {
    name: "adrian",
    email: "adrian@adrian.com",
    password: bcrypt.hashSync("adrian", 10),
    confirmed: 1,
  },
];

export default user;
