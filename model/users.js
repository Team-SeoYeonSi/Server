const pool=require('../pool');

const user=class{
    getUserByUserId(userId){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM USERS WHERE USERID=?',[userId]);
                    connection.release();
                    resolve(rows);
                }
                catch(err){
                    connection.release();
                    reject(err);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }
    insertUser(userId, nickname){
        return new Promise((resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO USERS(USERID,NICKNAME) VALUES(?,?)',[userId,nickname]);
                    connection.release();
                    resolve(rows);
                }
                catch(err){
                    connection.release();
                    reject(err);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }
}

module.exports=user;