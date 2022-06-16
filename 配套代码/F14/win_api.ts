export class WinApi {
    private static address_GetClientRect: NativePointerValue | null;
    static GetClientRect(hWnd: NativePointerValue, lpRect: NativePointerValue): number {
        if (this.address_GetClientRect == null) {
            this.address_GetClientRect = Module.findExportByName("User32.dll", "GetClientRect");
        }
        return new NativeFunction(this.address_GetClientRect!, "bool", ["pointer", "pointer"])(hWnd, lpRect);
    }

    private static address_InvalidateRect: NativePointerValue | null;
    static InvalidateRect(hWnd: NativePointerValue, lpRect: NativePointerValue, bErase: number): number {
        if (this.address_InvalidateRect == null) {
            this.address_InvalidateRect = Module.findExportByName("User32.dll", "InvalidateRect");
        }
        return new NativeFunction(this.address_InvalidateRect!, "bool", ["pointer", "pointer", 'bool'])(hWnd, lpRect, bErase);
    }

    private static address_SetForegroundWindow: NativePointerValue | null;
    static SetForegroundWindow(hWnd: NativePointerValue): number {
        // BOOL SetForegroundWindow(
        //     [in] HWND hWnd
        // );
        if (this.address_SetForegroundWindow == null) {
            this.address_SetForegroundWindow = Module.findExportByName("User32.dll", "SetForegroundWindow");
        }
        return new NativeFunction(this.address_SetForegroundWindow!, "bool", ["pointer"])(hWnd);
    }

    private static address_ShowWindow: NativePointerValue | null;
    static ShowWindow(hWnd: NativePointerValue, nCmdShow: number): number {
        // BOOL ShowWindow(
        //     [in] HWND hWnd,
        //     [in] int  nCmdShow
        // );
        if (this.address_ShowWindow == null) {
            this.address_ShowWindow = Module.findExportByName("User32.dll", "ShowWindow");
        }
        return new NativeFunction(this.address_ShowWindow!, "bool", ["pointer", "int"])(hWnd, nCmdShow);
    }

    private static address_SetWindowPos: NativePointerValue | null;
    static SetWindowPos(hWnd: NativePointerValue, hWndInsertAfter: number, X: number, Y: number, cx: number, cy: number, uFlags: number): number {
        // BOOL SetWindowPos(
        //     [in]           HWND hWnd,
        //     [in, optional] HWND hWndInsertAfter,
        //     [in]           int  X,
        //     [in]           int  Y,
        //     [in]           int  cx,
        //     [in]           int  cy,
        //     [in]           UINT uFlags
        // );
        if (this.address_SetWindowPos == null) {
            this.address_SetWindowPos = Module.findExportByName("User32.dll", "SetWindowPos");
        }
        return new NativeFunction(this.address_SetWindowPos!, "bool", ["pointer", "int", "int", "int", "int", "int", "int"])(hWnd, hWndInsertAfter, X, Y, cx, cy, uFlags);
    }

    private static address_GetForegroundWindow: NativePointerValue | null;
    static GetForegroundWindow(): NativePointerValue {
        // HWND GetForegroundWindow();
        if (this.address_GetForegroundWindow == null) {
            this.address_GetForegroundWindow = Module.findExportByName("User32.dll", "GetForegroundWindow");
        }
        return new NativeFunction(this.address_GetForegroundWindow!, "pointer", [])();
    }

    private static address_GetCurrentThreadId: NativePointerValue | null;
    static GetCurrentThreadId(): number {
        // DWORD GetCurrentThreadId();
        if (this.address_GetCurrentThreadId == null) {
            this.address_GetCurrentThreadId = Module.findExportByName("Kernel32.dll", "GetCurrentThreadId");
        }
        return new NativeFunction(this.address_GetCurrentThreadId!, "int", [])();
    }

    // private static address_GetWindowThreadProcessId: NativePointerValue | null;
    // static GetWindowThreadProcessId(hWnd: NativePointerValue, lpdwProcessId: NativePointerValue): number {
    //     // DWORD GetWindowThreadProcessId(
    //     //     [in]            HWND    hWnd,
    //     //     [out, optional] LPDWORD lpdwProcessId
    //     // );
    //     if (this.address_GetWindowThreadProcessId == null) {
    //         this.address_GetWindowThreadProcessId = Module.findExportByName("User32.dll", "GetWindowThreadProcessId");
    //     }
    //     return new NativeFunction(this.address_GetWindowThreadProcessId!, "int", ["pointer", "pointer"])(hWnd, lpdwProcessId);
    // }

    private static func_GetWindowThreadProcessId: AnyFunction;
    static GetWindowThreadProcessId(hWnd: NativePointerValue, lpdwProcessId: NativePointerValue): number {
        // BOOL AttachThreadInput(
        //     [in] DWORD idAttach,
        //     [in] DWORD idAttachTo,
        //     [in] BOOL  fAttach
        // );
        if (this.func_GetWindowThreadProcessId == undefined) {
            let address = Module.findExportByName("User32.dll", "GetWindowThreadProcessId");
            this.func_GetWindowThreadProcessId = new NativeFunction(address!, "int", ["pointer", "pointer"]);
        }
        return this.func_GetWindowThreadProcessId(hWnd, lpdwProcessId);
    }

    private static func_AttachThreadInput: ((arg0: number, arg1: number, arg2: number) => number) | null;
    static AttachThreadInput(idAttach: number, idAttachTo: number, fAttach: number): number {
        // BOOL AttachThreadInput(
        //     [in] DWORD idAttach,
        //     [in] DWORD idAttachTo,
        //     [in] BOOL  fAttach
        // );
        if (this.func_AttachThreadInput == null) {
            let address_AttachThreadInput = Module.findExportByName("User32.dll", "AttachThreadInput");
            this.func_AttachThreadInput = new NativeFunction(address_AttachThreadInput!, "int", ["int", "int", "int"]);
        }
        return this.func_AttachThreadInput(idAttach, idAttachTo, fAttach);
    }




}