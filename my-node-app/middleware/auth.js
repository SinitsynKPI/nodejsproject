
exports.isAdmin = (req, res, next) => {
    const userRole = req.query.role; 
    if (userRole === 'admin') {
        next();
    } else {
        const err = new Error("Forbidden: Admins only.");
        err.status = 403;
        next(err);
    }
};