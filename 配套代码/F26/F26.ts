import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        let address = Module.getExportByName("User32.dll", "MessageBoxW");
        let m2 = Memory.alloc(Process.pageSize);
        let asm = new X86Writer(m2);
        asm.putPushU32(0x00000001);
        asm.putPushU32(2);
        asm.putPushU32(3);
        asm.putPushU32(4);
        asm.putCallAddress(address);
        asm.putRet();
        asm.putPushReg("eax");
        asm.flush();

        // this.show_asm(m2);
        this.show_asm(ptr(0x01003E21));
    }

    show_asm(start: NativePointer, length: number = 10) {
        for (let index = 0; index < length; index++) {
            let inst = Instruction.parse(start);
            // console.log(JSON.stringify(inst));
            let byteArray = start.readByteArray(inst.size);
            let byteCode = Array.prototype.slice.call(new Uint8Array(byteArray!));
            let mCode = byteCode.map(x => x.toString(16).padStart(2, "0")).join(" ").toUpperCase();
            console.log(inst.address.toString().toUpperCase().replace("0X", "0x"), mCode.padEnd(14, " "), "\t", inst.toString().toUpperCase().replace("0X", "0x"));

            start = inst.next;
            if (start.readU32() == 0) break;
        }
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();