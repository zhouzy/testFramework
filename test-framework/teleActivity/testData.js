export default{
    createActivityInfoForm: {
        // 通过en属性判定测试绑定的事件
        en: 'requestAddActivity',
        // 活动名称
        activityName: 'wuly_创建活动测试',
        // 活动状态
        status: '0',
        // 名单分配方式
        distributeWay: '0',
        // 话术选中的值(数组)
        huashuValues: [],
        // 自动展示话术
        autoShowHuashu: '0',
        // 外显号码
        displayNumber: '2023',
        // 号码保护规则
        numberProtect: '1',
        attachGroupId: '1000006971',
        attachGroupName: '成都开发企业支持组',
        attachUserId: '1000230818',
        attachUserName: '王勇',
        // 活动到期时间
        endTime: new Date('2019-08-09 12:00:00'),
        // 活动描述
        activityDescrible: 'hello world',
        // 活动执行者
        executorList: [{"userId":"1000230818","userName":"王勇","groupId":"1000006971","groupName":"成都开发企业支持组"}],
        executeUsers: [{"userId":"1000230818","userName":"王勇","groupId":"1000006971","groupName":"成都开发企业支持组"}]
    },
    allotInfoForm: {
        // 活动名称
        activityName: 'Kun_ly',
        // 活动描述
        activityDesc: 'just for test',
        // 已选中的批次
        selectedBatchesArr: [],
        // 执行者列表
        executorList: []
    }
}
