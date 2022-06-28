import { WinApi } from "./win_api";

class FridaSocketServer {

    constructor(options?: SocketListenOptions) {
        console.log("======================", new Date().toISOString(), "==========================");
        this.demo(options);
    }

    private demo(options?: SocketListenOptions) {
        Socket.listen(options)
            .then(this.socket_fulfill)
            .catch((reason: any) => { console.log("socket_reject", reason); });
    }
    private socket_fulfill(listener: SocketListener) {
        console.log("listener", JSON.stringify(listener));
        FridaSocketServer.accept_loop(listener);
    }

    private static accept_loop(listener: SocketListener) {
        let next = FridaSocketServer.accept_loop.bind(null, listener);

        listener.accept()
            .then(FridaSocketServer.listener_fulfill)
            .catch((reason: any) => { console.log("listener_reject", reason); })
            .finally(() => { setImmediate(next); });
    }

    private static listener_fulfill(connection: SocketConnection) {
        connection.setNoDelay(true);

        let welcome = "Welcome to Frida Socket Server.\r\n";
        let data: number[] = [];
        for (const iterator of welcome) {
            data.push(iterator.charCodeAt(0));
        }

        connection.output.writeAll(data);
        FridaSocketServer.read_connection(connection)
    }

    private static connectionMap = new Map();
    private static read_connection(connection: SocketConnection) {
        let next = FridaSocketServer.read_connection.bind(null, connection);

        if (!FridaSocketServer.connectionMap.has(connection)) {
            FridaSocketServer.connectionMap.set(connection, []);
            // FridaSocketServer.connectionMap.set(connection, [[],""]);
        }

        connection.input.read(1)
            .then((buffer: ArrayBuffer) => {
                if (buffer.byteLength == 0) {
                    FridaSocketServer.connectionMap.set(connection, []);
                    FridaSocketServer.connectionMap.delete(connection);
                    connection.close();

                    console.log("one of clients was disconnected!");
                    return;
                }

                let data = buffer.unwrap().readU8();
                FridaSocketServer.connectionMap.get(connection).push(data);

                if (data == '\n'.charCodeAt(0)) {
                    let temp: number[] = FridaSocketServer.connectionMap.get(connection);
                    let inputStr = Array.from(temp, x => String.fromCharCode(x)).join("");

                    if (inputStr.trimEnd() == "quit") {
                        connection.close();
                        return;
                    }

                    console.log(inputStr);
                    connection.output.write(temp);
                    FridaSocketServer.connectionMap.set(connection, []);
                }

                setImmediate(next);
            })
            .catch((reason: any) => { console.log("read_reject", reason); });
    }
    writeline(message: string) {
        let temp = Array.from(message + "\r\n", x => x.charCodeAt(0));
        for (const iterator of FridaSocketServer.connectionMap) {
            iterator[0].output.write(temp)
        }
    }
}

class FridaSocketClient {

    private connection!: SocketConnection;
    constructor(options: SocketConnectOptions) {
        Socket.connect(options)
            .then((connection: SocketConnection) => {
                connection.setNoDelay(true);
                this.connection = connection;
                FridaSocketClient.read_loop(connection);
            })
            .catch((reason: any) => {
                console.log("Socket.connect catch", reason);
            })
            .finally(() => { console.log("Socket.connect finally"); });
    }
    private static read_loop(connection: SocketConnection) {
        let next = FridaSocketClient.read_loop.bind(null, connection);
        connection.input.read(1000)
            .then((buffer: ArrayBuffer) => {
                if (buffer.byteLength == 0) {
                    connection.close();
                    console.log("server lost!");

                    return;
                }
                console.log("client got:\t", buffer.unwrap().readCString()?.trimEnd());
                setImmediate(next);
            })
            .catch((reason: any) => {
                console.log("read_loop catch", reason);
            });
    }
    writeline(message: string) {
        let temp = Array.from(message + "\r\n", x => x.charCodeAt(0));
        this.connection.output.write(temp);
    }
}


let server = new FridaSocketServer({ family: "ipv4", host: "127.0.0.1", port: 11223 });

let index = 0;
setInterval(() => {
    index++;
    server.writeline(index + " server!");
}, 3000);

let client = new FridaSocketClient({ family: "ipv4", host: "127.0.0.1", port: 11223 });
setInterval(() => {
    index++;
    client.writeline(index + " client!");
}, 3000);

