export const onRequestGet = async ({ request, data }) => {
    const url = new URL(request.url)
    const term = url.searchParams.get("term").toLowerCase()
    return Response.json(
        data.ability.filter(
            mon => mon.searchTerms.map(
                searchTerm => searchTerm.includes(term)
            ).includes(true)
        )
    )
}
