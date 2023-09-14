import fs from 'fs';
import path from 'path';
import AsyncLoop from './AsyncLoop.js';

function fetch(dirPath = './src/routes', currentPath = '') {
    const files = fs.readdirSync(dirPath);

    let paths = [];

    for (const file of files) {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            const subDirPath = path.join(currentPath, file);
            const subDirPaths = fetch(filePath, subDirPath);
            paths = paths.concat(subDirPaths);
        } else if (file.endsWith('.js')) {
            const filePathWithoutExt = path.join(currentPath, file);
            paths.push(filePathWithoutExt);
        }
    }

    return paths;
}

const getAllPaths = async () => {
    let routes = []
    let paths = fetch()
    let base = process.cwd() + '/src/routes/'

    await AsyncLoop(paths, async (p) => {
        let modulePath = base + p.replace('.ts', '.js')
        let module = await import(modulePath)
        routes.push({fun: module.default.fun, mode: module.default.mode, path: p.replace('.js', '')})
    })
    return routes
}

 export default getAllPaths
        