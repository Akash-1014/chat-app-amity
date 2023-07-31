import ASCClient, { ConnectionStatus, ApiEndpoint } from "@amityco/js-sdk";

// Amity sample-app apiKey
const apiKey = "b0e8bb583e88a5374e308415550810dcd30888e4ec346e2a";
export const client = ASCClient.create({ apiKey, apiEndpoint: ApiEndpoint.SG });

export let currentUserId = 13;

// promisified client connection
export const connectClient = async (userId) => {
  return new Promise((resolve) => {
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        currentUserId = userId;
        resolve();
      }
    });

    client.registerSession({ userId });
  });
};
