import * as fs from 'fs';
import * as path from 'path';

function replaceInFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace indigo with blue
    content = content.replace(/indigo/g, 'blue');
    
    // Replace teal with blue 
    content = content.replace(/teal/g, 'blue');

    // Replace emerald with blue, except we might want emerald for success. 
    // The instructions say "baseada na paleta de cores (Tailwind classes) em todas as telas, garantindo que o Zelo Pet siga uma hierarquia tipográfica e de cores consistente ... Remova variações de design que não correspondem"
    // I will keep emerald for success messages, as it is standard. But if we want consistent, maybe the primary is just blue.
    
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
