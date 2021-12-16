<script>
    import {onMount} from 'svelte';
    import {writable} from 'svelte/store';
    import {v4 as uuidv4} from 'uuid';
    import TicketPrinter from "./TicketPrinter.svelte";

    export let serverUrl;
    export let queueId;
    let customerId;
    let ticket;

    const CUSTOMER_ID_KEY = 'customerId';

    const nowServingTicket = writable(0);

    onMount(async () => {
        if (!localStorage.getItem(CUSTOMER_ID_KEY)) {
            customerId = uuidv4();
            localStorage.setItem(CUSTOMER_ID_KEY, customerId);
        } else {
            customerId = localStorage.getItem(CUSTOMER_ID_KEY);
        }
        console.log('CustomerId: ' + customerId);
        await takeTicket();
        subscribeToEvents();
    });

    async function takeTicket() {
        console.log("Getting ticket", queueId)
        const res = await fetch(`${serverUrl}/ticket?customerId=${customerId}&queueId=${queueId}`);
        ticket = await res.json();
        console.log("Got ticket: ", ticket)
        const res2 = await fetch(`${serverUrl}/currentTicketNumber?queueId=${queueId}`);
        const res2Text = await res2.text();
        console.log("Current ticket number response text:", res2Text);
        if (res2Text) {
            $nowServingTicket = parseInt(res2Text, 10);
        }
    }

    function subscribeToEvents() {
        console.log('Subscribing')
        let evtSource = new EventSource(`${serverUrl}/subscribe?queueId=${queueId}`);
        if (evtSource) {
            console.log('Subscribed', evtSource);
            evtSource.onopen = () => {
                console.log("Event source opened")
            };
            evtSource.onerror = err => {
                console.error("EventSource failed:", err);
            };
            evtSource.addEventListener("QUEUE_UPDATE", function (event) {
                console.log("Received event", event);
                let value = parseInt(event.lastEventId, 10);
                nowServingTicket.set(value);
            });
            console.log('Event source configured for queue: ' + queueId);
        } else {
            console.log('Unable to subscribe')
        }

    }

</script>

<div align="center">
    {#if !ticket}
        <h1> Getting ticket ... </h1>
    {:else }
        {#if (ticket.ticketNumber === $nowServingTicket)}
            <h1 class="customersTurn">
                Your turn!
            </h1>
        {/if}
        <h1>
            Your number: {ticket.ticketNumber}
        </h1>
        <div>
            Current number: {$nowServingTicket}
        </div>

        <br/>

        <div>
            <TicketPrinter {ticket} />
        </div>
    {/if}

</div>

<style>
    .customersTurn {
        background-color: bisque;
        animation: blinker 1s step-start infinite;
    }

    .waiting {
        background-color: #f4f4f4;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
</style>