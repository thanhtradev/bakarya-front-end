export default function handler(req, res) {
  console.log(req.body);
  return req.body;

  // var config = {
  //   method: "post",
  //   url: "http://api.bakarya.com/api/auth/signup",
  //   headers: {},
  //   data: data,
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}
