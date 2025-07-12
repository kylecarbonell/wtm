import { zUserLogin } from 'types/user';

export async function login(identifier: string, password: string) {
    const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/user/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: identifier,
            password: password,
        }),
    });

    const status = data.status;
    console.log(status);
    if (status === 403) {
        console.log('HERE');
        return null;
    }

    const json = await data.json();

    const validatedData = zUserLogin.parse(json);
    return validatedData;
}

export async function signUp(name: string, username: string, email: string, password: string) {
    console.log('HERE IN SIGNUP');
    const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
            email: email,
        }),
    });

    const json = await data.json();
    let body = { ...json, status: data.status };
    if (data.status !== 200) {
        body = { message: json, status: data.status };
    }

    const validatedData = zUserLogin.parse(body);
    return validatedData;
}
