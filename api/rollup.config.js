import fileRoutes from "@axel669/rollup-hono-files"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import $path from "@axel669/rollup-dollar-path"

export default {
    input: "src/main.js",
    output: {
        file: "artifacts/main.js",
        format: "esm"
    },
    plugins: [
        fileRoutes({}),
        $path({
            root: ".",
            paths: {
                "$shared": "../shared"
            }
        }),
        json(),
        resolve(),
        commonjs(),
    ]
}
