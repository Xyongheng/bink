import { config } from "../config";

const tips = {
  '1': '出现了一个错误',
  '1000': '输入参数错误',
  '1005': 'appkey验证错误'
}



class HTTP {
  request({url,data = {},method = 'GET'}) {  
    return new Promise((resolve, reject) => {
      this._request(url,resolve,reject,data,method)
    });
  }
  _request(url, resolve, reject , data, method ) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appKey': config.appkey
      },
      success: res => {
        // startsWith 
        // endWith
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          // 服务器异常
          const error_code = res.data.error_code
          this._show_error(error_code)
          reject(res)
        }

      },
      fail: err => {
        // api调用失败
        this._show_error(1);
        reject(err)
      }
    })
  }
}

export {
  HTTP
}