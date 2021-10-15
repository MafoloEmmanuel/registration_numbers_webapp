module.exports = (pool)=>{
//insert registration numbers into the table
let setNumbers =async(num)=>{
  var  checkRegNum =  await pool.query("select reg_number from registration_numbers where reg_number =$1 ",[num]);
  if(checkRegNum.rows.length <1){
var sql = "insert into registration_numbers(reg_number) values ($1)";
return await pool.query(sql,[num]);
  }
}
 let ShowAll = async()=>{
     var sql = 'select * from registration_numbers';
     var result= await pool.query(sql);
  console.log(result.rows)
     return result.rows
 }
 let showEach = async()=>{
     var sql ="select reg_number from registration_numbers ";
     var result = await pool.query(sql);
     return result.rows
 }
 let reset =async()=>{
     var result = await pool.query('delete from registration_numbers');
     return result.rows
 }
 let setTown = async(num)=>{
     var getStart = num.split(", ")
     var getTown =''
     if(getStart.startsWith("CA") ){
        getTown = "Cape Town";
     } else if(getStart.startsWith("CN")){
         getTown= "Wellington";
     } else if(getStart.startsWith("CL")){
         getTown ="Stellenbosch";
     }
        var sql ="insert into towns(town,startswith) values ($1,$2)"
        var result = await pool.query(sql, [getTown,getStart]);
        console.log(result.rows)
        return result.rows
     }

     function fromTown(regNum, regLoc){
        //console.log(regNum)
        var fromTown = regNum.split(',');
        //console.log(fromTown);
        var isTown = [];
        for(var i= 0;i<fromTown.length;i++){
          var town = fromTown[i].trim();
          console.log(town)
          if(fromTown ==="cape town"){
              regLoc== "CA"
          } else if(fromTown==="stellenbosch"){
              regLoc =="CL"
          } else if(fromTown==="wellington"){
              regLoc =="CN"
          }
          if(town.startsWith(regLoc)){
          isTown.push(town);
           //   console.log(isTown)
      
          }
        }
       // console.log(isTown)
       return isTown;
      }

 
return{
setNumbers,
ShowAll,
showEach,
reset,
setTown,
fromTown
}
}