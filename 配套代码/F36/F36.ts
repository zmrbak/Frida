import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {
        Socket.listen({ family: "ipv4", host: "127.0.0.1", port: 11223 })
            .then(this.socket_fulfill)
            .catch((reason: any) => { console.log("socket_reject", reason); });
    }
    socket_fulfill(listener: SocketListener) {
        console.log("listener", JSON.stringify(listener));
        FridaDemo.accept_loop(listener);
    }

    static accept_loop(listener: SocketListener) {
        let next = FridaDemo.accept_loop.bind(null, listener);

        listener.accept()
            .then(FridaDemo.listener_fulfill)
            .catch((reason: any) => { console.log("listener_reject", reason); })
            .finally(() => { setImmediate(next); });
    }

    static listener_fulfill(connection: SocketConnection) {
        connection.setNoDelay(true);

        let welcome = "Welcome to Frida Socket Server.\r\n";
        let data: number[] = [];
        for (const iterator of welcome) {
            data.push(iterator.charCodeAt(0));
        }

        connection.output.writeAll(data);
        FridaDemo.read_connection(connection)
    }

    static connectionMap = new Map();
    static read_connection(connection: SocketConnection) {
        let next = FridaDemo.read_connection.bind(null, connection);

        if (!FridaDemo.connectionMap.has(connection)) {
            FridaDemo.connectionMap.set(connection, []);
        }

        connection.input.read(1)
            .then((buffer: ArrayBuffer) => {
                let data = buffer.unwrap().readU8();
                FridaDemo.connectionMap.get(connection).push(data);

                if (data == '\n'.charCodeAt(0)) {
                    let temp: number[] = FridaDemo.connectionMap.get(connection);
                    let inputStr = Array.from(temp, x => String.fromCharCode(x)).join("");

                    if (inputStr.trimEnd() == "quit") {
                        connection.close();
                        return;
                    }

                    console.log(inputStr);
                    connection.output.write(temp);
                    FridaDemo.connectionMap.set(connection, []);
                }

                setImmediate(next);
            })
            .catch((reason: any) => { console.log("read_reject", reason); });
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();