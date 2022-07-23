// Replace my-database and my-collection with the name of your mongodb database and its collection
exports = async function(payload, response) {

  if (payload.body) {
      const body =  EJSON.parse(payload.body.text());
      const students = context.services.get("mongodb-atlas").db("my-database").collection("my-collection");
      
      const newStudent = {
          username: body.username,
          startdate: new Date(body.startdate),
          math:body.math,
          reading:body.reading,
          points:0,
          tokens:0,
          dates:{
            math:[],
            reading:[]
          },
          petname:body.petname,
          pettype:body.pettype
      };
  
      students.insertOne(newStudent);
      return('New Student Added!')
  }

  return  ('Error: Invalid Submission')
};