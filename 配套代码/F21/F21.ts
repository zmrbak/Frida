class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        // console.log("Frida", JSON.stringify(Frida, null, 4));
        // console.log("Process", JSON.stringify(Process, null, 4));

    }

    demo() {
        // let module = Process.getModuleByName("winmine.exe");
        // let module = Process.getModuleByName("user32.dll");
        let module = Process.getModuleByName("Kernel32.dll");
        // console.log("module", JSON.stringify(module, null, 4));

        // console.log("Imports:");
        // for (const iterator of module.enumerateImports()) {
        //     console.log(JSON.stringify(iterator));
        // }

        // console.log("Exports:");
        // for (const iterator of module.enumerateExports()) {
        //     console.log(JSON.stringify(iterator));
        // }

        // console.log("Symbols:");
        // for (const iterator of module.enumerateSymbols()) {
        //     console.log(JSON.stringify(iterator));
        // }

        //enumerateRanges
        // console.log("Ranges:");
        // for (const iterator of module.enumerateRanges("r--")) {
        //     console.log(JSON.stringify(iterator));
        // }

        //{"type":"function","name":"lstrlenW","address":"0x7630e0b0"}
        // let p = module.findExportByName("lstrlenW");
        // console.log(p);

        // let p1 = Module.load("C:\\DBGHELP.DLL");
        // console.log(JSON.stringify(p1));
        // console.log("Exports:");
        // for (const iterator of p1.enumerateExports()) {
        //     console.log(JSON.stringify(iterator));
        // }

        // console.log("Imports:");
        // for (const iterator of p1.enumerateImports()) {
        //     console.log(JSON.stringify(iterator));
        // }


    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();