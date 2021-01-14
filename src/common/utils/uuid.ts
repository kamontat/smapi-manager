const lowerAlphabets = "abcdefghijklmnopqrstuvwxyz".split("");
const upperAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numberic = "0123456789".split("");

const all = lowerAlphabets.concat(upperAlphabets, numberic);

export const uuid = (digit = 6): string => {
  let result = "";
  for (let i = 0; i < digit; i++) {
    const rand = Math.floor(Math.random() * all.length);
    result += all[rand];
  }

  return result;
};
