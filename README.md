## WebRTC 简介
  ```
    WebRTC(Web Real-Time Communication) 网页即时通信 ，是一个支持网页浏览器进行实时语音、视频对话的API。
    于2011年6月1日开源并在Google、Mozilla、Opera支持下被纳入万维网联盟的W3C推荐标准
  ```
  ```
    闲话：目前主流实时流媒体 实现方式
    RTP :(Real-time Transport Protocol) 建立在 UDP 协议上的一种协议加控制

    HLS（HTTP Live Streamin）苹果公司实现的基于HTTP的流媒体传输协议

    RTMP（Real Time Messaging Protocol） Adobe公司基于TCP

    WebRTC google 基于RTP协议
  ```

### WebRTC组成
  ![img](./source/zucheng.webp.jpg)

  - getUserMedia负责获取用户本地的多媒体数据

  - RTCPeerConnection负责建立P2P连接以及传输多媒体数据。

  - RTCDataChannel提供的一个信令通道实现双向通信

### h5 获取媒体流
  > 目标：打开摄像头将媒体流显示到页面

  [MediaDevices 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

```js
  navigator.mediaDevices.getUserMedia({
    video: true, // 摄像头
    audio: true // 麦克风
  }).then(steam => {
    // video标签的srcObject
    video.srcObject = stream
  }).catch(e => {
    console.log(e)
  })
```

### RTCPeerConnection
  > RTCPeerConnection api提供了 WebRTC端创建、链接、保持、监控闭连接的方法的实现