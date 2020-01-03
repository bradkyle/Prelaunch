
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

module.exports = {
    IS_OFFLINE:process.env.NODE_ENV !== 'production',
    USER_TABLE:process.env.USER_TABLE,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
    TOP_LIMIT:process.env.TOP_LIMIT
}