import "mingo/init/system"

const loadJSON = (ctx, file) => {
    const { request } = ctx
    const url = new URL(request.url)
    const target = `${url.origin}${file}`
    return fetch(target).then(res => res.json())
}

export default loadJSON
