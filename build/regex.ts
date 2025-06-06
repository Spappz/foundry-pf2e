import * as fs from "fs";
import { glob } from "glob";
import * as path from "path/posix";
import { execSync } from "child_process";

const files = await glob("./types/pf2e/**/*.ts", {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    let data = fs.readFileSync(file, "utf8");

    // Import - Double Quotes
    data = data.replace(/^import (.*?) from '(.*?)';$/gm, `import $1 from "$2";`);

    // Import - *.d.ts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.ts";$/gm, `import $1 from "$2.ts";`);

    // Import - *.d.mts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.mts";$/gm, `import $1 from "$2.mjs";`);

    fs.writeFileSync(file, data, "utf8");
}

execSync("code -r ./types/pf2e/global.d.ts");
execSync("code -r ./types/pf2e/module/actor/data/base.d.ts");
execSync("code -r ./types/pf2e/module/chat-message/data.d.ts");
execSync("code -r ./types/pf2e/module/item/deity/types.d.ts");
