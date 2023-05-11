
import { AuthGuard } from "core/background/services/guard";
import { PromptService } from "core/background/services/popup";
import type { WalletState } from "types/account";


export class KleoCore {
  public readonly guard = new AuthGuard();
  public prompt = new PromptService();
  public get state(): WalletState {
    return {
      popup: this.prompt.enabled,
      guard: {
        isReady: this.guard.isReady,
        isEnable: this.guard.isEnable,
      }
  }
}
}
