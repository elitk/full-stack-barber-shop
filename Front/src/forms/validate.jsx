export const validate = (data, type) => {
    let re;
    switch (type) {
        // case "email":
        //    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(data).toLowerCase());
        case "firstName":
            re = /^[a-zA-Z]{2,}$/;
            return re.test(String(data));
        case "id":
            re = /^\d{9}$/;
            return re.test(String(data));
        case "lastName":
            re = /^[a-zA-Z]{2,}$/;
            return re.test(String(data));
        case "password":
            re = /^.{6,}$/;
            return re.test(String(data));
        case "city":
            re = /^.{2,}$/;
            return re.test(String(data));
        case "adress":
            re = /^.{2,}$/;
            return re.test(String(data));
        default:
    }
};

let validateMethods = {
    validate: validate
};
export default validateMethods;