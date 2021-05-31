const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());

const blocks = require("./routes/blocks.routes");

app.use("/api/block", blocks);

/* app.get("/api/balance", (req, res) => {
    const myKey = EC.keyFromPrivate(req.query.key);
    const myWallet = myKey.getPublic("hex");

    res.json({ balance: pejecoin.getBalance(myWallet) });
}); */

module.exports = app;