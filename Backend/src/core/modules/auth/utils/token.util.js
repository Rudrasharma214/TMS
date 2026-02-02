import jwt from 'jsonwebtoken';
import env from '../../../../config/env.js';

export const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN });
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

export const generateEmailVerifyToken = (newUser) => {
  return jwt.sign(
    {
      userId: newUser.id,
      type: 'email_verify',
    },
    env.EMAIL_VERIFY_SECRET,
    { expiresIn: '2h' }
  );
};

export const verifyEmailToken = (token) => {
  const payload = jwt.verify(token, env.EMAIL_VERIFY_SECRET);

  if (payload.type !== 'email_verify') {
    throw new Error('Invalid token type');
  }

  return payload.userId;
};
