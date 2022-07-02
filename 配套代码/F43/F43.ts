let inputCode = ptr(0x0100374F);
let codeAddress = Memory.alloc(Process.pageSize);

function demo1() {
    let output = new X86Writer(codeAddress);
    let relocator = new X86Relocator(inputCode, output);
    let index = 0;
    while (relocator.readOne()) {
        let instruction = relocator.input;
        console.log(
            (++index).toString().padStart(3, " "),
            instruction?.address,
            Array.from(new Uint8Array(instruction?.address.readByteArray(instruction.size)!), x => x.toString(16).padStart(2, "0")).join(" ").toUpperCase().padEnd(20, " "),
            instruction?.toString());
        relocator.writeOne();
    }
}
function demo2() {
    let temp = codeAddress;
    let index = 0;
    while (true) {
        let instruction = Instruction.parse(temp);
        console.log(
            (++index).toString().padStart(3, " "),
            instruction?.address,
            Array.from(new Uint8Array(instruction?.address.readByteArray(instruction.size)!), x => x.toString(16).padStart(2, "0")).join(" ").toUpperCase().padEnd(20, " "),
            instruction?.toString());
        temp = instruction.next;

        if (index > 100) break;
    }

}

console.log("======================", new Date().toISOString(), "==========================");
demo1();
console.log("===================== codeAddress");
demo2();