const readline = require('readline');

const {
    saveConfig
} = require('./services/configService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(
    'Imagem Docker: ',
    image => {

        rl.question(
            'Nome do container: ',
            container => {

                rl.question(
                    'Intervalo (segundos): ',
                    interval => {

                        saveConfig({
                            image,
                            container,
                            interval: Number(interval)
                        });

                        console.log(
                            'Configuração salva com sucesso!'
                        );

                        rl.close();

                    }
                );

            }
        );

    }
);