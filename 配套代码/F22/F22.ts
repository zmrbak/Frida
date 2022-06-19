class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        // console.log("Frida", JSON.stringify(Frida, null, 4));
        // console.log("Process", JSON.stringify(Process, null, 4));

    }

    demo() {
        let str1 = "This is a string! 你好！";
        console.log(str1);

        let m1 = Memory.alloc(4);
        let m2 = Memory.allocAnsiString(str1);
        let m3 = Memory.allocUtf16String(str1);
        let m4 = Memory.allocUtf8String(str1);

        console.log(m2);

        // console.log(m2.readAnsiString());
        // console.log(m2.readCString());
        // console.log(m2.readUtf8String());
        // console.log(m2.readUtf16String());

        let ab = m2.readByteArray(str1.length * 2 + 2);
        // console.log(ab?.byteLength);

        let i8 = new Int8Array(ab!);
        // let i8 = new Int32Array(ab!);
        // let i8 = new String(ab!);

        // for (const iterator of i8) {
        //     console.log(iterator);
        // }

        // console.log("b1", i8.map(x => String.fromCharCode(x)).join(""));

        let b1 = Array.prototype.slice.call(new Int8Array(ab!));
        console.log("b1", b1.map(x => String.fromCharCode(x)).join(""));

        // console.log(ab);
        // console.log(m2.readPointer());
        // console.log(m2.readS8().toString(16));
        // console.log(m2.readFloat());
        // console.log(m2.readDouble());

        // m1.writeU8(0xF8);
        // console.log(m1.readU8());
        // console.log(m1.readS8());

        // let p1 = ptr(1);
        // console.log(p1.isNull());
        // console.log(p1.add(100).toInt32());

        // let p2 = new NativePointer("0x12345678");

        // let p3 = ptr(1);
        // let p4 = ptr(0x11223344);
        // console.log(p3 == p4);
        // console.log(p3.equals(p4));
        // console.log(p3.compare(p4));
        // console.log("3".localeCompare("3"));
        // console.log(p4);
        // console.log(p4.toString());
        // console.log(p4.toJSON());
        // console.log(p4.toMatchPattern());

    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();