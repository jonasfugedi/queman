<script>
    import StarWebPrintBuilder from './starprnt/StarWebPrintBuilder.js';
    import StarWebPrintTrader from './starprnt/StarWebPrintTrader';
    import {toPrettyDate} from "./util";

    const printerUrl = "http://192.168.1.129/StarWebPRNT/SendMessage";

    export let ticket;
    let printedTicket = false;

    function onSendMessageApi() {
        var builder = new StarWebPrintBuilder();

        var request = '';

        request += builder.createInitializationElement();

        request += builder.createTextElement({characterspace: 2});
        request += builder.createAlignmentElement({position: 'right'});
        request += builder.createLogoElement({number: 1});

        request += builder.createAlignmentElement({position: 'left'});
        request += builder.createTextElement({data: '\n'});

        request += builder.createAlignmentElement({position: 'center'});
        request += builder.createTextElement({data: 'Thank you for waiting! \n'});
        request += builder.createTextElement({data: "Here is your ticket\n"});
        request += builder.createTextElement({data: '\n'});
        request += builder.createTextElement({emphasis: true, data: 'Ticket # ' + ticket.ticketNumber +  '\n'});
        request += builder.createTextElement({emphasis: false});
        request += builder.createTextElement({data: '\n'});
        request += builder.createTextElement({data: toPrettyDate(ticket.timestamp) + '\n'});

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
            console.log(msg);
            if (!response.traderSuccess) {
                alert(msg);
            } else {
                printedTicket = true;
            }
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
    <input id="sendBtnAPI" type="button" value="Print Ticket" on:click="{ onSendMessageApi }"/>
    {#if printedTicket}
        <br/><div class="printed">Printed Ticket!</div>
    {/if}
</div>

<style>
    .printed {
        font-size: smaller;
        font-variant: all-petite-caps;
    }
</style>
