import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        // for (const iterator of Process.enumerateThreads()) {
        //     console.log("iterator", JSON.stringify(iterator));
        // }
        console.log("Main Thread:", Process.enumerateThreads()[0].id);

        console.log("CurrentThreadId", Process.getCurrentThreadId());

        let address = Module.getExportByName("User32.dll", "InvalidateRect");
        console.log("address", address);

        let listener = Interceptor.attach(address, {
            onEnter(this, args) {
                console.log("CurrentThreadId2", Process.getCurrentThreadId());
                console.log("onEnter");
                this["AAA"] = "1234";
            },
            onLeave(this, retval) {
                console.log("onLeave");
                console.log(this["AAA"]);
                listener.detach();
            },
        });
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();