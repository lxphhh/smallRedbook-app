import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import UserStore from '../../stores/UserStore';

// 图片
import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import MineStore from '../../stores/MineStore';

const Mine = () => {
  const store = useLocalStore(() => new MineStore());
  const {userInfo} = UserStore;

  useEffect(() => {
    store.requestAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      menuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        tintColor: 'white',
      },
      rightMenuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Image source={icon_menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Image source={icon_shop_car} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Image source={icon_share} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderInfo = () => {
    const styles = StyleSheet.create({
      avatarLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: 'cover',
        borderRadius: 48,
      },
      addImg: {
        width: 28,
        height: 28,
        marginLeft: -28,
        marginBottom: 2,
      },
      nameTxt: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
      },
      nameLayout: {
        marginLeft: 20,
      },
      idLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: '#bbb',
      },
      descTxt: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal: 16,
      },
      sexLayout: {
        height: 24,
        width: 32,
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff50',
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
      },
      infoLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28,
        paddingRight: 16,
      },
      infoItem: {
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 6,
      },
      infoValue: {
        fontSize: 18,
        color: 'white',
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: '#ffffff',
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: '#ffffff',
      },
    });
    const {
      avatar = '',
      nickName = '',
      redBookId = '',
      desc = '',
      sex = '',
    } = userInfo;
    const {info} = store;
    // console.log('userInfo', userInfo);
    console.log('info', info);
    return (
      <>
        <View style={styles.avatarLayout}>
          {avatar && <Image style={styles.avatarImg} source={{uri: avatar}} />}
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <View style={styles.idLayout}>
              <Text style={styles.idTxt}>小红书号: {redBookId}</Text>
              <Image source={icon_qrcode} style={styles.qrcodeImg} />
            </View>
          </View>
        </View>
        <Text style={styles.descTxt}>{desc || '点击这里, 填写简介'}</Text>
        <View style={styles.sexLayout}>
          <Image
            style={styles.sexImg}
            source={sex === 'male' ? icon_male : icon_female}
          />
        </View>
        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info?.followCount ?? ''}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.favorateCount}</Text>
            <Text style={styles.infoLabel}>获赞与收藏</Text>
          </View>
          {/* 占位 */}
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Image style={styles.settingImg} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.root}>
      <Image source={icon_mine_bg} style={styles.bgImg} />
      {renderTitle()}
      <ScrollView style={styles.scrollView}>{renderInfo()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
});

export default observer(Mine);
