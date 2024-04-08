
export const GET = async () => {
    const response = await fetch('https://cristian-s-pastry-86a80-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
    const data = await response.json();
    const parseData = Object.values(data);
    return Response.json(parseData);
}