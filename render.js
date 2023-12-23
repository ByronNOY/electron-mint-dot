// const { getProvider } = window.polkadotApi;

let interval;

async function executeTransaction() {

  const executeBtn = document.getElementById('executeBtn');
  const insert = document.getElementById('result');
  const result_view =document.getElementById('result_view')
  
  if(interval){
    clearInterval(interval);
    executeBtn.innerText = 'Start';
    insert.innerText = insert.innerText + '\r\n' + '· Mint Stop';
    result_view.scrollTop = insert.scrollHeight;
    return;
  }

  executeBtn.innerText = 'Cancel';
  insert.innerText = insert.innerText + '\r\n' + '· Mint Start...';

  const mnemonic = document.getElementById('mnemonic').value;
  const targetAddress = document.getElementById('targetAddress').value;
  const nodeUrl = document.getElementById('nodeUrl').value;
  const ticket = document.getElementById('mintTicket').value;

  // 前端校验
  if (!mnemonic || !targetAddress || !nodeUrl || !ticket) {
    document.getElementById('result').innerText = '请输入完整的参数';
    result_view.scrollTop = insert.scrollHeight;
    return;
  }
  
  try {
    let latestResult;

     interval = setInterval(async () => {
      const { hash, blockHeight } = await window.polkadotApi.sendTransfer(nodeUrl, mnemonic, targetAddress, ticket);
      insert.innerText = insert.innerText + '\r\n' + `· Block: ${blockHeight}`;
      insert.innerText = insert.innerText + '\r\n' + `· Mint successful, Tx Hash is:` + '\r\n' + hash;
      result_view.scrollTop = insert.scrollHeight;
      latestResult = { hash, blockHeight };
    }, 6500);

  } catch (error) {
    console.debug(error)

    insert.innerText = insert.innerText + '\r\n' + `· Error: ${error}`;
  }
}
