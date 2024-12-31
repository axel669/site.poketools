import fs from "fs-jetpack"

fs.copy(
    "script",
    "test-out",
    {
        overwrite: (source, dest) => source.modifyTime > dest.modifyTime
    }
)
