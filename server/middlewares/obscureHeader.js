"use strict";

// Security: Avoids revealing technology used
const obscureHeader = (_, res, next) => {
	res.setHeader("Server", "Secure-Server");
	next();
};

module.exports = obscureHeader;