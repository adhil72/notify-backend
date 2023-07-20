import fs from 'fs';
        import path from 'path';
        import AsyncLoop from "./AsyncLoop"
        
        function fetch(dirPath: string = './src/routes', currentPath: string = ''): string[] {
          const files = fs.readdirSync(dirPath);
        
          let paths: string[] = [];
        
          for (const file of files) {
            const filePath = path.join(dirPath, file);
        
            if (fs.statSync(filePath).isDirectory()) {
              const subDirPath = path.join(currentPath, file);
              const subDirPaths = fetch(filePath, subDirPath);
              paths = paths.concat(subDirPaths);
            } else if (file.endsWith('.ts')) {
              const filePathWithoutExt = path.join(currentPath, file);
              paths.push(filePathWithoutExt);
            }
          }
        
          return paths;
        }
        
        const getAllPaths = async () => {
          let routes: { module: any, path: string }[] = []
          let paths = fetch()
          let base = process.cwd() + '/dist/routes/'
        
          await AsyncLoop(paths, async (p: any) => {
            let module = await import(`${base}${p.replace('.ts', '.js')}`)
            routes.push({ module, path: p.replace('.ts', '') })
          })
          return routes
        }
        
        export default getAllPaths