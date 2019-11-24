$(function(){

  function buildHTML(message){
            var image = ( message.image ) ? `<img class="mesage__lower-info__image" src=${message.image}>` : '' ; 
            var html = `<div class="message", data-message-id="${message.id}">
                          <div class="message__upper-info">
                            <p class="message__upper-info__talker">
                            ${message.user_name}
                            </p>
                            <p class="message__upper-info__date">
                            ${message.created_at}
                            </p>
                          </div>
                          <div class="message__lower-info">
                            <p class="message__lower-info__text">
                            ${message.content}
                            </p>
                            ${image}
                          </div>
                        </div>`
            return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('input').prop('disabled', false)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},50);
    })
    .fail(function(){
      alert ('メッセージ送信に失敗しました');
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/))　{
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $(".messages").append(insertHTML);
        })
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},50);
      })
      .fail(function() {
        alert ('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});