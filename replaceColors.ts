import * as fs from 'fs';
import * as path from 'path';

function replaceInFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace indigo with blue
    content = content.replace(/indigo/g, 'blue');
    
    // Replace teal with blue 
    content = content.replace(/teal/g, 'blue');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function traverseDir(dir: string) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    });
}

traverseDir('./src');
