class Argv {

    /**
     * constructor of Argv class
     */
    constructor() {
        this.argvs = [];
        var argvs = process.argv.slice(2);
        this.parse(argvs);
    }

    /**
     * parse
     * @param argvs
     * @returns {boolean}
     */
    parse(argvs) {
        var sliced, name, value;
        for (var index in argvs) {
            sliced = argvs[index].split("=");
            name = sliced.length > 0 ? sliced[0] : argvs[index];
            if (name == "api") {
                value = sliced.length > 1 ? sliced[1] : '';
                if (value == '') return false;
                this.parseApi(value.split("&"));
                return true;
            }
        }
    }

    /**
     * parse api
     * @param argvs
     * @returns {boolean}
     */
    parseApi(argvs) {
        if (argvs.length == 0) return false;
        var sliced, name;
        for (var index in argvs) {
            sliced = argvs[index].split(":");
            this.argvs.push({
                name: sliced.length > 0 ? sliced[0] : argvs[index],
                value: this.parseApiValue(sliced.length > 1 ? sliced[1] : null),
            });
        }
    }

    /**
     * parse api value
     * @param value
     * @returns {*}
     */
    parseApiValue(value) {
        if (!value) return null;
        var values = value.split(",");
        if (values.length == 0) {
            return value;
        }
        return values;
    }

    /**
     * get api var by name
     * @param name
     * @returns {*}
     */
    getArgvByName(name) {
        for (var index in this.argvs) {
            if (this.argvs[index].name == name) {
                return this.argvs[index];
            }
        }
        return null;
    }

    /**
     * get api var by name
     * @param name
     * @returns {*}
     */
    getArgv(name) {
        return this.getArgvByName(name);
    }

    /**
     * get api var value by name
     * @param name
     * @returns {null}
     */
    getArgValue(name) {
        var argv = this.getArgvByName(name);
        return argv !== null ? argv.value : null;
    }

    /**
     * is api var existed
     * @param name
     * @returns {boolean}
     */
    isArgv(name) {
        return this.getArgvByName(name) !== null;
    }

    /**
     * is key existed in api var values
     * @param argValues
     * @param name
     * @returns {boolean}
     */
    inArgv(argValues, name) {
        if (typeof (argValues) == "object") {
            return argValues.indexOf(name) > -1;
        }
        return argValues == name;
    }
}

module.exports = Argv;