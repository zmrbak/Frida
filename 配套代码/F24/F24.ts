import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        // console.log(JSON.stringify(Memory));
        let module = Process.getModuleByName("winmine.exe");

        let p = ptr(0x00210604);
        let pattern = p.toMatchPattern();
        console.log("pattern", pattern);

        // Memory.scan(module.base, module.size, pattern, {
        // Memory.scan(module.base, module.size, "04 ?? ?1 ?0", {
        //     onMatch: (address, size) => {
        //         console.log("onMatch", size, address, address.sub(module.base));
        //     },

        //     onError: (reason) => {
        //         console.log(reason);
        //     },

        //     onComplete: () => {
        //         console.log("Scan Complete!");
        //     }
        // });
        // let matches = Memory.scanSync(module.base, module.size, pattern);
        // let matches = Memory.scanSync(module.base, module.size, "04 ?? ?1 ?0");
        // for (const iterator of matches) {
        //     console.log(JSON.stringify(iterator));
        // }

        // let m1 = Memory.alloc(Process.pageSize);
        // console.log("protect", JSON.stringify(Process.getRangeByAddress(m1)));
        // Memory.protect(m1, Process.pageSize, "r-x");
        // console.log("protect", JSON.stringify(Process.getRangeByAddress(m1)));

        let lpText = Memory.allocUtf16String("This is a string！");
        let lpCaption = Memory.allocUtf16String("Caption");

        // WinApi.MessageBox(p, lpText, lpCaption, 0x00000001);

        let m2 = Memory.alloc(Process.pageSize);
        console.log("m2", m2);
        let address = Module.getExportByName("User32.dll", "MessageBoxW");

        Memory.patchCode(m2, Process.pageSize, (code) => {
            // console.log("code", code);
            let asm = new X86Writer(code);
            asm.putPushU32(0x00000001);
            asm.putPushU32(lpCaption.toUInt32());
            asm.putPushU32(lpText.toUInt32());
            // asm.putPushU32(p.toUInt32());
            asm.putPushU32(0);
            asm.putCallAddress(address);
            asm.putRet();
            asm.flush();
        });

        let func = new NativeFunction(m2, "void", []);
        func();


    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();