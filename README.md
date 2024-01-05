>> 加密数据交换

>> POST /api/auth/qrcode

# 响应
```
{
   session_id: "xxx"
}
```

>> POST /api/auth/getQrcodeInfo

# 参数
```
{
   session_id: "xxx"
}
```

# 响应
{
   data: "加密数据"
}


>> POST /api/auth/pushQrcodeInfo

# 参数
```
{
   session_id: "xxx",
   data: "加密数据"
}
```
