
const userAuth = ({ dataSource } = {}) => (req, res, next) => {
  if (dataSource && dataSource.userId) {
    req.user = dataSource.userId;
  } else {
    req.user = null;
  }

  next();
};

export default userAuth;
