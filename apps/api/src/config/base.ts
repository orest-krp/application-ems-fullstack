export default () => ({
  port: Number(process.env.PORT),
  database: {
    url: process.env.DATABASE_URL,
  },
  frontendUrl: process.env.FRONTEND_URL,
  ai_key: process.env.GROQ_API_KEY,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME,
    refreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    invitationToken: process.env.JWT_INVITATION,
  },
});
