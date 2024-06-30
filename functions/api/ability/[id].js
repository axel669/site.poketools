export const onRequestGet = ({ data, params }) => {
    return Response.json(data.abilityID[params.id])
}
