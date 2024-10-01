export const $get = async (c, next) => {
    const res = await next()
    res.header("Content-Encoding", "gzip")
    return res
}
