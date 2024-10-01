import { refs } from "#data"

export const $get = async (c) => {
    return c.json(
        refs.ability[c.req.param("id")]
    )
}
