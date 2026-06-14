const { loadConfig } = require('./services/configService');

const { pullImage, getImageId } = require('./updater/imageChecker');
const { recreateContainer } = require('./updater/containerManager');
const { startScheduler } = require('./scheduler/scheduler');

const logger = require('./utils/logger');

const config = loadConfig();

async function checkUpdates() {
    try {
        logger.info('Verificando atualizações...');

        const before = await getImageId(config.image);

        await pullImage(config.image);

        const after = await getImageId(config.image);

        logger.info(`Antes: ${before}`);
        logger.info(`Depois: ${after}`);

        if (before !== after) {
            logger.info('Nova versão detectada.');

            await recreateContainer(config.container, config.image);

            logger.info('Atualização concluída.');
        } else {
            logger.info('Nenhuma atualização.');
        }

    } catch (err) {
        logger.error(err.message);
    }
}

logger.info('Monitor iniciado.');

// 🔥 importante: garante execução imediata + loop correto
startScheduler(checkUpdates, config.interval);