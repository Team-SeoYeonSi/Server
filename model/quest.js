const pool=require('../pool');

const quest=class{
    insertQuest(mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_point,qu_probability){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query(`INSERT INTO quest(mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_type,qu_point,qu_probability) VALUES(?,?,?,?,?,'yet',?,?)`,[mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_point,qu_probability]);
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
    getYetQuestByMbNo(mb_no){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query(`SELECT * FROM quest WHERE mb_no=? AND qu_type='yet'`,[mb_no]);
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
    updateYetQuestToCanceled(qu_no){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query(`UPDATE quest SET qu_type='canceled' WHERE qu_no=?`,[qu_no]);
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

module.exports=quest;