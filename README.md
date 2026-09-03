# Robinhood LP Lens

**On-chain position intelligence untuk Robinhood Chain.**

Robinhood LP Lens adalah scanner browser read-only untuk melacak NFT liquidity position pada Uniswap V3 dan V4. Alat ini membantu melihat wallet pemilik, status posisi, liquidity, pasangan token, fee tier, dan jejak transfer langsung dari blockchain.

## Fungsinya untuk apa?

- Menemukan current owner dari satu atau banyak NFT PositionManager.
- Membaca status posisi: `OPEN` atau `CLOSED`.
- Menampilkan liquidity, pool currency, dan fee tier jika data tersedia dari contract.
- Melacak last holder melalui event `Transfer` ketika NFT sudah diburn atau `ownerOf` tidak tersedia.
- Memfilter hasil berdasarkan wallet address.
- Membaca data langsung dari RPC tanpa mengirim data ke server aplikasi.

## Menjalankan aplikasi di Windows

### Cara cepat

1. Pastikan [Node.js](https://nodejs.org/) sudah ter-install.
2. Double-click **Buka Scanner.bat**.
3. Browser akan terbuka di `http://localhost:4173`.
4. Biarkan jendela PowerShell tetap terbuka selama scanner digunakan.
5. Tutup jendela PowerShell untuk menghentikan server.

### Cara manual

```powershell
node server.js
```

Kemudian buka [http://localhost:4173](http://localhost:4173) di browser.

> Jangan membuka `index.html` dengan double-click. Server lokal diperlukan agar browser dapat mengakses RPC dan API dengan benar.

## Petunjuk penggunaan

1. Buka bagian **RPC & contract settings**.
2. Pilih protocol **Uniswap V4** atau **Uniswap V3**.
3. Pastikan RPC URL dan alamat PositionManager sesuai dengan network yang dipilih.
4. Masukkan satu atau beberapa position NFT ID. Pisahkan dengan baris baru atau koma.
5. Biarkan **Filter wallet** kosong agar owner setiap NFT dicari otomatis, atau isi dengan address wallet tertentu.
6. Klik **Scan positions**.
7. Tinjau hasil scan dan status setiap position.

Nilai **Block start** dapat dinaikkan untuk mempercepat pencarian event pada RPC yang membatasi rentang block. ID contoh pada tombol **Quick input** dapat digunakan untuk pengujian awal.

## Data yang dibaca

- `ownerOf(tokenId)` untuk current owner.
- `positions(tokenId)` pada Uniswap V3.
- `getPositionLiquidity(tokenId)` dan metadata pool pada deployment Uniswap V4 yang mendukung ABI tersebut.
- Event `Transfer` untuk riwayat kepemilikan.

## Keamanan dan batasan

- Aplikasi ini read-only dan tidak melakukan transaksi.
- Jangan memasukkan private key, seed phrase, atau kredensial wallet.
- Hasil bergantung pada ketersediaan RPC, ABI contract, dan event on-chain.
- Data yang dimasukkan di form diproses di browser dan tidak dikirim ke server aplikasi.

## Struktur project

| File | Fungsi |
| --- | --- |
| `index.html` | Struktur halaman scanner |
| `styles.css` | Tampilan dan layout |
| `app.js` | Logika scan dan pembacaan blockchain |
| `server.js` | Server lokal untuk menyajikan aplikasi |
| `Buka Scanner.bat` | Shortcut menjalankan server di Windows |
