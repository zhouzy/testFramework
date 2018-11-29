import message from "../core/emitter.js";
import en from "./eventName.js";
import util from "../util";
import testData from "./testData";

function Test(options){

}

Test.prototype.run = function(){
    //打开联络历史页
    return new Promise((resolve, reject) => {
        util.log("测试联络历史开始");
        util.log("打开联络历史页开始");
        message.emit(en.openContactHistory,{
            permissionId: testData.permissionId,
        });

        message.on(en.ContactHistoryAppReady, () =>{
            util.log("打开联络历史页完成");
        });

        message.on(en.SidebarReady, () =>{
            util.log("测试左侧菜单切换:" + JSON.stringify(testData.menusData));
            message.broadcast("Sidebar",en.swicthHistoryTab,{
                menusData: testData.menusData
            });

            util.log("测试左侧菜单切换:" + JSON.stringify(testData.menusData1));
            message.broadcast("Sidebar",en.swicthHistoryTab,{
                menusData: testData.menusData1
            });

            util.log("测试左侧菜单切换:" + JSON.stringify(testData.menusData2));
            message.broadcast("Sidebar",en.swicthHistoryTab,testData.menusData2);

            util.log("测试左侧菜单切换:" + JSON.stringify(testData.menusData3));
            message.broadcast("Sidebar",en.swicthHistoryTab,testData.menusData3);

            util.log("测试左侧菜单切换:" + JSON.stringify(testData.menusData4));
            message.broadcast("Sidebar",en.swicthHistoryTab,testData.menusData4);
        });

        message.on(en.ContactHistoryReady, () =>{
            util.log("导出所有联络历史和录音");
            message.broadcast("ContactHistory",en.exportAllHistoryAndRecord);

            util.log("导出选择的联络历史和录音");
            message.broadcast("ContactHistory",en.exportCommsHis,{
                tableData: testData.tableData
            });

            util.log("测试打开客户详情页:" + JSON.stringify(testData.skipParams));
            message.broadcast("ContactHistory",en.openCustomerTab, testData.skipParams);

            util.log("测试打开客户详情页:" + JSON.stringify(testData.skipParams1));
            message.broadcast("ContactHistory",en.openCustomerTab, testData.skipParams1);

            util.log("测试打开客户详情页:" + JSON.stringify(testData.skipParams2));
            message.broadcast("ContactHistory",en.openCustomerTab, testData.skipParams2);
        });

        message.on(en.CustomFieldDialogReady, () =>{
            message.on(en.exportResultBatchReady,() =>{
                util.log("确认导出选择的联络历史和录音");
                message.broadcast("CustomFieldDialog",en.exportResultBatch);
            });

            message.on(en.exportResultAllReady,() =>{
                util.log("确认导出所有的联络历史和录音");
                message.broadcast("CustomFieldDialog",en.exportResultAll);
            });
        });

        message.on(en.QueryPanelReady, () =>{
            message.on(en.queryContactHistoryDataReady,()=>{
                util.log("根据筛选条件进行查询:" + testData.queryParams.strAni);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.strAni);

                util.log("根据筛选条件进行查询:" + testData.queryParams.strDnis);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.strDnis);

                util.log("根据筛选条件进行查询:" + testData.queryParams.userName);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.userName);

                util.log("根据筛选条件进行查询:" + testData.queryParams.source);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.source);

                util.log("根据筛选条件进行查询:" + testData.queryParams.commBusinessType);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.commBusinessType);

                util.log("根据筛选条件进行查询:" + testData.queryParams.creatorId);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.creatorId);

                util.log("根据筛选条件进行查询:" + testData.queryParams.commType);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.commType);

                util.log("根据筛选条件进行查询:" + testData.queryParams.customCreateFrom);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.customCreateFrom);

                util.log("根据筛选条件进行查询:" + testData.queryParams.customCreateTo);
                message.broadcast("QueryPanel",en.queryContactHistoryData,testData.queryParams.customCreateFrom);
            });
        });

        message.on(en.contactHistoryTestEnd, () => {
            resolve({
                success: true,
                message: "联络历史测试完成"
            });
        });

    });
};

export default new Test();
