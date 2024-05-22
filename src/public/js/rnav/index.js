console.log('nav/index.js');
const navLinks = document.querySelector('.nav-links');
const salchi = () => {
  console.log('addEvent');
  navLinks?.classList.toggle('top-[15%]');
};
