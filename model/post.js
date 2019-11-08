const pool=require('../pool');

const post=class{
    insertPost(mb_no,qa_no,ps_text){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO post(mb_no,qa_no,ps_text,ps_like) VALUES(?,?,?,0)',[mb_no,qa_no,ps_text]);
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
    insertComment(mb_no,ps_parent,qa_no,ps_text){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO post(mb_no,ps_parent,qa_no,ps_text,ps_like) VALUES(?,?,?,?,0)',[mb_no,ps_parent,qa_no,ps_text]);
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

module.exports=post;