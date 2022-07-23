// Replace my-database and my-collection with the name of your mongodb database and its collection
exports = async function(payload, response) {

  function convertToDates(arr)
  {
    if(typeof arr === 'undefined'){
      return([])
    }else
    {
      return arr.map(function(item){
        return({
          date: new Date(item.date),
          bonus: item.bonus
        })
      })
    }
  }
  

  
  if (payload.body) {
      const username = payload.query.username || "";
      const body =  EJSON.parse(payload.body.text());
      const students = context.services.get("mongodb-atlas").db("my-database").collection("my-collection");
      
  
      const updateResponse = await students.updateOne(
        { username: username},
        { $set: { 
          points:Number(body.points),
          tokens:Number(body.tokens),
          dates:{
            math:convertToDates(body.dates.math),
            reading:convertToDates(body.dates.reading)
          }
        } },
      )

      return updateResponse
      
    }

  return  {};
};