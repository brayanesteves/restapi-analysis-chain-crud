const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
const v1 = '/api/v1';
const v2 = '/api/v2';
/**
 * List all data
 * @url 'http://localhost:3000/api/v1/0_chns'
 */
router.get(v1 + '/0_chns', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    /**
     * @param {String} err
     * @param {String} rows of register
     * @param {String} fields of tables database
     */
    mysqlConnection.query('SELECT * FROM `0_Chns` AS `A` ORDER BY `Rfrnc` DESC;', (err, rows, fields) => {
        if(!err) {
            //res.json(rows);
            res.status(200).json(rows);
            next();
        } else {
            res.json({ error: 'no text' });
            next();
        }
    });
});

/**
 * List all data not deleted and locked
 */
router.get('/iecho', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    const query = `
    CALL 0_chnsAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    
     let Rfrnc = 0, Plndrm, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm;
    const { text }  = req.query;
        const newStr = text.replace(/[\W_]/g, "").toLowerCase();
        const strReversed = newStr.split("").reverse().join("");
        //res.json({query: strReversed});
        if (text.length > 0) {
            if (text == strReversed) {
                
                Plndrm = 1;
                Cndtn = 1;
                Rmvd = 0;
                Lckd = 0;
                DtAdmssn = "0001-01-01";
                Chn = text;
                console.log(Plndrm);
                console.log(query);
                mysqlConnection.query(query, [Rfrnc, text, Chn, Plndrm, 1, 0, 0, "0001-01-01", "00:00:00"], (err, rows, fields) => {
                    
                    if(!err) {
                        res.status(200).json({ text: strReversed, "palindrome": true });
                    } else {
                        res.status(500).json({ message: "Error" });
                    }
                });            
            } else {            
             
                Plndrm = 0;
                Cndtn = 1;
                Rmvd = 0;
                Lckd = 0;
                Chn = text;
                DtAdmssn = "0001-01-01";
                ChckTm = "00:00:00";
                console.log(query);
                mysqlConnection.query(query, [Rfrnc, text, Chn, Plndrm, 1, 0, 0, "0001-01-01", "00:00:00"], (err, rows, fields) => {
                    
                    if(!err) {
                        res.status(200).json({ text: strReversed });
                    } else {
                        res.status(500).json({ message: "Error" }); 
                    }
                });   
            }
        } else {
            
            res.json({error: 'no text'});
        }
        
 });
module.exports = router;