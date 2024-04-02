module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch(next);
  };
};

// Alternative

// module.exports = (fun) => {
//   return (req, res, next) => {
//     try {
//       fun(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };
