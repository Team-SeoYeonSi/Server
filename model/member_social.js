const pool=require('../pool');

const member_social=class{
    getMemberSocialBySocialId(social_id){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM member_social WHERE ms_social_id=?',[social_id]);
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
    insertMemberSocial(mb_no,ms_social,ms_social_id){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO member_social(mb_no,ms_social,ms_social_id) VALUES(?,?,?)',[mb_no,ms_social,ms_social_id]);
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

module.exports=member_social;