$(document).on('turbolinks:load',function(){
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`
    $('#user-search-result').append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendmenberToHTML(user){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                    <p class='chat-group-user__name'>${user.userName}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${user.userId}" data-user-name="${user.userName}">削除</div>
                </div>`
    $('#chat-group-users').append(html);
  }
  
  $("#user-search-field").on('keyup', function(){
    var input = $(this).val();
    if (input.length === 0){
      $("#user-search-result").empty();
      return false;
    }
    var href = '/users';
    $.ajax({
      url: href,
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(data){
      $("#user-search-result").empty();
      if (data.length !== 0) {
        data.forEach(function(user){
          buildHTML(user);
        });
      }
      else {
        appendErrMsgToHTML("一致する人はいません");
      }
      
      $('.textbox').val('');
    })
    .fail(function(data){
      alert('error');
    })
  })
    $('#user-search-result').on("click", ".user-search-add", function (e) {

      var user = $(e.target).data()

      $(e.target).parent().remove()
      appendmenberToHTML(user);
    })
    $(document).on("click", ".user-search-remove", function (e) {
  
        var user = $(e.target).data()
        var user = $(this).data("user-id")
        var name = $(this).data("user-name")
        $(e.target).parent().remove()
    })
});

