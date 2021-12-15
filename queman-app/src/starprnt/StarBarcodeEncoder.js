ﬁ//
// StarBarcodeEncoder API
//
// Version 0.4.0
//
// Copyright (C) 2012-2014 STAR MICRONICS CO., LTD. All Rights Reserved.
//

var StarBarcodeEncoder = function () {
};
StarBarcodeEncoder.prototype.createUPCE = function (a) {
    var f = "0001101 0011001 0010011 0111101 0100011 0110001 0101111 0111011 0110111 0001011".split(" "),
        e = "0100111 0110011 0011011 0100001 0011101 0111001 0000101 0010001 0001001 0010111".split(" ");
    a = a.data;
    if (!(11 == a.length || 12 == a.length)) throw Error("Data length is invalid.");
    if (a.match(/[^0-9]/g)) throw Error("Data is invalid.");
    12 == a.length && (a = a.substring(0, 11));
    for (var c = 0, b = 0; 11 > b; b++) c = b % 2 ? c + parseInt(a.charAt(b)) : c + 3 * parseInt(a.charAt(b));
    if (c %=
        10) c = 10 - c;
    c = "1110000 1101000 1100100 1100010 1011000 1001100 1000110 1010100 1010010 1001010".split(" ")[c];
    for (b = "101"; ;) {
        if ("0" == a.charAt(0) && "0" == a.charAt(6) && "0" == a.charAt(7)) {
            if ("0" == a.charAt(4) && "0" == a.charAt(5)) {
                if ("0" <= a.charAt(3) && "2" >= a.charAt(3)) {
                    b = "0" == c[0] ? b + f[parseInt(a.charAt(1))] : b + e[parseInt(a.charAt(1))];
                    b = "0" == c[1] ? b + f[parseInt(a.charAt(2))] : b + e[parseInt(a.charAt(2))];
                    b = "0" == c[2] ? b + f[parseInt(a.charAt(8))] : b + e[parseInt(a.charAt(8))];
                    b = "0" == c[3] ? b + f[parseInt(a.charAt(9))] : b + e[parseInt(a.charAt(9))];
                    b = "0" == c[4] ? b + f[parseInt(a.charAt(10))] : b + e[parseInt(a.charAt(10))];
                    b = "0" == c[5] ? b + f[parseInt(a.charAt(3))] : b + e[parseInt(a.charAt(3))];
                    break
                }
                if ("0" == a.charAt(8)) {
                    b = "0" == c[0] ? b + f[parseInt(a.charAt(1))] : b + e[parseInt(a.charAt(1))];
                    b = "0" == c[1] ? b + f[parseInt(a.charAt(2))] : b + e[parseInt(a.charAt(2))];
                    b = "0" == c[2] ? b + f[parseInt(a.charAt(3))] : b + e[parseInt(a.charAt(3))];
                    b = "0" == c[3] ? b + f[parseInt(a.charAt(9))] : b + e[parseInt(a.charAt(9))];
                    b = "0" == c[4] ? b + f[parseInt(a.charAt(10))] : b + e[parseInt(a.charAt(10))];
                    b = "0" == c[5] ?
                        b + f[3] : b + e[3];
                    break
                }
            }
            if ("0" == a.charAt(8) && "0" == a.charAt(9)) {
                if ("0" == a.charAt(5)) {
                    b = "0" == c[0] ? b + f[parseInt(a.charAt(1))] : b + e[parseInt(a.charAt(1))];
                    b = "0" == c[1] ? b + f[parseInt(a.charAt(2))] : b + e[parseInt(a.charAt(2))];
                    b = "0" == c[2] ? b + f[parseInt(a.charAt(3))] : b + e[parseInt(a.charAt(3))];
                    b = "0" == c[3] ? b + f[parseInt(a.charAt(4))] : b + e[parseInt(a.charAt(4))];
                    b = "0" == c[4] ? b + f[parseInt(a.charAt(10))] : b + e[parseInt(a.charAt(10))];
                    b = "0" == c[5] ? b + f[4] : b + e[4];
                    break
                }
                if ("5" <= a.charAt(10) && "9" >= a.charAt(10)) {
                    b = "0" == c[0] ? b + f[parseInt(a.charAt(1))] :
                        b + e[parseInt(a.charAt(1))];
                    b = "0" == c[1] ? b + f[parseInt(a.charAt(2))] : b + e[parseInt(a.charAt(2))];
                    b = "0" == c[2] ? b + f[parseInt(a.charAt(3))] : b + e[parseInt(a.charAt(3))];
                    b = "0" == c[3] ? b + f[parseInt(a.charAt(4))] : b + e[parseInt(a.charAt(4))];
                    b = "0" == c[4] ? b + f[parseInt(a.charAt(5))] : b + e[parseInt(a.charAt(5))];
                    b = "0" == c[5] ? b + f[parseInt(a.charAt(10))] : b + e[parseInt(a.charAt(10))];
                    break
                }
            }
        }
        throw Error("Data is invalid.");
    }
    return b + "010101"
};
StarBarcodeEncoder.prototype.createUPCA = function (a) {
    var f = "0001101 0011001 0010011 0111101 0100011 0110001 0101111 0111011 0110111 0001011".split(" "),
        e = "1110010 1100110 1101100 1000010 1011100 1001110 1010000 1000100 1001000 1110100".split(" ");
    a = a.data;
    if (!(11 == a.length || 12 == a.length)) throw Error("Data length is invalid.");
    if (a.match(/[^0-9]/g)) throw Error("Data is invalid.");
    for (var c = 0, b = 0; 11 > b; b++) c = b % 2 ? c + parseInt(a.charAt(b)) : c + 3 * parseInt(a.charAt(b));
    if (c %= 10) c = 10 - c;
    for (var d = "101", b = 0; 6 > b; b++) d +=
        f[parseInt(a.charAt(b))];
    d += "01010";
    for (b = 6; 11 > b; b++) d += e[parseInt(a.charAt(b))];
    d += e[c];
    return d + "101"
};
StarBarcodeEncoder.prototype.createJAN8 = function (a) {
    var f = "0001101 0011001 0010011 0111101 0100011 0110001 0101111 0111011 0110111 0001011".split(" "),
        e = "1110010 1100110 1101100 1000010 1011100 1001110 1010000 1000100 1001000 1110100".split(" ");
    a = a.data;
    if (!(7 == a.length || 8 == a.length)) throw Error("Data length is invalid.");
    if (a.match(/[^0-9]/g)) throw Error("Data is invalid.");
    for (var c = 0, b = 0; 7 > b; b++) c = b % 2 ? c + parseInt(a.charAt(b)) : c + 3 * parseInt(a.charAt(b));
    if (c %= 10) c = 10 - c;
    for (var d = "101", b = 0; 4 > b; b++) d +=
        f[parseInt(a.charAt(b))];
    d += "01010";
    for (b = 4; 7 > b; b++) d += e[parseInt(a.charAt(b))];
    d += e[c];
    return d + "101"
};
StarBarcodeEncoder.prototype.createJAN13 = function (a) {
    var f = "0001101 0011001 0010011 0111101 0100011 0110001 0101111 0111011 0110111 0001011".split(" "),
        e = "0100111 0110011 0011011 0100001 0011101 0111001 0000101 0010001 0001001 0010111".split(" "),
        c = "1110010 1100110 1101100 1000010 1011100 1001110 1010000 1000100 1001000 1110100".split(" ");
    a = a.data;
    if (!(12 == a.length || 13 == a.length)) throw Error("Data length is invalid.");
    if (a.match(/[^0-9]/g)) throw Error("Data is invalid.");
    for (var b = 0, d = 0; 12 > d; d++) b =
        d % 2 ? b + 3 * parseInt(a.charAt(d)) : b + parseInt(a.charAt(d));
    if (b %= 10) b = 10 - b;
    for (var g = "101", h = "0000000 0001011 0001101 0001110 0010011 0011001 0011100 0010101 0010110 0011010".split(" ")[parseInt(a.charAt(0))], d = 1; 7 > d; d++) g = "0" == h[d] ? g + f[parseInt(a.charAt(d))] : g + e[parseInt(a.charAt(d))];
    g += "01010";
    for (d = 7; 12 > d; d++) g += c[parseInt(a.charAt(d))];
    g += c[b];
    return g + "101"
};
StarBarcodeEncoder.prototype.createCode39 = function (a) {
    var f = "NwWnNnWnNn    NwNwNwNnNn NnNwNwNwNn      NwNnNwNwNn  NwNnNnWnWn WwNnNnWnNn NwNwNnNwNn NnNwWnWnNn WnNwNnNnWn NnWwNnNnWn WnWwNnNnNn NnNwWnNnWn WnNwWnNnNn NnWwWnNnNn NnNwNnWnWn WnNwNnWnNn NnWwNnWnNn        WnNnNwNnWn NnWnNwNnWn WnWnNwNnNn NnNnWwNnWn WnNnWwNnNn NnWnWwNnNn NnNnNwWnWn WnNnNwWnNn NnWnNwWnNn NnNnWwWnNn WnNnNnNwWn NnWnNnNwWn WnWnNnNwNn NnNnWnNwWn WnNnWnNwNn NnWnWnNwNn NnNnNnWwWn WnNnNnWwNn NnWnNnWwNn NnNnWnWwNn WwNnNnNnWn NwWnNnNnWn WwWnNnNnNn NwNnWnNnWn WwNnWnNnNn NwWnWnNnNn".split(" ");
    a =
        a.data;
    if (0 == a.length) throw Error("Data length is invalid.");
    if (a.match(/[^ \$\%\+\-\.\/0-9A-Z]/g)) throw Error("Data is invalid.");
    for (var e = "NwNnWnWnNn", c = 0; c < a.length; c++) e += f[a.charCodeAt(c) - 32];
    return e + "NwNnWnWnN"
};
StarBarcodeEncoder.prototype.createITF = function (a) {
    var f = "NNWWN WNNNW NWNNW WWNNN NNWNW WNWNN NWWNN NNNWW WNNWN NWNWN".split(" "),
        e = "nnwwn wnnnw nwnnw wwnnn nnwnw wnwnn nwwnn nnnww wnnwn nwnwn".split(" ");
    a = a.data;
    if (0 == a.length) throw Error("Data length is invalid.");
    if (a.match(/[^0-9]/g)) throw Error("Data is invalid.");
    a.length % 2 && (a = "0" + a);
    for (var c = "NnNn", b = 0; b < a.length; b += 2) var d = f[parseInt(a.charAt(b))], g = e[parseInt(a.charAt(b + 1))], c = c + d.charAt(0), c = c + g.charAt(0), c = c + d.charAt(1), c = c + g.charAt(1),
        c = c + d.charAt(2), c = c + g.charAt(2), c = c + d.charAt(3), c = c + g.charAt(3), c = c + d.charAt(4), c = c + g.charAt(4);
    return c + "WnN"
};
StarBarcodeEncoder.prototype.createCode128 = function (a) {
    var f = "11011001100 11001101100 11001100110 10010011000 10010001100 10001001100 10011001000 10011000100 10001100100 11001001000 11001000100 11000100100 10110011100 10011011100 10011001110 10111001100 10011101100 10011100110 11001110010 11001011100 11001001110 11011100100 11001110100 11101101110 11101001100 11100101100 11100100110 11101100100 11100110100 11100110010 11011011000 11011000110 11000110110 10100011000 10001011000 10001000110 10110001000 10001101000 10001100010 11010001000 11000101000 11000100010 10110111000 10110001110 10001101110 10111011000 10111000110 10001110110 11101110110 11010001110 11000101110 11011101000 11011100010 11011101110 11101011000 11101000110 11100010110 11101101000 11101100010 11100011010 11101111010 11001000010 11110001010 10100110000 10100001100 10010110000 10010000110 10000101100 10000100110 10110010000 10110000100 10011010000 10011000010 10000110100 10000110010 11000010010 11001010000 11110111010 11000010100 10001111010 10100111100 10010111100 10010011110 10111100100 10011110100 10011110010 11110100100 11110010100 11110010010 11011011110 11011110110 11110110110 10101111000 10100011110 10001011110 10111101000 10111100010 11110101000 11110100010 10111011110 10111101110 11101011110 11110101110 11010000100 11010010000 11010011100 11000111010".split(" "),
        e =
            a.data;
    if (2 > e.length) throw Error("Data length is invalid.");
    if (e.match(/[^\x00-\x7f]/g)) throw Error("Data is invalid.");
    if ("{" != e.charAt(0)) throw Error("Data is invalid.");
    var c = 1;
    switch (e.charAt(1)) {
        case "A":
            c = 0;
            break;
        case "B":
            break;
        case "C":
            c = 2;
            break;
        default:
            throw Error("Data is invalid.");
    }
    a = String.fromCharCode(c + 103);
    for (var b = 2; b < e.length; b++) {
        var d = e.charAt(b);
        if ("{" == d) {
            b++;
            if (b >= e.length) throw Error("Data is invalid.");
            d = e.charAt(b);
            switch (c) {
                case 3:
                    if (c = 1, "S" == d) throw Error("Data is invalid.");
                default:
                    switch (d) {
                        case "1":
                            a += String.fromCharCode(102);
                            break;
                        case "2":
                            a += String.fromCharCode(97);
                            break;
                        case "3":
                            a += String.fromCharCode(96);
                            break;
                        case "4":
                            a += String.fromCharCode(101);
                            break;
                        case "B":
                            a += String.fromCharCode(100);
                            c = 1;
                            break;
                        case "C":
                            a += String.fromCharCode(99);
                            c = 2;
                            break;
                        case "S":
                            a += String.fromCharCode(98);
                            c = 4;
                            break;
                        default:
                            throw Error("Data is invalid.");
                    }
                    break;
                case 4:
                    if (c = 0, "S" == d) throw Error("Data is invalid.");
                case 1:
                    switch (d) {
                        case "1":
                            a += String.fromCharCode(102);
                            break;
                        case "2":
                            a += String.fromCharCode(97);
                            break;
                        case "3":
                            a += String.fromCharCode(96);
                            break;
                        case "4":
                            a += String.fromCharCode(100);
                            break;
                        case "A":
                            a += String.fromCharCode(101);
                            c = 0;
                            break;
                        case "C":
                            a += String.fromCharCode(99);
                            c = 2;
                            break;
                        case "S":
                            a += String.fromCharCode(98);
                            c = 3;
                            break;
                        case "{":
                            a += String.fromCharCode(91);
                            break;
                        default:
                            throw Error("Data is invalid.");
                    }
                    break;
                case 2:
                    switch (d) {
                        case "1":
                            a += String.fromCharCode(102);
                            break;
                        case "A":
                            a += String.fromCharCode(101);
                            c = 0;
                            break;
                        case "B":
                            a += String.fromCharCode(100);
                            c = 1;
                            break;
                        default:
                            throw Error("Data is invalid.");
                    }
            }
        } else {
            var g = d.charCodeAt(0);
            switch (c) {
                case 3:
                    c = 1;
                default:
                    if (0 <= g && 31 >= g) a += String.fromCharCode(g + 64); else if (32 <= g && 95 >= g) a += String.fromCharCode(g - 32); else throw Error("Data is invalid.");
                    break;
                case 4:
                    c = 0;
                case 1:
                    if (32 <= g && 127 >= g) a += String.fromCharCode(g - 32); else throw Error("Data is invalid.");
                    break;
                case 2:
                    if (0 <= g && 99 >= g) a += d; else throw Error("Data is invalid.");
            }
        }
    }
    e = a.charCodeAt(0);
    e %= 103;
    for (b = 1; b < a.length; b++) {
        g = a.charCodeAt(b);
        for (c = 0; c < b; c++) e += g, e %= 103
    }
    a += String.fromCharCode(e);
    a += String.fromCharCode(106);
    g = "";
    for (b = 0; b < a.length; b++) g += f[a.charCodeAt(b)];
    return g + "11"
};
StarBarcodeEncoder.prototype.createCode93 = function (a) {
    var f = [4430, 4310, 4311, 4312, 4313, 4314, 4315, 4316, 4317, 4318, 4319, 4320, 4321, 4322, 4323, 4324, 4325, 4326, 4327, 4328, 4329, 4330, 4331, 4332, 4333, 4334, 4335, 4410, 4411, 4412, 4413, 4414, 38, 4510, 4511, 4512, 39, 42, 4515, 4516, 4517, 4518, 4519, 41, 4521, 36, 37, 40, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4535, 4415, 4416, 4417, 4418, 4419, 4431, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 4420, 4421, 4422, 4423, 4424, 4432, 4610, 4611, 4612, 4613, 4614, 4615, 4616, 4617, 4618, 4619, 4620,
            4621, 4622, 4623, 4624, 4625, 4626, 4627, 4628, 4629, 4630, 4631, 4632, 4633, 4634, 4635, 4425, 4426, 4427, 4428, 4429],
        e = "100010100 101001000 101000100 101000010 100101000 100100100 100100010 101010000 100010010 100001010 110101000 110100100 110100010 110010100 110010010 110001010 101101000 101100100 101100010 100110100 100011010 101011000 101001100 101000110 100101100 100010110 110110100 110110010 110101100 110100110 110010110 110011010 101101100 101100110 100110110 100111010 100101110 111010100 111010010 111001010 101101110 101110110 110101110 100100110 111011010 111010110 100110010 101011110".split(" "),
        c = a.data;
    if (0 == c.length) throw Error("Data length is invalid.");
    if (c.match(/[^\x00-\x7f]/g)) throw Error("Data is invalid.");
    a = String.fromCharCode(47);
    for (var b = 0; b < c.length; b++) {
        var d = f[c.charCodeAt(b)];
        100 <= d && (a += String.fromCharCode(d / 100));
        a += String.fromCharCode(d % 100)
    }
    f = 0;
    for (b = 1; b < a.length; b++) {
        d = a.charCodeAt(b);
        for (c = (a.length - b - 1) % 20 + 1; c; c--) f += d, f %= 47
    }
    a += String.fromCharCode(f);
    f = 0;
    for (b = 1; b < a.length; b++) {
        d = a.charCodeAt(b);
        for (c = (a.length - b - 1) % 15 + 1; c; c--) f += d, f %= 47
    }
    a += String.fromCharCode(f);
    a += String.fromCharCode(47);
    d = "";
    for (b = 0; b < a.length; b++) d += e[a.charCodeAt(b)];
    return d + "1"
};
StarBarcodeEncoder.prototype.createNW7 = function (a) {
    var f = "    NnWwNnNn       NnWnWnWn  NnNwWnNn WnWnWnNn WnWnNnWn NnNnNwWn NnNnWwNn NnNwNnWn WwNnNnNn NnWnNwNn WnNnNwNn NwNnNnWn NwNnWnNn NwWnNnNn WnNwNnNn WnNnWnWn       NnWwNwNn NwNwNnWn NnNwNwWn NnNwWwNn                             NnWwNwNn NwNwNnWn NnNwNwWn NnNwWwNn".split(" ");
    a = a.data;
    if (0 == a.length) throw Error("Data length is invalid.");
    if (a.match(/[^\$\+\-\.\/0-9\:A-Da-d]/g)) throw Error("Data is invalid.");
    for (var e = "", c = 0; c < a.length; c++) e +=
        f[a.charCodeAt(c) - 32];
    return e.slice(0, -1)
};
