module.exports =(regNum)=>{
//reg.match(/[a-zA-Z]{2}\-[0-9]{3}\-[a-zA-Z]{2}/)

let home = async(req,res)=>{
    let showAll = await regNum.ShowAll();

    res.render("index",{
            display: showAll
    })
}

let setRegistrations = async(req,res)=>{
    var reg = req.body.registrations;
    var setTown = req.body.town;
    if (reg === "") {
        req.flash('info', "Please enter a registration number!");
        res.render("index")
    }
     else if (!reg.match(/[a-zA-Z0-9\s]/)) {
        req.flash('info', 'invalid');
        res.render('index')
    }
       else if(!((reg.startsWith('ca')) || (reg.startsWith('cl')) ||(reg.startsWith('cn')))){
        req.flash('info', "Please enter a registration number that starts with ca, cl or cn");
        res.render('index')
    }/*else if (reg=== reg){
        req.flash('info', "Already exists!");
        res.redirect('/')
    }*/
    else {
    await regNum.insert(req.body.registrations);
    regNum.setTown(setTown);
console.log(regNum.fromTown(reg,setTown))
    await regNum.fromTown(reg,setTown)
    await regNum.getTown()
        
res.redirect('/')
    }
}
let showAll =async(req,res)=>{
    var setTown = req.body.town;
    regNum.setTown(setTown);
console.log(setTown);
    var getTowns = req.params.selected
 var show =await regNum.filterTown(getTowns);
    res.render("index",{
display: show
    })
}
/*
let setTown =async (req, res) => {
    var setTown = req.body.town;
    regNum.setTown(setTown);
    console.log(setTown);
     await regNum.getTown()
}*/

let resetRegistrations =  async (req, res) => {
    await regNum.reset()
    res.redirect('/')
}
return {
    home,
    setRegistrations,
  //  setTown,
    resetRegistrations,
    showAll
}
}