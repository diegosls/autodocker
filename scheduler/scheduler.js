function startScheduler(task, interval) {
    console.log('Scheduler iniciado');

    // executa imediatamente
    task();

    // loop correto em segundos → ms
    setInterval(() => {
        task();
    }, interval * 1000);
}

module.exports = {
    startScheduler
};