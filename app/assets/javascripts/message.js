$(function(){
  function buildHTML(message){
    if (message.image.url == null)
    {
      var img = "";
    }else
    {
      var img =  `<img src=${message.image.url}></img> `
    }

    var html = `<div class="message">
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
                </div>
                `
                
                

    return html ;     
                }

  $('#new_message').on('submit', function(e){
  //$('#new_message')[0].reset();
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    console.log (url)
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      console.log (data);
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })
 })