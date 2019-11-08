const rp=require('request-promise');

const Quest=require('../../model/quest');
const QuestActivity=require('../../model/quest_activity');
const QuestMethod=require('../../model/quest_method');

const quest=new Quest();
const questActivity=new QuestActivity();
const questMethod=new QuestMethod();

const create=(req,res)=>{
    console.log(req,user);
    const x=Number(req.body.x);
    const y=Number(req.body.y);
    const location=req.body.location;
    let near=req.body.near; //0,1,2
    let destination;
    let probability=1;
    let qa_activity;
    let qm_method;
    const dpk=0.008952465548919113
    const dist=(x1,y1,x2,y2)=>{
        return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    }

    const DataCheck=()=>{
        console.log('POST /quest/create 1');
        return new Promise((resolve,reject)=>{
            if(!x || !y || !location || !near){
                reject({status:'failure',message:'Missed request requirements'});
            }
            else{
                resolve();
            }
        });
    }
    const ConvertNear=()=>{
        console.log('POST /quest/create 2');
        return new Promise((resolve,reject)=>{
            if(near==='0'){
                near=1;
            }
            else if(near==='1'){
                near=10;
            }
            else{
                near=-1;
            }
            resolve();
        });
    }
    const Calculate=()=>{
        console.log('POST /quest/create 3');
        return new Promise(async(resolve,reject)=>{
            if(near===1 || near===10) {
                const x_max=x+dpk*near;
                const x_min=x-dpk*near;
                const y_max=y+dpk*near;
                const y_min=y-dpk*near;
                let success = false;
                while (!success) {
                    let xf = Math.random() * (x_max-x_min)+x_min;
                    let yf = Math.random() * (y_max-y_min)+y_min;
                    console.log(xf,yf,dist(x,y,xf,yf),dpk*near);
                    if(dist(x,y,xf,yf)>dpk*near){
                        continue;
                    }
                    let body=await rp.get({uri:`https://map.naver.com/v5/api/geocode?request=coordsToaddr&version=1.0&sourcecrs=epsg:4326&output=json&orders=addr&coords=${xf.toFixed(7)},${yf.toFixed(7)}`});
                    let result=JSON.parse(body);
                    destination=result.results[0].region.area1.name+' '+result.results[0].region.area2.name+' '+result.results[0].region.area3.name;
                    console.log(destination);
                    break;
                }
                resolve();
            }
            else{
                let xf = Math.random() * (132-124)+124;
                let yf = Math.random() * (43-33)+33;
                let body=await rp.get({uri:`https://map.naver.com/v5/api/geocode?request=coordsToaddr&version=1.0&sourcecrs=epsg:4326&output=json&orders=addr&coords=${xf.toFixed(7)},${yf.toFixed(7)}`});
                let result=JSON.parse(body);
                destination=result.results[0].region.area1.name+' '+result.results[0].region.area2.name+' '+result.results[0].region.area3.name;
                console.log(destination);
                resolve();
            }
        });
    }
    const SetMethod=()=>{
        console.log('POST /quest/create 4');
        return new Promise(async(resolve,reject)=>{
            let level=Math.random()*(6-1*1);
            let result;
            if(level>=1 && level<=3){
                result=await questMethod.getQuestMethodByLevel('1');
                probability*=0.5;
            }
            else if(level>=4 && level<=5){
                result=await questMethod.getQuestMethodByLevel('2');
                probability*=0.34;
            }
            else{
                result=await questMethod.getQuestMethodByLevel('3');
                probability*=0.16;
            }
            qm_method=result[0].qm_method;
            resolve();
        });
    }

    const SetActivity=()=> {
        console.log('POST /quest/create 5');
        return new Promise(async (resolve, reject) => {
            let level=Math.random()*(6-1*1);
            let result;
            if(level>=1 && level<=3){
                result=await questActivity.getQuestActivityByLevel('1');
                probability*=0.5;
            }
            else if(level>=4 && level<=5){
                result=await questActivity.getQuestActivityByLevel('2');
                probability*=0.34;
            }
            else {
                result =await questActivity.getQuestActivityByLevel('3');
                probability *= 0.16;
            }
            qa_activity=result[0].qa_activity;
            resolve();
        });
    }
    const Insert=()=>{
        console.log('POST /quest/create 6');
        return new Promise(async(resolve,reject)=>{
            await quest.insertQuest(req.user.mb_no,destination,qm_method,qa_activity,`${destination}에 ${qm_method} 도착해서 ${qa_activity}`,1/probability*10000,probability);
            resolve();
        });
    }
    DataCheck()
        .then(ConvertNear)
        .then(Calculate)
        .then(SetMethod)
        .then(SetActivity)
        .then(Insert)
        .then(()=>{
            res.json({status:'success',message:'success'});
        })
        .catch((err)=>{
            res.json(err);
        })
}

module.exports=create;