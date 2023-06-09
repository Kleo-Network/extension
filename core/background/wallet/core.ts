
import { AuthGuard } from "core/background/services/guard";
import { PromptService } from "core/background/services/popup";
import {WebsiteController } from "core/background/services/connects";
import type { WalletState } from "types/account";


export class KleoCore {
  public  guard = new AuthGuard();
  public prompt = new PromptService();
  public connect = new WebsiteController();
  public get state(): WalletState {
    return {
      popup: this.prompt.enabled,
      guard: this.guard.state(),
      websiteStore: {
        confirmApp: this.connect.confirmApp,
        connections: this.connect.connections
      },
  }
}
}
