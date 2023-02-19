export function friendlyDate(datsStr) {
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr);
    // 获取当前的时间撮
    let time = dateObj.getTime()
    // 获取当前的时间
    let now = Date.now()
    let space = now - time
    let str = ''


    switch(true) {
        // 一分钟以内 展示刚刚
        case space < 60000:
            str = '刚刚'
            break
        // 一个小时以内
        case space < 1000*3600:
            str = Math.floor(space / 60000) + '分钟前'
            break
        case space < 1000*3600*24:
            str = Math.floor(space / (1000*3600)) + '小时前'
            break
        default:
            str = Math.floor(space/(1000*3600*24)) + '天前'
    }
    return str
}
