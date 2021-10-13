module.exports = (pool)=>{
//insert registration numbers into the table
let setNumbers =async(num)=>{
var sql = "insert into registration_numbers(reg_number) values ($1)";
return await pool.query(sql,[num]);
}
 let ShowAll = async()=>{
     var sql = 'select * from registration_numbers';
     var result= await pool.query(sql);
 //    console.log(result.rows[1].reg_number)
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
return{
setNumbers,
ShowAll,
showEach,
reset
}
}