interface form {
    [name: string]: unknown;
}

const formSerialize = (form: FormData) => {
    let object: form = {};

    form.forEach((value, key) => {object[key] = value});
    return JSON.stringify(object);
}

export default formSerialize;