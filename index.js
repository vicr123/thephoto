const Crypto = require('crypto');
const express = require('express');
const { resolveNaptr } = require('dns');
let app = express();

const expressWs = require('express-ws')(app);

let passwords = {};
let serverCount = {};
let currentServer = {};

app.get("/setup", (req, res) => {
    //Set up a rendezvous server
    let serverNumber = Math.floor(Math.random() * 10000);
    while (serverCount[serverNumber]) {
        serverNumber = Math.floor(Math.random() * 10000);
    }

    console.log(`Rendezvous server set up for ID ${serverNumber}`);

    let password = Crypto.randomBytes(32).toString('base64').slice(0, 32);
    passwords[serverNumber] = password;
    serverCount[serverNumber] = 0;
    res.send({
        serverNumber: serverNumber,
        token: password
    });
});
app.use("/setup/:id", (req, res, next) => {
    if (req.method !== "GET") {
        res.send(405);
        return;
    }

    if (!passwords[req.params.id]) {
        res.send(403);
    }

    let auth = req.header("Authorization");
    if (!auth.startsWith("Bearer ") || passwords[req.params.id] !== auth.substr(7)) {
        res.send(403);
    }

    if (currentServer[req.params.id]) {
        res.send(400);
        return;
    }

    next();
})
app.ws("/setup/:id", (ws, req) => {
    serverCount[req.params.id]++;
    currentServer[req.params.id] = ws;

    console.log(`New rendezvous server for ${req.params.id}`);

    ws.on("close", () => {
        if (currentServer[req.params.id] === ws) delete currentServer[req.params.id];
        serverCount[req.params.id]--;
    });
});

app.use("/rendezvous/:id", (req, res, next) => {
    if (req.method !== "GET") {
        res.send(405);
        res.end();
        return;
    }

    if (!currentServer[req.params.id]) {
        res.send(500);
        res.end();
        return;
    }

    next();
})
app.ws("/rendezvous/:id", (ws, req) => {
    let server = currentServer[req.params.id];
    delete currentServer[req.params.id];

    console.log(`New rendezvous client for ${req.params.id}`);

    server.send(JSON.stringify({
        type: "rendezvousClientConnect"
    }));

    ws.on("message", msg => {
        if (server.readyState === 1) server.send(msg)
    });
    server.on("message", msg => {
        if (ws.readyState === 1) ws.send(msg)
    });
    ws.on("close", () => {
        if (server.readyState === 1) server.close()
    });
    server.on("close", () => {
        if (ws.readyState === 1) ws.close()
    });
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});