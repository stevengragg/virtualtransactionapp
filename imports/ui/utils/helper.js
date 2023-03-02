export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const isStrongPassword = (password) => {
  if (!password) return false;
  const minLength = 8;
  const maxLength = 30;
  const minLowerCase = 1;
  const minUpperCase = 1;
  const minNumbers = 1;
  const minSymbols = 1;
  const symbols = /[$-/:-?{-~!"^_`\[\]]/g;

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (
    !password.match(/[a-z]/g) ||
    password.match(/[a-z]/g).length < minLowerCase
  ) {
    return false;
  }

  if (
    !password.match(/[A-Z]/g) ||
    password.match(/[A-Z]/g).length < minUpperCase
  ) {
    return false;
  }

  if (!password.match(/\d/g) || password.match(/\d/g).length < minNumbers) {
    return false;
  }

  if (!password.match(symbols) || password.match(symbols).length < minSymbols) {
    return false;
  }

  return true;
};
