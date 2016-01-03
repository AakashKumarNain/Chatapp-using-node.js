$(function($){

   var socket = io.connect();
   var messageForm = $('#send-messages');
   var messages = $('#message');
   var chat = $('#chat');
   var nickForm = $('#setNick');
   var nickError = $('#nickError');
   var nickName = $('#nickName');
   var users = $('#users');

   
   nickForm.submit(function(e){
      e.preventDefault();
      socket.emit('new user',nickName.val(), function(data){
           if(data)
           {
            $('#nickWrap').hide();
            $('#contentWrap').show();
           }
           else
           {
            nickError.html('Username already taken! Try again with another username');
           }
       });
      nickName.val('');
    }); 

   socket.on('usernames' , function(data){
     var usersList = '';
     for(i=0;i<data.length;i++)
      usersList += data[i] + ' is connected <br/>';

      users.html(usersList); 

   });

   messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send messages', messages.val());
      messages.val(''); 
      });

     socket.on('new message',function(data){
     chat.append('<b>' + data.nick + ' : </b>' + data.msg + '<br>');
     });
   });