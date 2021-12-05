<script>

    import {onMount} from "svelte";

    export let queueId;
    export let queue;

    onMount(async () => {
        console.log('Subscribing')
        const evtSource = new EventSource(`http://localhost:8080/subscribe?queueId=${queueId}`);
        if (evtSource) {
            console.log(evtSource)
            evtSource.onmessage = function (event) {
                console.log('Event: ', event);
            };
            evtSource.onerror = function (err) {
                console.error("EventSource failed:", err);
            };
        } else {
            console.log('Unable to subscribe')
        }
        console.log('evtSource: ' + queueId);

        loadQueue();
    });

    async function loadQueue() {
        console.log("Loading queue", queueId)
        const res = await fetch(`http://localhost:8080/queue?queueId=${queueId}`);
        queue = await res.json();
        console.log("Loaded queue: ", queue)
    }

    async function nextTicket() {
        console.log("Next", queueId)
        const response = await fetch(`http://localhost:8080/next?queueId=${queueId}`);
        // TODO: Check result
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
        loadQueue();
    }

    let counter = 0;

    async function takeTicket(queueId) {
        console.log("Getting ticket", queueId)
        const customerId = 'me-' + counter;
        counter = counter + 1;
        const res = await fetch(`http://localhost:8080/ticket?customerId=${customerId}&queueId=${queueId}`);
        var ticket = await res.json();
        console.log("Got ticket: ", ticket)
        loadQueue();
    }
</script>

<div>
    <button on:click={loadQueue}> Reload</button>

    <button on:click={nextTicket}> Next</button>

    {#if queue}
        <h1> Queue: {queue.name} </h1>

        <h2> Current customer number: { queue.current ? queue.current.ticketNumber : '-' } </h2>
        <h2> Queue Length: { queue.size } </h2>

        <button on:click={takeTicket(queueId)}> Ticket</button>

        <h2> Waiting: </h2>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {#each queue.tickets as ticket}
                <tr>
                    <td> {ticket.ticketNumber} </td>
                    <td> {ticket.timestamp} </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {:else }
        Loading {queueId} ...
    {/if}

    <hr/>
    <h2>Events:</h2>
    <ol id="list">
    </ol>

</div>

<style>
    td {
        vertical-align: top;
        text-align: left;
    }

    th {
        vertical-align: top;
        text-align: left;
        background-color: #dddddd;
    }
</style>