const pool=require('../pool');

const quest=class{
    insertQuest(mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_point,qu_probability){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO quest(mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_type,qu_point,qu_probability) VALUES(?,?,?,?,?,`yet`,?,?)',[mb_no,qu_destination,qm_method,qa_activity,qu_quest,qu_point,qu_probability]);
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