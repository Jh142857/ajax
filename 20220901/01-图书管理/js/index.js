$(function () {
    function getBookList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function (src) {
            if (src.status !== 200) return alert('获取图书列表失败！')
            else {
                $('tbody').empty()
                src.data.forEach(obj => {
                    $('tbody').append(
                        `<tr>
                            <td>${obj.id}</td>
                            <td>${obj.bookname}</td>
                            <td>${obj.author}</td>
                            <td>${obj.publisher}</td>
                            <td><a href="javascript:;" class="del" data-id=${obj.id}>删除</a></td>
                        </tr>`
                    )
                });

            }
        })
    }
    getBookList();
    $('tbody').on('click', '.del', function () {
        // console.log($(this).attr('data-id'));
        var id = $(this).attr("data-id");
        // 删除图书用get
        $.get("http://www.liulongbin.top:3006/api/delbook", { id: id }, function (res) {
            if (res.status !== 200) alert("删除图书失败");
            getBookList();
        })
    })

    $('.btn').on('click', function () {
        var bookname = $('#bookname').val().trim()
        var author = $('#author').val().trim()
        var publisher = $('#publisher').val().trim()
        if (bookname.length <= 0 || author.length <= 0 || publisher.length <= 0) alert('请输入正确的图书信息')
        $.post("http://www.liulongbin.top:3006/api/addbook",
            { bookname: bookname, author: author, publisher: publisher },
            function (res) {
                if (res.status !== 201) alert("添加图书失败！")
                // 重新获取图书列表
                getBookList();
                bookname.val('')
                author.val('')
                publisher.val('')
            }
        )
    })
})