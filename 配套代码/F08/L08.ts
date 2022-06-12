class L07 {
    private module_name_winmine = "winmine.exe";
    private module_winmine: Module;
    private height: number = 0;
    private width: number = 0;
    private mine_count: number = 0;
    private head: NativePointer = ptr(0);
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        console.log("Frida.version", Frida.version);
        //获取模块基址
        this.module_winmine = Process.getModuleByName(this.module_name_winmine);
    }

    private load_board_info() {
        this.height = this.module_winmine.base.add(0x5338).readU32();
        this.width = this.module_winmine.base.add(0x5334).readU32();
        this.mine_count = this.module_winmine.base.add(0x5330).readU32();
        this.head = this.module_winmine.base.add(0x5340);
    }

    board_info() {
        this.board_mark();
    }
    board_mark(modify: boolean = false) {
        //加载棋盘数据
        this.load_board_info();
        //遍历棋盘，按行遍历
        for (let i = 0; i < this.height + 2; i++) {
            //按列遍历
            let data = [];
            for (let j = 0; j < this.width + 2; j++) {
                let byte_data = this.head.add(j + 0x20 * i).readU8();
                if (modify == true) {
                    if (byte_data == 0x8F) {
                        this.head.add(j + 0x20 * i).writeU8(0x8E);
                    }
                }
                else {
                    data.push(byte_data.toString(16).padStart(2, '0').toUpperCase());
                }
            }

            if (modify != true) {
                console.log(data.join(" "));
            }
        }
    }
}

let l07 = new L07();
l07.board_mark(true);
l07.board_info();