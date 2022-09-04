$(function () {
    var timer = null;
    var cache = {};
    $('.ipt').keyup(function (e) {
        clearTimeout(timer);
        var keywords = $(this).val().trim();
        if (keywords.length <= 0) {
            return $('.search-list').empty().hide();
        }
        // 缓存机制
        if (cache[keywords]) {
            // 直接返回
            return renderSearch(cache[keywords]);
        }
        // 输入框防抖
        timer = setTimeout(function () {
            getList(keywords);
        }, 500);

    });

    function getList(keywords) {
        // console.log(11);
        $.ajax({
            url: `https://suggest.taobao.com/sug?q=${keywords}`,
            dataType: "jsonp",
            success: function (res) {
                cache[keywords] = res;
                renderSearch(res);
                console.log(cache);
            }
        });
    }
    function renderSearch(data) {
        var htmlStr = template('tpl', data);
        if (htmlStr.length <= 0) {
            $('.search-list').empty().hide();
        }
        $('.search-list').html(htmlStr).show();
    }
})