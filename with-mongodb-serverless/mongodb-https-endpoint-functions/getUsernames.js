// Replace my-database and my-collection with the name of your mongodb database and its collection
exports = async function(payload, response) {
  

  const students = context.services.get("mongodb-atlas").db("my-kumon-prize-pet").collection("my-collection");

  const usernames = await students.find({},{username:true,_id:false})

  return usernames
};