<script>
    import StarWebPrintBuilder from './starprnt/StarWebPrintBuilder.js';
    import StarWebPrintTrader from './starprnt/StarWebPrintTrader';

    const printerUrl = "http://192.168.1.129/StarWebPRNT/SendMessage";

    /***********************************************************/
    /* print a sample receipt using API in StarWebPrintBuilder */
    /***********************************************************/
    function onSendMessageApi() {
        var builder = new StarWebPrintBuilder();

        var request = '';

        request += builder.createInitializationElement();


        request += builder.createTextElement({characterspace: 2});

        request += builder.createAlignmentElement({position: 'right'});
        request += builder.createLogoElement({number: 1});
        request += builder.createTextElement({data: 'TEL 9999-99-9999\n'});
        request += builder.createAlignmentElement({position: 'left'});

        request += builder.createTextElement({data: '\n'});

        request += builder.createAlignmentElement({position: 'center'});
        request += builder.createTextElement({data: 'Thank you for your coming. \n'});
        request += builder.createTextElement({data: "We hope you'll visit again.\n"});
        request += builder.createAlignmentElement({position: 'left'});

        request += builder.createTextElement({data: '\n'});

        request += builder.createTextElement({data: 'Apple                               $20.00\n'});
        request += builder.createTextElement({data: 'Banana                              $30.00\n'});
        request += builder.createTextElement({data: 'Grape                               $40.00\n'});
        request += builder.createTextElement({data: 'Lemon                               $50.00\n'});
        request += builder.createTextElement({data: 'Orange                              $60.00\n'});
        request += builder.createTextElement({emphasis: true, data: 'Subtotal                           $200.00\n'});
        request += builder.createTextElement({data: '\n'});

        request += builder.createTextElement({underline: true, data: 'Tax                                 $10.00\n'});
        request += builder.createTextElement({underline: false});

        request += builder.createTextElement({emphasis: true});
        request += builder.createTextElement({width: 2, data: 'Total         $210.00\n'});
        request += builder.createTextElement({width: 1});
        request += builder.createTextElement({emphasis: false});

        request += builder.createTextElement({data: '\n'});

        request += builder.createTextElement({data: 'Received                           $300.00\n'});

        request += builder.createTextElement({width: 2, data: 'Change         $90.00\n'});
        request += builder.createTextElement({width: 1});
        request += builder.createTextElement({data: '\n'});

        request += builder.createTextElement({characterspace: 0});

        request += builder.createCutPaperElement({feed: true});

        sendMessageApi(request);
        return true;
    }

    function sendMessageApi(request) {
        //showNowPrinting();

        var trader = new StarWebPrintTrader({url: printerUrl});

        trader.onReceive = function (response) {
            //hideNowPrinting();

            var msg = '- onReceive -\n\n';

            msg += 'TraderSuccess : [ ' + response.traderSuccess + ' ]\n';

//      msg += 'TraderCode : [ ' + response.traderCode + ' ]\n';

            msg += 'TraderStatus : [ ' + response.traderStatus + ',\n';

            if (trader.isCoverOpen({traderStatus: response.traderStatus})) {
                msg += '\tCoverOpen,\n';
            }
            if (trader.isOffLine({traderStatus: response.traderStatus})) {
                msg += '\tOffLine,\n';
            }
            if (trader.isCompulsionSwitchClose({traderStatus: response.traderStatus})) {
                msg += '\tCompulsionSwitchClose,\n';
            }
            if (trader.isEtbCommandExecute({traderStatus: response.traderStatus})) {
                msg += '\tEtbCommandExecute,\n';
            }
            if (trader.isHighTemperatureStop({traderStatus: response.traderStatus})) {
                msg += '\tHighTemperatureStop,\n';
            }
            if (trader.isNonRecoverableError({traderStatus: response.traderStatus})) {
                msg += '\tNonRecoverableError,\n';
            }
            if (trader.isAutoCutterError({traderStatus: response.traderStatus})) {
                msg += '\tAutoCutterError,\n';
            }
            if (trader.isBlackMarkError({traderStatus: response.traderStatus})) {
                msg += '\tBlackMarkError,\n';
            }
            if (trader.isPaperEnd({traderStatus: response.traderStatus})) {
                msg += '\tPaperEnd,\n';
            }
            if (trader.isPaperNearEnd({traderStatus: response.traderStatus})) {
                msg += '\tPaperNearEnd,\n';
            }

            msg += '\tEtbCounter = ' + trader.extractionEtbCounter({traderStatus: response.traderStatus}).toString() + ' ]\n';

//      msg += 'Status : [ ' + response.status + ' ]\n';
//
//      msg += 'ResponseText : [ ' + response.responseText + ' ]\n';

            alert(msg);
        }

        trader.onError = function (response) {
            //hideNowPrinting();

            var msg = '- onError -\n\n';

            msg += '\tStatus:' + response.status + '\n';

            msg += '\tResponseText:' + response.responseText;

            alert(msg);
        }

        trader.sendMessage({request: request});
    }
</script>

<div>
    <input id="sendBtnAPI" type="button" value="Send (API)" on:click="{ onSendMessageApi }"/>
</div>

