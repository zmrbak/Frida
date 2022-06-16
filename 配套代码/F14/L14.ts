import { WinApi } from "./win_api";
class L07 {
    private module_name_winmine = "winmine.exe";
    private module_winmine: Module;
    private height: number = 0;
    private width: number = 0;
    private mine_count: number = 0;
    private head: NativePointer = ptr(0);
    private hWnd: NativePointer = ptr(0);

    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
        console.log("Frida.version", Frida.version);
        //获取模块基址
        this.module_winmine = Process.getModuleByName(this.module_name_winmine);
        this.hWnd = this.module_winmine.base.add(0x5B24).readPointer();
        this.head = this.module_winmine.base.add(0x5340);
    }

    private load_board_info() {
        this.height = this.module_winmine.base.add(0x5338).readU32();
        this.width = this.module_winmine.base.add(0x5334).readU32();
        this.mine_count = this.module_winmine.base.add(0x5330).readU32();
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

    board_repaint() {
        const lpRect = Memory.alloc(4 * 4);
        WinApi.GetClientRect(this.hWnd, lpRect);
        WinApi.InvalidateRect(this.hWnd, lpRect, 1);
    }
    board_foreground() {
        let hForeWnd = WinApi.GetForegroundWindow();
        let dwCurID = WinApi.GetCurrentThreadId();
        let dwForeID = WinApi.GetWindowThreadProcessId(hForeWnd, ptr(0));
        WinApi.AttachThreadInput(dwCurID, dwForeID, 1);

        const SW_RESTORE = 9;
        WinApi.ShowWindow(this.hWnd, SW_RESTORE);

        WinApi.SetForegroundWindow(this.hWnd);

        const HWND_TOPMOST = -1;
        const HWND_NOTOPMOST = -2;
        const SWP_NOSIZE = 0x0001;
        const SWP_NOMOVE = 0x0002;
        WinApi.SetWindowPos(this.hWnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
        WinApi.SetWindowPos(this.hWnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);

        WinApi.AttachThreadInput(dwCurID, dwForeID, 0);
    }
}

let l07 = new L07();
l07.board_mark(true);
l07.board_info();
l07.board_repaint();
l07.board_foreground();