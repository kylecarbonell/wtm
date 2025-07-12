import { zUserLogin } from 'types/user';

export async function login(identifier: string, password: string) {
    console.log('BASE URL:', `${process.env.EXPO_PUBLIC_BASE_URL}/user/auth`);
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
    if (status == 403) {
        console.log('HERE');
        return null;
    }

    const json = await data.json();

    const validatedData = zUserLogin.parse(json);
    return validatedData;
}
