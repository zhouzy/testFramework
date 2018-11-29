import message from "../core/emitter.js";
import testData from "./testData.js";
import en from "./eventName";
import Vue from "vue";
import util from "../util.js";

const mainAppMixin = {
    mounted() {
        message.on(en.openTeleActivity, () => {
            this.openTab({
                url: "/views/teleActivity/index.html?permissionId=81",
                title: "外呼活动",
            });
        });
    }
};

const appMixin = {
    mounted() {
        if (this.$options.name === "TeleActivityApp") {
            message.on(en.openAddActivity, () => {
                this.$router.push({
                    path: '/activity-manage/activity-create'
                });
            });

            message.emit(en.openTeleActivityReady);
        }

        if (this.$options.name === "ActivityCreate") {
            message.on(en.validateactivityInfoForm, () => {
                setTimeout(() => {
                    this.activityInfoForm = testData.createActivityInfoForm;

                    this.$nextTick().then(() => {
                        this.$refs.activityInfoForm.validate(valid => {
                            if (valid) {
                                util.log('添加活动表单验证通过');

                                this.$router.push({
                                    path: '/activity-manage/assign-list'
                                });
                            }
                        });
                    });
                }, 1000);
            });
            message.emit(en.openAddActivityReady);
        }

        if (this.$options.name === "AssignList") {
            message.on(en.validateallotInfoForm, () => {
                setTimeout(() => {
                    this.form = testData.allotInfoForm;
                    // 验证表单数据
                    /*this.$refs.form.validate((valid) => {
                        if (valid) {
                            util.log('活动分配名单验证通过');

                            message.emit(en.AllotListTestEnd);
                        }
                    });*/
                    message.emit(en.AllotListTestEnd);
                }, 1000);
            });
            message.emit(en.openAllotListReady);
        }
    }
};

function mixin4test() {
    Vue.mixin(appMixin);
}

export default {
    mainAppMixin,
    mixin4test
}
