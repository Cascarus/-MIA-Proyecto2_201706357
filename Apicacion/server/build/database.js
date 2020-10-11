"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oracledb_1 = __importDefault(require("oracledb"));
var keys_1 = __importDefault(require("./keys"));
function db2() {
    var connection = {
        execwocallback: function (queryEst, params, callback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                        if (err) {
                            console.log('Connection error');
                            console.error(err.message);
                            callback();
                        }
                        connection.execute(queryEst, params, {
                            outFormat: oracledb_1.default.OBJECT,
                            autoCommit: true
                        }, function (err, result) {
                            if (err) {
                                console.log(err.message);
                                doRelease(connection);
                            }
                            else {
                                doRelease(connection);
                            }
                        });
                        function doRelease(connection) {
                            connection.release(function (err) {
                                if (err) {
                                    console.error(err.message);
                                }
                            });
                        }
                    });
                    return [2 /*return*/];
                });
            });
        },
        exec: function (queryEst, params, callback) {
            return __awaiter(this, void 0, void 0, function () {
                function doRelease(connection) {
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
                return __generator(this, function (_a) {
                    oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                        if (err) {
                            console.log('Connection error2');
                            console.error(err.message);
                            callback();
                        }
                        connection.execute(queryEst, params, {
                            outFormat: oracledb_1.default.OBJECT,
                            autoCommit: true
                        }, function (err, result) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                callback(err);
                            }
                            else {
                                var res = result.rows;
                                doRelease(connection);
                                callback(res);
                            }
                        });
                    });
                    return [2 /*return*/];
                });
            });
        },
        execMany: function (statement, binds) {
            var options = {
                autoCommit: true,
                batchErrors: true,
                outFormat: oracledb_1.default.OBJECT
            };
            var r;
            oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                connection.executeMany(statement, binds, options, function (err, result) {
                    if (err) {
                        r = -1;
                        console.log(err);
                    }
                    else {
                        console.log(result);
                        r = result;
                        return (result);
                    }
                });
            });
            return r;
            /*return new Promise(async (resolve, reject)=>{
                let conn;
               

                try {
                    conn = await oracledb.getConnection(keys.database);
                    const result = await conn.executeMany(statement,binds,options);
                    conn.commit();
                    console.log(result);
                    resolve(result);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
                finally{
                    if(conn){
                        try{
                            await conn.close();
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                }
            });*/
        },
        execwcursor: function (queryEst, params, callback) {
            var resultCallBack = [];
            oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                if (err) {
                    console.log('Connection Error');
                    console.error(err.message);
                    callback();
                }
                connection.execute(queryEst, params, {
                    outFormat: oracledb_1.default.OBJECT,
                    autoCommit: true
                }, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err);
                    }
                    else {
                        fetchRowsFromRS(connection, result.resultSet, 100);
                    }
                });
            });
            function fetchRowsFromRS(connection, resultSet, numRows) {
                resultSet.getRows(numRows, function (err, rows) {
                    if (err) {
                        console.log(err);
                        doClose(connection, resultSet);
                    }
                    else if (rows.length == 0) {
                        doClose(connection, resultSet);
                        callback(resultCallBack);
                    }
                    else if (rows.length > 0) {
                        rows.array.forEach(function (element) {
                            resultCallBack.push(element);
                        });
                        fetchRowsFromRS(connection, resultSet, numRows);
                    }
                });
            }
            function doRelease(connection) {
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
            function doClose(connection, resultSet) {
                resultSet.close(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    doRelease(connection);
                });
            }
        }
    };
    return connection;
}
exports.default = { db2: db2 };
