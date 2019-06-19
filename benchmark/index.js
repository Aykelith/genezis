import Benchmark from "benchmark";

// global.genezis_checker_disableinproduction = true;
// process.env.NODE_ENV = "production";

let Checker = require("../Checker").default;

const suite = new Benchmark.Suite;

const SmallCheckerConfig = {
    name: Checker.string().required(),
    n: Checker.integer()
};

function classicSmallCheck(data) {
    if (!data.name) throw new Error();
    if (typeof data.name !== "string") throw new Error();
    if (data.n) {
        if (!Number.isInteger(data.n)) throw new Error();
    }
}

const smallData = {
    name: "Alex",
    n: 10
};

const BigCheckerConfig = {
    name: Checker.string().required(),
    n: Checker.integer().required(),
    name1: Checker.string().required(),
    n1: Checker.integer().required(),
    name2: Checker.string().required(),
    n2: Checker.integer().required(),
    name3: Checker.string().required(),
    n3: Checker.integer().required(),
    name4: Checker.string().required(),
    n4: Checker.integer().required(),
    name5: Checker.string().required(),
    n5: Checker.integer().required(),
    name6: Checker.string().required(),
    n6: Checker.integer().required(),
    name7: Checker.string().required(),
    n7: Checker.integer().required(),
    name8: Checker.string().required(),
    n8: Checker.integer().required()
};

function classicBigCheck(data) {
    if (!data.name) throw new Error();
    if (typeof data.name !== "string") throw new Error();
    if (data.n) {
        if (!Number.isInteger(data.n)) throw new Error();
    }
    if (!data.name1) throw new Error();
    if (typeof data.name1 !== "string") throw new Error();
    if (data.n1) {
        if (!Number.isInteger(data.n1)) throw new Error();
    }
    if (!data.name2) throw new Error();
    if (typeof data.name2 !== "string") throw new Error();
    if (data.n2) {
        if (!Number.isInteger(data.n2)) throw new Error();
    }
    if (!data.name3) throw new Error();
    if (typeof data.name3 !== "string") throw new Error();
    if (data.n3) {
        if (!Number.isInteger(data.n3)) throw new Error();
    }
    if (!data.name4) throw new Error();
    if (typeof data.name4 !== "string") throw new Error();
    if (data.n4) {
        if (!Number.isInteger(data.n4)) throw new Error();
    }
    if (!data.name5) throw new Error();
    if (typeof data.name5 !== "string") throw new Error();
    if (data.n5) {
        if (!Number.isInteger(data.n5)) throw new Error();
    }
    if (!data.name6) throw new Error();
    if (typeof data.name6 !== "string") throw new Error();
    if (data.n6) {
        if (!Number.isInteger(data.n6)) throw new Error();
    }
    if (!data.name7) throw new Error();
    if (typeof data.name7 !== "string") throw new Error();
    if (data.n7) {
        if (!Number.isInteger(data.n7)) throw new Error();
    }
    if (!data.name8) throw new Error();
    if (typeof data.name8 !== "string") throw new Error();
    if (data.n8) {
        if (!Number.isInteger(data.n8)) throw new Error();
    }
}

const bigData = {
    name: "Alex",
    n: 10,
    name1: "Alex",
    n1: 10,
    name2: "Alex",
    n2: 10,
    name3: "Alex",
    n3: 10,
    name4: "Alex",
    n4: 10,
    name5: "Alex",
    n5: 10,
    name6: "Alex",
    n6: 10,
    name7: "Alex",
    n7: 10,
    name8: "Alex",
    n8: 10
};

suite
    .add("genezis/Checker - small check", () => {
        Checker(smallData, SmallCheckerConfig);
    })
    .add("classic - small check", () => {
        classicSmallCheck(smallData);
    })
    .add("genezis/Checker - big check", () => {
        Checker(bigData, BigCheckerConfig);
    })
    .add("classic - big check", () => {
        classicBigCheck(bigData);
    })
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .run({ "async": false });