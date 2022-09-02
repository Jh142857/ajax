$(function () {
    function getCommentList() {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            success: function (res) {
                // console.log(res);
                if (res.status !== 200) alert("获取评论列表失败！")
                $('#comment-list').empty();
                res.data.forEach(obj => {
                    $('#comment-list').append(
                        `<li class="list-group-item">
                            <span class="badge" style="background-color: #edad4c;">评论时间：${obj.time}</span>
                            <span class="badge" style="background-color: #64bbd9;">评论人：${obj.username}</span>
                            ${obj.content}
                        </li>`
                    )
                });
            }
        })
    }
    getCommentList();


    $('form').submit(function (e) {
        e.preventDefault();
        // alert(11)
        var data = $(this).serialize()
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
          if (res.status !== 201) {
            return alert('发表评论失败！');
          }
          getCommentList();
          console.log($('form'));
          $('form')[0].reset();
        })
    })

})