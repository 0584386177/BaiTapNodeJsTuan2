import express from "express";
import fs from "fs";
import os from "os";
import { EventEmitter } from "events";
var app = express();
const port = 3000;
const evenEmitter = new EventEmitter();

app.get('/', (req, res) => {

  const inf = {
    type: os.type(),
    platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus(),
  }

  //async 
  // vì writeFile là pt async nên phải đợi quá trình hoàn tất sau đó mới phát sự kiện
  // callback hoàn tất mới phát sự kiện
  fs.writeFile('D:\NodeJs\BaiTapTuan2', JSON.stringify(inf, null, 5), 'utf-8', (err) => {
    if (err) {
      return console.log("Error write file");
    }
    console.log("Success");

    // phát sự kiện
    evenEmitter.emit("FileWritten");
  }

  )


  res.end(JSON.stringify(inf, null, 5));
});

//hứng sự kiện  
evenEmitter.on("FileWritten", () => {
  console.log("Completed task");
})

app.listen(port, () => {
  console.log(`Example app listening at port localhost:${port}`)
})