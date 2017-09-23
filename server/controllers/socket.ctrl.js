const compte = require('../models/compteAg.model');
const msg = require('../models/message.model');
const allMsg=require('../models/allMessages.model');
module.exports.init = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log('a user has connected');
        var handshakeData = socket.request;
        var socketID=socket.id;
        var fonction=handshakeData._query['fonction'];
        var matricule=handshakeData._query['auth_token'];
        // var thisSocket=module.exports.getSocket(matricule);&& (thisSocket===undefined || thisSocket === null )
        if (fonction==='Plannificateur')
        {
            socket.fonction=fonction;
            console.log("un plannificateur s'est connecté");
            var allMessages=[];
            allMessages=msg.find().then(
                function (result, err) {
                    if (err) throw err;
                    if (result) {
                        for (var i=0;i<result.length;i++){
                            socket.emit('messages',result[i]);
                            
                        }
                                return result;
                    }
                    else {
                        console.log("no new messages to display");
                    }

                });
                socket.on('messageRecu',function(message){
                    var m=msg.findOneAndRemove({_id:message._id}).then(function(err){
                        if (err) throw err;
                    });
                });
                socket.on('viewAllMessages',function(){
                    console.log("view messages request recieved");
                    var m=allMsg.find().then(function(result,err){
                        if (err) throw err;
                        socket.emit('allMessages',result);
                        return result;
                    });

                });
        }
        else
        {
            if (matricule ) {
                socket.matricule = matricule;
                console.log("l'agent "+matricule + ' have just connected to the server' +" ID = " + socket.id);
                // Vérifier s'il y a une ancienne conx du meme client pour la supprimer

                // if (io.sockets.connected) {
                //     for (let socketId in io.sockets.connected) {
                //         if (io.sockets.connected.hasOwnProperty(socketId)) {
                //             let oldSocket = io.sockets.connected[socketId];        
                //             // console.log(socketID+" & "+matricule+" vs "+oldSocket.id+" & "+oldSocket.matricule);            
                //             if ((oldSocket.matricule === (matricule+"")) && (oldSocket.id != socketID))
                //                 {
                //                  console.log("old connection of "+matricule +"with ID = "+socket.id+" have been shut because an old connection already exist");
                //                  socket.disconnect();
                //                 }

                //         }
                //     }
                // }
                //seach in the database if there is notifications send them all and then delete them
                compte.findOne({ matricule: matricule }).then(
                    function (result, err) {
                        if (err) throw err;
                        if (result) {
                            var notif = [];
                            notif = result.urgentNotifications;
                            for (var i = 0; i < notif.length; i++) {
                                sendNotif(socket, notif[i]);
                            }//when user send ack delete notification
                        }

                    });
            } else {
                socket.disconnect();
            }
        socket.on('sendAck',function(notifID){
            console.log("l'agent "+socket.matricule+" a reçu la notification ayant comme Id : "+notifID);
            var x=compte.findOneAndUpdate({matricule:socket.matricule},{$pull:{urgentNotifications:{id:notifID}} },{ returnNewDocument: true }).then(
                function(result,err){
                    if (err) throw err;
                    return result;
                });
        });
        socket.on('newMessage',function (message){
            var newMessage= new msg({
                text:message
            });
            newMessage.save(function(err,newMsg){
                if (err) throw err;
            });
            
            var newmsg=new allMsg({
                text:message
            });
            newmsg.save(function(err,newMsg){
                if (err) throw err;
            });
            var m=allMsg.find().then(function(result,err){
                if (err) throw err;
                return result;
            });
            if (io.sockets.connected) {
                for (let socketId in io.sockets.connected) {
                    if (io.sockets.connected.hasOwnProperty(socketId)) {
                        let oldSocket = io.sockets.connected[socketId];                    
                        if (oldSocket.fonction === 'Plannificateur')
                            {
                                oldSocket.emit('messages',newMessage);
                                socket.emit('allMessages',m);
                            }
                    }
                }
            }

        });
            
        }
  
        socket.on('disconnect', function () {
            console.log(socket.matricule + " have just disconnected"+" ID = "+socket.id);
        });

    });
  module.exports.getSocket=  function(matricule) {
        if (io.sockets.connected) {
            for (let socketId in io.sockets.connected) {
                if (io.sockets.connected.hasOwnProperty(socketId)) {
                    let socket = io.sockets.connected[socketId];                    
                    if (socket.matricule === (matricule+""))
                        {
                            return socket;
                        }
                }
            }
        }
    };

};
function sendNotif(socket, notif) {
    socket.emit('notification', notif);
};
module.exports.sendNotification = sendNotif;