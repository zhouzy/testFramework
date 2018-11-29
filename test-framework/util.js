import emitter from './core/emitter.js';

/**
 * mixin工具函数
 * Author zhouzy
 * Date   2018/8/15
 */

export default{
    bindHandler(self,name,handler){
        if(name){
            if(handler[name]){
                emitter.emit(name + "Ready");
                let handlers = handler[name];
                emitter.onPublic(name,(m,d)=> {
                    let fnName = m.replace(/^(\w)(\w*)$/,($0,$1,$2) => {
                        return "on" + $1.toUpperCase() + $2;
                    });
                    if(handlers[fnName]){
                        return handlers[fnName].call(self,d);
                    }
                });
            }
        }
    },
    log(message){
        console.log(`%c[CDesk Test] => ${message}`,'background: #324157; color: #fff; padding: 3px 5px; font-size: 12px; border-radius: 3px;')
    }
}
