function main(args) {
  console.log("deleteSecret args: ", JSON.stringify(args));
  var deleteverification = args.score.secret;
  console.log("deleteverification: ", deleteverification);

  return new Promise(function(resolve, reject) {
    var body = {};

    if (deleteverification === args.SECRET) {
      body = {
        score: { id: args.score.id, rev: args.score.rev, secret: "true" }
      };
      console.log("delecte secret ok", deleteverification);
      resolve(body);
    } else {
      body = {
        score: { id: args.score.id, rev: args.score.rev, secret: "false" }
      };
      console.log("delecte secret ok", deleteverification);
      reject(body);
    }
  });
}
