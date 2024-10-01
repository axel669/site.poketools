import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import del from "rollup-plugin-delete"
import html from "@axel669/rollup-html-input"
import copy from "@axel669/rollup-copy-static"
import asuid from "@axel669/asuid/node"
import terser from "@rollup/plugin-terser"
import $path from "@axel669/rollup-dollar-path"

export default {
    input: "src/index.html",
    output: {
        file: `artifacts/app.${asuid()}.js`,
        format: "esm",
        sourcemap: true,
    },
    plugins: [
        html(),
        del({
            targets: [
                "artifacts/app.*.js",
                "artifacts/app.*.js.map",
                "artifacts/index.html"
            ]
        }),
        svelte({
            emitCss: false
        }),
        $path({
            "root": ".",
            paths: {
                $shared: "../shared"
            }
        }),
        resolve({ browser: true }),
        commonjs(),
        copy("static"),
        terser()
    ]
}
