const config = Object.freeze({
  // baseUrl: "https://ecommerce-api.dglive.org/v1",
  baseUrl: "http://localhost:8080/v1",
  wsUrl: "wss://ecommerce-api.dglive.org/ws",
  // wsUrl: 'ws://localhost:8090/ws',
  maxItemQuantity: 10,
  metaTxServer: "https://meta-tx-server.dglive.org/v1/transactions",
  blastProviderrUrl: "https://rpc.blast.io",
});

export default config;
