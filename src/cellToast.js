/**
 * cellToast Created by jsonxu on 17/3/28.
 初始设置
    toastType(toast类型)
    1.text (单行和多行文本，少于20个汉字)
    2.loadSucc (加载成功)
    3.loadFail (加载失败)
    4.loading (加载中)
    5.netFail (网络连接失败)

    this.state = {
        toastType:'text', //必选，参数值参考上面5-9行
        animationType: 'fade', //可选，默认是fade，效果是渐进渐出显示和隐藏，其他可选参数 slide , none
        visible: false, //可选
        transparent: true, //可选
        showTime: 3000,  //可选 自定义 和 'always'，传'always'时，loading toast一直显示，若要在父级组件中回调函数关闭loading提示，可以用.hide()方法，() => { this.refs.toast.hide()}
        txt: 'null'  // text类型时必选，其他类型为可选(已经设置默认值)
    };

在父组件中用事件调用方法：
    1. 加载组件  
       import PACToastCell from "../PACModule/PACCell/PACToastCell";

    2. 引用组件
       render中return组件：
        <PACToastCell ref="toast" /> 
        注意别漏了 ref="toast" ，不然会报错

    3. 在事件中传参调用
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
 */

import React, { Component} from  'react';
import { Modal, Image, Animated, Easing, View, StyleSheet, Text} from 'react-native';

export default class PACToastCell extends  Component {

    static  propTypes = {
        toastType: React.PropTypes.string,
        animationType: React.PropTypes.string,
        visible: React.PropTypes.bool,
        transparent: React.PropTypes.bool,
        showTime: React.PropTypes.number,
        txt: React.PropTypes.string
    }

    show (obj) {
        // componentWillUpdate();
        let _this = this;
        if(obj && !obj.txt){
            switch (obj.toastType) {
                case 'loadSucc':
                    obj.txt = '加载成功';
                    break;
                case 'loadFail':
                    obj.txt = '加载失败';
                    break;
                case 'loading':
                    obj.txt = '加载中…';
                    break;
                case 'netFail':
                    obj.txt = '网络连接失败';
                    break;
                default:
                    break;
            }
        }
        let newObj = obj ? Object.assign({visible: true}, obj) : {visible: true};
        _this.setState({...newObj});

        //默认是延迟3秒自动消失
        if(newObj.showTime !== 'always'){
            clearTimeout(showTimer);
            const showTimer =  setTimeout(
                function() {
                        _this.setState({visible: false});
                    },
                newObj.showTime || _this.state.showTime
            );
        }
    }

    hide (){
        this.setState({visible: false});
    }
    
    constructor(props) {
        super(props);
        //初始设置
        /*
        toastType(toast类型)
        1.text (单行和多行文本，少于20个汉字)
        2.loadSucc (加载成功)
        3.loadFail (加载失败)
        4.loading (加载中)
        5.netFail (网络连接失败)
        */
        /**/
        this.state = {
            toastType:'text',
            animationType: 'fade',
            visible: false,
            transparent: true,
            showTime: 3000,
            txt: 'null',
            bounceValue: new Animated.Value(1), //你可以改变这个值看看效果是什么
            rotateValue: new Animated.Value(0)//旋转角度的初始值
        };
    }

    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        this.startAnimation();
        // alert(this.state.showTime);
    }

    startAnimation() {
        this.state.bounceValue.setValue(1);//和上面初始值一样，所以弹动没有变化
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            //通过Animated.spring等函数设定动画参数
            //可选的基本动画类型: spring, decay, timing
            Animated.spring(this.state.bounceValue, {
                toValue: 1,      //变化目标值，也没有变化
                friction: 0,    //friction 摩擦系数，默认40
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 1,  //角度从0变1
                duration: 800,  //从0到1的时间
                easing: Easing.out(Easing.linear),//线性变化，物理加减速
            })
            //调用start启动动画,start可以回调一个函数,从而实现动画循环
        ]).start(()=>this.startAnimation());
    }



    render(){

        const {toastType, animationType, visible, transparent, showTime, txt} = this.props;

        let boxStyle;
        if(this.state.txt.length > 15){
            boxStyle = styles.moreLine;
        }else{
            boxStyle = styles.oneLine;
        }

        switch (this.state.toastType) {
            case 'text':
                return (
                    <Modal
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}
                      visible={this.state.visible}
                      onRequestClose={() => {}}
                      onShow={() => {}}
                      >
                        <View style={styles.box}>
                            <Text style={boxStyle}>{this.state.txt || txt}</Text>
                        </View>
                    </Modal>
                );
                break;
            case 'loadSucc':
                return (
                    <Modal
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}
                      visible={this.state.visible}
                      onRequestClose={() => {}}
                      onShow={() => {}}
                      >
                        <View style={styles.box}>
                            <View style={styles.imgToast}>
                                <Image style={styles.imgStyle} source={require('./img/loadSucc.png')}></Image>
                                <Text style={styles.imgToastText}>
                                    {this.state.txt || txt || '加载成功'}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                );
                break;
            case 'loadFail':
                return (
                    <Modal
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}
                      visible={this.state.visible}
                      onRequestClose={() => {}}
                      onShow={() => {}}
                      >
                        <View style={styles.box}>
                            <View style={styles.imgToast}>
                                <Image style={styles.imgStyle} source={require('./img/loadFail.png')}></Image>
                                <Text style={styles.imgToastText}>
                                    {this.state.txt || txt || '加载失败'}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                );
                break;
            case 'loading':
                return (
                    <Modal
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}
                      visible={this.state.visible}
                      onRequestClose={() => {}}
                      onShow={() => {}}
                      >
                        <View style={styles.box}>
                            <View style={styles.imgToast}>

                                <Animated.Image source={require('./img/loading.png')}
                                    style={{
                                        width:36,
                                        height:36,
                                        marginLeft:32,
                                        marginTop:15,
                                        transform: [
                                        {scale: this.state.bounceValue},
                                        {rotateZ: this.state.rotateValue.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ['0deg', '360deg'],
                                    })},
                                ]}}>
                                </Animated.Image>
                                <Text style={styles.imgToastText}>
                                    {this.state.txt || txt || '加载中…'}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                );
                break;
            case 'netFail':
                return (
                    <Modal
                      animationType={this.state.animationType}
                      transparent={this.state.transparent}
                      visible={this.state.visible}
                      onRequestClose={() => {}}
                      onShow={() => {}}
                      >
                        <View style={styles.box}>
                            <View style={styles.imgToast}>
                                <Image style={styles.imgStyle} source={require('./img/badNet.png')}></Image>
                                <Text style={styles.imgToastText}>
                                    {this.state.txt || txt || '网络连接失败'}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                );
                break;
            default:
                break;
        }
    }
}

const styles = StyleSheet.create({
    oneLine: {
        backgroundColor:'#404040',
        color:'#FFFFFF',
        fontSize:12,
        paddingLeft:10,
        paddingRight:10,
        height:34,
        lineHeight:34,
        borderRadius:6,
        overflow:'hidden',
        textAlign:'center'
    },
    moreLine: {
        backgroundColor:'#404040',
        color:'#FFFFFF',
        fontSize:12,
        width:145,
        lineHeight:18,
        textAlign:'center',
        borderRadius:6,
        overflow:'hidden',
        paddingLeft:8,
        paddingRight:8,
        paddingTop:7,
        paddingBottom:8,
        textAlign:'left'
    },
    box: {
        flex:1,justifyContent:'center',
        alignItems:'center',
        shadowOffset: {width: 0, height: 1},
        shadowColor: '#404040',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        opacity:0.85
    },
    imgStyle:{
        width:36,
        height:36,
        marginLeft:32,
        marginTop:15
    },
    imgToast:{
        width:100,
        height:90,
        backgroundColor:'#404040',
        borderRadius:6,
        overflow:'hidden',
        
    },
    imgToastText:{
        fontSize:12,
        color:'#FFFFFF',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        textAlign:'center'
    }
});