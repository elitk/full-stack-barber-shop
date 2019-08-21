const validator = require('validator');
const IsEmpty = require('../IsEmpty');

module.exports = function RegisterValidation(data){
let error ={};

data.id = !IsEmpty(data.id)?data.id:''
data.firstName = !IsEmpty(data.firstName)?data.firstName:''
data.lastName = !IsEmpty(data.lastName)?data.lastName:''
data.adress = !IsEmpty(data.adress)?data.adress:''
data.city = !IsEmpty(data.city)?data.city:''
data.email = !IsEmpty(data.email)?data.email:''
data.password = !IsEmpty(data.password)?data.password:''

if(validator.isEmpty(data.id)){
    error.id="enter id"
}
else if (!validator.isLength(data.id,{min:9,max:9})){
    error.userId="id must contain 9 digits"
}
if(validator.isEmpty(data.firstName)){
    error.firstName="enter first name"
}
else if (!validator.isLength(data.firstName,{min:2})){
    error.firstName="firstName must contain at list 2 digits"
}
if(validator.isEmpty(data.lastName)){
    error.lastName="enter last name"
}
else if (!validator.isLength(data.lastName,{min:2})){
    error.lastName="lastName must contain at list 2 digits"
}
if(validator.isEmpty(data.adress)){
    error.adress="enter adress"
}
else if (!validator.isLength(data.adress,{min:2})){
    error.adress="adress must contain at list 2 digits"
}
if(validator.isEmpty(data.city)){
    error.city="enter city"
}
else if (!validator.isLength(data.city,{min:2})){
    error.city="city must contain at list 2 digits"
}
if(validator.isEmpty(data.password)){
    error.password="enter password"
}
else if (!validator.isLength(data.password,{min:5})){
    error.password="password must contain at list 2 digits"
}

 return{
     error,
     isValid:IsEmpty(error)
 }
}


