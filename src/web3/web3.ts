import {
  RPCSendableMessage,
  createEthereumProvider,
} from "@dcl/sdk/ethereum-provider";
import { getUserData as gData } from "~system/UserIdentity";
import {
  signMessage,
  SignMessageRequest,
  SignMessageResponse,
} from "~system/EthereumController";
import RequestManager, {
  ContractFactory,
  HTTPProvider,
  fromWei,
} from "eth-connect";
import config from "../config";
import {
  getMarketplaceDomainData,
  getBagDomainData,
  getExecuteMetaTransactionData,
} from "./web3Utils";
import { BuyPayload } from "../types";
import ContractConfig from "./contractConfig";

const { blastProviderrUrl, metaTxServer } = config;

class Web3 {
  private blastProvider: any;
  private blastRequestManager: any;
  private blastFactory: any;
  private blastContract: any;

  private mainnetProvider: any;
  private mainnetRequestManager: any;
  private mainnetFactory: any;
  private mainnetContract: any;

  private dgLiveProvider: any;
  private dgLiveFactory: any;
  private dgLiveRequestManager: any;
  private marketplaceContract: any;

  constructor() {
    this.initWeb3();
  }

  private async initWeb3() {
    if (!ContractConfig.getContractConfigByName("bag")?.abi) {
      await ContractConfig.forceFetch();
    }
    const bagAbi = ContractConfig.getContractConfigByName("bag").abi;
    const marketplaceAbi =
      ContractConfig.getContractConfigByName("marketplace").abi;
    this.blastProvider = new HTTPProvider(blastProviderrUrl);
    this.blastRequestManager = new RequestManager(this.blastProvider);
    this.blastFactory = new ContractFactory(this.blastRequestManager, bagAbi);

    this.dgLiveProvider = new HTTPProvider(blastProviderrUrl);
    this.dgLiveRequestManager = new RequestManager(this.dgLiveProvider);
    this.dgLiveFactory = new ContractFactory(
      this.dgLiveRequestManager,
      marketplaceAbi
    );

    this.mainnetProvider = createEthereumProvider();
    this.mainnetRequestManager = new RequestManager(this.mainnetProvider);
    this.mainnetFactory = new ContractFactory(
      this.mainnetRequestManager,
      bagAbi
    );
    this.createContracts();
  }
  private async createContracts() {
    this.blastContract = await this.blastFactory.at(
      ContractConfig.getContractConfigByName("bag").address
    );
    this.marketplaceContract = await this.dgLiveFactory.at(
      ContractConfig.getContractConfigByName("marketplace").address
    );
    this.mainnetContract = await this.mainnetFactory.at(
      ContractConfig.getContractConfigByName("bag").address
    );
  }

  public getUserBalance = async (userWallet: string) => {
    try {
      const balance = await this.blastContract.balanceOf(userWallet);
      return fromWei(balance, "ether");
    } catch (error) {
      console.log(error);
    }
  };

  public getNetwork = async () => {
    try {
      const network = await this.mainnetRequestManager.net_version();
      return network;
    } catch (error) {
      console.log("Error getting network", error);
      throw error;
    }
  };

  public isApproved = async (userWallet: string): Promise<boolean> => {
    try {
      const balance = await this.blastContract.allowance(
        userWallet,
        ContractConfig.getContractConfigByName("marketplace").address
      );
      return +fromWei(balance, "ether") > 0;
    } catch (error) {
      console.log("Error getting allowance", error);
      throw error;
    }
  };

  public approve = async (wallet: string): Promise<string> => {
    // Hacer redirect aca a la mini web
    console.error("**READ ME**");
    return "no";
    return new Promise(async (resolve, reject) => {
      const approveHex = await this.blastContract.approve.toPayload(
        ContractConfig.getContractConfigByName("marketplace").address,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );
      const [domainData, domainType] = getBagDomainData();
      const metaTransactionType = [
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
        { name: "functionSignature", type: "bytes" },
      ];
      const nonce = await this.blastContract.getNonce(wallet);
      const message = {
        nonce: nonce,
        from: wallet,
        functionSignature: approveHex.data,
      };

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message,
      });
      this.mainnetRequestManager.provider.sendAsync(
        {
          method: "eth_signTypedData_v4",
          params: [wallet, dataToSign],
          jsonrpc: "2.0",
          id: 999999999999,
        } as RPCSendableMessage,
        async (err: any, result: any) => {
          if (err) {
            console.log("Error", err.message);
            return reject(err);
          }

          const res: Response = await fetch(metaTxServer, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionData: {
                from: wallet,
                params: [
                  ContractConfig.getContractConfigByName("bag").address,
                  getExecuteMetaTransactionData(
                    wallet,
                    result.result,
                    approveHex.data
                  ),
                ],
              },
            }),
            method: "POST",
          });

          if (!res.ok) {
            return reject(res.statusText);
          }
          const { txHash } = (await res.json()) as { txHash: string };
          const chunks = txHash.match(/.{1,20}/g);
          // Join the chunks with '\n' and create the final string
          if (chunks) {
            const resultString = chunks.join("\n");

            // cb('Transaction hash: ' + resultString)
          }
          return resolve(txHash);
        }
      );
    });
  };
  // Cabecera: function pay(uint256 _orderID, uint256 _amount, address _beneficiary,uint256 dataSource)
  public buy = async (
    { id, price, beneficiaryWallet, userWallet, datasource }: BuyPayload,
    cb: (message: string) => void
  ) => {
    try {
      const approveHex = await this.marketplaceContract.pay.toPayload(
        id,
        price,
        beneficiaryWallet,
        datasource
      );
      const [domainData, domainType] = getMarketplaceDomainData();

      const metaTransactionType = [
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
        { name: "functionSignature", type: "bytes" },
      ];

      const nonce = await this.marketplaceContract.getNonce(userWallet);
      const message = {
        nonce,
        from: userWallet,
        functionSignature: approveHex.data,
      };

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message,
      });

      const payload: RPCSendableMessage = {
        method: "eth_signTypedData_v4",
        params: [userWallet, dataToSign],
        jsonrpc: "2.0",
        id: 999999999999,
      };
      this.mainnetRequestManager.provider.sendAsync(
        payload,
        async (err: any, result: any) => {
          if (err) {
            console.log("Error", err.message);
          }
          console.log("Result", result);
          const res: Response = await fetch(metaTxServer, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionData: {
                from: userWallet,
                params: [
                  ContractConfig.getContractConfigByName("marketplace").address,
                  getExecuteMetaTransactionData(
                    userWallet,
                    result.result,
                    approveHex.data
                  ),
                ],
              },
            }),
            method: "POST",
          });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const { txHash } = (await res.json()) as { txHash: string };

          const chunks = txHash.match(/.{1,20}/g);
          // Join the chunks with '\n' and create the final string
          if (chunks) {
            const resultString = chunks.join("\n");

            cb("Transaction hash: " + resultString);
          }

          return txHash;
        }
      );
    } catch (error: any) {
      console.log("Error buying", error.message);
      console.log("--------------Error--------------");
    }
  };

  public getUserData = async (userWallet: string) => {
    try {
      const message: SignMessageRequest = {
        message: {
          userData: "DG-Live-Login",
        },
      };
      const signatureMessageResponse: SignMessageResponse = await signMessage(
        message
      );
      if (!signatureMessageResponse.signature) {
        console.log("Error signing message");
        return;
      }
      const response = await fetch(`${config.baseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: signatureMessageResponse.hexEncodedMessage,
          address: userWallet,
          signature: signatureMessageResponse.signature,
        }),
      });
      const data = await response.json();
      // console.log('Data', data)
      // debugger
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}

export const web3 = new Web3();
