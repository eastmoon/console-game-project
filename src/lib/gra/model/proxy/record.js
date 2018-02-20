// Library
import glob from "glob";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import Moment from "moment";
import Crypto from "crypto-js";
import SHA256 from "crypto-js/sha256";
import AES from "crypto-js/aes";
import EncUtf8 from "crypto-js/enc-utf8";

/*
Game record file proxy model.
It need functional that :
1. load file, loading the file from assign path.
2. Save file, saving data into the file.
3. Get/Set data, it will not saving file, only modify the data which will be saving.
4. Encrypt data before saveing, Decrypt data after loading.
*/
export default class RecordProxy {
    // Constructor
    constructor($name = "", $container = null) {
        this._name = $name;
        this._container = $container;
        this._file = null;
    }
    // Method
    load($path, $callback) {
        glob($path, {}, (err, matches) => {
            if (!err && matches.length >= 0 && matches[0] === $path) {
                const adapter = new FileSync($path, {
                    deserialize: (string) => {
                        console.debug("RecordProxy deserialize");
                        console.debug(string);
                        return JSON.parse(string);
                    }
                });
                this._file = Lowdb(adapter);

                    /*
                    .then((db) => {
                        console.debug(this._file.get("data"));
                        this._file.get("data").assign("12345").write();
                        console.debug(this._file.get("data"));
                        console.log(db);
                        return db;
                    });
                    */
                if (this._container !== null && typeof this._container.register === "function") {
                    this._container.register(this._name, this._file.value());
                    const save = {
                        x: 1,
                        y: 2,
                        z: 3
                    };
                    //this._file.write();
                }
                $callback();
            }
        });
            /*
                    const key = "1234567890abcdefg";
                    const skey = SHA256(key).toString();
                    console.log("Key : ", skey);

                    const save = {
                        key: skey,
                        data: {
                            x: 1,
                            y: 2,
                            z: 3
                        }
                    }
                    const ciphertext = AES.encrypt(JSON.stringify(save.data), save.key);
                    console.log(ciphertext.toString());
                    var bytes  = AES.decrypt(ciphertext.toString(), save.key);
                    var decryptedData = JSON.parse(bytes.toString(EncUtf8));
                    console.log(decryptedData);
            $resolve($progress);
        });
        */
    }
}
