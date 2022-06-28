
let handle = ptr(0x0d0);
// let input = new Win32InputStream(handle, { autoClose: false });
// input.read(5)
//     .then((value: ArrayBuffer) => {
//         console.log("then:", value);
//     })
//     .catch((reason: any) => {
//         console.log("catch:", reason);
//     })
//     .finally(() => {
//         console.log("finally:");
//     });


let ouotput = new Win32OutputStream(handle, { autoClose: false });
let str1 = "this is a string";
let data = Array.from(str1, x => x.charCodeAt(0));
ouotput.write(data)
    .then((value: number) => {
        console.log("then:", value);
    })
    .catch((reason: any) => {
        console.log("catch:", reason);
    })
    .finally(() => {
        console.log("finally:");
    });