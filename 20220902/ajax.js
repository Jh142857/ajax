function dataToStr(data) {
    var arr = [];
    for (var k in data) {
        arr.push(`${k}=${data[k]}`);
    }
    return arr.join('&');
}

function ajax(obj) {
    var xhr = new XMLHttpRequest();
    var queryStr = dataToStr(obj.data);

    if (obj.method.toUpperCase() === 'GET') {
        console.log(11);
        xhr.open(obj.method, `${obj.url}?${queryStr}`);
        xhr.send();
    }
    else if (obj.method.toUpperCase() === 'POST') {
        xhr.open(obj.method, obj.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(queryStr);
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 这里执行回调函数
            obj.success(JSON.parse(xhr.responseText));
        }
    }
}



