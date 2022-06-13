export class WinApi {
    private static address_GetClientRect: NativePointerValue | null;
    private static address_InvalidateRect: NativePointerValue | null;

    static GetClientRect(hWnd: NativePointerValue, lpRect: NativePointerValue): number {
        if (this.address_GetClientRect == null) {
            this.address_GetClientRect = Module.findExportByName("User32.dll", "GetClientRect");
        }
        return new NativeFunction(this.address_GetClientRect!, "bool", ["pointer", "pointer"])(hWnd, lpRect);
    }

    static InvalidateRect(hWnd: NativePointerValue, lpRect: NativePointerValue, bErase: number): number {
        if (this.address_InvalidateRect == null) {
            this.address_InvalidateRect = Module.findExportByName("User32.dll", "InvalidateRect");
        }
        return new NativeFunction(this.address_InvalidateRect!, "bool", ["pointer", "pointer", 'bool'])(hWnd, lpRect, bErase);
    }
}