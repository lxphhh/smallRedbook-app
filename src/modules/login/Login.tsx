import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
// import icon_wx from '../../assets/icon_wx.png';
import icon_wx_small from '../../assets/icon_wx_small.png';

// type Props = {};

const Login = () => {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(true);

  const handleSelect = () => {
    setCheck(!check);
  };

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      otherLoginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherLoginText: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        transform: [{rotate: '180deg'}],
        marginLeft: 6,
      },
      // 微信
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      // 一键
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      andColor: {
        color: '#999',
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      // 从上往下开始布局
      <View style={styles.root}>
        <View style={allStyles.protocolLayout}>
          <TouchableOpacity onPress={handleSelect}>
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》
              <Text style={styles.andColor}>和</Text>
              《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.otherLoginBtn}
          onPress={() => {
            setLoginType(type => {
              return type === 'quick' ? 'input' : 'quick';
            });
          }}>
          <Text style={styles.otherLoginText}>其他登录方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>
        {/* <Image style={styles.logo_main} source={logo_main_png} /> */}

        {/* 点击按钮 */}
        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginTxt}>微信登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginTxt}>一键登陆</Text>
        </TouchableOpacity>

        <Image style={styles.logoMain} source={icon_logo_main} />
      </View>
    );
  };

  const renderInputLogin = () => {
    return (
      <View>
        {/* <Image style={allStyles.logo_main} source={icon_logo_main} /> */}
      </View>
    );
  };

  return (
    <View style={allStyles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const allStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  logo_main: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },

  protocolTxt: {
    width: '100%',
    fontSize: 12,
    color: '#1020ff',
  },
});

export default Login;
