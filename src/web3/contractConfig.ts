import { AvailableContracts, ContractConfigProps } from "../types";

class ContractConfig {
  private contractConfigs: ContractConfigProps = {};
  constructor() {
    void this.fetchContractConfig();
  }

  public getContractConfigByName(name: AvailableContracts) {
    return this.contractConfigs[name];
  }

  private async fetchContractConfig(): Promise<void> {
    try {
      const url = `https://pub-d74340d79d8e4ff6953ce683be56feac.r2.dev/contracts-configs/config.json`;
      const res: Response = await fetch(url);
      const configs = await res.json();
      this.contractConfigs = configs;
    } catch (err) {
      throw err;
    }
  }

  public async forceFetch() {
    if (Object.keys(this.contractConfigs).length) return;
    await this.fetchContractConfig();
  }
}

const contractConfig = new ContractConfig();

export default contractConfig;
