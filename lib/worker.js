const { build } = require('esbuild');
const fg = require('fast-glob');

(async () => {
    await build({
        platform: 'node',
        target: 'es2018',
        outdir: 'build',
        entryPoints: await fg([
            'src/**/*.{js,ts,jsx,tsx}',
            '!src/**/*.d.ts',
        ]),
    });

    process.exit();
})();
