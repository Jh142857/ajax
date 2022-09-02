$(function () {
    var padZero = t => t < 10 ? `0${t}` : t;

    template.defaults.imports.processTime = dtStr => {
        var date = new Date(dtStr);
        console.log(date);

        var y = padZero(date.getFullYear());
        var m = padZero(date.getMonth() + 1);
        var d = padZero(date.getDate());
        var h = padZero(date.getHours());
        var min = padZero(date.getMinutes());
        var s = padZero(date.getSeconds());

        return `${y}-${m}-${d} ${h}:${min}:${s}`
    }

    function getNewsList() {
        $.get("http://www.liulongbin.top:3006/api/news", res => {
            // console.log(res);
            if (res.status !== 200) alert('获取新闻列表失败！')

            var html = template('tpl', res);

            $('#news-list').html(html);
        })
    }
    getNewsList();
})