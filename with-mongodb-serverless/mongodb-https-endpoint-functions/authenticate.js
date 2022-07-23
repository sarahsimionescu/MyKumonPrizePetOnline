// in your mongodb HTTPS endpoints, require a secret that is used by all functions accessing your database.
// if your admin (kumon instructor) enters the correct password, return the secret such that they may make successful calls to the database.
// replace my-password and my-secret with your password (known by the kumon instuctor) and secret
exports = async function(payload, response) {
  
  const password = payload.query.password || "";
  var secret ='';

  if (password === 'my-password')
  {
    secret='my-secret';
  }
  
  return({secret:secret})
  
};