import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        let resolver = new ApiResolver("module");
        // exports:*!open*, exports:libc.so!* or imports:notepad.exe!*
        //exports,imports
        //module,*
        //!
        //query ,*,?
        // for (const iterator of resolver.enumerateMatches("exports:*!Stringf*/i")) {
        for (const iterator of resolver.enumerateMatches("imports:winmine.exe!*w?r*")) {
            console.log(JSON.stringify(iterator));
        }
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();