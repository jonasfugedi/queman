<script>
    import {onMount} from "svelte";
    import {v4 as uuidv4} from "uuid";

    export let queueId;
    let customerId;
    let ticket;

    const CUSTOMER_ID_KEY = 'customerId';

    import {writable} from 'svelte/store';

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
        const res = await fetch(`http://localhost:8080/ticket?customerId=${customerId}&queueId=${queueId}`);
        ticket = await res.json();
        console.log("Got ticket: ", ticket)
    }


    export const currentTicketNumber = writable(0);
    let events = [];
    let current_ticket_value;

    currentTicketNumber.subscribe(value => {
        current_ticket_value = value;
    });

    function subscribeToEvents() {
        console.log('Subscribing')
        let evtSource = new EventSource(`http://localhost:8080/subscribe?queueId=${queueId}`);
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
                // currentTicketNumber = event.lastEventId;
                currentTicketNumber.set(event.lastEventId);
            });
            console.log('Event source configured for queue: ' + queueId);
        } else {
            console.log('Unable to subscribe')
        }

    }
</script>

<div>
    {#if !ticket}
        <h1>Getting ticket ... </h1>
    {:else }
        <h1 class="{ (current_ticket_value === ticket.ticketNumber) ? 'customersTurn' : 'waiting' }">
            {ticket.ticketNumber}
        </h1>
    {/if}
    <div>
        <b> Current ticket number: {current_ticket_value} </b>
        <ul>
            {#each events as event}
                <li> {JSON.stringify(event) } </li>
            {/each}
        </ul>
    </div>

</div>

<style>
    .customersTurn {
        background-color: bisque;
    }
    .waiting {
        background-color: #f4f4f4;
    }
</style>