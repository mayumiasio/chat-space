$(document).on('turbolinks:load',function(){
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last-child').data('message-id');
    var group_id = $('.chat-main__header').data('group_id');
    if (!group_id){
      clearInterval(autoReload);
      return 
    }
    var url = location.href;
    var result = url.match(/^https?:\/{2,}.*?(\/.*)/)[1];
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: '/groups/' + group_id +'/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
      
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
    var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');    
      });
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  };

  function buildHTML(message){
    var img = message.image.url == null ? "": `<img src=${message.image.url}></img> `
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <P class="lower-message__content">
                  ${message.content}
                  </P>
                  ${img}
                </div>`

    return html ;     
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){

      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      setInterval(reloadMessages, 5000);
    })
    .fail(function(){
      alert('error');
    })
  })

    //途中省略
    //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
      if ($('.chat-main__header').data('group_id')){
        var autoReload = setInterval(reloadMessages, 5000)
      }
});

