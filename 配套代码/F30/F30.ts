import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        // Process.getModuleByAddress(ptr(0x11223344));
        // Process.getModuleByName("module.name");
        // Process.enumerateModules();
        let moduleMap = new ModuleMap((m: Module) => { return m.name.endsWith("dll"); });
        for (const iterator of moduleMap.values()) {
            console.log(JSON.stringify(iterator));
        }

        console.log(JSON.stringify(moduleMap.find(ptr(0x736c0000).add(0x10))));
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();