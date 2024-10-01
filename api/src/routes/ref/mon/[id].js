import { refs } from "#data"

export const $get = async (c) => {
    return c.json(
        refs.dex[c.req.param("id")]
    )
}
