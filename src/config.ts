const config = Object.freeze({
  baseUrl: "https://ecommerce-api.dglive.org/v1",
  // baseUrl: 'http://localhost:8080/v1',
  wsUrl: "wss://ecommerce-api.dglive.org/ws",
  // wsUrl: 'ws://localhost:8090/ws',
  maxItemQuantity: 10,
  metaTxServer: "https://meta-tx-server.dglive.org/v1/transactions",
  polyProviderUrl: "https://polygon-rpc.com",
  iceContractAddress: "0xc6c855ad634dcdad23e64da71ba85b8c51e5ad7c",
  dgLiveContractAddress: "0x119E95F4deBdFdaE96D07E1239255847742F1cA3",
});

export default config;
