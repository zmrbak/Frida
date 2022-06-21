import { WinApi } from "./win_api";

class FridaDemo {
    constructor() {
        console.log("======================", new Date().toISOString(), "==========================");
    }

    demo() {

        let m2 = Memory.alloc(Process.pageSize);
        let asm = new X86Writer(m2);
        asm.putPushU32(0x00000001);
        asm.putLabel("label1");

        asm.putPushU32(0x00000002);
        asm.putPushU32(0x00000000);

        // /**
        //      * Puts a label at the current position, where `id` is an identifier
        //      * that may be referenced in past and future `put*Label()` calls.
        //      */


        // /**
        //  * Puts code needed for calling a C function with the specified `args`.
        //  */
        // 0x49000F 68 22 00 00 00          PUSH 0x22
        // 0x490014 68 11 00 00 00          PUSH 0x11
        // 0x490019 50                      PUSH EAX
        // 0x49001A E8 25 33 D9 10          CALL 0x11223344
        // asm.putCallAddressWithArguments(ptr(0x11223344), ["eax", 0x11, ptr(0x22)]);

        // /**
        //  * Like `putCallWithArguments()`, but also
        //  * ensures that the argument list is aligned on a 16 byte boundary.
        //  */
        // 0x49000F 68 33 00 00 00          PUSH 0x33
        // 0x490014 68 22 00 00 00          PUSH 0x22
        // 0x490019 68 11 00 00 00          PUSH 0x11
        // 0x49001E 50                      PUSH EAX
        // 0x49001F E8 20 33 D9 10          CALL 0x11223344
        // 0x490024 83 C4 10                ADD ESP, 0x10
        // asm.putCallAddressWithAlignedArguments(ptr(0x11223344), ["eax", 0x11, ptr(0x22), ptr(0x33)]);

        // /**
        //  * Puts code needed for calling a C function with the specified `args`.
        //  */
        // 0x49000F 50                      PUSH EAX
        // 0x490010 FF D0                   CALL EAX
        // 0x490012 83 C4 04                ADD ESP, 4
        // asm.putCallRegWithArguments("eax", ["eax"]);

        // /**
        //  * Like `putCallWithArguments()`, but also
        //  * ensures that the argument list is aligned on a 16 byte boundary.
        //  */
        // putCallRegWithAlignedArguments(reg: X86Register, args: X86CallArgument[]): void;

        // /**
        //  * Puts code needed for calling a C function with the specified `args`.
        //  */
        // 0x49000F 68 33 00 00 00          PUSH 0x33
        // 0x490014 68 22 00 00 00          PUSH 0x22
        // 0x490019 FF 53 11                CALL DWORD PTR[EBX + 0x11]
        // 0x49001C 83 C4 08                ADD ESP, 8
        // asm.putCallRegOffsetPtrWithArguments("ebx", 0x11, [ptr(0x22), ptr(0x33)]);

        // /**
        //  * Puts a CALL instruction.
        //  */
        //0x49000F E8 30 33 D9 10          CALL 0x11223344
        // asm.putCallAddress(ptr(0x11223344));

        // /**
        //  * Puts a CALL instruction.
        //  */
        //0x45000F FF D7                   CALL EDI
        // asm.putCallReg("edi");

        // /**
        //  * Puts a CALL instruction.
        //  */
        //0x49000F FF 50 11                CALL DWORD PTR [EAX + 0x11]
        // asm.putCallRegOffsetPtr("eax", 0x11);

        // /**
        //  * Puts a CALL instruction.
        //  */
        //0x45000F FF 15 44 33 22 11       CALL DWORD PTR [0x11223344]
        // asm.putCallIndirect(ptr(0x11223344));

        // /**
        //  * Puts a CALL instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        //0x45000F FF 15 05 00 45 00       CALL DWORD PTR [0x450005]
        // asm.putCallIndirectLabel("label1");

        // /**
        //  * Puts a CALL instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        //0x49000F E8 F1 FF FF FF          CALL 0x490005
        // asm.putCallNearLabel("label1");

        // /**
        //  * Puts a LEAVE instruction.
        //  */
        //0x49000F C9                      LEAVE
        // asm.putLeave();

        // /**
        //  * Puts a RET instruction.
        //  */
        //0x45000F C3                      RET
        // asm.putRet();

        // /**
        //  * Puts a RET instruction.
        //  */
        //0x45000F C2 22 11                RET 0x1122
        //0xFFFF
        // asm.putRetImm(0x1122);

        // /**
        //  * Puts a JMP instruction.
        //  */
        //0x79000F E9 1F 22 98 FF          JMP 0x112233
        // asm.putJmpAddress(ptr(0x112233));

        // /**
        //  * Puts a JMP instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        // putJmpShortLabel(labelId: string): void;

        // /**
        //  * Puts a JMP instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        // putJmpNearLabel(labelId: string): void;

        // /**
        //  * Puts a JMP instruction.
        //  */
        //0x79000F FF E0                   JMP EAX
        // asm.putJmpReg("eax");

        // /**
        //  * Puts a JMP instruction.
        //  */
        //0x79000F FF 20                   JMP DWORD PTR [EAX]
        // asm.putJmpRegPtr("eax");

        // /**
        //  * Puts a JMP instruction.
        //  */
        // putJmpRegOffsetPtr(reg: X86Register, offset: number | Int64 | UInt64): void;

        // /**
        //  * Puts a JMP instruction.
        //  */
        // putJmpNearPtr(address: NativePointerValue): void;

        // /**
        //  * Puts a JCC instruction.
        //  */
        // asm.putJccShort(instructionId: X86InstructionId, target: NativePointerValue, hint: X86BranchHint): void;

        // /**
        //  * Puts a JCC instruction.
        //  */
        // putJccNear(instructionId: X86InstructionId, target: NativePointerValue, hint: X86BranchHint): void;

        // /**
        //  * Puts a JCC instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        // putJccShortLabel(instructionId: X86InstructionId, labelId: string, hint: X86BranchHint): void;

        // /**
        //  * Puts a JCC instruction referencing `labelId`, defined by a past
        //  * or future `putLabel()`.
        //  */
        // putJccNearLabel(instructionId: X86InstructionId, labelId: string, hint: X86BranchHint): void;

        // /**
        //  * Puts an ADD instruction.
        //  */
        // putAddRegImm(reg: X86Register, immValue: number | Int64 | UInt64): void;

        // /**
        //  * Puts an ADD instruction.
        //  */
        // putAddRegReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts an ADD instruction.
        //  */
        //0x79000F 03 05 44 33 22 11       ADD EAX, DWORD PTR [0x11223344]
        // asm.putAddRegNearPtr("eax", ptr(0x11223344));

        // /**
        //  * Puts a SUB instruction.
        //  */
        // putSubRegImm(reg: X86Register, immValue: number | Int64 | UInt64): void;

        // /**
        //  * Puts a SUB instruction.
        //  */
        // putSubRegReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a SUB instruction.
        //  */
        // putSubRegNearPtr(dstReg: X86Register, srcAddress: NativePointerValue): void;

        // /**
        //  * Puts an INC instruction.
        //  */
        // putIncReg(reg: X86Register): void;

        // /**
        //  * Puts a DEC instruction.
        //  */
        // putDecReg(reg: X86Register): void;

        // /**
        //  * Puts an INC instruction.
        //  */
        //0x79000F FE 00                   INC BYTE PTR [EAX]
        //0x79000F FF 00                   INC DWORD PTR [EAX]
        // asm.putIncRegPtr("dword", "eax");

        // /**
        //  * Puts a DEC instruction.
        //  */
        // putDecRegPtr(target: X86PointerTarget, reg: X86Register): void;

        // /**
        //  * Puts a LOCK XADD instruction.
        //  */
        asm.putLockXaddRegPtrReg("eax", "ebp");

        // /**
        //  * Puts a LOCK CMPXCHG instruction.
        //  */
        // putLockCmpxchgRegPtrReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a LOCK INC IMM32 instruction.
        //  */
        // putLockIncImm32Ptr(target: NativePointerValue): void;

        // /**
        //  * Puts a LOCK DEC IMM32 instruction.
        //  */
        // putLockDecImm32Ptr(target: NativePointerValue): void;

        // /**
        //  * Puts an AND instruction.
        //  */
        // putAndRegReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts an AND instruction.
        //  */
        // putAndRegU32(reg: X86Register, immValue: number): void;

        // /**
        //  * Puts a SHL instruction.
        //  */
        // putShlRegU8(reg: X86Register, immValue: number): void;

        // /**
        //  * Puts a SHR instruction.
        //  */
        // putShrRegU8(reg: X86Register, immValue: number): void;

        // /**
        //  * Puts an XOR instruction.
        //  */
        // putXorRegReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegU32(dstReg: X86Register, immValue: number): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegU64(dstReg: X86Register, immValue: number | UInt64): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegAddress(dstReg: X86Register, address: NativePointerValue): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegPtrU32(dstReg: X86Register, immValue: number): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegOffsetPtrU32(dstReg: X86Register, dstOffset: number | Int64 | UInt64, immValue: number): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegPtrReg(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegOffsetPtrReg(dstReg: X86Register, dstOffset: number | Int64 | UInt64, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegRegPtr(dstReg: X86Register, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegRegOffsetPtr(dstReg: X86Register, srcReg: X86Register, srcOffset: number | Int64 | UInt64): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegBaseIndexScaleOffsetPtr(dstReg: X86Register, baseReg: X86Register, indexReg: X86Register, scale: number, offset: number | Int64 | UInt64): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovRegNearPtr(dstReg: X86Register, srcAddress: NativePointerValue): void;

        // /**
        //  * Puts a MOV instruction.
        //  */
        // putMovNearPtrReg(dstAddress: NativePointerValue, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV FS instruction.
        //  */
        // putMovFsU32PtrReg(fsOffset: number, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV FS instruction.
        //  */
        // putMovRegFsU32Ptr(dstReg: X86Register, fsOffset: number): void;

        // /**
        //  * Puts a MOV GS instruction.
        //  */
        // putMovGsU32PtrReg(fsOffset: number, srcReg: X86Register): void;

        // /**
        //  * Puts a MOV GS instruction.
        //  */
        // putMovRegGsU32Ptr(dstReg: X86Register, fsOffset: number): void;

        // /**
        //  * Puts a MOVQ XMM0 ESP instruction.
        //  */
        // putMovqXmm0EspOffsetPtr(offset: number): void;

        // /**
        //  * Puts a MOVQ EAX XMM0 instruction.
        //  */
        // putMovqEaxOffsetPtrXmm0(offset: number): void;

        // /**
        //  * Puts a MOVDQU XMM0 ESP instruction.
        //  */
        // putMovdquXmm0EspOffsetPtr(offset: number): void;

        // /**
        //  * Puts a MOVDQU EAX XMM0 instruction.
        //  */
        // putMovdquEaxOffsetPtrXmm0(offset: number): void;

        // /**
        //  * Puts a LEA instruction.
        //  */
        // putLeaRegRegOffset(dstReg: X86Register, srcReg: X86Register, srcOffset: number | Int64 | UInt64): void;

        // /**
        //  * Puts an XCHG instruction.
        //  */
        // putXchgRegRegPtr(leftReg: X86Register, rightReg: X86Register): void;

        // /**
        //  * Puts a PUSH instruction.
        //  */
        // putPushU32(immValue: number): void;

        // /**
        //  * Puts a PUSH instruction.
        //  */
        // putPushNearPtr(address: NativePointerValue): void;

        // /**
        //  * Puts a PUSH instruction.
        //  */
        // putPushReg(reg: X86Register): void;

        // /**
        //  * Puts a POP instruction.
        //  */
        // putPopReg(reg: X86Register): void;

        // /**
        //  * Puts a PUSH instruction.
        //  */
        // putPushImmPtr(immPtr: NativePointerValue): void;

        // /**
        //  * Puts a PUSHAX instruction.
        //  */
        // putPushax(): void;

        // /**
        //  * Puts a POPAX instruction.
        //  */
        // putPopax(): void;

        // /**
        //  * Puts a PUSHFX instruction.
        //  */
        // putPushfx(): void;

        // /**
        //  * Puts a POPFX instruction.
        //  */
        // putPopfx(): void;

        // /**
        //  * Puts a TEST instruction.
        //  */
        // putTestRegReg(regA: X86Register, regB: X86Register): void;

        // /**
        //  * Puts a TEST instruction.
        //  */
        // putTestRegU32(reg: X86Register, immValue: number): void;

        // /**
        //  * Puts a CMP instruction.
        //  */
        // putCmpRegI32(reg: X86Register, immValue: number): void;

        // /**
        //  * Puts a CMP instruction.
        //  */
        // putCmpRegOffsetPtrReg(regA: X86Register, offset: number | Int64 | UInt64, regB: X86Register): void;

        // /**
        //  * Puts a CMP instruction.
        //  */
        // putCmpImmPtrImmU32(immPtr: NativePointerValue, immValue: number): void;

        // /**
        //  * Puts a CMP instruction.
        //  */
        // putCmpRegReg(regA: X86Register, regB: X86Register): void;

        // /**
        //  * Puts a CLC instruction.
        //  */
        // putClc(): void;

        // /**
        //  * Puts a STC instruction.
        //  */
        // putStc(): void;

        // /**
        //  * Puts a CLD instruction.
        //  */
        // putCld(): void;

        // /**
        //  * Puts a STD instruction.
        //  */
        // putStd(): void;

        // /**
        //  * Puts a CPUID instruction.
        //  */
        // putCpuid(): void;

        // /**
        //  * Puts an LFENCE instruction.
        //  */
        // putLfence(): void;

        // /**
        //  * Puts an RDTSC instruction.
        //  */
        // putRdtsc(): void;

        // /**
        //  * Puts a PAUSE instruction.
        //  */
        // putPause(): void;

        // /**
        //  * Puts a NOP instruction.
        //  */
        // putNop(): void;

        // /**
        //  * Puts an OS/architecture-specific breakpoint instruction.
        //  */
        // putBreakpoint(): void;

        // /**
        //  * Puts `n` guard instruction.
        //  */
        // putPadding(n: number): void;

        // /**
        //  * Puts `n` NOP instructions.
        //  */
        // putNopPadding(n: number): void;

        // /**
        //  * Puts a uint8.
        //  */
        // putU8(value: number): void;

        // /**
        //  * Puts an int8.
        //  */
        // putS8(value: number): void;

        // /**
        //  * Puts raw data.
        //  */
        // putBytes(data: ArrayBuffer | number[] | string): void;        

        asm.flush();
        // console.log(asm.base, asm.code, asm.offset, asm.pc);


        this.show_asm(m2);
    }

    show_asm(start: NativePointer, length: number = 20) {
        for (let index = 0; index < length; index++) {
            let inst = Instruction.parse(start);
            let byteArray = start.readByteArray(inst.size);
            let byteCode = Array.prototype.slice.call(new Uint8Array(byteArray!));
            let mCode = byteCode.map(x => x.toString(16).padStart(2, "0")).join(" ").toUpperCase();
            console.log(inst.address.toString().toUpperCase().replace("0X", "0x"), mCode.padEnd(14, " "), "\t", inst.toString().toUpperCase().replace("0X", "0x"));

            start = inst.next;
            // if (start.readU32() == 0) break;
        }
    }
}

let fridaDemo = new FridaDemo();
fridaDemo.demo();