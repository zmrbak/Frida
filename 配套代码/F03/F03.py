import frida


def on_message(message, data):
    print("[on_message] message:", message, "data:", data)


session = frida.attach("wechat.exe")

script = session.create_script("""
rpc.exports.enumerateModules = function () {
  return Process.enumerateModules();
};
""")
script.on("message", on_message)
script.load()


print([m["name"] for m in script.exports.enumerate_modules()])
