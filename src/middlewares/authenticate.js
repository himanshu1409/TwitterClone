import passport from "passport";

export const authenticate = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    console.log(user);
    if (err) next(err);
    if (!user) {
      return res.status(401).json({ message: "Unauthorised access" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
