import argon2 from "argon2";

export const hashPassword = async (password) => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

export const comparePassword = async (password, hash) => {
  return argon2.verify(hash, password);
};
