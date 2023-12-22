// const { getProvider } = window.polkadotApi;

async function executeTransaction() {
  const insert = document.getElementById('result');
  insert.innerText = insert.innerText + '\r\n' + '· 正在提交交易...';

  const mnemonic = document.getElementById('mnemonic').value;
  const targetAddress = document.getElementById('targetAddress').value;
  const nodeUrl = document.getElementById('nodeUrl').value;
  const ticket = document.getElementById('mintTicket').value;



  // 前端校验
  if (!mnemonic || !targetAddress || !nodeUrl || !ticket) {
    document.getElementById('result').innerText = '请输入完整的参数';
    return;
  }

  try {
    const { hash, blockHeight } = await window.polkadotApi.sendTransfer(nodeUrl, mnemonic, targetAddress, ticket);
    console.debug(hash, blockHeight);

    insert.innerText = insert.innerText + '\r\n' + `· Block: ${blockHeight}`;
    insert.innerText = insert.innerText + '\r\n' + `· Mint successful, Tx Hash is:` + '\r\n' + hash;


  } catch (error) {
    console.debug(error)

    insert.innerText = insert.innerText + '\r\n' + `· Error: ${error}`;
  }
}
