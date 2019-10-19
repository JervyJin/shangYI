import {
  default as request
} from '@/utils/api'

export default {
  config: function (vue, callback) {
    if (!globalVerb.BindMpAppId) {
      request({ url: "/api/services/app/Setting/GetSetting", method: 'Get' }).then(res => {
        debugger
          globalVerb = res.Data;
          if (globalVerb.BindMpAppId) {
            request({
              url: globalVerb.MicroOpenPlatformHost + "/JSApi/Config", method: 'Get', params: {
                appid: globalVerb.BindMpAppId,
                jsapilist: "scanQRCode",
                url: (window.location.protocol + "//" + window.location.host) + vue.$route.fullPath
              }
            }).then(res => {
              wx.config(res);
              if (callback)
                callback();
            })
          }
        
      })
    } else {
      request({
        url: globalVerb.MicroOpenPlatformHost + "/JSApi/Config", method: 'Get',
        params: {
          appid: globalVerb.BindMpAppId,
          jsapilist: "scanQRCode",
          url: (window.location.protocol + "//" + window.location.host) + vue.$route.fullPath
        }
      }).then(res => {
        wx.config(res);
        if (callback)
          callback();
      })
    }
  }
}
