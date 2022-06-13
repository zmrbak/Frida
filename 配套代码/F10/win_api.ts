export class WinApi {
    private address_GetClientRect!: NativePointer | null;
    private address_InvalidateRect!: NativePointer | null;

    constructor() {
        this.address_GetClientRect = Module.findExportByName("User32.dll", "GetClientRect");
        this.address_InvalidateRect = Module.findExportByName("User32.dll", "InvalidateRect");
    }

    GetClientRect(hWnd: NativePointerValue, lpRect: NativePointerValue): number {
        return new NativeFunction(this.address_GetClientRect!, "bool", ["pointer", "pointer"])
            (hWnd, lpRect);
    }

    InvalidateRect(hWnd: NativePointerValue, lpRect: NativePointerValue, bErase: number): number {
        return new NativeFunction(this.address_InvalidateRect!, "bool", ["pointer", "pointer", 'bool'])
            (hWnd, lpRect, bErase);
    }
}