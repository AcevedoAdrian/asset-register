import bcrypt from 'bcrypt';
const user = [
  {
    name: 'adrian',
    email: 'adrian@adrian.com',
    password: bcrypt.hashSync('adrian', 10),
    confirmed: true
  },
  {
    name: 'juan',
    email: 'juan@juan.com',
    password: bcrypt.hashSync('juan', 10),
    confirmed: true
  }
];

export default user;
