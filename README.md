# Robinhood LP Scanner

Tool browser read-only untuk memeriksa NFT PositionManager Uniswap V3/V4.

## Cara membuka browser siap pakai

### Cara paling mudah di Windows

1. Pastikan **Node.js** sudah ter-install.
2. Double-click file **Buka Scanner.bat** di folder ini.
3. Browser akan terbuka otomatis di `http://localhost:4173`.
4. Biarkan jendela hitam/PowerShell tetap terbuka selama scanner digunakan.
5. Untuk menghentikan server, tutup jendela tersebut.

### Jika browser tidak terbuka otomatis

1. Buka PowerShell di folder project ini.
2. Jalankan:

```powershell
node server.js
```

3. Buka browser secara manual ke [http://localhost:4173](http://localhost:4173).

Jangan double-click `index.html` secara langsung. Scanner membutuhkan server lokal agar request ke API Uniswap tidak diblokir browser oleh CORS.

## Cara pakai scanner

1. Pilih protocol **Uniswap V4**.
2. Masukkan satu atau beberapa position NFT ID, misalnya `1444768` dan `1446513`.
3. Kosongkan **Filter wallet**. Owner akan dicari otomatis.
4. Klik **Scan positions**.

Scanner membaca:

- `ownerOf` untuk current owner.
- `positions(tokenId)` (V3) atau `getPositionLiquidity` (V4) untuk status `OPEN` atau `CLOSED`.
- event `Transfer` untuk menemukan last holder saat NFT sudah diburn atau `ownerOf` tidak tersedia.
- metadata pool jika deployment PositionManager mendukung ABI tersebut.

Kolom wallet hanya memfilter hasil dari NFT ID yang dimasukkan dan boleh dikosongkan. Owner dicari otomatis dari setiap NFT ID. Nilai `Block start` dapat dinaikkan agar pencarian event lebih ringan pada RPC yang membatasi rentang block.

Data tidak dikirim ke server aplikasi; pembacaan dilakukan langsung dari RPC di browser. Jangan masukkan private key.
