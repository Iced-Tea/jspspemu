﻿export class InterruptHandler {
	enabled = false;
	address = 0;
	argument = 0;
}

export class InterruptHandlers {
	handlers: NumberDictionary<InterruptHandler> = {};

	get(handlerIndex: number) {
		if (!this.handlers[handlerIndex]) this.handlers[handlerIndex] = new InterruptHandler();
		return this.handlers[handlerIndex];
	}

	has(handlerIndex: number) {
		return (this.handlers[handlerIndex] !== undefined);
	}
}

export class InterruptManager {
	enabled: boolean = true;
	flags: number = 0xFFFFFFFF;
	interruptHandlers: NumberDictionary<InterruptHandlers> = {};

	suspend() {
		var currentFlags = this.flags;
		this.flags = 0;
		this.enabled = false;
		return currentFlags;
	}

	resume(value: number) {
		this.flags = value;
		this.enabled = true;
	}

	get(pspInterrupt: PspInterrupts) {
		if (!this.interruptHandlers[pspInterrupt]) this.interruptHandlers[pspInterrupt] = new InterruptHandlers();
		return this.interruptHandlers[pspInterrupt];
	}
}

export enum PspInterrupts {
	PSP_GPIO_INT = 4,
	PSP_ATA_INT = 5,
	PSP_UMD_INT = 6,
	PSP_MSCM0_INT = 7,
	PSP_WLAN_INT = 8,
	PSP_AUDIO_INT = 10,
	PSP_I2C_INT = 12,
	PSP_SIRCS_INT = 14,
	PSP_SYSTIMER0_INT = 15,
	PSP_SYSTIMER1_INT = 16,
	PSP_SYSTIMER2_INT = 17,
	PSP_SYSTIMER3_INT = 18,
	PSP_THREAD0_INT = 19,
	PSP_NAND_INT = 20,
	PSP_DMACPLUS_INT = 21,
	PSP_DMA0_INT = 22,
	PSP_DMA1_INT = 23,
	PSP_MEMLMD_INT = 24,
	PSP_GE_INT = 25,
	PSP_VBLANK_INT = 30,
	PSP_MECODEC_INT = 31,
	PSP_HPREMOTE_INT = 36,
	PSP_MSCM1_INT = 60,
	PSP_MSCM2_INT = 61,
	PSP_THREAD1_INT = 65,
	PSP_INTERRUPT_INT = 66,
	PSP_NUMBER_INTERRUPTS = 67,
}
