const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


exports.addAdminRoleA = functions.region('asia-southeast1').https.onCall((data, context)=>{
    //Requests from admin
    if(context.auth.token.admin !== true){
        return { error: "Only admins can add admins, you hacker"}
    } 
    //GET user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user=>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true
        })
    }).then(()=>{
        return {
            message: `Gotcha ${data.email} has been made an admin`
        }
    }).catch(err =>{
        return err;
    });

});
