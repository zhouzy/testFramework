/**
 *
 * Author zhouzy
 * Date   2018/7/31
 */
import {createDataLinkClient,createDataLinkServer} from './dataLink';

const isDebugger = true;

class Emitter{
    emit(message,data){
        isDebugger && console.log("emit[%s],%s",message,JSON.stringify(data));

        return new Promise((resolve, reject) => {
            let s = createDataLinkServer(message).onPacket(d => {
                isDebugger && console.log("emit onPacket[%s],%s",message,JSON.stringify(d));
                resolve({
                    data: d
                });
            });
            s.send({
                message: message,
                data: data || {}
            });
        });
    }
    on(message,fn){
        isDebugger && console.log("bind->[%s]",message);
        let client = createDataLinkClient(message);
        client.onPacket(m => {
            isDebugger && console.log("on onPacket[%s],%s",message,JSON.stringify(m));
            if(m){
                let data = m.data;
                let re = fn(data);
                client.send(re);
            }
        });
    }

    onPublic(namespace,message,data){
        isDebugger && console.log("broadcast->[%s->%s],%s",namespace,message,JSON.stringify(data));
        return new Promise((resolve, reject) => {
            let server = createDataLinkServer(namespace).onPacket(d => {
                isDebugger && console.log("broadcast onPacket[%s->%s],%s",namespace,message,JSON.stringify(d));
                if(d.message === message){
                    resolve(d);
                }
            });
            server.send({
                message: message,
                data: data
            });
        });
    }

}

let _emitter = window._emitter = window._emitter || new Emitter();

export default _emitter;
