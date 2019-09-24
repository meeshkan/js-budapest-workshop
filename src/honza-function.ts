

export default async() => {
    const { data } = await axios("https://mylittle-api.com/coffees");
    return data.coffees;
};
