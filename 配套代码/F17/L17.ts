import { WinApi } from "./win_api";
class L07 {
    private module_name_winmine = "winmine.exe";
    private module_winmine: Module;
    private height: number = 0;
    private width: number = 0;
    private mine_count: number = 0;
    private head: NativePointer = ptr(0);
    private hWnd: NativePointer = ptr(0);
    private start_x = 0;
    private start_y = 0;
    private step = 16;

    private MOUSEEVENTF_LEFTDOWN = 0x0002;
    private MOUSEEVENTF_LEFTUP = 0x0004;
    private MOUSEEVENTF_RIGHTDOWN = 0x0008;
    private MOUSEEVENTF_RIGHTUP = 0x0010;


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

    board_location() {

        let lpOrgRect = Memory.alloc(4 * 4);
        WinApi.GetCursorPos(lpOrgRect);

        let lpRect = Memory.alloc(4 * 4);
        WinApi.GetWindowRect(this.hWnd, lpRect);
        console.log("left", lpRect.readU32());
        console.log("top", lpRect.add(4).readU32());

        this.start_x = lpRect.readU32() + 7;
        this.start_y = lpRect.add(4).readU32() + 92;
        let x = 4;
        let y = 5;

        WinApi.SetCursorPos(this.start_x + this.step * x, this.start_y + this.step * y);

        const MOUSEEVENTF_LEFTDOWN = 0x0002;
        const MOUSEEVENTF_LEFTUP = 0x0004;

        const MOUSEEVENTF_RIGHTDOWN = 0x0008;
        const MOUSEEVENTF_RIGHTUP = 0x0010;

        WinApi.MouseEvent(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, WinApi.GetMessageExtraInfo());
        WinApi.MouseEvent(MOUSEEVENTF_LEFTUP, 0, 0, 0, WinApi.GetMessageExtraInfo());

        // WinApi.MouseEvent(MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, WinApi.GetMessageExtraInfo());
        // WinApi.MouseEvent(MOUSEEVENTF_RIGHTUP, 0, 0, 0, WinApi.GetMessageExtraInfo());

        // WinApi.Sleep(2000);
        // WinApi.SetCursorPos(lpOrgRect.readU32(), lpOrgRect.add(4).readU32());

    }

    mouse_click(x: number, y: number, left_click: boolean = true) {

        WinApi.SetCursorPos(this.start_x + this.step * x, this.start_y + this.step * y);
        if (left_click) {
            WinApi.MouseEvent(this.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, WinApi.GetMessageExtraInfo());
            WinApi.MouseEvent(this.MOUSEEVENTF_LEFTUP, 0, 0, 0, WinApi.GetMessageExtraInfo());
        }
        else {
            WinApi.MouseEvent(this.MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, WinApi.GetMessageExtraInfo());
            WinApi.MouseEvent(this.MOUSEEVENTF_RIGHTUP, 0, 0, 0, WinApi.GetMessageExtraInfo());
        }
    }
    board_click() {

        //记录鼠标位置
        let lpOrgRect = Memory.alloc(4 * 4);
        WinApi.GetCursorPos(lpOrgRect);

        //加载棋盘数据
        this.load_board_info();

        //获取棋盘位置
        let lpRect = Memory.alloc(4 * 4);
        WinApi.GetWindowRect(this.hWnd, lpRect);
        this.start_x = lpRect.readU32() + 7;
        this.start_y = lpRect.add(4).readU32() + 92;

        //遍历棋盘，按行遍历
        for (let i = 1; i < this.height + 2; i++) {
            //按列遍历
            for (let j = 1; j < this.width + 2; j++) {
                let byte_data = this.head.add(j + 0x20 * i).readU8();
                //标记地雷
                if (byte_data == 0x8F) {
                    this.mouse_click(j, i, false);
                    continue;
                }
                //点击无雷区
                if (byte_data == 0x0F) {
                    this.mouse_click(j, i);
                    continue;
                }
            }
        }

        //鼠标归位
        WinApi.SetCursorPos(lpOrgRect.readU32(), lpOrgRect.add(4).readU32());
    }
}

let l07 = new L07();
// l07.board_mark(true);
// l07.board_info();
// l07.board_repaint();
l07.board_foreground();
// l07.board_location();
l07.board_click();