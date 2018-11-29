/**
 * 测试框架入口文件
 * Author zhouzy
 * Date   2018/7/30
 */

import userTest from "./userTest/test.js";
import teleActivityTest from "./teleActivity/test";
import contactHistoryTest from "./contactHistory/test";
import Vue from 'vue';
import consolePanelPlugin from "./test-panel/console-panel-plugin.js";
import util from "./util.js";

Vue.use(consolePanelPlugin);

function Controller() {
    this.nodeList = [userTest,contactHistoryTest,teleActivityTest];
    // 错误日志
    this.errorLog = {};
}

Controller.prototype.start = function () {
    this.nodeRun();
};

Controller.prototype.nodeRun = function () {
    if (this.nodeList.length) {
        let node = this.nodeList.shift();
        node.run().then(l => {
            if (l.success) {
                this.nodeRun();
                util.log(l.message);
            }
            else {
                Object.assign(this.errorLog, l);
            }
        });
    }
    else {
        //报告成功
        console.table(this.errorLog);
    }
};

export default new Controller()


