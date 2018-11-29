/**
 *
 * Author zhouzy
 * Date   2018/11/19
 */
import ConsolePanelComponent from "./console-panel.vue";

let $cp;
class ConsolePanel{
    install(Vue,options) {
        let ConsolePanelComp = Vue.extend(ConsolePanelComponent);
        $cp = new ConsolePanelComp({
            el: document.createElement("div"),
            propsData: {
                testList: [{
                    label: "用户模块",
                    children: []
                }]
            },
        });
        document.body.appendChild($cp.$el);
    }
}

let consolePanel = new ConsolePanel();

export default consolePanel;
