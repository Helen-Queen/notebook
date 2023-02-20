import axios from 'axios'
import baseURLConfig from './config-baseURL'
// 对于所有的post请求我可以统一的设置content-type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 设置baseurl,这是服务端线上地址接口baseurl域名
axios.defaults.baseURL = baseURLConfig.baseURL
// 现象：当前得域名和请求得接口不一致，第一次登录成功，但是在刷新得时候没有登录成功，看请求头，没有cookie。下面一句就是来解决出现得这个现象。
axios.defaults.withCredentials = true;


// 导出接口,其他地方就能用了
export default function request(url,type = 'GET',data = {}) {
    return new Promise((resolve,reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >=200 && status < 300) || status === 400
            }
        }
        if(type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if(res.status === 200) {
                resolve(res.data)
            } else {
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err => {
            console.error('网络异常')
            reject({msg: '网络异常'})
        })
    })
}
// 调用
// request('/auth/login','POST',{username: 'hunger',password:'123456'})
// .then(data=>{
//     console.log(data);
// })