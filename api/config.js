
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

module.exports = {
    IS_OFFLINE:process.env.NODE_ENV !== 'production',
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_USERNAME:process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
    TOP_LIMIT:process.env.TOP_LIMIT,
    MONGO_URL:process.env.MONGO_URL,
    MONGO_USER:process.env.MONGO_USER,
    MONGO_PASS:process.env.MONGO_PASS,
    USER_TABLE:process.env.USER_TABLE,
    SENDGRID_API_KEY:process.env.SENDGRID_API_KEY
}