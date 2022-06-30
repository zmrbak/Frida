rpc.exports.test1 = function () {
    return Process.enumerateModules();
};
rpc.exports.test2 = function (message: string) {
    console.log("Test 2 From JS ,", message);

};