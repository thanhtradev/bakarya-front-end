export default function handler(req, res) {
  var data = '{"username":"test","password":"!wetyqwqytw7676S"}';

  if (req.method === "POST") {
    const data = req.body;

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
}
