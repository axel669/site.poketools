import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import del from "rollup-plugin-delete"
import html from "@axel669/rollup-html-input"
import copy from "@axel669/rollup-copy-static"
import asuid from "@axel669/asuid/node"
import terser from "@rollup/plugin-terser"

export default {
    input: "src/index.html",
    output: {
        file: `site/app.${asuid()}.js`,
        format: "esm",
        sourcemap: true,
    },
    plugins: [
        html(),
        del({
            targets: [
                "site/app.*.js",
                "site/app.*.js.map",
                "site/index.html"
            ]
        }),
        svelte({
            emitCss: false
        }),
        resolve({ browser: true }),
        commonjs(),
        copy("static"),
        terser()
    ]
}
