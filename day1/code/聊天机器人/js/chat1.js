$(function () {
    resetui();
    $('#btnSend').on('click', function () {
        var input = $('#ipt').val().trim();
        if (input.length > 0) {
            $('#talk_list').append(
                `<li class="right_word">
                    <img src="img/person02.png" /><span>${input}</span>
                </li>`
            )
        }
        $('#ipt').val('');
        resetui();
        // 从服务器端获取信息
        getMsg(input);
    })

    function getMsg(input) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: input
            },
            success: function (res) {
                // 成功再进行操作
                if (res.message === 'success') {
                    // console.log(res);
                    $('#talk_list').append(
                        `<li class="left_word">
                            <img src="img/person01.png" /><span>${res.data.info.text}</span>
                        </li>`
                    )
                    resetui();
                    getAudio(res.data.info.text);
                }

            }
        })
    }

    function getAudio(input) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text: input
            },
            success: function (res) {
                console.log(res);
                if (res.message === 'success') {
                    $("#voice").attr('src', res.voiceUrl);
                    // console.log(res.voiceUrl);
                }
            }
        })
    }

    $('#ipt').on('keyup', function(e){
        if(e.key === 'Enter' || e.key === 'NumpadEnter'){
            $('#btnSend').click();
        }
    })
})