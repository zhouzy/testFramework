/**
 *
 * Author zhouzy
 * Date   2018/7/31
 */
import emitter from "./emitter.js";

function T(){
    this._beforeAllCallBack= null;
    this._beforeEachCallBack= null;
    this._itList = [];
}

T.prototype.beforeAll = function(cb){
    this._beforeAllCallBack = async function(){
        await cb();
    };
};

T.prototype.beforeEach = function(cb){
    this._beforeEachCallBack = async function(){
        await cb();
    };
};

T.prototype.describe = async function(desc,cb){
    console.log(desc);
    this._beforeEachCallBack = null;
    this._itList = [];
    cb && cb();

    for(let it of this._itList){
        await it();
    }
};

T.prototype.it = function(desc,cb){
    console.log(desc);
    this._itList.push(async () => {
        let _cb = () => {
            return new Promise((resolve, reject) => {
                cb && cb(resolve,reject);
            });
        };
        if(this._beforeAllCallBack){
            await this._beforeAllCallBack();
            this._beforeAllCallBack = null;
        }
        if(this._beforeEachCallBack){
            await this._beforeEachCallBack();
        }
        await _cb();
    });
};

T.prototype.to = function(namespace,message,data){
    this._to = async function (){
        await emitter.broadcast(namespace,message,data);
    };
    return this;
};

T.prototype.expect = function(namespace,message,data){
    this._expect = async function (){
        return await emitter.broadcast(namespace,message,data);
    };
    return this;
};

T.prototype.equal = function(v){
    let self = this;
    if(self._to) {
        self._to();
    }
    return self._expect().then(data => {
        if(v !== data.data){
            throw new Error(v + " not Equal " + data.data);
        }
    });
};


export default new T();
