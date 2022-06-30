import frida


def on_message(message, data):
    print("[on_message] message:", message, "data:", data)


session = frida.attach("winmine.exe")

script = session.create_script("""
rpc.exports.test1 = function () {
    return Process.enumerateModules();
};
rpc.exports.test2 = function (message) {
    console.log("Test 2 From JS ,", message);
};
""")

script.on("message", on_message)
script.load()

# print([m["name"] for m in script.exports.enumerate_modules()])
for m in script.exports.test1():
    print(m)

script.exports.test2("123")
