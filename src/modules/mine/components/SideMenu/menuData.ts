import icon_setting from '../../../../assets/icon_setting.png';
import icon_service from '../../../../assets/icon_service.png';
import icon_scan from '../../../../assets/icon_scan.png';
import icon_fid_user from '../../../../assets/icon_find_user.png';
import icon_draft from '../../../../assets/icon_draft.png';
import icon_create_center from '../../../../assets/icon_create_center.png';
import icon_browse_histroy from '../../../../assets/icon_browse_history.png';
import icon_packet from '../../../../assets/icon_packet.png';
import icon_free_net from '../../../../assets/icon_free_net.png';
import icon_nice_goods from '../../../../assets/icon_nice_goods.png';
import icon_orders from '../../../../assets/icon_orders.png';
import icon_shop_car from '../../../../assets/icon_shop_car.png';
import icon_coupon from '../../../../assets/icon_coupon.png';
import icon_wish from '../../../../assets/icon_wish.png';
import icon_red_vip from '../../../../assets/icon_red_vip.png';
import icon_community from '../../../../assets/icon_community.png';
import icon_exit from '../../../../assets/icon_exit.png';

export const MENUS = [
  [{icon: icon_fid_user, name: '发现好友'}],
  [
    {icon: icon_draft, name: '我的草稿'},
    {icon: icon_create_center, name: '创作中心'},
    {icon: icon_browse_histroy, name: '浏览记录'},
    {icon: icon_packet, name: '钱包'},
    {icon: icon_free_net, name: '免流量'},
    {icon: icon_nice_goods, name: '好物体验'},
  ],
  [
    {icon: icon_orders, name: '订单'},
    {icon: icon_shop_car, name: '购物车'},
    {icon: icon_coupon, name: '卡券'},
    {icon: icon_wish, name: '心愿单'},
    {icon: icon_red_vip, name: '小红书会员'},
  ],
  [
    {icon: icon_community, name: '社区公约'},
    {icon: icon_exit, name: '退出登陆'},
  ],
];

export const BOTTOM_MENUS = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助与客服'},
  {icon: icon_scan, txt: '扫一扫'},
];
