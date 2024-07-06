import "mingo/init/system"

const loadJSON = (ctx, file) => {
    const { request, env } = ctx
    const url = new URL(request.url)
    const target = `${url.origin}${file}`
    return env.ASSETS.fetch(target).then(res => res.json())
}

export default loadJSON
