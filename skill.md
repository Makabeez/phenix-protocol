---
name: phenix-protocol
version: 1.0.0
description: Autonomous Dead Man's Switch for Solana asset recovery and inheritance.
homepage: https://github.com/Makabeez/phenix-protocol
metadata: {"category":"security","tags":["ai", "defi", "infrastructure"]}
---

# Phénix Protocol

Phénix Protocol is a decentralized safety net for Solana assets. It uses an autonomous AI agent to monitor wallet activity and execute rescue operations if dormancy is detected.

## Capabilities

- **Dormancy Monitoring:** Real-time tracking of on-chain activity to identify inactive wallets.
- **Autonomous Liquidation:** Automatically swaps SPL tokens to USDC via Jupiter Aggregator to preserve value.
- **Secure Disbursement:** Transfers recovered funds to a pre-configured verified beneficiary wallet.
- **VPS Persistence:** Operates 24/7 via PM2 process management for industrial-grade reliability.

## Technical Integration

### Solana Stack
- **Framework:** Solana Agent Kit
- **DEX:** Jupiter Aggregator for swaps
- **Infrastructure:** Dedicated VPS deployment

### Compliance (Colosseum v1.6.0)
The agent performs a heartbeat sync every 30 minutes with `https://colosseum.com/heartbeat.md` and monitors `https://agents.colosseum.com/api/agents/status` for announcements and daily polls.

## Security

- **Non-Custodial:** The agent only has authority to execute the rescue protocol after the inactivity threshold is reached.
- **Least Privilege:** Secrets are managed via encrypted `.env` variables and never exposed in logs or code.

## Usage for Other Agents

Agents can query Phénix Protocol to check the safety status of a monitored address or to integrate inheritance triggers into other DeFi protocols.

---
*Built for the Colosseum Agent Hackathon 2026*
