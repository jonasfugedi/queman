package com.tajjm.queman.quemanserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.InetAddress;
import java.net.NetworkInterface;

@RestController
public class QuemanAdminController {
    private static final Logger log = LoggerFactory.getLogger(QuemanAdminController.class);

    private String getLocalNetworkIp () throws Exception {
        var e = NetworkInterface.getNetworkInterfaces();
        while(e.hasMoreElements()) {
            var n = e.nextElement();
            var ee = n.getInetAddresses();
            while (ee.hasMoreElements()) {
                var i = ee.nextElement();
                if (i.getHostAddress().startsWith("192.168.")) {
                    return i.getHostAddress();
                }
            }
        }
        return InetAddress.getLocalHost().getHostAddress();
    }

    @RequestMapping(value = "/qr", method = RequestMethod.GET,
            produces = MediaType.IMAGE_PNG_VALUE)
    public void getImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String baseUrl = String.format("%s://%s:%d%s",
                request.getScheme(),
                request.getServerName(),
                request.getServerPort(),
                request.getRequestURI());
        log.info("Request for: {}", baseUrl);

        String serverUrl = "http://" + getLocalNetworkIp() + ":8080/qr";
        var image = QRCodeGenerator.getQRCodeImage(serverUrl, 250, 250);

        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        response.getOutputStream().write(image);
    }


}
