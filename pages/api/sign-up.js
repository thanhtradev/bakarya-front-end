export default function SignUp({ username, pwd }) {
  var data =
    '{\n    "username": "test2da",\n    "password": "!wetyqwqytw7676S",\n    "email": "thahsaas"\n}';

  var config = {
    method: "post",
    url: "http://api.bakarya.com/api/auth/signup",
    headers: {},
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
