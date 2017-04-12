## 插件使用说明
 
 cellToast Created by jsonxu on 17/3/28.

 初始设置
    toastType(toast类型)
    1.text (单行和多行文本，少于20个汉字)
    2.loadSucc (加载成功)
    3.loadFail (加载失败)
    4.loading (加载中)
    5.netFail (网络连接失败)
    
    ``
    this.state = {
        toastType:'text', //必选，参数值参考上面5-9行
        animationType: 'fade', //可选，默认是fade，效果是渐进渐出显示和隐藏，其他可选参数 slide , none
        visible: false, //可选
        transparent: true, //可选
        showTime: 3000,  //可选 自定义 和 'always'，传'always'时，loading toast一直显示，若要在父级组件中回调函数关闭loading提示，可以用.hide()方法，() => { this.refs.toast.hide()}
        txt: 'null'  // text类型时必选，其他类型为可选(已经设置默认值)
    };
    ``

在父组件中用事件调用方法：
    1. 加载组件
    ``
       import PACToastCell from "../PACModule/PACCell/PACToastCell";
       ``

    2. 引用组件
       render中return组件：
       ``
        <PACToastCell ref="toast" /> 
        ``
        注意别漏了 ref="toast" ，不然会报错

    3. 在事件中传参调用
    ``
    <Button
        onPress={() => { this.refs.toast.show(
            {
              toastType:'netFail'
              }
          )}}
        title="按钮6（网络连接失败Toast）"
        color="#FF6600"
        accessibilityLabel=""
      />
      ``