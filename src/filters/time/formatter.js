export function cont(time) {
    // 约定为s 转化为毫秒
    time = time * 1000;
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    m = m < 10 ? '0' + m : m + '';
    d = d < 10 ? '0' + d : d + '';
    h = h < 10 ? '0' + h : h + '';
    mi = mi < 10 ? '0' + mi : mi + '';
    s = s < 10 ? '0' + s : s + '';

    return y + '-' + m + '-' + d + '  ' + h + ':' + mi + ':' + s;

}