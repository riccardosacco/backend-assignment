const amqp = require("amqplib");

const sharp = require("sharp");
const fs = require("fs");

amqp.connect(process.env.AMQP_URL).then(function (conn) {
  process.once("SIGINT", function () {
    conn.close();
  });
  return conn.createChannel().then(function (ch) {
    var ok = ch.assertQueue("instants", { durable: false });

    ok = ok.then(function (_qok) {
      return ch.consume(
        "instants",
        async function (msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
          const path = msg.content.toString();
          const pathArr = path.split("/");
          const filename = pathArr[pathArr.length - 1];

          await sharp(path)
            .resize({ width: 140, height: 140 })
            .toFile(`./public/uploads/${filename}`);
          fs.unlinkSync(path);

          console.log(`Resized image ${filename}`);
        },
        { noAck: true }
      );
    });

    return ok.then(function (_consumeOk) {
      console.log(" [*] Waiting for messages in the queue");
    });
  });
});
