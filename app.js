const V4_ABI = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function getPositionLiquidity(uint256 tokenId) view returns (uint128)',
  'function getPoolAndPositionInfo(uint256 tokenId) view returns (tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks),tuple(uint256 packed))',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];
const V3_ABI = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function positions(uint256 tokenId) view returns (uint96 nonce,address operator,address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const $ = (id) => document.getElementById(id);
const short = (value) => value ? `${value.slice(0, 7)}...${value.slice(-5)}` : '—';
const validAddress = (value) => /^0x[a-fA-F0-9]{40}$/.test(value);

$('settingsToggle').addEventListener('click', () => {
  const body = $('settingsBody');
  const expanded = $('settingsToggle').getAttribute('aria-expanded') === 'true';
  $('settingsToggle').setAttribute('aria-expanded', String(!expanded));
  body.hidden = expanded;
  $('settingsToggle').lastElementChild.textContent = expanded ? '+' : '−';
});

document.querySelectorAll('.tag').forEach((tag) => tag.addEventListener('click', () => {
  const current = $('tokenIds').value.trim();
  const token = tag.dataset.token;
  if (!current.split(/[\s,]+/).includes(token)) $('tokenIds').value = current ? `${current}\n${token}` : token;
}));

$('protocol').addEventListener('change', () => {
  const isV4 = $('protocol').value === 'v4';
  $('managerLabel').textContent = isV4 ? 'V4 PositionManager' : 'V3 PositionManager';
  $('positionManager').value = isV4 ? '0x58daec3116aae6D93017bAAea7749052E8a04fA7' : '0x73991a25c818bf1f1128deaab1492d45638DE0D3';
  $('positionManager').placeholder = isV4 ? 'Isi alamat V4 PositionManager, bukan PoolManager' : '0x...';
});

function showStatus(message, success = false) {
  $('statusBox').hidden = false;
  $('statusBox').className = `status-box${success ? ' success' : ''}`;
  $('statusBox').textContent = message;
}

function line(label, value) {
  return `<div class="data-line"><span>${label}</span><span title="${value}">${value}</span></div>`;
}

async function findTransfers(provider, manager, tokenId, fromBlock) {
  const latest = await provider.getBlockNumber();
  const tokenTopic = ethers.zeroPadValue(ethers.toBeHex(tokenId), 32);
  const transferTopic = ethers.id('Transfer(address,address,uint256)');
  const events = [];
  const chunkSize = 100000;
  for (let end = latest; end >= fromBlock; end -= chunkSize) {
    const start = Math.max(fromBlock, end - chunkSize + 1);
    const logs = await provider.getLogs({ address: manager.target, topics: [transferTopic, null, null, tokenTopic], fromBlock: start, toBlock: end });
    events.unshift(...logs.map((log) => manager.interface.parseLog(log)));
    if (events.length) break;
  }
  return events;
}

async function getIndexedPosition(tokenId) {
  const response = await fetch('/api/positions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chainId: 'ROBINHOOD', version: 'V4', tokenId: String(tokenId) })
  });
  if (!response.ok) throw new Error(`Uniswap indexer HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload.position) throw new Error(`Position #${tokenId} tidak ditemukan di indexer Uniswap.`);
  return payload.position;
}

function card(data) {
  if (data.error) return `<article class="result-card error-card"><div class="card-top"><span class="token-label">TOKEN #${data.tokenId}</span><span class="status closed">ERROR</span></div><p>${data.error}</p></article>`;
  const status = data.status ? data.status.replace('POSITION_STATUS_', '') : data.liquidity === '0' ? 'CLOSED' : 'OPEN';
  const ownerLabel = data.ownerSource === 'current' ? 'CURRENT OWNER' : data.ownerSource === 'uniswap-indexer' ? 'OWNER FROM UNISWAP INDEXER' : 'LAST HOLDER FROM TRANSFER LOG';
  return `<article class="result-card"><div class="card-top"><span class="token-label">TOKEN #${data.tokenId}</span><span class="status ${status.toLowerCase()}">${status}</span></div><div class="owner" title="${data.owner}">${short(data.owner)}</div><div class="owner-label">${ownerLabel}</div><div class="data-list">${line('Liquidity', data.liquidity)}${line('Pool currency 0', short(data.currency0))}${line('Pool currency 1', short(data.currency1))}${line('Fee', data.fee)}${line('Last transfer', data.block)}</div></article>`;
}

async function scan() {
  const rpc = $('rpcUrl').value.trim();
  const managerAddress = $('positionManager').value.trim();
  const protocol = $('protocol').value;
  const ids = [...new Set($('tokenIds').value.split(/[\s,]+/).map((id) => id.trim()).filter(Boolean))];
  const wallet = $('walletFilter').value.trim().toLowerCase();
  if (!rpc || !managerAddress || !validAddress(managerAddress)) return showStatus('Isi RPC URL dan alamat PositionManager yang valid terlebih dahulu.');
  if (!ids.length || ids.some((id) => !/^\d+$/.test(id))) return showStatus('Position ID harus berupa angka, satu ID per baris.');
  if (wallet && !validAddress(wallet)) return showStatus('Filter wallet bukan alamat EVM yang valid.');
  $('scanButton').disabled = true; $('scanButton').querySelector('span').textContent = 'Scanning...'; $('results').innerHTML = '';
  try {
    const provider = new ethers.JsonRpcProvider(rpc);
    const network = await provider.getNetwork();
    $('networkName').textContent = network.name === 'unknown' ? `Chain ${network.chainId}` : network.name;
    if (protocol === 'v4') {
      const results = await Promise.all(ids.map(async (tokenId) => {
        try {
          const position = await getIndexedPosition(tokenId);
          if (wallet && position.owner.toLowerCase() !== wallet) return null;
          return { tokenId, owner: position.owner, ownerSource: 'uniswap-indexer', liquidity: position.liquidity, currency0: position.token0Address, currency1: position.token1Address, fee: position.feeTier, block: position.status === 'POSITION_STATUS_CLOSED' ? 'CLOSED' : 'OPEN', status: position.status };
        } catch (error) { return { tokenId, error: error.message }; }
      }));
      const visible = results.filter(Boolean);
      $('results').innerHTML = visible.length ? visible.map(card).join('') : '<div class="empty-state"><strong>Tidak ada hasil cocok</strong><span>Wallet filter mungkin tidak sesuai.</span></div>';
      $('resultTitle').textContent = `${visible.length} position${visible.length === 1 ? '' : 's'} ditemukan`;
      $('scanMeta').textContent = `${new Date().toLocaleTimeString('id-ID')} · chain ${network.chainId} · Uniswap indexer`;
      showStatus('Scan selesai. Data posisi V4 dibaca dari indexer resmi Uniswap.', true);
      return;
    }
    const manager = new ethers.Contract(managerAddress, protocol === 'v3' ? V3_ABI : V4_ABI, provider);
    const results = await Promise.all(ids.map(async (tokenId) => {
      try {
        let owner; let ownerSource = 'current'; let ownerError;
        try { owner = await manager.ownerOf(tokenId); } catch (error) { ownerSource = 'history'; ownerError = error; }
        const transfers = await findTransfers(provider, manager, tokenId, Number($('fromBlock').value || 0));
        const lastTransfer = transfers.at(-1);
        if (!owner && lastTransfer) {
          const transferTo = lastTransfer.args.to;
          const zeroAddress = ethers.ZeroAddress.toLowerCase();
          owner = transferTo.toLowerCase() === zeroAddress ? lastTransfer.args.from : transferTo;
        }
        if (!owner) {
          const reason = ownerError?.shortMessage || ownerError?.reason || '';
          throw new Error(`${protocol === 'v4' ? 'NFT tidak terdaftar di V4 PositionManager.' : 'NFT tidak terdaftar di V3 PositionManager.'} ${reason.includes('NOT_MINTED') || reason.includes('nonexistent') ? `Token #${tokenId} belum pernah mint di contract ini.` : 'Periksa contract dan token ID.'}`);
        }
        if (wallet && owner.toLowerCase() !== wallet) return null;
        let liquidity = 'unknown'; let currency0 = '—'; let currency1 = '—'; let fee = '—';
        if (protocol === 'v3') {
          const position = await manager.positions(tokenId);
          currency0 = position.token0; currency1 = position.token1; fee = position.fee.toString(); liquidity = position.liquidity.toString();
        } else {
          try { liquidity = (await manager.getPositionLiquidity(tokenId)).toString(); } catch (_) { liquidity = 'unavailable'; }
          try { const pool = await manager.getPoolAndPositionInfo(tokenId); currency0 = pool[0].currency0; currency1 = pool[0].currency1; fee = pool[0].fee.toString(); } catch (_) { /* ABI differs across deployments */ }
        }
        return { tokenId, owner, ownerSource, liquidity, currency0, currency1, fee, block: lastTransfer ? `#${lastTransfer.blockNumber}` : 'no transfer found' };
      } catch (error) { return { tokenId, error: error.shortMessage || error.message }; }
    }));
    const visible = results.filter(Boolean);
    $('results').innerHTML = visible.length ? visible.map(card).join('') : '<div class="empty-state"><strong>Tidak ada hasil cocok</strong><span>Wallet filter mungkin tidak sesuai.</span></div>';
    $('resultTitle').textContent = `${visible.length} position${visible.length === 1 ? '' : 's'} ditemukan`;
    $('scanMeta').textContent = `${new Date().toLocaleTimeString('id-ID')} · chain ${network.chainId}`;
    showStatus('Scan selesai. Data berasal dari RPC yang kamu masukkan.', true);
  } catch (error) {
    $('results').innerHTML = '<div class="empty-state"><strong>Scan gagal</strong><span>Periksa RPC URL dan alamat contract.</span></div>';
    showStatus(error.shortMessage || error.message || 'RPC tidak dapat diakses.');
  } finally { $('scanButton').disabled = false; $('scanButton').querySelector('span').textContent = 'Scan positions'; }
}
$('scanButton').addEventListener('click', scan);
