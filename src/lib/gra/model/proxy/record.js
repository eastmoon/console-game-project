// Library
import glob from "glob";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import AES from "crypto-js/aes";
import EncUtf8 from "crypto-js/enc-utf8";

// utils
import {emptyVariable} from "lib/gra/utils/verifity";

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
        this._original = null;
        this._lock = false;
    }
    // Method
    load($path, $callback) {
        glob($path, {}, (err, matches) => {
            if (!err && matches.length >= 0 && matches[0] === $path) {
                const adapter = new FileSync($path, {
                    serialize: this._encrypt.bind(this),
                    deserialize: this._decrypt.bind(this)
                });
                this._file = Lowdb(adapter);
                const save = {
                    x: 1,
                    y: 2,
                    z: 8
                };
                this.save(save);
                if (this._container !== null && typeof this._container.register === "function") {
                    this._container.register(this._name, this._file.value());
                }
                $callback();
            }



        });
    }

    save($save = null) {
        if (!emptyVariable($save)) {
            this._file
              .set("data", $save)
              .write();
        }
    }

    _encrypt(object) {
        //
        if (this._lock) {
            console.debug("Record Proxy lock, file will not change.");
            return this._original;
        }
        if (!emptyVariable(object)) {
            let key = object.key;
            if ( typeof key === "string") {
                let ciphertext = AES.encrypt(JSON.stringify(object.data), key);
                object.data = ciphertext.toString();
                return JSON.stringify(object);
            } else {
                console.error("Record Proxy error, key isn't exist.");
                return this._original;
            }
        }
    }

    _decrypt(content) {
        //
        this._original = content;
        this._lock = false;
        //
        let object = JSON.parse(content);
        let key = object.key;
        if ( typeof key === "string" && typeof object.data === "string") {
            try {
                let bytes  = AES.decrypt(object.data, key);
                object.data = JSON.parse(bytes.toString(EncUtf8));
            } catch(err) {
                if (typeof object.data === "string" && object.data === "") {
                    // error outcome, because data is initial state.
                    this._lock = false;
                    console.warn(`Record Proxy warn, save file is initial state.`);
                } else {
                    // error outcome, it could key error, data error, etc.
                    this._lock = true;
                    console.error(`Record Proxy error, decrypt isn't success.`);
                }
            }
        } else {
            this._lock = true;
            console.error(`Record Proxy error, record file structure is wrong.`);
        }
        return object;
    }
}
