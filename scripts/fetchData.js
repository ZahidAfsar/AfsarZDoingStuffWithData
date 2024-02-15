const fetchData = async () => {
    const promise = await fetch('../Data/data.json');
    const data = await promise.json()
    console.log(data);
    return data;
}

export { fetchData } 