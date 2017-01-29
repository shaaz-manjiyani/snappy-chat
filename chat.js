ifUserIsLoggedIn(function() {
  // Update the user data
  updateUserData();
  loadUsers(function(users){
    var usersList = "";

    for (var uid in users){
      var user = users[uid];
      // if user is not the current user then dont display its name
      if(window.currentUser.id != uid)
      usersList += renderUser(user);
      //console.log(user);
    }
    getElement("members").innerHTML = usersList;
  });


  function onClickMultiple(className, func) {
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains(className)) {
        func(event.target);
      }
    });
  }

  function loadMessages(chat_id,fn){
    var database = firebase.database();
    var chatsRef = database.ref("chats");
    chatsRef.child(chat_id).on('value',function(snapshot){
      var messages = snapshot.val();
      fn(messages);
    });
  }


  onClickMultiple("member",function(element){
    var chat_id = element.id;


    loadMessages(chat_id,function(messages){

      var messagesList = "";
      for (var uid in messages){
        var message = messages[uid];
        // if user is not the current user then dont display its name
        if(window.currentUser.id != uid)
        messagesList += renderMessage(message);
        //console.log(user);
      }
      getElement("messages").innerHTML = messagesList;
    });

    getElement("chat-id").value = chat_id;

  });

  click("send-button",function() {
    var text = getElement("message-text").value;
    var chat_id = getElement("chat-id").value;

    sendMessage(chat_id,text);
  });

});
