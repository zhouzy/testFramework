<template>
    <div class="test-panel">
        <a class="test-panel__toggle-btn" @click="panelVisible = !panelVisible">打开/关闭</a>
        <!-- 测试功能列表 -->
        <div class="test-panel__content" v-show="panelVisible">
            <div>
                <el-tree :data="testList" :props="defaultProps"></el-tree>
            </div>

            <!-- 工具栏 -->
            <div> </div>

            <!-- 测试参数录入区域 -->
            <div>

            </div>

            <!-- 日志 -->
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'console-panel',
        props: ["testList"],
        created(){
            console.log(JSON.stringify(this.testList));
            this.testTreeData = this.testList;
        },
        data(){
            return {
                panelVisible: true,
                testTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },

    };
</script>

<style lang="less" scoped>
    .test-panel{
    }
    .test-panel__toggle-btn{
        position: fixed;
        z-index:40001;
        right:10px;
        top:60px;
        bottom:0;
        width:60px;
        height:60px;
        line-height:60px;
        text-align:center;
        color:#fff;
        border-radius: 50%;
        font-size:12px;
        background:#0e90d2;
        border:1px solid #0fb2fc;
    }
    .test-panel__content{
        background:rgba(200,200,200,0.8);
        box-shadow: -1px 0 8px 1px #d6d6d6;
        border-left:1px solid rgb(200,200,200);
        position: fixed;
        z-index:40000;
        right:0;
        top:0;
        bottom:0;
        width:500px;
    }
</style>
