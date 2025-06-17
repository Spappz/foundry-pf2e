import * as fs from "fs";
import { glob } from "glob";
import * as path from "path/posix";

const files = await glob("./types/pf2e/**/*.ts", {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    const dir = path.parse(file).dir;
    let data = fs.readFileSync(file, "utf8");

    // Import - Double Quotes
    data = data.replace(/^import (.*?) from '(.*?)';$/gm, `import $1 from "$2";`);
    data = data.replace(/import\('(.*?)'\)/gm, `import\("$1"\)`);

    // Import - *.d.ts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.ts";$/gm, `import $1 from "$2.ts";`);

    // Import - *.d.mts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.mts";$/gm, `import $1 from "$2.mjs";`);

    // Import - @actor
    data = data.replace(/"@actor"/gm, (_substring: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/actor/index.ts");
        return `"./${relative}"`;
    });

    // Import - @actor/*
    data = data.replace(/"@actor\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/actor/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @item
    data = data.replace(/"@item"/gm, (_substring: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/item/index.ts");
        return `"./${relative}"`;
    });

    // Import - @item/*
    data = data.replace(/"@item\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/item/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @scene
    data = data.replace(/"@scene"/gm, (_substring: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/scene/index.ts");
        return `"./${relative}"`;
    });

    // Import - @scene/*
    data = data.replace(/"@scene\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/scene/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @system/*
    data = data.replace(/"@system\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/system/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @module/*
    data = data.replace(/"@module\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @scripts/*
    data = data.replace(/"@scripts\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/scripts/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @util
    data = data.replace(/"@util"/gm, (_substring: string) => {
        const relative = path.relative(dir, "./types/pf2e/util/index.ts");
        return `"./${relative}"`;
    });

    // Import - @util/*
    data = data.replace(/"@util\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/util/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @client/*
    data = data.replace(/"@client\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/foundry/client/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @common/*
    data = data.replace(/"@common\/(.*?)"/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/foundry/common/");
        return `"./${relative}/${g1}"`;
    });

    fs.writeFileSync(file, data, "utf8");
}
