module.exports = (pool) => {
    //insert registration numbers into the table
    let setNumbers = async (num) => {
        var regNum = num.toUpperCase()
        var checkRegNum = await pool.query("select reg_number from registration_numbers where reg_number =$1 ", [regNum]);

        if (checkRegNum.rows.length < 1) {
            if (regNum.startsWith('CA') || regNum.startsWith('CL') || regNum.startsWith('CN')) {
                var sql = "insert into registration_numbers(reg_number) values ($1)";
                return await pool.query(sql, [regNum]);

            }
        }
    }
    let ShowAll = async () => {
        var sql = 'select * from registration_numbers';
        var result = await pool.query(sql);
        console.log(result.rows)
        return result.rows
    }
    let showEach = async () => {
        var sql = "select reg_number from registration_numbers ";
        var result = await pool.query(sql);
        return result.rows
    }
    let reset = async () => {
        var result = await pool.query('delete from registration_numbers');
        return result.rows
    }
    /*
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
        }*/

    let fromTown = async (regNum, regLoc) => {
        //console.log(regNum)
        var fromTown = regNum.split(',');
        //console.log(fromTown);
        for (var i = 0; i < fromTown.length; i++) {
            var town = fromTown[i].trim();
            console.log(town)
            if (fromTown === "cape town") {
                regLoc == "CA"
            } else if (fromTown === "stellenbosch") {
                regLoc == "CL"
            } else if (fromTown === "wellington") {
                regLoc == "CN"
            }
            if (town.startsWith(regLoc)) {
                var result = await pool.query('insert into towns (town,startswith) values ($1,$2) ', [fromTown, regLoc])
                return result.rows
            }
        }
    }

    let setTown = (town) => {
        var regLoc
        if (town === 'cape town') {
            regLoc = town.startsWith('CA')
        } else if (town === 'stellenbosch') {
            regLoc = town.startsWith("CL")
        } else if (town === 'wellington') {
            regLoc = town.startsWith("CN")

        }
        return regLoc
    }
    let insertTown = async (regNum, regLoc) => {
        var sql = 'insert into towns (town,startswith) values ($1,$2) ';
        var result = await pool.query(sql, [regNum, regLoc]);
        console.log(result.rows)
        return result.rows
    }
    let getTown = async (town) => {
        var sql = "select *  from towns where startswith =$1 "
        var result = await pool.query(sql, [town]);
        console.log(result.rows)
        return result.rows
    }
    let filterTown =async(town)=>{
        var result
        if(town === "All"){
            result = await pool.query('select reg_number from registrations');
            return result.rows
        } else{
            var sql = "select reg_number from towns join registration_numbers r on towns.id = r.town_id where startswith =$1 "
             result = await pool.query(sql,[town])
            console.log(result.rows)
            return result.rows
        }
  
    }
    return {
        setNumbers,
        ShowAll,
        showEach,
        reset,
        setTown,
        fromTown,
        insertTown,
        getTown,
        filterTown
    }
}