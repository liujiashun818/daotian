## 公众号营销页面开发说明

### 目录结构

```shell
h5
├── README.md
├── activity
│   ├── css
│   ├── images
│   ├── index.html
│   └── js
├── bargain        // 助力砍价
├── charge
├── comment
└── coupon         // 优惠券
    ├── css
    │   ├── app.css
    │   ├── base.css
    │   └── reset.css
    ├── forward.html
    ├── img
    ├── index.html
    ├── js
    │   ├── base.js
    │   ├── forward.js
    │   ├── index.js
    │   ├── redirect.js
    │   └── store.js
    ├── redirect.html
    └── stores.html
```

### 开发说明

1. 手机和电脑需在同一个局域网中，连接同一个WiFi

2. 配置域名

   1. 配置域名

      ```
      127.0.0.1   dzl.www.shuidao.dev1.yunbed.com dzl.www.shuidao.dev2.yunbed.com
      ```

   2. 提供IP地址和域名，请全刚配置域名解析

3. 项目根目录下启动Python服务

   ```
   $ ~/workspace/daotian-web-v2/ python -m SimpleHTTPServer 9091
   ```

4. 使用微信开发者工具调试页面，需要使用与公众号绑定的微信号登录

5. 开发者工具地址栏中输入 `dzl.www.daotian.dev2.yunbed.com:9091/h5/coupon/index.html?id=pyzmiQkqP`即可访问，微信中打开该链接即可在微信中测试登录，转发等功能

