import message from "../core/emitter.js";
import en from "./eventName";
import Vue from "vue";
import util from "../util";

const mainAppMixin = {
    mounted() {
        message.on(en.openContactHistory, (data) => {
            this.openTab({
                url: "/views/communicate/myCommIndex.html?permissionId=" + data.permissionId,
                title: "联络历史",
            });
        });
    }
};

const handler = {
    ContactHistoryApp: {},

    Sidebar: {
        onSwicthHistoryTab(data) {
            //切换左侧菜单栏
            return this.toggleMenu(data.index, data.title);
        },
    },

    ContactHistory: {
        onExportAllHistoryAndRecord() {
            //下载所有录音
            this.recordBtn('all');
            //打开导出联络历史的弹框
            this.exportResult('all');
            message.emit(en.exportResultAllReady);
            message.emit(en.queryContactHistoryDataReady);
        },

        onExportCommsHis(data) {
            let seletion = data.tableData;
            this.commIds = seletion.join(',');
            setTimeout(() => {
                //下载录音
                this.recordBtn('batch');
                //导出联络历史
                this.exportResult('batch');
                message.emit(en.exportResultBatchReady);
            }, 2000);
        },

        onOpenCustomerTab(skipParams) {
            //打开客户详情页
            this.viewDetails(skipParams);
        }
    },

    CustomFieldDialog: {
        onExportResultBatch() {
            this.exportResult('batch');
        },

        onExportResultAll() {
            this.exportResult('all');
        }
    },

    QueryPanel: {
        onQueryContactHistoryData(str) {
            //测试查询
            let _self = this;
            switch (str) {
                case 'strAni':
                    _self.formData.strAni = str;
                    break;
                case 'strDnis':
                    _self.formData.strDnis = str;
                    break;
                case 'userName' :
                    _self.formData.userName = str;
                    break;
                case 'source':
                    _self.formData.source = str;
                    break;
                case 'commBusinessType':
                    _self.formData.commBusinessType = str;
                    break;
                case 'creatorId':
                    _self.formData.creatorId = str;
                    break;
                case 'commType':
                    _self.formData.commType = str;
                    break;
                case 'customCreateFrom':
                    _self.formData.customCreateFrom = str;
                    break;
                case 'customCreateTo':
                    _self.formData.customCreateTo = str;
                    break;
            }
            return this.queryContactHistory();
        }
    }
};


const appMixin = {
    mounted() {
        util.bindHandler(this, this.$options.name, handler);
    }
};

function mixin4test() {
    Vue.mixin(appMixin);
}

export default {
    mainAppMixin,
    mixin4test,
}
