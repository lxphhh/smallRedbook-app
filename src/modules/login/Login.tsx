import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Toast from '../../components/widget/Toast';
import {formatPhone, isPlatformIos, replaceBlank} from '../../utils/StringUtil';
import UserStore from '../../stores/UserStore';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';

// type Props = {};

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  // 同意协议
  const [check, setCheck] = useState<boolean>(false);
  // 眼睛
  const [eyeOpen, setEyeOpen] = useState<boolean>(false); // 默认不显示密码
  // value
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  // 当前是否可以登录
  const canLogin = phone?.length === 13 && pwd?.length >= 6;

  const handleSelect = () => {
    setCheck(!check);
  };

  const insets = useSafeAreaInsets();

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
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
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
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: 64,
        fontSize: 24,
        color: '#333',
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2424',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      loginButtonDisable: {
        width: '100%',
        height: 56,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      iconWx: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 26,
        top: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });

    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录之后将自动注册</Text>
        {/* 账号输入开始 */}
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}> +86</Text>
          <Image style={[styles.triangle]} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholder="请输入手机号码"
            placeholderTextColor={'#bbb'}
            autoFocus={false}
            maxLength={13}
            keyboardType="number-pad"
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder="输入密码"
            autoFocus={false}
            secureTextEntry={!eyeOpen}
            maxLength={6}
            keyboardType="number-pad"
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginTxt}>验证码登陆</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
        </View>
        {/* 账号输入结束 */}

        {/* 登录按钮 */}
        <TouchableOpacity
          style={canLogin ? styles.loginButton : styles.loginButtonDisable}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={async () => {
            console.log('点');
            if (!canLogin || !check) {
              return;
            }
            // // const purePhone = replaceBlank(phone);
            // const {data} = await request('login', {
            //   name: 'dagongjue',
            //   pwd: '123456',
            // });
            // console.log('res', data);
            // 18751609896
            UserStore.requestLogin(
              replaceBlank(phone),
              pwd,
              (success: boolean) => {
                if (success) {
                  navigation.replace('MainTab');
                } else {
                  Toast.show('登录失败');
                }
              },
            );
            // navigation.replace('MainTab');
            // }
          }}>
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>

        {/* 协议 */}
        <View style={allStyles.protocolLayout}>
          <TouchableOpacity onPress={handleSelect}>
            <Image
              style={allStyles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}
            activeOpacity={0.7}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》
              <Text style={allStyles.andColor}>和</Text>
              《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>

        {/* 其他登录方式 */}

        <View style={styles.wxqqLayout}>
          <Image style={styles.iconWx} source={icon_wx} />
          <Image style={styles.iconQQ} source={icon_qq} />
        </View>
        {/* 返回快速登录 */}
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              top: isPlatformIos() ? insets.top : 24,
            },
          ]}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}
          activeOpacity={0.7}>
          <Image style={styles.closeImg} source={icon_close_modal} />
        </TouchableOpacity>
      </SafeAreaView>
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
  radioButton: {
    width: 20,
    height: 20,
  },
  protocolTxt: {
    width: '100%',
    fontSize: 12,
    color: '#1020ff',
  },
  andColor: {
    color: '#999',
  },
});

export default Login;
