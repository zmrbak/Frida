let version = Frida.version;
console.log(version);

let data = []
for (let index = 0; index < 100; index++) {
    let mem = Memory.alloc(1024 * 1024);
    data.push(mem);

    let heapSize = Frida.heapSize;
    console.log(heapSize);
}
