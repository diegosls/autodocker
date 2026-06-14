const docker =
    require('./dockerClient');

async function recreateContainer(name) {

    const container =
        docker.getContainer(name);

    const inspect =
        await container.inspect();

    const image =
        inspect.Config.Image;

    const ports =
        inspect.HostConfig.PortBindings;

    console.log(
        'Parando container...'
    );

    await container.stop();

    console.log(
        'Removendo container...'
    );

    await container.remove();

    console.log(
        'Criando novo container...'
    );

    const newContainer =
        await docker.createContainer({

            Image: image,

            name: name,

            HostConfig: {

                PortBindings:
                    ports

            }

        });

    await newContainer.start();

    console.log(
        'Container recriado.'
    );

}

module.exports = {
    recreateContainer
};