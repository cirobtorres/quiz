export const isValid = (text: string) => {
  return text.trim() === "";
};

export const randomizer = (max = 10, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomizeBackground = () => {
  return [
    "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(121,9,96,1) 35%, rgba(0,212,255,1) 100%)",
    "linear-gradient(29deg, rgba(255,63,131,1) 0%, rgba(254,229,127,1) 36%, rgba(164,229,250,1) 100%)",
    "linear-gradient(145deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
    "linear-gradient(75deg, rgba(176,221,21,1) 0%, rgba(133,243,247,1) 100%)",
  ].sort(() => randomizer() - 5);
};

export const dateFormater = (dateObj: Date) => {
  return `${dateObj.getDate()}/${("0" + (dateObj.getMonth() + 1)).slice(
    -2
  )}/${dateObj.getFullYear()}`;
};
