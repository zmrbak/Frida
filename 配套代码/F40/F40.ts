function demo1() {
    let sqlite = SqliteDatabase.open("test.db");
    // sqlite.exec("CREATE TABLE t1(a INTEGER PRIMARY KEY,b INTEGER)");
    // sqlite.exec("INSERT INTO t1 VALUES(NULL,123)");
    // sqlite.exec("INSERT INTO t1 VALUES((SELECT max(a) FROM t1)+1,123)");
    let statement = sqlite.prepare("SELECT * FROM T1 WHERE a=?");
    statement.bindInteger(1, 8);
    while (true) {
        let row = statement.step();
        if (row == null) break;

        console.log(JSON.stringify(row));
    }
    sqlite.close();
}
function demo2() {
    let sqlite = SqliteDatabase.open("test.db");
    console.log("sqlite.dump()", sqlite.dump());
    sqlite.close();
}

function demo3() {
    let sqlite = SqliteDatabase.openInline("H4sIAAAAAAAACu3XPSxDURjG8XPbqz7raX20PkqP+rpNpEnDZGrJJY0SbjvoItqohGiI3FiYTCaTyWQymUymTiaTyWQymUwmk9snEYlFbIb3n/P+knNycvZTWMvvuFW9vX9YK7t6WoWUYaiM1kqppDc+9Z3hjflj/1tJlSpsBhuXUVfekiRJkiRJkiRJkiTpz2WMQDQcNmpuubJXddNu2jfv2NmirYvZubyt3bRV1rmVor1oO3rVyS1nnZJesktTla/TZONvbiGk8IF3vOEVL3jGEx7xgHvUcYdb3OAaV7jEBc5xhlOc4AgH2MUWNrAOB3ksIINZzCAFCwnEEPEelCRJkiRJkiRJkqR/nGn5lXFsTtIJOk7H6ChN0BGqaZwO0yEao4N0gPbTPhqlEdpLe2g37aJhGqKgnTRIO2g7baOttIU20wBtoib1Ux81Gn4Cr4LuvgAgAAA=")
    let statement = sqlite.prepare("SELECT * FROM T1");
    while (true) {
        let row = statement.step();
        if (row == null) break;

        console.log(JSON.stringify(row));
    }
    sqlite.close();
}
// demo1();
// demo2();
demo3();