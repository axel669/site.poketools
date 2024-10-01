import { refs } from "#data"

export const $get = async (c) => {
    return c.json(
        refs.move[c.req.param("id")]
    )
}
