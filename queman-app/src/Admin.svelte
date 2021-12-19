<script>
    import {onMount} from "svelte";
    import {v4 as uuidv4} from "uuid";
    import {Link} from "svelte-routing";

    const OWNER_ID_KEY = 'ownerId';
    export let serverUrl;
    export let location; // Provided by router

    let ownerId;
    let queues;
    let queueNameInput;

    onMount(async () => {
        if (!localStorage.getItem(OWNER_ID_KEY)) {
            ownerId = uuidv4();
            localStorage.setItem(OWNER_ID_KEY, ownerId);
        } else {
            ownerId = localStorage.getItem(OWNER_ID_KEY);
        }
        console.log('Owner Id: ' + ownerId);
        loadQueues();
    });

    async function createQueue() {
        const res = await fetch(`${serverUrl}/queues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: queueNameInput,
                "owner": ownerId
            })
        })

        const json = await res.json()
        console.log('Result of queue creation', json)
        loadQueues();
    }

    async function loadQueues() {
        console.log("Loading queues", ownerId)
        const res = await fetch(`${serverUrl}/queues?ownerId=${ownerId}`);
        queues = await res.json();
        console.log("Loaded queues: ", queues)
    }
</script>

<svelte:head>
    <title> Queue Admin </title>
</svelte:head>

<div>
    <h1>Admin</h1>
    <h2>Owner Id: {ownerId}</h2>

    <button on:click={createQueue}>Create</button>
    <input bind:value={queueNameInput}/>

    <table width="90%">
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Size</th>
            <th>Current</th>
            <th>Ticket view</th>
            <th>Cashier view</th>
        </tr>
        </thead>
        {#if queues}
            <tbody>
            {#each queues as queue}
                <tr>
                    <td>
                        <Link to="/queue/{queue.id}"> Display </Link>
                    </td>
                    <td> {queue.name} </td>
                    <td> {queue.size} </td>
                    <td>
                        {#if queue.current}
                            {queue.current.ticketNumber}
                        {/if}
                    </td>
                    <td>
                        <Link to="/customer/{queue.id}"> Ticket </Link>
                    </td>
                    <td>
                        <Link to="/cashier/{queue.id}"> Cashier </Link>
                    </td>
                </tr>
            {/each}
            </tbody>
        {/if}
    </table>
    <hr/>
    <div> <i>{location.href}</i> </div>
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