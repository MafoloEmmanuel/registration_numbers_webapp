const assert = require('assert');
const Helper = require('../Helper');

const { Pool } = require('pg');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:201735469@localhost:5432/coderdb'


const pool = new Pool({
    connectionString: connectionString,
    ssl: useSSL
});
pool.on('connect', () => {
    console.log('connection has started')
})
describe('Registration numbers web app', () => {

    beforeEach(async () => {
        await pool.query('delete  from registration_numbers');
    })
    let regNumInsta = Helper(pool);
    it('Should get Cape Town for registration plates that starts with "CA"', async () => {
        await regNumInsta.getTownId('CA');
        assert.deepEqual([
            {
              town: 'Cape Town'
            }
          ], await regNumInsta.getTown('CA'))
    });
    it('Should get Stellenbosch for registration plates that starts with "CL"', async () => {
        await regNumInsta.getTownId('CL');
        assert.deepEqual([
            {
              town: 'Stellenbosch'
            }
          ], await regNumInsta.getTown('CL'));
    });
    it('Should get Wellington for registration plates that starts with "CN"', async () => {
        await regNumInsta.getTownId('CN');
        assert.deepEqual([
            {
              town: 'Wellington'
            }
          ], await regNumInsta.getTown('CN'))
    });
    it('Should get all the number plates stored', async () => {

        await regNumInsta.insertPlates('CA 123 344')
        await regNumInsta.insertPlates('CN 003 554')
        await regNumInsta.insertPlates('CL 111 200')
        assert.deepEqual([
            {
                reg_number: 'CA 123 344',
            },
            {
                reg_number: 'CN 003 554',
            },
            {
                reg_number: 'CL 111 200',
            }
        ], await regNumInsta.getAllPlates())


    });

    it('Should get all the number plates for Cape Town', async () => {

        await regNumInsta.insertPlates('CA 123 344')
        await regNumInsta.insertPlates('CA 003 844')
        await regNumInsta.insertPlates('CN 003 554')
        await regNumInsta.insertPlates('CL 111 200')
        await regNumInsta.insertPlates('CA 100 204')

        assert.deepEqual([
            {
                reg_number: 'CA 123 344',
            },
            {
                reg_number: 'CA 003 844',
            },
            {
                reg_number: 'CA 100 204',
            }
        ], await regNumInsta.filterTown('CA'))

    });

    it('Should get all the number plates for Stellenbosch', async () => {

        await regNumInsta.insertPlates('CA 123 344')
        await regNumInsta.insertPlates('CA 003 844')
        await regNumInsta.insertPlates('CN 003 554')
        await regNumInsta.insertPlates('CL 111 200')
        await regNumInsta.insertPlates('CL 100 700')
        await regNumInsta.insertPlates('CA 100 204')
        await regNumInsta.insertPlates('CL 102 310')

        assert.deepEqual([
            {
                reg_number: 'CL 111 200',
            },
            {
                reg_number: 'CL 100 700',
            },
            {
                reg_number: 'CL 102 310',
            }], await regNumInsta.filterTown('CL'))
    });
    it('Should get all the number plates for Wellington', async () => {
        await regNumInsta.insertPlates('CN 088 054')
        await regNumInsta.insertPlates('CA 123 344')
        await regNumInsta.insertPlates('CA 003 844')
        await regNumInsta.insertPlates('CN 003 554')
        await regNumInsta.insertPlates('CL 111 200')
        await regNumInsta.insertPlates('CN 105 666')

        assert.deepEqual([
            {
                reg_number: 'CN 088 054',
            },
            {
                reg_number: 'CN 003 554',
            },
            {
                reg_number: 'CN 105 666',
            }], await regNumInsta.filterTown('CN'))
    });

    it('Should get all the number plates for when filtering by "ALL"', async () => {
        await regNumInsta.insertPlates('CN 088 054')
        await regNumInsta.insertPlates('CA 123 344')
        await regNumInsta.insertPlates('CA 003 844')
        await regNumInsta.insertPlates('CN 003 554')
        await regNumInsta.insertPlates('CL 111 200')
        await regNumInsta.insertPlates('CN 105 666')

        assert.deepEqual([{
            reg_number: 'CN 088 054'
        },
        {
            reg_number: 'CA 123 344'
        },
        {
            reg_number: 'CA 003 844'
        },
        {
            reg_number: 'CN 003 554'
        },
        {
            reg_number: 'CL 111 200'
        },
        {
            reg_number: 'CN 105 666'
        }], await regNumInsta.filterTown('C'));
    });
    after(() => {
        pool.end()
    })
})