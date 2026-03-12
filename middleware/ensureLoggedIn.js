module.exports = function ensuredLoggedIn(req, res, next){
    if(req.isAuthenticated && req.isAuthenticated()){
        return next();
    };

    return res.redirect("/login");
};

