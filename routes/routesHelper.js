//const Helper = require('../Helper');
module.exports = (regNum)=>{
let home =async(req,res)=>{
    var reg= req.body.registrations
    if(reg == "" || reg === undefined ){
        req.flash('info', "Please enter a registration number!");
        res.render("index")
    } else {
   await regNum.setNumbers(req.body.registrations)

  await regNum.ShowAll();

        req.flash('display', reg)
   res.render("index",{
   // display: showAll
})
    }

return{
    home
}
}
}