import React, { Component } from 'react';
import {AppRegistry,View, ScrollView,Button, Text} from 'react-native';
import PACToastCell from "./src/cellToast";


export default class cellToast extends Component {
  constructor(props) {
      super(props);
  }
  render() {
      
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView style={{marginTop:20, marginBottom:49} }>
              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'text',
                      txt:'注意单行提示少于十五个汉字长度'
                      }
                  )}}
                title="按钮1（单行文字Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'text',
                      txt:'注意多行toast提示是大于十五个汉字提示的，任意字数都可以，建议控制在2行内'
                      }
                  )}}
                title="按钮2（多行文字Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'loadSucc'
                      }
                  )}}
                title="按钮3（加载成功Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'loadFail'
                      }
                  )}}
                title="按钮4（加载失败Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />


              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'loading',
                      showTime:20000                     }
                  )}}
                title="按钮5（自定义20秒加载中…Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

              <Button
                onPress={() => { this.refs.toast.show(
                    {
                      toastType:'loading',
                      showTime:'always'                      }
                  )}}
                title="按钮6（一直加载中…Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

              <Button
                onPress={() => { this.refs.toast.hide()}}
                title="按钮7（关闭加载中…Toast）"
                color="#FF6600"
                accessibilityLabel=""
              />

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

              <PACToastCell ref="toast" />

              
            </ScrollView>
          </View>
      );
  }
}

AppRegistry.registerComponent('cellToast', () => cellToast);
