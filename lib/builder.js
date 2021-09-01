const path = require('path');
const { Worker } = require('worker_threads');

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const runBuild = async () => {
    const startTime = Date.now();

    console.log('[esbuild]', 'build started');

    await new Promise((resolve, reject) => {
        const worker = new Worker(
            path.resolve(__dirname, 'worker.js'),
        );

        worker.on('error', reject);
        worker.on('exit', resolve);
    });

    console.log('[esbuild]', `build took ${Date.now() - startTime}ms`);
};

(async () => {
    const watch = process.argv.includes('--watch');

    await runBuild();

    if (!watch) {
        return;
    }

    chokidar.watch(
        'src/**/*',
        { ignoreInitial: true },
    )
        .on(
            'all',
            debounce(runBuild, 500),
        );
})();
