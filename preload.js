// 此文件作为 Electron 渲染进程的预加载脚本
const { contextBridge, ipcRenderer } = require('electron');

const { cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { u8aToHex } = require('@polkadot/util');


contextBridge.exposeInMainWorld('polkadotApi', {

  getApiPromise: (nodeUrl) => {

    return api;
  },
  getAccount: (mnemonic) => {

    return account;
  },

  sendTransfer: async (nodeUrl, mnemonic, targetAddress, ticket) => {

    const wsProvider = new WsProvider(nodeUrl);
    const api = await new ApiPromise({ provider: wsProvider }).isReady;

    const keyring = new Keyring({ type: "sr25519" });
    keyring.setSS58Format(0);
    const account = keyring.addFromMnemonic(mnemonic);

    // 获取当前块的高度
    const blockHash = await api.rpc.chain.getBlock();
    const blockHeight = blockHash.block.header.number.toNumber();

    const transfer = api.tx.balances.transferKeepAlive(targetAddress, 0);
    const remark = api.tx.system.remark(`{"p":"dot-20","op":"mint","tick":"${ticket}"}`);

    const hash = await api.tx.utility.batchAll([transfer, remark]).signAndSend(account);
    return { hash: hash.toHex(), blockHeight }
  }
})
