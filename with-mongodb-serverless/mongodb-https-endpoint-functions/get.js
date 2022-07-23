// Replace my-database and my-collection with the name of your mongodb database and its collection
exports = async function(payload, response) {
  
  const username = payload.query.username || ""

  const students = context.services.get("mongodb-atlas").db("my-database").collection("my-collection");

  const student = await students.findOne({username:username})

  return student
};