const fetchData = async () => {
    const promise = await fetch('../data/data.json');
    const data = await promise.json()
    console.log(data);
    return data;
}

export { fetchData } 