import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        // let module = Process.getModuleByName("winmine.exe");
        // MemoryAccessMonitor.enable(
        //     { base: module.base, size: module.size },
        //     {
        //         onAccess(details) {
        //             // console.log(JSON.stringify(details));
        //             console.log("address", details.address, "from", details.from, "operation", details.operation, "pageIndex", details.pageIndex, "pagesCompleted", details.pagesCompleted, "pagesTotal", details.pagesTotal, "rangeIndex", details.rangeIndex);
        //             console.log();
        //         },
        //     });

        // let rangs = Process.enumerateRanges("rw");
        let rangs = Process.enumerateMallocRanges().filter(x => x.size > 2000);
        for (const iterator of rangs) {
            console.log(JSON.stringify(iterator));

        }
        MemoryAccessMonitor.enable(
            rangs,
            {
                onAccess(details) {
                    // console.log(JSON.stringify(details));
                    console.log("address", details.address, "from", details.from, "operation", details.operation, "pageIndex", details.pageIndex, "pagesCompleted", details.pagesCompleted, "pagesTotal", details.pagesTotal, "rangeIndex", details.rangeIndex);
                    console.log();
                },
            });
        console.log("MemoryAccessMonitor OK");

    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();