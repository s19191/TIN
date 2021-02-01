const userBaseUrl = 'http://localhost:3000/api/user';

export function addUserApiCall(user) {
    const userString = JSON.stringify(user);
    console.log(userString);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userString
    }
    const promise = fetch(userBaseUrl, options);
    return promise;
};