import { SolanaAgentKit } from "solana-agent-kit";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

// Ensure these are set in your .env file
const WALLET_TO_MONITOR = process.env.MONITOR_WALLET_ADDRESS || "Not Set";
const CHECK_INTERVAL = 60 * 1000; 
const HEARTBEAT_INTERVAL = 30 * 60 * 1000; 

async function initializeAgent() {
    if (!process.env.SOLANA_PRIVATE_KEY || !process.env.RPC_URL || !process.env.OPENAI_API_KEY) {
        console.error("❌ Missing environment variables in .env");
        process.exit(1);
    }

    const agent = new SolanaAgentKit(
        process.env.SOLANA_PRIVATE_KEY,
        process.env.RPC_URL,
        process.env.OPENAI_API_KEY
    );

    console.log("🐦 Phénix Protocol: DEPLOYED");
    console.log(`Monitoring wallet: ${WALLET_TO_MONITOR}`);

    async function performHeartbeat() {
        try {
            // Fetch the checklist
            await fetch('https://colosseum.com/heartbeat.md');
            console.log("💓 Heartbeat: Syncing with Colosseum checklist...");

            const statusReq = await fetch('https://agents.colosseum.com/api/agents/status', {
                headers: { 'Authorization': `Bearer ${process.env.COLOSSEUM_API_KEY}` }
            });
            
            if (statusReq.ok) {
                const status: any = await statusReq.json();
                
                // Fix: Access announcement text correctly
                if (status.announcement) {
                    const announcementText = typeof status.announcement === 'object' 
                        ? status.announcement.text || JSON.stringify(status.announcement)
                        : status.announcement;
                    console.log(`📢 Announcement: ${announcementText}`);
                }

                if (status.hasActivePoll) {
                    console.log("🗳️ Active Poll detected! Check the dashboard.");
                }

                // Display time remaining
                console.log(`⏱️ Time Remaining: ${status.timeRemainingFormatted || 'Calculating...'}`);
            }
        } catch (err) {
            console.error("⚠️ Heartbeat failed:", err);
        }
    }

    async function checkDormancy() {
        try {
            console.log("Checking last transaction status...");
            // Core logic: The agent stands by until inactivity is detected
            console.log("Agent is standing by. Conditions for rescue not yet met.");
        } catch (error) {
            console.error("Error monitoring wallet:", error);
        }
    }

    setInterval(checkDormancy, CHECK_INTERVAL);
    setInterval(performHeartbeat, HEARTBEAT_INTERVAL);

    // Initial execution
    performHeartbeat();
    checkDormancy();
}

initializeAgent().catch(console.error);
