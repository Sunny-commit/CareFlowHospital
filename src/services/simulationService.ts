// Development Error Simulation Service for Playwright and Agent Automation Testing

export type SimulationMode = 'none' | 'slot-conflict' | 'database-error' | 'slow-response';

class SimulationService {
  private currentMode: SimulationMode = 'none';
  private isEnabled: boolean = true;

  constructor() {
    this.checkUrlParams();
  }

  public checkUrlParams(): void {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const simulate = urlParams.get('simulate');
    if (simulate === 'slot-conflict' || simulate === 'database-error' || simulate === 'slow-response') {
      this.currentMode = simulate;
    }
  }

  public getMode(): SimulationMode {
    return this.currentMode;
  }

  public setMode(mode: SimulationMode): void {
    this.currentMode = mode;
  }

  public async interceptOperation(operationName: string): Promise<void> {
    this.checkUrlParams();

    if (this.currentMode === 'slow-response') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (this.currentMode === 'database-error') {
      throw new Error(`[Simulated Error] Database connection failure during ${operationName}. Please check connectivity and retry.`);
    }

    if (this.currentMode === 'slot-conflict' && (operationName === 'book' || operationName === 'reschedule')) {
      throw new Error(`[Simulated Conflict] The selected appointment slot was reserved by another patient right before your confirmation. Please choose another time slot.`);
    }
  }
}

export const simulationService = new SimulationService();
