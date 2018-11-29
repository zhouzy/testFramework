/**
 * 打开用户详情并修改密码验证流程
 * Author zhouzy
 * Date   2018/7/31
 */

import message from "../core/emitter.js";
import _t from "../core/T.js";
import en from "./eventName.js";
import util from "../util.js";
import testData from "./testData.js";

function Test(){}

function beforeAll(){
    _t.beforeAll(() => {
        message.emit(en.openUserDetail);
        return new Promise((resolve, reject) => {
            message.on(en.userDetailsAppReady, ()=>{
                resolve();
            });
        });
    });
}

function beforeEach(){
    _t.beforeEach(() => {
        message.emit(en.openPswModal,{
            userId: testData.userId
        });
    });
}

function autoRun(){
    return _t.describe("用户详情",() => {
        beforeAll();
        beforeEach();
        f1();
        f2();
    });
}

function f1(){
    return _t.it("用户详情密码设置", (resolve,reject) => {
        util.log("设置密码并验证密码:" + testData.password1);
        _t.to("resetPasswordModal",en.setPassword,testData.password1).expect("resetPasswordModal",en.validatePassword).equal(false).catch(e => {
            util.log("设置密码并验证密码:" + testData.password1 + "未通过");
            reject("密码验证未通过 -> " + testData.password1);
        });

        util.log("设置密码并验证密码:" + testData.password2);
        _t.to("resetPasswordModal",en.setPassword,testData.password2).expect("resetPasswordModal",en.validatePassword).equal(false).catch(e => {
            util.log("设置密码并验证密码:" + testData.password2 + "未通过");
            reject("密码验证未通过 -> " + testData.password2);
        });

        util.log("设置密码并验证密码:" + testData.password3);
        _t.to("resetPasswordModal",en.setPassword,testData.password3).expect("resetPasswordModal",en.validatePassword).equal(false).catch(e => {
            util.log("设置密码并验证密码:" + testData.password3 + "未通过");
            reject("密码验证未通过 -> " + testData.password3);
        });

        util.log("设置密码并验证密码:" + testData.password4);
        _t.to("resetPasswordModal",en.setPassword,testData.password4).expect("resetPasswordModal",en.validatePassword).equal(true).catch(e => {
            util.log("设置密码并验证密码:" + testData.password4 + "未通过");
            reject("密码验证未通过 -> " + testData.password4);
        });

        util.log("更新密码");
        _t.expect("resetPasswordModal",en.updatePassword).equal(true).catch(e => {
            util.log("更新密码:未通过");
            reject("更新密码:未通过");
        });
        resolve();
    });
}

function f2(){
    return _t.it("修改用户资料", (resolve,reject) => {
        //测试用户资料编辑
        util.log("编辑用户资料");
        _t.to("userInfo",en.openEditUser).expect("userInfo",en.updateUserDetail,testData.userData).equal(true).catch(e => {
            util.log("编辑用户资料" + JSON.stringify(testData.userData) + "未通过");
            reject("编辑用户资料" + JSON.stringify(testData.userData) + "未通过");
        });
    });
}

Test.prototype.run = async function(){
    await autoRun().then(() => {
        debugger;
        return {
            success: true,
            message: "用户详情测试成功"
        };
    }).catch(e => {
        return {
            success: false,
            message: "用户详情测试失败"
        }
    });
};

export default new Test();
