const blockCTRL = {};
const { pejecoin, Transactions } = require("../blockchain");
const { ec } = require("elliptic");
const EC = new ec("secp256k1");

blockCTRL.getBlock = (req, res) => {
    res.json(pejecoin.chain);
};

blockCTRL.addTransaction = (req, res) => {
    const { key, to, amount } = req.body;
    if (key === "" || to === "" || amount === "") {
        res.json({ message: "missing values!" });
    }

    const myKey = EC.keyFromPrivate(key);
    const myWallet = myKey.getPublic("hex");

    const newTransaction = new Transactions(myWallet, to, amount);
    newTransaction.signTransaction(myKey);
    pejecoin.createTransaction(newTransaction);

    pejecoin.minePendingTransactions(myWallet);

    res.json({
        message: "Done!",
        data: pejecoin.chain,
        balance: pejecoin.getBalance(key),
    });
};

blockCTRL.getBalance = (req, res) => {
    const { id } = req.params;
    const myKey = EC.keyFromPrivate(id);
    const myWallet = myKey.getPublic("hex");

    res.json({ balance: pejecoin.getBalance(myWallet) });
};

module.exports = blockCTRL;