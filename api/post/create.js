const fs=require('fs');
const sharp=require('sharp');
const Post=require('../../model/post');
const File=require('../../model/file');

const post=new Post();
const file=new File();

const create=(req,res)=>{
    const ps_text=req.body.ps_text;
    const mb_no=req.user.mb_no;
    const qa_no=req.body.qa_no;
    const file=req.body.image;
    const DataCheck=()=>{
        return new Promise((resolve, reject) => {
            if(!ps_text || !mb_no || !qa_no || !file){
                reject({status:'failure',message:'Missed request requirements'});
            }
            else{
                resolve();
            }
        })
    }
    const InsertPost=()=>{
        return new Promise(async (resolve, reject) => {
            try{
                const result=await post.insertPost(mb_no,qa_no,ps_text);
                resolve();
            }
            catch (err) {
                reject({status:'failure',message:'Missed request requirements'});
            }
        });
    }
    DataCheck()
        .then(InsertPost)
}

module.exports=create;