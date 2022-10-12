export default function SignIn(email, pwd) {
  var data = '{\n    "username":"test",\n    "password":"!wetyqwqytw7676S"\n}';

  var config = {
    method: "post",
    url: "http://api.bakarya.com/api/auth/signin",
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
