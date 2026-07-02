
"use strict";


const DB = {
    blocks: [],
    wallets: [],
    transactions: [],
    contracts: [],
    validators: [],
    miners: [],
    nodes: [],
    nft: [],
    portfolio: [],
    quiz: []
};


const blockCount = document.getElementById("blockCount");
const walletCount = document.getElementById("walletCount");
const txCount = document.getElementById("txCount");
const contractCount = document.getElementById("contractCount");
const validatorCount = document.getElementById("validatorCount");
const minerCount = document.getElementById("minerCount");

const blocksContainer = document.getElementById("blocksContainer");
const walletsContainer = document.getElementById("walletsContainer");
const transactionsContainer = document.getElementById("transactionsContainer");
const contractsContainer = document.getElementById("contractsContainer");
const validatorsContainer = document.getElementById("validatorsContainer");
const minersContainer = document.getElementById("minersContainer");
const nodesContainer = document.getElementById("nodesContainer");
const nftsContainer = document.getElementById("nftsContainer");
const portfolioContainer = document.getElementById("portfolioContainer");
const quizContainer = document.getElementById("quizContainer");

const terminalOutput = document.getElementById("terminalOutput");
const simulateBtn = document.getElementById("simulateBtn");


const jsonFiles = {

    blocks: "data/blocks.json",

    wallets: "data/wallets.json",

    transactions: "data/transactions.json",

    contracts: "data/smartcontracts.json",

    validators: "data/validators.json",

    miners: "data/miners.json",

    nodes: "data/nodes.json",

    nft: "data/nft.json",

    portfolio: "data/portfolio.json",

    quiz: "data/quiz.json"

};


async function loadJSON(file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(file);

        }

        return await response.json();

    }

    catch (error) {

        console.error("Errore:", error);

        return [];

    }

}


async function loadDatabase() {

    DB.blocks = await loadJSON(jsonFiles.blocks);

    DB.wallets = await loadJSON(jsonFiles.wallets);

    DB.transactions = await loadJSON(jsonFiles.transactions);

    DB.contracts = await loadJSON(jsonFiles.contracts);

    DB.validators = await loadJSON(jsonFiles.validators);

    DB.miners = await loadJSON(jsonFiles.miners);

    DB.nodes = await loadJSON(jsonFiles.nodes);

    DB.nft = await loadJSON(jsonFiles.nft);

    DB.portfolio = await loadJSON(jsonFiles.portfolio);

    DB.quiz = await loadJSON(jsonFiles.quiz);

}


function shortHash(hash) {

    if (!hash) return "N/A";

    return hash.substring(0, 12) + "...";

}


function crypto(value) {

    return Number(value).toFixed(4);

}


function createCard() {

    const card = document.createElement("div");

    card.className = "card";

    return card;

}


function clearContainer(container) {

    container.innerHTML = "";

}


function terminal(message) {

    const line = document.createElement("div");

    line.textContent = message;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;

}


function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


function random(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}


function badge(status) {

    switch (status.toLowerCase()) {

        case "online":

            return "badge online";

        case "offline":

            return "badge offline";

        default:

            return "badge warning";

    }

}


async function init() {

    terminal("Loading Blockchain Database...");

    await loadDatabase();

    terminal("Database loaded.");

    terminal("Initializing dashboard...");


    updateDashboard();

    renderBlocks();

    renderWallets();

    renderTransactions();

    renderContracts();

    renderValidators();

    renderMiners();

    renderNodes();

    renderNFT();

    renderPortfolio();

    renderQuiz();

    terminal("System Ready.");

}

document.addEventListener("DOMContentLoaded", init);



function animateCounter(element, target) {

    if (!element) return;

    target = Number(target) || 0;

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 50));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        element.textContent = current;

    }, 20);

}


function getStatistics() {

    return {

        blocks: DB.blocks.length,

        wallets: DB.wallets.length,

        transactions: DB.transactions.length,

        contracts: DB.contracts.length,

        validators: DB.validators.length,

        miners: DB.miners.length,

        nodes: DB.nodes.length,

        nft: DB.nft.length,

        portfolio: DB.portfolio.length,

        quiz: DB.quiz.length

    };

}


function updateDashboard() {

    const stats = getStatistics();

    animateCounter(blockCount, stats.blocks);

    animateCounter(walletCount, stats.wallets);

    animateCounter(txCount, stats.transactions);

    animateCounter(contractCount, stats.contracts);

    animateCounter(validatorCount, stats.validators);

    animateCounter(minerCount, stats.miners);

    console.table(stats);

}


function blockchainInfo() {

    const totalBalance = DB.wallets.reduce((sum, wallet) => {

        return sum + Number(wallet.balance || 0);

    }, 0);

    const totalStake = DB.validators.reduce((sum, validator) => {

        return sum + Number(validator.stake || 0);

    }, 0);

    const avgHashrate = DB.miners.length
        ? (
            DB.miners.reduce((sum, miner) => {

                return sum + Number(miner.hashrate || 0);

            }, 0) / DB.miners.length
        ).toFixed(2)
        : 0;

    console.log("========== BLOCKCHAIN ==========");

    console.log("Blocks:", DB.blocks.length);

    console.log("Wallets:", DB.wallets.length);

    console.log("Transactions:", DB.transactions.length);

    console.log("Validators:", DB.validators.length);

    console.log("Miners:", DB.miners.length);

    console.log("Nodes:", DB.nodes.length);

    console.log("NFT:", DB.nft.length);

    console.log("Portfolio:", DB.portfolio.length);

    console.log("Quiz:", DB.quiz.length);

    console.log("Wallet Balance:", totalBalance);

    console.log("Validator Stake:", totalStake);

    console.log("Average Hashrate:", avgHashrate);

}


function dashboardHealth() {

    let online = 0;

    let offline = 0;

    DB.nodes.forEach(node => {

        if (
            node.status &&
            node.status.toLowerCase() === "online"
        ) {

            online++;

        } else {

            offline++;

        }

    });

    terminal("--------------------------------");

    terminal("Network Health");

    terminal("Online Nodes : " + online);

    terminal("Offline Nodes: " + offline);

    terminal("--------------------------------");

}


function networkSummary() {

    const summary = {

        blocks: DB.blocks.length,

        wallets: DB.wallets.length,

        transactions: DB.transactions.length,

        contracts: DB.contracts.length,

        validators: DB.validators.length,

        miners: DB.miners.length,

        nodes: DB.nodes.length

    };

    return summary;

}


function printSummary() {

    const info = networkSummary();

    terminal("Network Summary");

    Object.entries(info).forEach(item => {

        terminal(item[0] + ": " + item[1]);

    });

}


function refreshDashboard() {

    updateDashboard();

    blockchainInfo();

    dashboardHealth();

    printSummary();

}



function createBlockCard(block) {

    const card = createCard();

    const status = block.status || "Confirmed";

    card.innerHTML = `

        <h3>Block #${block.height}</h3>

        <p><strong>Hash</strong><br>${shortHash(block.hash)}</p>

        <p><strong>Previous</strong><br>${shortHash(block.previousHash)}</p>

        <p><strong>Miner</strong><br>${block.miner}</p>

        <p><strong>Transactions</strong><br>${block.transactions}</p>

        <p><strong>Difficulty</strong><br>${block.difficulty}</p>

        <p><strong>Reward</strong><br>${block.reward} BTC</p>

        <p><strong>Timestamp</strong><br>${block.timestamp}</p>

        <span class="${badge(status)}">
            ${status}
        </span>

    `;

    return card;

}


function sortBlocks() {

    DB.blocks.sort((a, b) => {

        return b.height - a.height;

    });

}


function renderBlocks() {

    if (!blocksContainer) return;

    clearContainer(blocksContainer);

    if (DB.blocks.length === 0) {

        blocksContainer.innerHTML = `
            <p>Nessun blocco disponibile.</p>
        `;

        return;

    }

    sortBlocks();

    DB.blocks.forEach(block => {

        blocksContainer.appendChild(

            createBlockCard(block)

        );

    });

}


function findBlock(height) {

    return DB.blocks.find(block =>

        Number(block.height) === Number(height)

    );

}


function findHash(hash) {

    return DB.blocks.find(block =>

        block.hash === hash

    );

}


function latestBlock() {

    if (DB.blocks.length === 0) return null;

    return DB.blocks.reduce((latest, current) =>

        current.height > latest.height
            ? current
            : latest

    );

}


function printLatestBlock() {

    const block = latestBlock();

    if (!block) return;

    terminal("--------------------------------");

    terminal("Latest Block");

    terminal("Height : " + block.height);

    terminal("Hash   : " + shortHash(block.hash));

    terminal("Miner  : " + block.miner);

    terminal("TX     : " + block.transactions);

    terminal("--------------------------------");

}


function totalRewards() {

    let reward = 0;

    DB.blocks.forEach(block => {

        reward += Number(block.reward || 0);

    });

    return reward;

}


function totalTransactions() {

    let total = 0;

    DB.blocks.forEach(block => {

        total += Number(block.transactions || 0);

    });

    return total;

}


function blockStatistics() {

    console.log("========== BLOCK EXPLORER ==========");

    console.log("Blocks:", DB.blocks.length);

    console.log("Transactions:", totalTransactions());

    console.log("Rewards:", totalRewards());

}


async function scanBlockchain() {

    terminal("");

    terminal("Scanning Blockchain...");

    await sleep(500);

    terminal("Reading Blocks...");

    await sleep(500);

    terminal("Checking Hash Integrity...");

    await sleep(600);

    terminal("Verifying Chain...");

    await sleep(700);

    terminal("Consensus OK");

    terminal("No Invalid Blocks");

    terminal("Explorer Ready");

    printLatestBlock();

}



function createWalletCard(wallet) {

    const card = createCard();

    card.innerHTML = `

        <h3>${wallet.owner}</h3>

        <p><strong>Address</strong><br>${wallet.address}</p>

        <p><strong>Network</strong><br>${wallet.network}</p>

        <p><strong>Balance</strong><br>${crypto(wallet.balance)} BTC</p>

        <span class="${badge(wallet.status)}">
            ${wallet.status}
        </span>

    `;

    return card;

}


function renderWallets() {

    if (!walletsContainer) return;

    clearContainer(walletsContainer);

    if (DB.wallets.length === 0) {

        walletsContainer.innerHTML = `
            <p>Nessun wallet disponibile.</p>
        `;

        return;

    }

    sortWallets();

    DB.wallets.forEach(wallet => {

        walletsContainer.appendChild(

            createWalletCard(wallet)

        );

    });

}


function sortWallets() {

    DB.wallets.sort((a, b) => {

        return Number(b.balance) - Number(a.balance);

    });

}


function findWallet(address) {

    return DB.wallets.find(wallet =>

        wallet.address === address

    );

}


function totalWalletBalance() {

    let total = 0;

    DB.wallets.forEach(wallet => {

        total += Number(wallet.balance || 0);

    });

    return total;

}


function richestWallet() {

    if (DB.wallets.length === 0) return null;

    return DB.wallets.reduce((richest, wallet) => {

        return Number(wallet.balance) > Number(richest.balance)
            ? wallet
            : richest;

    });

}


function walletOnlineCount() {

    return DB.wallets.filter(wallet =>

        wallet.status &&
        wallet.status.toLowerCase() === "online"

    ).length;

}


function walletStatistics() {

    console.log("========== WALLETS ==========");

    console.log("Wallet:", DB.wallets.length);

    console.log("Online:", walletOnlineCount());

    console.log("Balance:", totalWalletBalance());

    const richest = richestWallet();

    if (richest) {

        console.log("Richest:", richest.owner);

        console.log("BTC:", richest.balance);

    }

}


function walletTerminalInfo() {

    terminal("");

    terminal("Wallet Database");

    terminal("-----------------------------");

    terminal("Wallets : " + DB.wallets.length);

    terminal("Online : " + walletOnlineCount());

    terminal("Balance : " + crypto(totalWalletBalance()) + " BTC");

    const richest = richestWallet();

    if (richest) {

        terminal("");

        terminal("Top Wallet");

        terminal(richest.owner);

        terminal(crypto(richest.balance) + " BTC");

    }

}


function searchWallets(text) {

    text = text.toLowerCase();

    return DB.wallets.filter(wallet =>

        wallet.owner.toLowerCase().includes(text) ||

        wallet.address.toLowerCase().includes(text)

    );

}


function addWallet(wallet) {

    DB.wallets.push(wallet);

    renderWallets();

    refreshDashboard();

}


function removeWallet(address) {

    DB.wallets = DB.wallets.filter(wallet =>

        wallet.address !== address

    );

    renderWallets();

    refreshDashboard();

}


function updateWalletBalance(address, amount) {

    const wallet = findWallet(address);

    if (!wallet) return false;

    wallet.balance = Number(amount);

    renderWallets();

    refreshDashboard();

    return true;

}



function createTransactionCard(tx) {

    const card = createCard();

    card.innerHTML = `

        <h3>${tx.txid}</h3>

        <p><strong>From</strong><br>${tx.from}</p>

        <p><strong>To</strong><br>${tx.to}</p>

        <p><strong>Amount</strong><br>${crypto(tx.amount)} BTC</p>

        <p><strong>Fee</strong><br>${crypto(tx.fee)} BTC</p>

        <p><strong>Timestamp</strong><br>${tx.timestamp}</p>

        <span class="${badge(tx.status)}">
            ${tx.status}
        </span>

    `;

    return card;

}


function renderTransactions() {

    if (!transactionsContainer) return;

    clearContainer(transactionsContainer);

    if (DB.transactions.length === 0) {

        transactionsContainer.innerHTML =
            "<p>Nessuna transazione disponibile.</p>";

        return;

    }

    DB.transactions.forEach(tx => {

        transactionsContainer.appendChild(

            createTransactionCard(tx)

        );

    });

}


function findTransaction(txid) {

    return DB.transactions.find(tx =>

        tx.txid === txid

    );

}


function totalTransactionVolume() {

    return DB.transactions.reduce((sum, tx) =>

        sum + Number(tx.amount || 0)

    , 0);

}


function totalFees() {

    return DB.transactions.reduce((sum, tx) =>

        sum + Number(tx.fee || 0)

    , 0);

}


function confirmedTransactions() {

    return DB.transactions.filter(tx =>

        tx.status &&
        tx.status.toLowerCase() === "confirmed"

    ).length;

}


function transactionStatistics() {

    console.log("========== TRANSACTIONS ==========");

    console.log("Total:", DB.transactions.length);

    console.log("Confirmed:", confirmedTransactions());

    console.log("Volume:", totalTransactionVolume());

    console.log("Fees:", totalFees());

}


function transactionTerminal() {

    terminal("");

    terminal("Transactions");

    terminal("---------------------------");

    terminal("Count : " + DB.transactions.length);

    terminal("Volume : " +
        crypto(totalTransactionVolume()) + " BTC");

    terminal("Fees : " +
        crypto(totalFees()) + " BTC");

}


function createPortfolioCard(asset) {

    const card = createCard();

    const invested =
        Number(asset.amount) * Number(asset.buyPrice);

    const current =
        Number(asset.amount) * Number(asset.currentPrice);

    const profit = current - invested;

    card.innerHTML = `

        <h3>${asset.coin}</h3>

        <p><strong>Symbol</strong><br>${asset.symbol}</p>

        <p><strong>Amount</strong><br>${asset.amount}</p>

        <p><strong>Buy Price</strong><br>$${asset.buyPrice}</p>

        <p><strong>Current</strong><br>$${asset.currentPrice}</p>

        <p><strong>P/L</strong><br>${profit.toFixed(2)} USD</p>

    `;

    return card;

}


function renderPortfolio() {

    if (!portfolioContainer) return;

    clearContainer(portfolioContainer);

    if (DB.portfolio.length === 0) {

        portfolioContainer.innerHTML =
            "<p>Portfolio vuoto.</p>";

        return;

    }

    DB.portfolio.forEach(asset => {

        portfolioContainer.appendChild(

            createPortfolioCard(asset)

        );

    });

}


function investedValue() {

    return DB.portfolio.reduce((sum, asset) =>

        sum + (
            Number(asset.amount) *
            Number(asset.buyPrice)
        )

    , 0);

}


function currentValue() {

    return DB.portfolio.reduce((sum, asset) =>

        sum + (
            Number(asset.amount) *
            Number(asset.currentPrice)
        )

    , 0);

}


function portfolioProfit() {

    return currentValue() - investedValue();

}


function bestAsset() {

    if (DB.portfolio.length === 0) return null;

    return DB.portfolio.reduce((best, asset) => {

        const bestGain =
            best.amount * best.currentPrice -
            best.amount * best.buyPrice;

        const assetGain =
            asset.amount * asset.currentPrice -
            asset.amount * asset.buyPrice;

        return assetGain > bestGain
            ? asset
            : best;

    });

}


function portfolioStatistics() {

    console.log("========== PORTFOLIO ==========");

    console.log("Assets:", DB.portfolio.length);

    console.log("Invested:", investedValue());

    console.log("Current:", currentValue());

    console.log("Profit:", portfolioProfit());

    const best = bestAsset();

    if (best) {

        console.log("Best:", best.coin);

    }

}


function portfolioTerminal() {

    terminal("");

    terminal("Portfolio");

    terminal("---------------------------");

    terminal("Assets : " + DB.portfolio.length);

    terminal("Invested : $" +
        investedValue().toFixed(2));

    terminal("Current : $" +
        currentValue().toFixed(2));

    terminal("Profit : $" +
        portfolioProfit().toFixed(2));

}



function createContractCard(contract) {

    const card = createCard();

    card.innerHTML = `

        <h3>${contract.name}</h3>

        <p><strong>Address</strong><br>${contract.address}</p>

        <p><strong>Network</strong><br>${contract.network}</p>

        <p><strong>Version</strong><br>${contract.version}</p>

        <span class="${badge(contract.status)}">
            ${contract.status}
        </span>

    `;

    return card;

}


function renderContracts() {

    if (!contractsContainer) return;

    clearContainer(contractsContainer);

    if (DB.contracts.length === 0) {

        contractsContainer.innerHTML =
            "<p>Nessun contratto disponibile.</p>";

        return;

    }

    DB.contracts.forEach(contract => {

        contractsContainer.appendChild(

            createContractCard(contract)

        );

    });

}


function findContract(address) {

    return DB.contracts.find(contract =>

        contract.address === address

    );

}


function activeContracts() {

    return DB.contracts.filter(contract =>

        contract.status &&
        contract.status.toLowerCase() === "active"

    ).length;

}


function contractVersions() {

    const versions = {};

    DB.contracts.forEach(contract => {

        versions[contract.version] =
            (versions[contract.version] || 0) + 1;

    });

    return versions;

}


function contractStatistics() {

    console.log("========== SMART CONTRACTS ==========");

    console.log("Contracts:", DB.contracts.length);

    console.log("Active:", activeContracts());

    console.table(contractVersions());

}


function contractTerminal() {

    terminal("");

    terminal("Smart Contracts");

    terminal("----------------------");

    terminal("Contracts : " + DB.contracts.length);

    terminal("Active : " + activeContracts());

}


function createValidatorCard(validator) {

    const card = createCard();

    card.innerHTML = `

        <h3>${validator.name}</h3>

        <p><strong>Stake</strong><br>${validator.stake} ETH</p>

        <p><strong>Uptime</strong><br>${validator.uptime}%</p>

        <p><strong>Rewards</strong><br>${validator.rewards} ETH</p>

        <span class="${badge(validator.status)}">
            ${validator.status}
        </span>

    `;

    return card;

}


function renderValidators() {

    if (!validatorsContainer) return;

    clearContainer(validatorsContainer);

    if (DB.validators.length === 0) {

        validatorsContainer.innerHTML =
            "<p>Nessun validator disponibile.</p>";

        return;

    }

    DB.validators.sort((a, b) =>

        Number(b.stake) - Number(a.stake)

    );

    DB.validators.forEach(validator => {

        validatorsContainer.appendChild(

            createValidatorCard(validator)

        );

    });

}


function bestValidator() {

    if (DB.validators.length === 0) return null;

    return DB.validators.reduce((best, validator) =>

        Number(validator.uptime) >
        Number(best.uptime)

            ? validator

            : best

    );

}


function totalStake() {

    return DB.validators.reduce((sum, validator) =>

        sum + Number(validator.stake || 0)

    , 0);

}


function totalValidatorRewards() {

    return DB.validators.reduce((sum, validator) =>

        sum + Number(validator.rewards || 0)

    , 0);

}


function onlineValidators() {

    return DB.validators.filter(validator =>

        validator.status &&
        validator.status.toLowerCase() === "online"

    ).length;

}


function averageUptime() {

    if (DB.validators.length === 0) return 0;

    const total = DB.validators.reduce((sum, validator) =>

        sum + Number(validator.uptime || 0)

    , 0);

    return (total / DB.validators.length).toFixed(2);

}


function validatorStatistics() {

    console.log("========== VALIDATORS ==========");

    console.log("Validators:", DB.validators.length);

    console.log("Online:", onlineValidators());

    console.log("Stake:", totalStake());

    console.log("Rewards:", totalValidatorRewards());

    console.log("Average Uptime:", averageUptime());

}


function validatorTerminal() {

    terminal("");

    terminal("Validators");

    terminal("----------------------");

    terminal("Validators : " + DB.validators.length);

    terminal("Online : " + onlineValidators());

    terminal("Stake : " + totalStake());

    terminal("Rewards : " + totalValidatorRewards());

    terminal("Average Uptime : " + averageUptime() + "%");

    const best = bestValidator();

    if (best) {

        terminal("");

        terminal("Top Validator");

        terminal(best.name);

        terminal(best.uptime + "%");

    }

}



function createMinerCard(miner) {

    const card = createCard();

    card.innerHTML = `

        <h3>${miner.name}</h3>

        <p><strong>Hashrate</strong><br>${miner.hashrate} TH/s</p>

        <p><strong>Temperature</strong><br>${miner.temperature} °C</p>

        <p><strong>Power</strong><br>${miner.power} W</p>

        <span class="${badge(miner.status)}">
            ${miner.status}
        </span>

    `;

    return card;

}


function renderMiners() {

    if (!minersContainer) return;

    clearContainer(minersContainer);

    if (DB.miners.length === 0) {

        minersContainer.innerHTML =
            "<p>Nessun miner disponibile.</p>";

        return;

    }

    DB.miners.sort((a, b) =>
        Number(b.hashrate) - Number(a.hashrate)
    );

    DB.miners.forEach(miner => {

        minersContainer.appendChild(
            createMinerCard(miner)
        );

    });

}


function totalHashrate() {

    return DB.miners.reduce((sum, miner) =>

        sum + Number(miner.hashrate || 0)

    , 0);

}


function averageTemperature() {

    if (DB.miners.length === 0) return 0;

    const total = DB.miners.reduce((sum, miner) =>

        sum + Number(miner.temperature || 0)

    , 0);

    return (total / DB.miners.length).toFixed(1);

}


function totalPower() {

    return DB.miners.reduce((sum, miner) =>

        sum + Number(miner.power || 0)

    , 0);

}


function bestMiner() {

    if (DB.miners.length === 0) return null;

    return DB.miners.reduce((best, miner) =>

        Number(miner.hashrate) >
        Number(best.hashrate)

            ? miner

            : best

    );

}


function minerStatistics() {

    console.log("========== MINERS ==========");

    console.log("Miners:", DB.miners.length);

    console.log("Hashrate:", totalHashrate());

    console.log("Temperature:", averageTemperature());

    console.log("Power:", totalPower());

}


function minerTerminal() {

    terminal("");

    terminal("Mining Farm");

    terminal("----------------------");

    terminal("Rigs : " + DB.miners.length);

    terminal("Hashrate : " + totalHashrate() + " TH/s");

    terminal("Temperature : " + averageTemperature() + " °C");

    terminal("Power : " + totalPower() + " W");

}


function createNodeCard(node) {

    const card = createCard();

    card.innerHTML = `

        <h3>${node.name}</h3>

        <p><strong>Country</strong><br>${node.country}</p>

        <p><strong>Latency</strong><br>${node.latency} ms</p>

        <p><strong>Version</strong><br>${node.version}</p>

        <span class="${badge(node.status)}">
            ${node.status}
        </span>

    `;

    return card;

}


function renderNodes() {

    if (!nodesContainer) return;

    clearContainer(nodesContainer);

    if (DB.nodes.length === 0) {

        nodesContainer.innerHTML =
            "<p>Nessun nodo disponibile.</p>";

        return;

    }

    DB.nodes.forEach(node => {

        nodesContainer.appendChild(
            createNodeCard(node)
        );

    });

}


function averageLatency() {

    if (DB.nodes.length === 0) return 0;

    const total = DB.nodes.reduce((sum, node) =>

        sum + Number(node.latency || 0)

    , 0);

    return (total / DB.nodes.length).toFixed(1);

}


function onlineNodes() {

    return DB.nodes.filter(node =>

        node.status &&
        node.status.toLowerCase() === "online"

    ).length;

}


function networkHealth() {

    if (DB.nodes.length === 0) return 0;

    return (

        onlineNodes() /

        DB.nodes.length * 100

    ).toFixed(1);

}


function fastestNode() {

    if (DB.nodes.length === 0) return null;

    return DB.nodes.reduce((fastest, node) =>

        Number(node.latency) <

        Number(fastest.latency)

            ? node

            : fastest

    );

}


function nodeStatistics() {

    console.log("========== NETWORK ==========");

    console.log("Nodes:", DB.nodes.length);

    console.log("Online:", onlineNodes());

    console.log("Latency:", averageLatency());

    console.log("Health:", networkHealth() + "%");

}


function nodeTerminal() {

    terminal("");

    terminal("Blockchain Network");

    terminal("----------------------");

    terminal("Nodes : " + DB.nodes.length);

    terminal("Online : " + onlineNodes());

    terminal("Latency : " + averageLatency() + " ms");

    terminal("Health : " + networkHealth() + "%");

    const node = fastestNode();

    if (node) {

        terminal("");

        terminal("Fastest Node");

        terminal(node.name);

        terminal(node.latency + " ms");

    }

}


async function consensusSimulation() {

    terminal("");

    terminal("Consensus Engine");

    await sleep(400);

    terminal("Checking validators...");

    await sleep(500);

    terminal("Checking miners...");

    await sleep(500);

    terminal("Synchronizing nodes...");

    await sleep(700);

    terminal("Validating latest block...");

    await sleep(600);

    terminal("");

    terminal("Consensus: SUCCESS");

    terminal("Network synchronized");

    terminal("Blockchain verified");

}



function createNFTCard(nft) {

    const card = createCard();

    card.innerHTML = `

        <h3>${nft.name}</h3>

        <p><strong>ID</strong><br>#${nft.id}</p>

        <p><strong>Creator</strong><br>${nft.creator}</p>

        <p><strong>Owner</strong><br>${nft.owner}</p>

        <p><strong>Price</strong><br>${crypto(nft.price)} ETH</p>

    `;

    return card;

}


function renderNFT() {

    if (!nftsContainer) return;

    clearContainer(nftsContainer);

    if (DB.nft.length === 0) {

        nftsContainer.innerHTML =
            "<p>Nessun NFT disponibile.</p>";

        return;

    }

    sortNFT();

    DB.nft.forEach(nft => {

        nftsContainer.appendChild(

            createNFTCard(nft)

        );

    });

}


function sortNFT() {

    DB.nft.sort((a, b) =>

        Number(b.price) - Number(a.price)

    );

}


function findNFT(id) {

    return DB.nft.find(nft =>

        Number(nft.id) === Number(id)

    );

}


function creatorNFT(name) {

    return DB.nft.filter(nft =>

        nft.creator.toLowerCase() ===

        name.toLowerCase()

    );

}


function ownerNFT(owner) {

    return DB.nft.filter(nft =>

        nft.owner.toLowerCase() ===

        owner.toLowerCase()

    );

}


function totalNFTValue() {

    return DB.nft.reduce((sum, nft) =>

        sum + Number(nft.price || 0)

    , 0);

}


function averageNFTPrice() {

    if (DB.nft.length === 0) return 0;

    return (

        totalNFTValue() /

        DB.nft.length

    ).toFixed(2);

}


function mostExpensiveNFT() {

    if (DB.nft.length === 0) return null;

    return DB.nft.reduce((highest, nft) =>

        Number(nft.price) >

        Number(highest.price)

            ? nft

            : highest

    );

}


function cheapestNFT() {

    if (DB.nft.length === 0) return null;

    return DB.nft.reduce((lowest, nft) =>

        Number(nft.price) <

        Number(lowest.price)

            ? nft

            : lowest

    );

}


function nftStatistics() {

    console.log("========== NFT MARKET ==========");

    console.log("NFT:", DB.nft.length);

    console.log("Total Value:", totalNFTValue());

    console.log("Average:", averageNFTPrice());

    const expensive = mostExpensiveNFT();

    if (expensive) {

        console.log("Most Expensive:");

        console.log(expensive.name);

    }

}


function nftTerminal() {

    terminal("");

    terminal("NFT Marketplace");

    terminal("--------------------------");

    terminal("NFT : " + DB.nft.length);

    terminal("Market Value : " +

        crypto(totalNFTValue()) +

        " ETH");

    terminal("Average : " +

        averageNFTPrice() +

        " ETH");

    const nft = mostExpensiveNFT();

    if (nft) {

        terminal("");

        terminal("Top NFT");

        terminal(nft.name);

        terminal(

            crypto(nft.price) +

            " ETH"

        );

    }

}


function searchNFT(text) {

    text = text.toLowerCase();

    return DB.nft.filter(nft =>

        nft.name.toLowerCase().includes(text) ||

        nft.creator.toLowerCase().includes(text) ||

        nft.owner.toLowerCase().includes(text)

    );

}


function buyNFT(id, newOwner) {

    const nft = findNFT(id);

    if (!nft) return false;

    nft.owner = newOwner;

    renderNFT();

    nftTerminal();

    return true;

}


function addNFT(nft) {

    DB.nft.push(nft);

    renderNFT();

    refreshDashboard();

}


function removeNFT(id) {

    DB.nft = DB.nft.filter(item =>

        Number(item.id) !== Number(id)

    );

    renderNFT();

    refreshDashboard();

}


function updateNFTPrice(id, price) {

    const nft = findNFT(id);

    if (!nft) return false;

    nft.price = Number(price);

    renderNFT();

    return true;

}


function topCreator() {

    if (DB.nft.length === 0) return null;

    const creators = {};

    DB.nft.forEach(nft => {

        creators[nft.creator] =
            (creators[nft.creator] || 0) + 1;

    });

    let winner = null;
    let total = 0;

    for (const creator in creators) {

        if (creators[creator] > total) {

            total = creators[creator];

            winner = creator;

        }

    }

    return {

        creator: winner,

        total

    };

}


function topOwner() {

    if (DB.nft.length === 0) return null;

    const owners = {};

    DB.nft.forEach(nft => {

        owners[nft.owner] =
            (owners[nft.owner] || 0) + 1;

    });

    let winner = null;
    let total = 0;

    for (const owner in owners) {

        if (owners[owner] > total) {

            total = owners[owner];

            winner = owner;

        }

    }

    return {

        owner: winner,

        total

    };

}


function expensiveNFT(minPrice) {

    return DB.nft.filter(nft =>

        Number(nft.price) >= Number(minPrice)

    );

}


function nftLeaderboard() {

    const list = [...DB.nft];

    list.sort((a, b) =>

        Number(b.price) -

        Number(a.price)

    );

    return list;

}


function printNFTLeaderboard() {

    console.log("========== NFT TOP ==========");

    nftLeaderboard().forEach((nft, index) => {

        console.log(

            `${index + 1}. ${nft.name} - ${crypto(nft.price)} ETH`

        );

    });

}


function nftMarketSummary() {

    terminal("");

    terminal("Marketplace Summary");

    terminal("------------------------");

    terminal("NFT : " + DB.nft.length);

    terminal("Value : " +

        crypto(totalNFTValue()) +

        " ETH");

    terminal("Average : " +

        averageNFTPrice());

    const creator = topCreator();

    if (creator) {

        terminal("");

        terminal("Top Creator");

        terminal(

            creator.creator +

            " (" +

            creator.total +

            ")"

        );

    }

    const owner = topOwner();

    if (owner) {

        terminal("");

        terminal("Top Collector");

        terminal(

            owner.owner +

            " (" +

            owner.total +

            ")"

        );

    }

}


async function simulateNFTMarket() {

    terminal("");

    terminal("NFT Marketplace");

    await sleep(500);

    terminal("Loading collections...");

    await sleep(600);

    terminal("Checking ownership...");

    await sleep(700);

    terminal("Updating prices...");

    await sleep(700);

    terminal("Marketplace synchronized.");

    await sleep(500);

    terminal("Ready.");

}



let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let quizFinished = false;


function renderQuiz() {

    if (!quizContainer) return;

    if (!DB.quiz.length) {

        quizContainer.innerHTML =
            "<p>Nessuna domanda disponibile.</p>";

        return;

    }

    currentQuestion = 0;

    score = 0;

    quizFinished = false;

    drawQuestion();

}


function drawQuestion() {

    const q = DB.quiz[currentQuestion];

    if (!q) {

        finishQuiz();

        return;

    }

    quizContainer.innerHTML = "";

    const wrapper = document.createElement("div");

    wrapper.className = "quiz-card";

    wrapper.innerHTML = `

        <h3>

            Question ${currentQuestion + 1}

            / ${DB.quiz.length}

        </h3>

        <h2>${q.question}</h2>

        <div id="answers"></div>

    `;

    quizContainer.appendChild(wrapper);

    const answers = wrapper.querySelector("#answers");

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "quiz-answer";

        button.textContent = answer;

        button.addEventListener("click", () => {

            answerQuestion(index);

        });

        answers.appendChild(button);

    });

}


function answerQuestion(index) {

    if (quizFinished) return;

    const question = DB.quiz[currentQuestion];

    const buttons = document.querySelectorAll(".quiz-answer");

    buttons.forEach(button => {

        button.disabled = true;

    });

    if (index === question.correct) {

        score++;

        buttons[index].classList.add("correct");

        terminal("Correct answer.");

    }

    else {

        buttons[index].classList.add("wrong");

        buttons[question.correct]

            .classList.add("correct");

        terminal("Wrong answer.");

    }

    setTimeout(nextQuestion, 1200);

}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= DB.quiz.length) {

        finishQuiz();

        return;

    }

    drawQuestion();

}


function finishQuiz() {

    quizFinished = true;

    const percent = Math.round(

        score /

        DB.quiz.length *

        100

    );

    quizContainer.innerHTML = `

        <div class="quiz-card">

            <h2>Quiz Completed</h2>

            <h1>${score} / ${DB.quiz.length}</h1>

            <h3>${percent}%</h3>

            <button id="restartQuiz">

                Restart Quiz

            </button>

        </div>

    `;

    document

        .getElementById("restartQuiz")

        .addEventListener(

            "click",

            restartQuiz

        );

    terminal("");

    terminal("Quiz Completed");

    terminal(

        "Score : " +

        score +

        "/" +

        DB.quiz.length

    );

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    quizFinished = false;

    renderQuiz();

}


function quizPercentage() {

    if (!DB.quiz.length) return 0;

    return Math.round(

        score /

        DB.quiz.length *

        100

    );

}


function correctAnswers() {

    return score;

}


function wrongAnswers() {

    return DB.quiz.length - score;

}


function quizStatistics() {

    console.log("========== QUIZ ==========");

    console.log(

        "Questions:",

        DB.quiz.length

    );

    console.log(

        "Correct:",

        correctAnswers()

    );

    console.log(

        "Wrong:",

        wrongAnswers()

    );

    console.log(

        "Percentage:",

        quizPercentage() + "%"

    );

}



let quizTimer = null;
let timeLeft = 30;

function startQuizTimer() {

    clearInterval(quizTimer);

    timeLeft = 30;

    updateTimer();

    quizTimer = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(quizTimer);

            terminal("Time expired.");

            nextQuestion();

        }

    }, 1000);

}

function updateTimer() {

    const timer = document.getElementById("quizTimer");

    if (timer) {

        timer.textContent = `Time: ${timeLeft}s`;

    }

}


function updateQuizProgress() {

    const progress = document.getElementById("quizProgress");

    if (!progress) return;

    const value =
        ((currentQuestion + 1) / DB.quiz.length) * 100;

    progress.style.width = value + "%";

}


function quizLevel() {

    const p = quizPercentage();

    if (p >= 90) return "Blockchain Expert";

    if (p >= 70) return "Advanced";

    if (p >= 50) return "Intermediate";

    return "Beginner";

}


function saveQuizScore() {

    const history = JSON.parse(

        localStorage.getItem("blockchainQuiz") || "[]"

    );

    history.push({

        score,

        total: DB.quiz.length,

        percent: quizPercentage(),

        level: quizLevel(),

        date: new Date().toLocaleString()

    });

    localStorage.setItem(

        "blockchainQuiz",

        JSON.stringify(history)

    );

}

function loadQuizHistory() {

    return JSON.parse(

        localStorage.getItem("blockchainQuiz") || "[]"

    );

}


function renderLeaderboard() {

    const history = loadQuizHistory();

    if (!history.length) return "";

    history.sort((a, b) =>

        b.percent - a.percent

    );

    let html = `

        <hr>

        <h3>Leaderboard</h3>

        <ol>

    `;

    history.slice(0, 5).forEach(item => {

        html += `

            <li>

                ${item.percent}% -

                ${item.level}

            </li>

        `;

    });

    html += "</ol>";

    return html;

}


function finishQuiz() {

    quizFinished = true;

    clearInterval(quizTimer);

    saveQuizScore();

    const percent = quizPercentage();

    const level = quizLevel();

    quizContainer.innerHTML = `

        <div class="quiz-card">

            <h2>Quiz Completed</h2>

            <h1>${score}/${DB.quiz.length}</h1>

            <h3>${percent}%</h3>

            <h2>${level}</h2>

            <div
                class="progress-container">

                <div
                    class="progress-bar"
                    style="width:${percent}%">

                </div>

            </div>

            ${renderLeaderboard()}

            <br>

            <button id="restartQuiz">

                Restart Quiz

            </button>

        </div>

    `;

    document
        .getElementById("restartQuiz")
        .addEventListener(
            "click",
            restartQuiz
        );

    terminal("");

    terminal("Quiz completed.");

    terminal(
        "Score: " +
        score +
        "/" +
        DB.quiz.length
    );

    terminal(
        "Level: " +
        level
    );

}


const originalDrawQuestion = drawQuestion;

drawQuestion = function () {

    originalDrawQuestion();

    const wrapper = document.querySelector(".quiz-card");

    if (!wrapper) return;

    wrapper.insertAdjacentHTML(

        "afterbegin",

        `

        <div id="quizTimer">

            Time: 30s

        </div>

        <div class="progress">

            <div
                id="quizProgress"
                class="progress-bar">

            </div>

        </div>

        `

    );

    updateQuizProgress();

    startQuizTimer();

};


function resetQuizData() {

    clearInterval(quizTimer);

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    quizFinished = false;

}


function restartQuiz() {

    resetQuizData();

    renderQuiz();

}


function quizReport() {

    return {

        totalQuestions: DB.quiz.length,

        correct: score,

        wrong: wrongAnswers(),

        percentage: quizPercentage(),

        level: quizLevel()

    };

}