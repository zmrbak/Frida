class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        console.log("Frida.version", Frida.version);
    }

    show_process() {
        console.log("Process.id:\t\t", Process.id);
        console.log("Process.arch:\t\t", Process.arch);
        console.log("Process.platform:\t", Process.platform);
        console.log("Process.pageSize:\t", Process.pageSize);
        console.log("Process.pointerSize:\t", Process.pointerSize);
        console.log("Process.codeSigningPolicy:\t", Process.codeSigningPolicy);
        console.log("Process.isDebuggerAttached():\t", Process.isDebuggerAttached());
        console.log("Process.getCurrentThreadId():\t", Process.getCurrentThreadId());
        console.log("Process.getCurrentThreadId():\t", Process.getCurrentThreadId());

        // let threads = Process.enumerateThreads();
        // for (const iterator of threads) {
        //     console.log(JSON.stringify(iterator));
        // }

        // let modules = Process.enumerateModules();
        // for (const iterator of modules) {
        //     console.log(JSON.stringify(iterator));
        // }

        // let ranges = Process.enumerateRanges("rwx");
        // for (const iterator of ranges) {
        //     console.log(JSON.stringify(iterator));
        // }

        let mallocRanges = Process.enumerateMallocRanges();
        for (const iterator of mallocRanges) {
            console.log(JSON.stringify(iterator));
        }

    }
}

let fridaDemo = new FridaDemo();
fridaDemo.show_process();