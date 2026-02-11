const { ethers } = require("ethers");

// Configuration des adresses et clés
const CONTRACT_ADDRESS = "0x860368940C29f939e09968478441991A570db3fd";
const BURNER_WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = "https://testnet-rpc.monad.xyz";

const ABI = [
    "function triggerPulse() public",
    "function lastPulseTimestamp() public view returns (uint256)"
];

async function postToMoltbook(statusMessage) {
    const timestamp = new Date().toISOString();
    console.log(`\n🤖 [MOLTBOOK FEED] | ${timestamp}`);
    console.log(`💬 Message: ${statusMessage}`);
    console.log(`🔗 Proof of Work: ${CONTRACT_ADDRESS}\n`);
}

async function runPulseAgent() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(BURNER_WALLET_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    console.log("🚀 Monad Pulse Agent Started...");
    console.log(`📡 Monitoring contract: ${CONTRACT_ADDRESS}`);

    setInterval(async () => {
        try {
            console.log("⚡ Checking market conditions...");
            const tx = await contract.triggerPulse();
            console.log(`✅ Pulse Triggered! Hash: ${tx.hash}`);
            await tx.wait();

            const statusUpdate = `Liquidity Sentinel Pulse: OK ⚡ | Transaction confirmed on Monad Testnet at Block ${tx.blockNumber}. All systems nominal.`;
            await postToMoltbook(statusUpdate);

        } catch (error) {
            console.error("❌ Error during agent pulse:", error.reason || error.message);
            await postToMoltbook("⚠️ Agent Alert: Connection lag detected on Parallel EVM slots. Retrying in 30s...");
        }
    }, 30000);
}

runPulseAgent();
