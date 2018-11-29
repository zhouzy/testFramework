import message from "../core/emitter.js";
import en from "./eventName.js";

function Test(options){

}

Test.prototype.run = function(){
    //打开外呼活动页
    return new Promise((resolve, reject) => {
        message.emit(en.openTeleActivity);
        message.on(en.openTeleActivityReady, () => {
            message.emit(en.openAddActivity);
        });

        message.on(en.AllotListTestEnd, () => {
            message.emit(en.teleActivityTestEnd);
        });

        message.on(en.openAddActivityReady, () => {
            message.emit(en.validateactivityInfoForm);
        });


        message.on(en.teleActivityTestEnd, () => {
            resolve({
                success: true,
                message: "新建活动测试完成"
            });
        });

        message.on(en.catchError, data => {
            reject(data);
        });
    });
};

export default new Test();
