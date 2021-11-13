module.exports = (regNum) => {
    let home = async (req, res, next) => {
        try {
            let showAll = await regNum.getAllPlates();
            res.render("index", {
                display: showAll
            })
        }
        catch (err) {
            next(err)
        }
    }
    let setRegistrations = async (req, res, next) => {
        try {
            var reg = req.body.registrations;
            if (reg === "") {
                req.flash('info', "Please enter a registration number shem!");
                res.render("index")
            }
            else if (!(reg.match(/[a-zA-Z]{2}\-[0-9]{3}\-[0-9]{3}/) ||reg.match(/[a-zA-Z\s]{2}\[0-9\s]{3}\[0-9]{3}/))) {
                req.flash('info', 'Please enter a valid format e.g CA-123-245 or CA 123 456');
                res.render('index')
            }
            else if (!(reg.startsWith('ca') || reg.startsWith('cl') || reg.startsWith('cn') || reg.startsWith('CA') || reg.startsWith('CL') || reg.startsWith('CN'))) {
                req.flash('info', "Please enter a registration number that starts with CA, CL or CN");
                res.render('index')
            }
            else {
                await regNum.insertPlates(reg);
                res.redirect('/')
            }
        } catch (err) {
            next(err)
        }
    }
    let filter = async (req, res, next) => {
        try {
            var setTown = req.body.town;
            console.log(setTown + "love")
          
            var show = await regNum.filterTown(setTown);
            res.render("index", {
                display: show
            })
            console.log('yep!')
        }
        catch (err) {
            next(err)
        }
    }

    let resetRegistrations = async (req, res) => {
        await regNum.reset()
        res.redirect('/')
    }
    let all = async (req, res, next) => {
        try {
            var showAll = await regNum.getAllPlates();
            res.render('index',
                { display: showAll }
            )
        } catch (err) {
            next(err)
        }
        res.redirect('/')
    }
    return {
        all,
        home,
        setRegistrations,
        resetRegistrations,
        filter
    }
}