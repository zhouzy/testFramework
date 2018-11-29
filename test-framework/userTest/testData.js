/**
 *
 * Author zhouzy
 * Date   2018/8/15
 */
let _t = new Date().getTime();
const testData = {
    userId: "1000231034",
    password1: "",
    password2: "1",
    password3: "走",
    password4: "123456",
    userData:{
        email: "test_" + _t + "@channelsoft.com",
        telPhone: "180" + ("" + _t).slice(0,8),
        fixedPhone: "0288" + ("" + _t).slice(0,7),
        userDesc: "测试用户备注" + _t,
        remark: "测试用户详细信息" + _t,
        roleId: "7",
        nickName: "测试用户呢称" + _t,
        //trialEndTime: new Date("2018/12/20 00:00:00")
    }
};
export default testData;
