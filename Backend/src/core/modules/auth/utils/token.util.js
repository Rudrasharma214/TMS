import jwt from 'jsonwebtoken';
import env from '../../../../config/env.js';

export const generateToken = (payload) => {
  const tokenPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    profilePic: payload.profilePic,
    isVerified: payload.isVerified,
  };
  return jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN });
}

export const generateRefreshToken = (payload) => {
  const tokenPayload = {  
    id: payload.id,
    email: payload.email,
    role: payload.role,
    profilePic: payload.profilePic,
    isVerified: payload.isVerified,
  };
  return jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export const generateEmailVerifyToken = ({ id, type }) => {
  return jwt.sign(
    {
      userId: id,
      type: type,
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

export const verifyPasswordToken = (token) => {
  const payload = jwt.verify(token, env.EMAIL_VERIFY_SECRET);

  if (payload.type !== 'password_reset') {
    throw new Error('Invalid token type');
  }

  return payload.userId;
};
