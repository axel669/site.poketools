import { dex } from "#data"

export const $get = async (c) => c.json(dex)
