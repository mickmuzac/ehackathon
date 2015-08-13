var accept = {
  teams: require('./teams.js')
}

module.exports = function (req, res, next){
  console.log("api!", req.path);

  var baseRoute = req.path.split("/")[1];
  if(baseRoute && accept[baseRoute]){
    console.log("routing api to: " + baseRoute);
    accept[baseRoute](req, res, next);
  }
  else{
    console.log("api route not found");
    next();
  }
}
