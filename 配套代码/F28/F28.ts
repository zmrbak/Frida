import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        //DispatchMessageW
        let address = Module.getExportByName("User32.dll", "DispatchMessageW");
        // console.log(JSON.stringify(Interceptor));
        Interceptor.attach(address, {
            onEnter(this, args) {

                // console.log(this.context, this.depth, this.errno, this.lastError, this.returnAddress, this.threadId);
                console.log(JSON.stringify(this.context));

                // typedef struct tagMSG {
                //   HWND   hwnd;
                //   UINT   message;
                //   WPARAM wParam;
                //   LPARAM lParam;
                //   DWORD  time;
                //   POINT  pt;
                //   DWORD  lPrivate;
                // } MSG, *PMSG, *NPMSG, *LPMSG;                
                // console.log(args[0]);
                // console.log(args[1]);
                // console.log(args[2]);
                // console.log(args[3]);
                // console.log(args[4]);
                // console.log(args[5]);
                // let msg = args[0];

                // console.log("hwnd", msg.readPointer());
                // console.log("message", msg.add(4).readPointer());
                // console.log("wParam", msg.add(8).readPointer());
                // console.log("lParam", msg.add(12).readPointer());
                // console.log("pt", msg.add(20).readPointer());
                // console.log("lPrivate", msg.add(24).readPointer());

            },
            onLeave(this, retval) {
                console.log(JSON.stringify(this.context));
                console.log(retval);

            },
        });

    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();