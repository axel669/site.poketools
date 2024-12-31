import fs from "fs-jetpack"
import path from "node:path"
import url from "node:url"

const scriptPath = url.fileURLToPath(import.meta.url)
const root = path.resolve(
    path.dirname(scriptPath),
    "..", ".."
)

export default {
    gen9: fs.cwd(
        path.resolve(root, "data/gen9")
    ),
    dest: fs.cwd(
        path.resolve(root, "site/static")
    ),
    load: fs.cwd(
        path.resolve(root, "data/process/source")
    ),
    save: fs.cwd(
        path.resolve(root, "data/process/out")
    ),
}
