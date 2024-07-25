import * as jwt from 'jsonwebtoken';

export function generateToken(user: any) {
  return jwt.sign({ id: user._id, email: user.email }, 'your_secret_key', {
    expiresIn: '1h',
  });
}
