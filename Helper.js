module.exports = (pool) => {
    let reset = async () => {
        var result = await pool.query('delete from registration_numbers');
        return result.rows
    }
    //insert registration numbers into the table
    let insertPlates = async (num) => {
        var regNum = num.toUpperCase()
        var setLoc = regNum.substring(0, 2)
        var getId = await getTownId(setLoc);
        
        var checkRegNum = await pool.query("select reg_number from registration_numbers where reg_number =$1 ", [regNum]);

        if (checkRegNum.rows.length < 1) {
            var sql = "insert into registration_numbers(reg_number,town_id) values ($1,$2)";
            return await pool.query(sql, [regNum, getId]);
        }
    }
    let getTownId = async (regLoc) => {
        var sql = await pool.query("select id from towns where startswith=$1", [regLoc]);
        return sql.rows[0].id
    }

    let getAllPlates = async () => {
        var sql = 'select reg_number from registration_numbers';
        var result = await pool.query(sql);
        return result.rows
    }


    let filterTown = async (town) => {
        //console.log(town)
        var getId = await getTownId(town)
        result = [];

      //  console.log(result)
        
        if (town === 'C') {
            var result = await pool.query('select reg_number from registration_numbers');
            return result.rows
        } else {
            var sql = " select reg_number from registration_numbers where town_id =$1"
            result = await pool.query(sql, [getId]);
            return result.rows
        }
        

    }
    return {
        insertPlates,
        getAllPlates,
        reset,
        filterTown,
        getTownId

    }
}