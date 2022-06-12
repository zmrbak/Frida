class L07 {
    private module_name_winmine = "winmine.exe";
    private module_winmine: Module;
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        console.log("Frida.version", Frida.version);
        //获取模块基址
        this.module_winmine = Process.getModuleByName(this.module_name_winmine);
    }

    board_info() {
        let height = this.module_winmine.base.add(0x5338).readU32();
        console.log("棋盘高度:", height);

        let width = this.module_winmine.base.add(0x5334).readU32();
        console.log("棋盘宽度:", width);

        let mine_count = this.module_winmine.base.add(0x5330).readU32();
        console.log("地雷数量:", mine_count);

        let head = this.module_winmine.base.add(0x5340);
        console.log("棋盘头:", head);

        //遍历棋盘，按行遍历
        for (let i = 0; i < height + 2; i++) {
            //按列遍历
            let data = [];
            for (let j = 0; j < width + 2; j++) {
                let byte_data = head.add(j + 0x20 * i).readU8();
                data.push(byte_data.toString(16).padStart(2, '0'));
            }
            console.log(data.join(" "));
        }
    }
}

let l07 = new L07();
l07.board_info();