/**
 * 打包各个测试包需要注入到主页中minix
 * Author zhouzy
 * Date   2018/7/31
 */

import userTest from "@/test-framework/userTest/mixin.js";
import teleActivity from "@/test-framework/teleActivity/mixin.js";
import contactHistory from "@/test-framework/contactHistory/mixin.js";

//export default [userTest.mainAppMixin, teleActivity.mainAppMixin,contactHistory.mainAppMixin];
export default [userTest.mainAppMixin];
