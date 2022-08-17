require('dotenv').config()
const cluster = require("cluster");
const os = require("os");
const CPUS = os.cpus();

const useClusters = Number.parseInt(process.env.SERVER_USE_CLUSTERS || 0);
if (cluster.isMaster && useClusters) {
    CPUS.forEach(function () {
        cluster.fork();
    });
    cluster.on("listening", function (worker) {
        console.log("Cluster %d connected", worker.process.pid);
    });
    cluster.on("disconnect", function (worker) {
        console.log("Cluster %d disconnected", worker.process.pid);
    });
    cluster.on("exit", function (worker) {
        console.log("Cluster %d is dead", worker.process.pid);
        // Ensuring a new cluster will start if an old one dies
        cluster.fork();
    });
} else {
    require("./server.js");
}