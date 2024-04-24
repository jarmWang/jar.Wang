// 請求拦截器
const requestCallback = () => {
    return req => {
        return req
    }
}
// 响应拦截器
const responseCallback = () => {
    return res => {
        return res
    }
}
// 请求错误
const requestError = () => {
    return reqErr => {
        return reqErr
    }
}
// 响应错误
const responseError = () => {
    return resErr => {
        return resErr
    }
}

export default {
    reqFunc: requestCallback(),
    resFunc: responseCallback(),
    reqErr: requestError(),
    resErr: responseError()
}