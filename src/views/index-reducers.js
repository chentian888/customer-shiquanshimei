/*
 * @Author: chentian
 * @Date: 2019-02-23 13:00:43
 * -----
 * @Modified By: chentian
 * @Last Modified: 2019-02-23 13:00:43
 */
import outlets from './outlets/reducer';
import outletDetail from './outletDetail/reducer';
import modifyinfo from './userCenter/modifyinfo/reducer';
import memberinfo from './userCenter/memberinfo/reducer';
import userinfo from './userCenter/userinfo/reducer';

import message from './message/messageList/reducer';
import messageadd from './message/messageAdd/reducer';
import logList from './log/logList/reducer';
import memberListPage from './member/memberList/reducer';

import app from './app-reducer';

export default {
    app,
    outlets,
    outletDetail,
    modifyinfo,
    memberinfo,
    userinfo,
    message,
    messageadd,
    logList,
    memberListPage
};
