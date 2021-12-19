<script>
    import {writable} from "svelte/store";
    import {onMount} from "svelte";

    export let serverUrl;
    export let queueId;
    export let location; // Provided by router

    let queue;

    const nowServingTicket = writable(0);

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

    async function loadQueue() {
        console.log("Loading queue", queueId)
        const res = await fetch(`${serverUrl}/queue?queueId=${queueId}`);
        queue = await res.json();
        console.log("Loaded queue: ", queue)
    }

    onMount(async () => {
        await loadQueue();
        subscribeToEvents();
    });

    async function nextTicket() {
        console.log("Next", queueId)
        const response = await fetch(`${serverUrl}/next?queueId=${queueId}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.log('No customers in queue')
            } else {
                console.log('Unable to get next ticket', response)
            }
        } else {
            const ticket = await response.json();
            console.log("Next ticket: ", ticket);
        }
        await loadQueue();
    }
</script>

<svelte:head>
    <title>{(queue ? ('Cashier ' + queue.name) : 'Cashier')}</title>
</svelte:head>

<div>
    {#if queue}
        <h1>Current customer number: <b> { (queue.current ? queue.current.ticketNumber : '-') } </b></h1>

        <h2>Queue length: { queue.size } </h2>

        <button on:click={nextTicket}> Next</button>
    {:else}
        <div>Loading ... </div>
    {/if}
    <hr/>
    <div><i> serverUrl: {serverUrl} <br/> queueId: {queueId} <br/> location.href: {location.href} </i></div>
</div>

<style>

</style>