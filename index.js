#!/usr/bin/env node

const fs=require("fs");
let arguments=process.argv.slice(2);


let flags=[];
let filenames=[];
let secondaryArguments=[];

for(let i of arguments){
  
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0]=="%"){
       
        secondaryArguments.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}

// if(flags.length==0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }else{
//     for(let flag of flags){
//         if(flag=="-rs"){
//             for(let file of filenames){
//                 let filedata=fs.readFileSync(file,"utf-8");
//                 console.log(filedata.split(" ").join(""));
//             }
//         }
//     }
// }

for(let file of filenames){
    let filedata=fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if(flag=="-rs"){// space are removed
            filedata=removeAll(filedata," ");
        //   filedata=  filedata.split(" ").join("");//does same work as removeall
        }
        if(flag=="-rn"){// enter are removed
            filedata=removeAll(filedata,"\n");
            // filedata=filedata.split("\n").join("");//does same work as removeall
        }
        if(flag=="-rsc"){// special characters are removed
            // let tempstring="";
            // for(let character of filedata){
            //     if((character.charCodeAt(0)>=65 && character.charCodeAt(0)<=90)||(character.charCodeAt(0)>=97 && character.charCodeAt(0)<=122)){
            //         tempstring+=character;
            //     }
            // }
            // filedata=tempstring;
            for(let secondaryargument of secondaryArguments){
                filedata=removeAll(filedata,secondaryargument);
            }
        }
        if(flag=="-s"){
           let data= addsequence(filedata);
           console.log(data);
        }
        if(flag=="-sn"){
            let data=addsequenceTnel(filedata);
            console.log(data);
        }
        if(flag=="-rel"){
            let data=removeextraline(filedata);
            for(let i=0;i<data.length;i++){
            console.log(data[i]);
            }
        }
    }
    // console.log(filedata);
}

function removeAll(string,removaldata){
    return string.split(removaldata).join("");
}

function addsequence(content){ //to add a sequence to lines eg: 1 abc,\n 2 blank line,\n 3 xyz
    let contentArr=content.split("\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
    return contentArr;
}

function addsequenceTnel(content){//to add a sequence to nonempty lines eg: 1 abc,\n  blank line,\n 2 xyz
    let contentArr=content.split("\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
        contentArr[i]=count+" "+contentArr[i];
        count++;
        }
    }
    return contentArr;
}

// function removeblankline(content){
//     let contentArr=content.split("\n");
//     let data=[];
//     for(let i=0;i<contentArr.length;i++){
       
//         if(contentArr[i]!=""){
//             data.push(contentArr[i]);
//         }
//     }
//     return data;
// }

function removeextraline(filedata){//to remove extra blank lines and leaving a single blank line between two written lines.
    let contentArr=filedata.split("\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}