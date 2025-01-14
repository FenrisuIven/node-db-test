fetch('http://localhost:8080/api/getUser?table=user')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });