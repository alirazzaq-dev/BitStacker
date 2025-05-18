<!--
  BitStacker – Fractionalized Bitcoin Mining via Ethereum NFTs
-->

# 🔗 BitStacker

Fractionalized Bitcoin mining powered by Ethereum NFTs. Mint “hash-power” NFTs, track your share in a live dashboard, and receive on-chain BTC payouts—all in one full-stack dApp.

---

## 🌐 Live Demo

https://bitstacker.vercel.app

---

## 🧐 What It Does

BitStacker lets anyone buy and hold **Ethereum NFTs** that each represent a slice of real-world Bitcoin mining hashpower.  
- **Mint** tiered NFTs (e.g. Silver / Gold) that map to fractional TH/s of ASIC miners.  
- **Dashboard** shows you your total hashpower, projected BTC rewards, and payout history.  
- **On-chain distribution**: a backend job calculates mining rewards and credits holders in BTC via a multi-sig wallet.  
- **Transparent roadmap & team** pages illustrate governance, funding allocation, and growth phases.

---

## 🛠 Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| **Smart Contracts**  | Solidity (ERC-721 for tiers, reward logic) |
| **Backend API**      | Node.js · TypeScript · Ethers.js · Express     |
| **Cron Scripts**     | scripts/ (reward calculation & on-chain payout) |
| **Frontend**         | React · TypeScript · Vite · Tailwind CSS        |
| **Deploy & Hosting** | Vercel (frontend) · Heroku / AWS Lambda (API)  |

---

## 📁 Repo Structure

```bash
BitStacker/
├── backend/    # Node.js API + contract-interaction services
├── frontend/   # React web app (dashboard, mint page, info)
├── script/     # Cron & deploy scripts (minting, reward distribution)
├── hardhat.config.ts  # Hardhat config for contract tasks
└── README.md
