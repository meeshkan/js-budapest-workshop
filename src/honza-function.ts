<<<<<<< Updated upstream
export default (a: number, b: number) => a * b;
=======
import axios from 'axios';

export default async() => {
    const { data } = await axios("https://mylittle-api.com/coffees");
    return data.coffees;
};
>>>>>>> Stashed changes
