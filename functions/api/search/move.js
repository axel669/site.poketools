export const onRequestGet = async ({ request, data }) => {
    const url = new URL(request.url)
    const term = url.searchParams.get("term").toLowerCase()
    return Response.json(
        data.move.filter(
            mon => mon.searchTerms.map(
                searchTerm => searchTerm.includes(term)
            ).includes(true)
        )
    )
}
