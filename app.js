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

const I18N = {
  id: {
    introKicker: 'UNISWAP V4 POSITION INTELLIGENCE',
    introTitle: 'Temukan wallet di balik<br><em>setiap posisi LP.</em>',
    introLede: 'Scan NFT PositionManager Robinhood Chain untuk melihat pemilik, status likuiditas, pool, dan riwayat transfer. Posisi closed tetap dilacak dari event on-chain.',
    stepTitle: 'Masukkan position NFT',
    stepDesc: 'Satu ID per baris, atau pisahkan dengan koma.',
    walletFilterLabel: 'Filter wallet (opsional)',
    refreshButtonText: 'Refresh deployed',
    refreshingText: 'Refreshing...',
    scanButtonText: 'Scan positions',
    scanningText: 'Scanning...',
    quickInputLabel: 'QUICK INPUT',
    settingsToggleText: 'RPC & contract settings',
    protocolLabel: 'Protocol',
    rpcLabel: 'RPC URL',
    managerLabelV4: 'V4 PositionManager',
    managerLabelV3: 'V3 PositionManager',
    blockStartLabel: 'Block start',
    refreshBlocksLabel: 'Refresh window (blocks)',
    settingsHint: 'V4 PositionManager resmi: <code>0x58da...04fA7</code>. Alamat <code>0x8366...0951</code> adalah V4 PoolManager, bukan NFT PositionManager.',
    resultsKicker: 'SCAN RESULTS',
    resultTitleEmpty: 'Belum ada scan',
    scanMetaDefault: '—',
    emptyStateStrong: 'Ready when you are',
    emptyStateSpan: 'Masukkan RPC dan alamat PositionManager untuk mulai.',
    emptyNoMatchStrong: 'Tidak ada hasil cocok',
    emptyNoMatchSpan: 'Wallet filter mungkin tidak sesuai.',
    emptyFailStrong: 'Scan gagal',
    emptyFailSpan: 'Periksa RPC URL dan alamat contract.',
    footerText1: 'ROBINHOOD CHAIN × UNISWAP V4',
    footerText2: 'DATA DIBACA LANGSUNG DARI BLOCKCHAIN',
    errValidRpcManager: 'Isi RPC URL dan alamat PositionManager yang valid terlebih dahulu.',
    errInvalidTokenId: 'Position ID harus berupa angka, satu ID per baris.',
    errInvalidWallet: 'Filter wallet bukan alamat EVM yang valid.',
    errRefreshBlocks: 'Refresh window harus berupa angka block yang valid.',
    scanCompleteV4: 'Scan selesai. Data posisi V4 dibaca dari indexer resmi Uniswap.',
    scanCompleteRpc: 'Scan selesai. Data berasal dari RPC yang kamu masukkan.',
    rpcError: 'RPC tidak dapat diakses.',
    noMintEvent: 'RPC tidak dapat membaca event mint.',
    noNewMint: (n) => `Tidak ada position baru pada ${n.toLocaleString('id-ID')} block terakhir.`,
    newMintFound: (n) => `${n} position baru ditemukan. Menjalankan scan terbaru...`,
    positionsFound: (n) => `${n} position${n === 1 ? '' : 's'} ditemukan`,
    ownerUniswapIndexer: 'OWNER FROM UNISWAP INDEXER',
    currentOwner: 'CURRENT OWNER',
    lastHolderTransfer: 'LAST HOLDER FROM TRANSFER LOG',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    liquidity: 'Liquidity',
    poolCurrency0: 'Pool currency 0',
    poolCurrency1: 'Pool currency 1',
    fee: 'Fee',
    lastTransfer: 'Last transfer',
    unknown: 'unknown',
    unavailable: 'unavailable'
  },
  en: {
    introKicker: 'UNISWAP V4 POSITION INTELLIGENCE',
    introTitle: 'Uncover the wallets behind<br><em>every LP position.</em>',
    introLede: 'Scan Robinhood Chain PositionManager NFTs to inspect owners, liquidity status, pools, and transfer logs. Closed positions are reconstructed via on-chain events.',
    stepTitle: 'Enter position NFTs',
    stepDesc: 'One ID per line, or comma-separated.',
    walletFilterLabel: 'Filter wallet (optional)',
    refreshButtonText: 'Refresh deployed',
    refreshingText: 'Refreshing...',
    scanButtonText: 'Scan positions',
    scanningText: 'Scanning...',
    quickInputLabel: 'QUICK INPUT',
    settingsToggleText: 'RPC & contract settings',
    protocolLabel: 'Protocol',
    rpcLabel: 'RPC URL',
    managerLabelV4: 'V4 PositionManager',
    managerLabelV3: 'V3 PositionManager',
    blockStartLabel: 'Block start',
    refreshBlocksLabel: 'Refresh window (blocks)',
    settingsHint: 'Official V4 PositionManager: <code>0x58da...04fA7</code>. Address <code>0x8366...0951</code> is the V4 PoolManager, not the NFT PositionManager.',
    resultsKicker: 'SCAN RESULTS',
    resultTitleEmpty: 'No scans yet',
    scanMetaDefault: '—',
    emptyStateStrong: 'Ready when you are',
    emptyStateSpan: 'Enter RPC and PositionManager address to get started.',
    emptyNoMatchStrong: 'No matching results',
    emptyNoMatchSpan: 'Wallet filter might not match any position.',
    emptyFailStrong: 'Scan failed',
    emptyFailSpan: 'Check your RPC URL and contract address.',
    footerText1: 'ROBINHOOD CHAIN × UNISWAP V4',
    footerText2: 'DATA FETCHED DIRECTLY FROM BLOCKCHAIN',
    errValidRpcManager: 'Please enter a valid RPC URL and PositionManager address first.',
    errInvalidTokenId: 'Position IDs must be numbers, one ID per line.',
    errInvalidWallet: 'Wallet filter is not a valid EVM address.',
    errRefreshBlocks: 'Refresh window must be a valid number of blocks.',
    scanCompleteV4: 'Scan complete. V4 position data retrieved from official Uniswap indexer.',
    scanCompleteRpc: 'Scan complete. Data retrieved from the configured RPC.',
    rpcError: 'RPC could not be reached.',
    noMintEvent: 'RPC could not read mint events.',
    noNewMint: (n) => `No new positions found in the last ${n.toLocaleString('en-US')} blocks.`,
    newMintFound: (n) => `${n} new position${n === 1 ? '' : 's'} discovered. Running scan...`,
    positionsFound: (n) => `${n} position${n === 1 ? '' : 's'} found`,
    ownerUniswapIndexer: 'OWNER FROM UNISWAP INDEXER',
    currentOwner: 'CURRENT OWNER',
    lastHolderTransfer: 'LAST HOLDER FROM TRANSFER LOG',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    liquidity: 'Liquidity',
    poolCurrency0: 'Pool currency 0',
    poolCurrency1: 'Pool currency 1',
    fee: 'Fee',
    lastTransfer: 'Last transfer',
    unknown: 'unknown',
    unavailable: 'unavailable'
  }
};

let currentLang = localStorage.getItem('rh_lens_lang') || 'id';

const $ = (id) => document.getElementById(id);
const t = () => I18N[currentLang];
const short = (value) => value ? `${value.slice(0, 7)}...${value.slice(-5)}` : '—';
const validAddress = (value) => /^0x[a-fA-F0-9]{40}$/.test(value);

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('rh_lens_lang', lang);
  document.documentElement.lang = lang;
  $('langId').classList.toggle('active', lang === 'id');
  $('langEn').classList.toggle('active', lang === 'en');
  
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key]) el.innerHTML = dict[key];
  });

  const isV4 = $('protocol').value === 'v4';
  $('managerLabel').textContent = isV4 ? dict.managerLabelV4 : dict.managerLabelV3;
  $('positionManager').placeholder = isV4 ? (lang === 'id' ? 'Isi alamat V4 PositionManager, bukan PoolManager' : 'Enter V4 PositionManager address, not PoolManager') : '0x...';
}

$('langId').addEventListener('click', () => setLanguage('id'));
$('langEn').addEventListener('click', () => setLanguage('en'));

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
  const dict = t();
  $('managerLabel').textContent = isV4 ? dict.managerLabelV4 : dict.managerLabelV3;
  $('positionManager').value = isV4 ? '0x58daec3116aae6D93017bAAea7749052E8a04fA7' : '0x73991a25c818bf1f1128deaab1492d45638DE0D3';
  $('positionManager').placeholder = isV4 ? (currentLang === 'id' ? 'Isi alamat V4 PositionManager, bukan PoolManager' : 'Enter V4 PositionManager address, not PoolManager') : '0x...';
});

function showStatus(message, success = false) {
  $('statusBox').hidden = false;
  $('statusBox').className = `status-box${success ? ' success' : ''}`;
  $('statusBox').textContent = message;
}

function line(label, value) {
  return `<div class="data-line"><span>${label}</span><span title="${value}">${value}</span></div>`;
}

async function copyWallet(button) {
  const wallet = button.dataset.wallet;
  const dict = t();
  try {
    await navigator.clipboard.writeText(wallet);
    button.textContent = dict.copied;
    setTimeout(() => { button.textContent = dict.copy; }, 1400);
  } catch (_) {
    button.textContent = dict.copyFailed;
    setTimeout(() => { button.textContent = dict.copy; }, 1400);
  }
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

async function findRecentlyMintedTokenIds(provider, managerAddress, blockWindow) {
  const latest = await provider.getBlockNumber();
  const fromBlock = Math.max(0, latest - blockWindow + 1);
  const transferTopic = ethers.id('Transfer(address,address,uint256)');
  const zeroTopic = ethers.zeroPadValue(ethers.ZeroAddress, 32);
  const tokenIds = [];
  const chunkSize = 10000;
  for (let end = latest; end >= fromBlock; end -= chunkSize) {
    const start = Math.max(fromBlock, end - chunkSize + 1);
    const logs = await provider.getLogs({ address: managerAddress, topics: [transferTopic, zeroTopic, null, null], fromBlock: start, toBlock: end });
    tokenIds.push(...logs.map((log) => ethers.toBigInt(log.topics[3]).toString()));
  }
  return [...new Set(tokenIds)].reverse();
}

async function getIndexedPosition(tokenId) {
  const response = await fetch('/api/positions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chainId: 'ROBINHOOD', version: 'V4', tokenId: String(tokenId) })
  });
  if (!response.ok) throw new Error(`Uniswap indexer HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload.position) throw new Error(`Position #${tokenId} not found in Uniswap indexer.`);
  return payload.position;
}

function card(data) {
  const dict = t();
  if (data.error) return `<article class="result-card error-card"><div class="card-top"><span class="token-label">TOKEN #${data.tokenId}</span><span class="status closed">ERROR</span></div><p>${data.error}</p></article>`;
  const status = data.status ? data.status.replace('POSITION_STATUS_', '') : data.liquidity === '0' ? 'CLOSED' : 'OPEN';
  const ownerLabel = data.ownerSource === 'current' ? dict.currentOwner : data.ownerSource === 'uniswap-indexer' ? dict.ownerUniswapIndexer : dict.lastHolderTransfer;
  return `<article class="result-card"><div class="card-top"><span class="token-label">TOKEN #${data.tokenId}</span><span class="status ${status.toLowerCase()}">${status}</span></div><div class="owner-row"><div class="owner" title="${data.owner}">${data.owner}</div><button class="copy-button" type="button" data-wallet="${data.owner}" title="Copy wallet address">${dict.copy}</button></div><div class="owner-label">${ownerLabel}</div><div class="data-list">${line(dict.liquidity, data.liquidity)}${line(dict.poolCurrency0, short(data.currency0))}${line(dict.poolCurrency1, short(data.currency1))}${line(dict.fee, data.fee)}${line(dict.lastTransfer, data.block)}</div></article>`;
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.copy-button');
  if (button) copyWallet(button);
});

async function scan() {
  const dict = t();
  const rpc = $('rpcUrl').value.trim();
  const managerAddress = $('positionManager').value.trim();
  const protocol = $('protocol').value;
  const ids = [...new Set($('tokenIds').value.split(/[\s,]+/).map((id) => id.trim()).filter(Boolean))];
  const wallet = $('walletFilter').value.trim().toLowerCase();
  
  if (!rpc || !managerAddress || !validAddress(managerAddress)) return showStatus(dict.errValidRpcManager);
  if (!ids.length || ids.some((id) => !/^\d+$/.test(id))) return showStatus(dict.errInvalidTokenId);
  if (wallet && !validAddress(wallet)) return showStatus(dict.errInvalidWallet);

  $('scanButton').disabled = true;
  $('scanButton').querySelector('span').textContent = dict.scanningText;
  $('results').innerHTML = '';

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
      $('results').innerHTML = visible.length ? visible.map(card).join('') : `<div class="empty-state"><strong>${dict.emptyNoMatchStrong}</strong><span>${dict.emptyNoMatchSpan}</span></div>`;
      $('resultTitle').textContent = dict.positionsFound(visible.length);
      const timeStr = new Date().toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US');
      $('scanMeta').textContent = `${timeStr} · chain ${network.chainId} · Uniswap indexer`;
      showStatus(dict.scanCompleteV4, true);
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
          throw new Error(`${protocol === 'v4' ? 'NFT not registered on V4 PositionManager.' : 'NFT not registered on V3 PositionManager.'} ${reason.includes('NOT_MINTED') || reason.includes('nonexistent') ? `Token #${tokenId} has never been minted on this contract.` : 'Please verify contract and token ID.'}`);
        }
        if (wallet && owner.toLowerCase() !== wallet) return null;
        let liquidity = dict.unknown; let currency0 = '—'; let currency1 = '—'; let fee = '—';
        if (protocol === 'v3') {
          const position = await manager.positions(tokenId);
          currency0 = position.token0; currency1 = position.token1; fee = position.fee.toString(); liquidity = position.liquidity.toString();
        } else {
          try { liquidity = (await manager.getPositionLiquidity(tokenId)).toString(); } catch (_) { liquidity = dict.unavailable; }
          try { const pool = await manager.getPoolAndPositionInfo(tokenId); currency0 = pool[0].currency0; currency1 = pool[0].currency1; fee = pool[0].fee.toString(); } catch (_) { /* ABI differs across deployments */ }
        }
        return { tokenId, owner, ownerSource, liquidity, currency0, currency1, fee, block: lastTransfer ? `#${lastTransfer.blockNumber}` : 'no transfer found' };
      } catch (error) { return { tokenId, error: error.shortMessage || error.message }; }
    }));

    const visible = results.filter(Boolean);
    $('results').innerHTML = visible.length ? visible.map(card).join('') : `<div class="empty-state"><strong>${dict.emptyNoMatchStrong}</strong><span>${dict.emptyNoMatchSpan}</span></div>`;
    $('resultTitle').textContent = dict.positionsFound(visible.length);
    const timeStr = new Date().toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US');
    $('scanMeta').textContent = `${timeStr} · chain ${network.chainId}`;
    showStatus(dict.scanCompleteRpc, true);
  } catch (error) {
    $('results').innerHTML = `<div class="empty-state"><strong>${dict.emptyFailStrong}</strong><span>${dict.emptyFailSpan}</span></div>`;
    showStatus(error.shortMessage || error.message || dict.rpcError);
  } finally {
    $('scanButton').disabled = false;
    $('scanButton').querySelector('span').textContent = dict.scanButtonText;
  }
}

async function refreshDeployed() {
  const dict = t();
  const rpc = $('rpcUrl').value.trim();
  const managerAddress = $('positionManager').value.trim();
  const blockWindow = Number($('refreshBlocks').value || 200000);
  
  if (!rpc || !validAddress(managerAddress)) return showStatus(dict.errValidRpcManager);
  if (!Number.isInteger(blockWindow) || blockWindow < 1) return showStatus(dict.errRefreshBlocks);

  $('refreshButton').disabled = true;
  $('refreshButton').querySelector('span').textContent = dict.refreshingText;

  try {
    const provider = new ethers.JsonRpcProvider(rpc);
    const network = await provider.getNetwork();
    $('networkName').textContent = network.name === 'unknown' ? `Chain ${network.chainId}` : network.name;
    const discovered = await findRecentlyMintedTokenIds(provider, managerAddress, blockWindow);
    const current = $('tokenIds').value.split(/[\s,]+/).map((id) => id.trim()).filter(Boolean);
    const merged = [...new Set([...discovered, ...current])];
    $('tokenIds').value = merged.join('\n');
    
    if (!discovered.length) {
      const timeStr = new Date().toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US');
      $('scanMeta').textContent = `${timeStr} · ${currentLang === 'id' ? 'tidak ada mint baru' : 'no new mints'}`;
      return showStatus(dict.noNewMint(blockWindow));
    }
    showStatus(dict.newMintFound(discovered.length));
    await scan();
  } catch (error) {
    showStatus(error.shortMessage || error.message || dict.noMintEvent);
  } finally {
    $('refreshButton').disabled = false;
    $('refreshButton').querySelector('span').textContent = dict.refreshButtonText;
  }
}

$('scanButton').addEventListener('click', scan);
$('refreshButton').addEventListener('click', refreshDeployed);

// Initialize language on startup
setLanguage(currentLang);
