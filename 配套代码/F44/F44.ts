// Interceptor.attach()

let mainThread = Process.enumerateThreads()[0];

Stalker.follow(mainThread.id, {
    events: {
        call: false,
        ret: true,
        exec: false,
        block: false,
        compile: false,
    },
    onCallSummary(summary: StalkerCallSummary) {
        // console.log("onCallSummary", JSON.stringify(summary));
    },
    onReceive(events: ArrayBuffer) {
        // console.log("onReceive", events);
        for (const iterator of Stalker.parse(events)) {
            console.log(JSON.stringify(iterator));

        };
    },
    // transform: (iterator: StalkerX86Iterator) => {
    //     // console.log("transform");
    //     // while (true) {
    //     //     let instraction = iterator.next();
    //     //     iterator.keep();

    //     //     if (instraction == null) break;
    //     //     console.log(instraction);
    //     // }

    // }
});