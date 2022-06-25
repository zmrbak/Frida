import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        Socket.listen({ family: "ipv4", host: "127.0.0.1", port: 11223 })
            .then(this.socket_fulfill, (reason: any) => { console.log("socket_reject", reason); })
            .catch((reason: any) => { console.log("socket_reject", reason); })
            .finally(() => { console.log("socket_finally"); });
    }
    socket_fulfill(listener: SocketListener) {
        console.log("listener", JSON.stringify(listener));

        listener.accept()
            .then(FridaDemo.listener_fulfill, (reason: any) => { console.log("listener_reject", reason); })
            .catch((reason: any) => { console.log("listener_reject", reason); })
            .finally(() => { console.log("listener_finally"); });
        // listener.close();
    }

    static listener_fulfill(connection: SocketConnection) {
        console.log("listener_fulfill connection");
        connection.setNoDelay(true);

        let welcome = "Welcome to Frida Socket Server.\r\n";
        let data: number[] = [];
        for (const iterator of welcome) {
            data.push(iterator.charCodeAt(0));
        }

        connection.output.writeAll(data);
        FridaDemo.read_connection(connection)

    }

    static dataArray: number[] = [];
    static read_connection(connection: SocketConnection) {
        connection.input.read(1)
            .then((buffer: ArrayBuffer) => {
                // console.log(buffer);
                let data = buffer.unwrap().readU8();
                this.dataArray.push(data);

                if (data == '\n'.charCodeAt(0)) {
                    // console.log(this.dataArray);

                    let m1 = Memory.alloc(this.dataArray.length);
                    m1.writeByteArray(this.dataArray);
                    console.log(m1.readUtf8String());

                    this.dataArray = [];
                }

                FridaDemo.read_connection(connection);
            }, (reason: any) => { console.log("read_reject", reason); })
            .catch((reason: any) => { console.log("read_reject", reason); })
            .finally(() => { console.log("read_finally"); });
    }





}

let fridaDemo = new FridaDemo();
fridaDemo.demo();