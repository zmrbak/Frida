class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        console.log("Frida.version", Frida.version);
    }

    show_process() {
        Process.setExceptionHandler((exception) => {
            console.log(JSON.stringify(exception, null, 4));

            return false;
        });
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.show_process();