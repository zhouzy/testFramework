/**
 * 全窗口数据链路通道
 *
 * 兼容 iFrame
 * iFrame sessionStorage 状态监听实现通信
 *
 * 一个链路包含发送端和接受端
 * 第一步创建发收端,第二步创接收端，第三步发送消息
 * 一个接受端可以有多个发送端
 * 在跨 iFrame 的情况下，首先C端在sessionStorage channelListItemName map 写入 channelName:{C:ID,S:ID}
 * S端初始化时，从sessionStorage中取到自己的S ID 和监听ID
 *
 * Author zhouzy
 * Date   2018/11/21
 */

const ChannelListItemName = "_channelNameList";

const isDebugger = true;

class DataLink{
    constructor(channelName,type){
        if(!~["S","C"].indexOf(type)){
            throw new Error("Channel need type");
        }

        let t = new Date().getTime();

        this.channelName = channelName;
        this.type = type;
        this.fn = null;
        this.isInWindow = false;

        this.sendId = null;
        this.id = channelName + "_" + t + "_" + type;

        this.C = null;
        this.S = null;

        let channelList = sessionStorage.getItem(ChannelListItemName);

        if(channelList){
            channelList = JSON.parse(channelList);
        }
        else{
            channelList = {};
        }

        let listenIdPrev = channelName + "_" + t;

        if(type === "C"){
            this.listenId = listenIdPrev + "_S";
            channelList[this.channelName] = {
                C: this.id,
                S: this.listenId//在server
            };

            Object.keys(sessionStorage).forEach(i => {
                if(~i.indexOf(channelName)){
                    sessionStorage.removeItem(i);
                }
            });

            console.log("[Client] id=" + this.listenId);
            sessionStorage.setItem(ChannelListItemName,JSON.stringify(channelList));
        }

        else if(type === "S"){
            if(channelList[this.channelName]){
                this.id = channelList[this.channelName].S;
                this.listenId = listenIdPrev + "_C";
            }
            this.isInWindow = !!channelList[this.channelName] && window[channelList[this.channelName].C];
            if(this.isInWindow){
                window[channelList[this.channelName].C].isInWindow = true;
                window[channelList[this.channelName].C].S = this;
                this.C = window[channelList[this.channelName].C];
            }
            isDebugger && console.log("[Server] id=" + this.listenId);
        }

        window.channelList = channelList;
        window[this.id] = this;

        window.addEventListener("storage",e => {
            if(e.key === this.listenId){
                let value = JSON.parse(e.newValue);
                if(value){
                    let data = value.data;
                    this.fn && this.fn(data);
                }
                else{
                    this.fn && this.fn(value);
                }
            }
        });
    }

    writeData(sessionItem,data){
        let value = {
            _t: new Date().getTime(),
            data: data
        };
        sessionStorage.setItem(sessionItem, JSON.stringify(value));
    }

    send(data,sendId){
        sendId = this.type === "S" ? this.id : (sendId || this.id);
        isDebugger && console.log("channel-[%s] send %s",sendId,JSON.stringify(data));
        data = data || {};
        if(this.type === "S"){
            data.sendId = this.listenId;
        }
        if(this.isInWindow){
            let inst = this.type === "C" ? this.S : this.C;
            if(this.type === "C" && data.sendId){
                this.id = data.sendId;
            }
            inst && inst.fn(data);
        }
        else{
            let channelList = JSON.parse(sessionStorage.getItem(ChannelListItemName));
            if(channelList){
                sendId = this.type === "S" ? this.id : (sendId || this.id);
                this.writeData(sendId,data);
            }
            else{
                return false;
            }
        }
    }

    onPacket(fn){
        this.fn = fn;
        return this;
    }
}

function createDataLinkServer(cn){
    return new DataLink(cn,"S");
}

function createDataLinkClient(cn){
    return new DataLink(cn,"C");
}
export {
    DataLink,
    createDataLinkClient,
    createDataLinkServer,
};
