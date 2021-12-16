//
// StarWebPrintBuilder API
//
// Version 1.2.0
//
// Copyright 2012 STAR MICRONICS CO., LTD. All Rights Reserved.
//


var StarWebPrintBuilder = function () {
};
StarWebPrintBuilder.prototype.createAlignmentElement = function (b) {
    var a = "<alignment";
    void 0 != b && (a += this._analysisEnumAttribute("position", b.position, /^(left|center|right)$/));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createBarcodeElement = function (b) {
    var a;
    if (void 0 != b) {
        a = "<barcode" + this._analysisEnumAttribute("symbology", b.symbology, /^(UPCE|UPCA|JAN8|JAN13|Code39|ITF|Code128|Code93|NW7)$/);
        a += this._analysisEnumAttribute("width", b.width, /^(width[2-4]|width_mode[1-9])$/);
        a += this._analysisEnumAttribute("hri", b.hri, /^(false|true)$/);
        a += this._analysisValueAttribute("height", b.height, 1, 255);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data)
    } else throw Error("Argument is undefined.");
    return a += "</barcode>"
};
StarWebPrintBuilder.prototype.createBitImageElement = function (b) {
    var a = "<bitimage";
    if (void 0 != b) {
        var d = 0, e = 0, c = 0, f = 0;
        void 0 != b.x && (d = b.x);
        void 0 != b.y && (e = b.y);
        void 0 != b.width && (c = b.width);
        void 0 != b.height && (f = b.height);
        this._analysisValueAttribute("x", d, 0, 65535);
        this._analysisValueAttribute("y", e, 0, 65535);
        a += this._analysisValueAttribute("width", c, 0, 65535);
        a += this._analysisValueAttribute("height", f, 0, 65535);
        if (void 0 == b.context) throw Error('Argument "context" is undefined.');
        a = a + ">" + this._encodeRasterImage(b.context.getImageData(d,
            e, c, f).data, c, f)
    } else throw Error("Argument is undefined.");
    return a += "</bitimage>"
};
StarWebPrintBuilder.prototype.createCutPaperElement = function (b) {
    var a = "<cutpaper";
    void 0 != b && (a += this._analysisEnumAttribute("feed", b.feed, /^(false|true)$/), a += this._analysisEnumAttribute("type", b.type, /^(full|partial)$/));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createFeedElement = function (b) {
    var a;
    if (void 0 != b) if (void 0 != b.line || void 0 != b.unit) a = "<feed" + this._analysisValueAttribute("line", b.line, 1, 255), a += this._analysisValueAttribute("unit", b.unit, 1, 255); else throw Error('Argument "line / unit" is undefined.'); else throw Error("Argument is undefined.");
    return a + "/>"
};
StarWebPrintBuilder.prototype.createInitializationElement = function (b) {
    var a = "<initialization";
    void 0 != b && (a += this._analysisEnumAttribute("reset", b.reset, /^(false|true)$/), a += this._analysisEnumAttribute("print", b.print, /^(false|true)$/));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createLogoElement = function (b) {
    var a = "<logo";
    void 0 != b && (a += this._analysisEnumAttribute("width", b.width, /^(single|double)$/), a += this._analysisEnumAttribute("height", b.height, /^(single|double)$/), a += this._analysisValueAttribute("number", b.number, 1, 255));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createPdf417Element = function (b) {
    var a;
    if (void 0 != b) {
        a = "<pdf417" + this._analysisEnumAttribute("level", b.level, /^(level[0-8])$/);
        void 0 != b.line && (a = 0 != b.line ? a + this._analysisValueAttribute("line", b.line, 3, 90) : a + ' line="0"');
        a += this._analysisValueAttribute("column", b.column, 0, 30);
        a += this._analysisValueAttribute("module", b.module, 1, 8);
        a += this._analysisValueAttribute("aspect", b.aspect, 1, 8);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data)
    } else throw Error("Argument is undefined.");
    return a += "</pdf417>"
};
StarWebPrintBuilder.prototype.createPeripheralElement = function (b) {
    var a = "<peripheral";
    void 0 != b && (a += this._analysisValueAttribute("channel", b.channel, 1, 2), a += this._analysisValueAttribute("on", b.on, 1, 65535), a += this._analysisValueAttribute("off", b.off, 1, 65535));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createQrCodeElement = function (b) {
    var a;
    if (void 0 != b) {
        a = "<qrcode" + this._analysisEnumAttribute("model", b.model, /^(model[12])$/);
        a += this._analysisEnumAttribute("level", b.level, /^(level_[lmqh])$/);
        a += this._analysisValueAttribute("cell", b.cell, 1, 8);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data)
    } else throw Error("Argument is undefined.");
    return a += "</qrcode>"
};
StarWebPrintBuilder.prototype.createRawDataElement = function (b) {
    if (void 0 != b) {
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        b = "<rawdata>" + this._encodeBase64Binary(b.data)
    } else throw Error("Argument is undefined.");
    return b + "</rawdata>"
};
StarWebPrintBuilder.prototype.createRuledLineElement = function (b) {
    var a = "<ruledline";
    void 0 != b && (a += this._analysisEnumAttribute("thickness", b.thickness, /^(thin|medium|thick|double_(thin|medium|thick))$/), a += this._analysisValueAttribute("width", b.width, 1, 65535));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createSoundElement = function (b) {
    var a = "<sound";
    void 0 != b && (a += this._analysisValueAttribute("channel", b.channel, 1, 2), a += this._analysisValueAttribute("repeat", b.repeat, 1, 20));
    return a + "/>"
};
StarWebPrintBuilder.prototype.createSoundWithSettingElement = function (b) {
    var a = "<sound_with_setting";
    if (void 0 != b) {
        if (void 0 != b.sound_storage_area && void 0 == b.sound_number || void 0 == b.sound_storage_area && void 0 != b.sound_number) throw Error("Only one of sound_storage_area and sound_number was set.");
        a += this._analysisValueAttribute("sound_storage_area", b.sound_storage_area, 1, 2);
        a += this._analysisValueAttribute("sound_number", b.sound_number, 0, 7);
        a += this._analysisEnumAttribute("volume", b.volume, /^(volume(0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|_off|_min|_max))$/)
    }
    return a +
        "/>"
};
StarWebPrintBuilder.prototype.createTextElement = function (b) {
    var a;
    if (void 0 != b) a = "<text" + this._analysisEnumAttribute("emphasis", b.emphasis, /^(false|true)$/), a += this._analysisEnumAttribute("invert", b.invert, /^(false|true)$/), a += this._analysisEnumAttribute("linespace", b.linespace, /^(24|32)$/), a += this._analysisEnumAttribute("font", b.font, /^(font_[ab])$/), a += this._analysisEnumAttribute("underline", b.underline, /^(false|true)$/), a += this._analysisValueAttribute("characterspace", b.characterspace, 0, 7), a +=
        this._analysisValueAttribute("width", b.width, 1, 6), a += this._analysisValueAttribute("height", b.height, 1, 6), a += this._analysisEnumAttribute("codepage", b.codepage, /^(cp(437|737|772|774|851|852|855|857|858|860|861|862|863|864|865|866|869|874|928|932|998|999|1001|1250|1251|1252|2001|3001|3002|3011|3012|3021|3041|3840|3841|3843|3844|3845|3846|3847|3848)|utf8|blank|utf8|shift_jis|gb18030|gb2312|big5|korea)$/), a += this._analysisEnumAttribute("international", b.international, /^(usa|france|germany|uk|denmark|sweden|italy|spain|japan|norway|denmark2|spain2|latin_america|korea|ireland|legal)$/),
        void 0 != b.data ? (a += ">", a = !0 == b.binary ? a + this._encodeEscapeSequenceBinary(b.data) : a + this._encodeEscapeSequence(b.data), a += "</text>") : a += "/>"; else throw Error("Argument is undefined.");
    return a
};
StarWebPrintBuilder.prototype.createHoldPrintElement = function (b) {
    var a = "<holdprint";
    void 0 != b && (a += this._analysisEnumAttribute("type", b.type, /^(valid|invalid|default)$/));
    return a + "/>"
};
StarWebPrintBuilder.prototype._analysisEnumAttribute = function (b, a, d) {
    if (void 0 != a) {
        if (!d.test(a)) throw Error('Argument "' + b + '" is invalid.');
        return " " + b + '="' + a + '"'
    }
    return ""
};
StarWebPrintBuilder.prototype._analysisValueAttribute = function (b, a, d, e) {
    if (void 0 != a) {
        if (a < d || a > e) throw Error('Argument "' + b + '" is invalid.');
        return " " + b + '="' + a + '"'
    }
    return ""
};
StarWebPrintBuilder.prototype._encodeEscapeSequence = function (b) {
    var a = /[\\\x00-\x20\x26\x3c\x3e\x7f]/g;
    a.test(b) && (b = b.replace(a, function (a) {
        return "\\" == a ? "\\\\" : "\\x" + ("0" + a.charCodeAt(0).toString(16)).slice(-2)
    }));
    return b
};
StarWebPrintBuilder.prototype._encodeEscapeSequenceBinary = function (b) {
    var a = /[\\\x00-\x20\x26\x3c\x3e\x7f-\xff]/g;
    a.test(b) && (b = b.replace(a, function (a) {
        return "\\" == a ? "\\\\" : "\\x" + ("0" + a.charCodeAt(0).toString(16)).slice(-2)
    }));
    return b
};
StarWebPrintBuilder.prototype._encodeBase64Binary = function (b) {
    var a = "", d = b.length;
    b += "\x00\x00";
    for (var e = 0; e < d; e += 3) var c = b.charCodeAt(e) << 16 | b.charCodeAt(e + 1) << 8 | b.charCodeAt(e + 2), a = a + ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 18 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c &
        63));
    switch (d % 3) {
        case 1:
            return a.slice(0, -2) + "==";
        case 2:
            return a.slice(0, -1) + "="
    }
    return a
};
StarWebPrintBuilder.prototype._encodeRasterImage = function (b, a, d) {
    for (var e = [[-254, -126, -222, -94, -246, -118, -214, -86], [-62, -190, -30, -158, -54, -182, -22, -150], [-206, -78, -238, -110, -198, -70, -230, -102], [-14, -142, -46, -174, -6, -134, -38, -166], [-242, -114, -210, -82, -250, -122, -218, -90], [-50, -178, -18, -146, -58, -186, -26, -154], [-194, -66, -226, -98, -202, -74, -234, -106], [-2, -130, -34, -162, -10, -138, -42, -170]], c = "", f = 0, g = 0; g < d; g++) {
        for (var h = 0, k = 128, l = 0; l < a; l++) if (((30 * b[f] + 59 * b[f + 1] + 11 * b[f + 2]) * b[f + 3] + 12800) / 25500 - b[f + 3] < e[g &
        7][l & 7] && (h |= k), f += 4, 0 == (k >>= 1)) c += String.fromCharCode(h), h = 0, k = 128;
        128 != k && (c += String.fromCharCode(h))
    }
    b = c;
    c = "";
    a = b.length;
    b += "\x00\x00";
    for (g = 0; g < a; g += 3) d = b.charCodeAt(g) << 16 | b.charCodeAt(g + 1) << 8 | b.charCodeAt(g + 2), c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 18 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d &
        63);
    switch (a % 3) {
        case 1:
            return c.slice(0, -2) + "==";
        case 2:
            return c.slice(0, -1) + "="
    }
    return c
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarWebPrintBuilder;
}
