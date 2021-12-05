package com.tajjm.queman.quemanserver;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

public class QRCodeGenerator {
    public static byte[] getQRCodeImage(String text, int width, int height) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text,
                BarcodeFormat.QR_CODE,
                width, height,
                Map.of(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H));

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageConfig con = new MatrixToImageConfig();

        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream, con);
        return pngOutputStream.toByteArray();
    }
}
