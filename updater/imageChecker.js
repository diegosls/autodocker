const docker =
    require('./dockerClient');

async function pullImage(image) {

    return new Promise(

        (resolve, reject) => {

            docker.pull(
                image,

                (err, stream) => {

                    if (err)
                        return reject(err);

                    docker.modem.followProgress(

                        stream,

                        err => {

                            if (err)
                                return reject(err);

                            resolve();

                        }

                    );

                }

            );

        }

    );

}

async function getImageId(image) {

    const images =
        await docker.listImages();

    const found =
        images.find(

            img =>

                img.RepoTags &&
                img.RepoTags.includes(image)

        );

    return found
        ? found.Id
        : null;

}

module.exports = {
    pullImage,
    getImageId
};