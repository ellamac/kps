export const createUserID = () => {
  let id = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const lettersLength = letters.length;
  const numbersLength = numbers.length;
  let counter = 0;
  while (counter < 3) {
    id += letters.charAt(Math.floor(Math.random() * lettersLength));
    counter += 1;
  }
  counter = 0;
  while (counter < 3) {
    id += numbers.charAt(Math.floor(Math.random() * numbersLength));
    counter += 1;
  }
  return id;
};
