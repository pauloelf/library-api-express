export const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '3d',
  bcryptSaltRounds: 10,
}

if (!authConfig.jwtSecret) {
  throw new Error('JWT_SECRET is missing')
}
