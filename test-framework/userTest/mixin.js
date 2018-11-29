/**
 * 测试用户修改密码的minix
 * Author zhouzy
 * Date   2018/7/31
 */
import message from "../core/emitter.js";
import en from "./eventName";
import Vue from "vue";
import util from "../util";

const mainAppMixin = {
    mounted(){
        message.on(en.openUserDetail,(data) => {
            debugger;
            this.openTab({
                url: "/views/userManage/userDetails.html?userId=" + data.userId,
                title: "测试用户详情",
            });
        });
    }
};

const mountedHandler = {
    userDetailsApp: {
        onWatchUserData(){
            let self = this;
            if(this.userData != null){
                return Promise.resolve(true);
            }
            else{
                return new Promise((resolve,reject) => {
                    self.$watch("userData",(v) => {
                        if(v === null){
                            resolve(true);
                        }
                    });
                });
            }

        }
    },
    userInfo: {
        onOpenPswModal(){
            this.resetPassword();
        },
        onOpenEditUser(){
            this.openEditUser();
        },
        onUpdateUserDetail(data){
            Object.assign(this.userData,data);
            this.modifyFieldMap = data;
            return this.updateUser().then(resp => {
                return resp.data.success;
            });
        },
    },
    resetPasswordModal: {
        onValidatePassword(){
            return this.validate();
        },
        onSetPassword(p){
            this.newPassword = p;
        },
        onUpdatePassword(){
            return this.submit().then(resp => {
                return resp.data.success;
            });
        }

    }
};

const appMixin = {
    mounted(){
        util.bindHandler(this,this.$options.name,mountedHandler);
    }
};

function mixin4test(){
    Vue.mixin(appMixin);
}

export default {
    mainAppMixin: process.env.NODE_ENV === 'TEST' ? mainAppMixin : {},
    mixin4test: process.env.NODE_ENV === 'TEST' ? mixin4test : () => {}
}
