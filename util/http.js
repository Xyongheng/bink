import { config } from "../config";

const tips = {
  '1': '出现了一个错误',
  '1000': '输入参数错误',
  '1005': 'appkey验证错误'
}

class HTTP {
  request(params) {

    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appKey': config.appkey
      },
      success: res => {
        // startsWith 
        // endWith
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          // 服务器异常
          let error_code = res.data.error_code
          this._show_error(error_code)
        }

      },
      fail: err => {
        // api调用失败
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    error_code = error_code ? error_code : 1;
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 1500
    })
  }
}

export {
  HTTP
}