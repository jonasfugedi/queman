<script>
    import {onMount} from "svelte";
    import {v4 as uuidv4} from "uuid";
    import {Link} from "svelte-routing";

    const OWNER_ID_KEY = 'ownerId';
    export let serverUrl;
    export let ownerId;
    export let queues;

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

    export let result;
    export let name;

    async function createQueue() {
        const res = await fetch(`${serverUrl}/queues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                "owner": ownerId
            })
        })

        const json = await res.json()
        result = JSON.stringify(json)
        loadQueues();
    }

    async function loadQueues() {
        console.log("Loading queues", ownerId)
        const res = await fetch(`${serverUrl}/queues?ownerId=${ownerId}`);
        queues = await res.json();
        console.log("Loaded queues: ", queues)
    }
</script>

<div>
    <h1>Admin</h1>
    <h2>Owner Id: {ownerId}</h2>

    <button on:click={createQueue}>Create</button>
    <input bind:value={name}/>

    <table width="90%">
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Size</th>
            <th>Current</th>
            <th>Ticket view</th>
        </tr>
        </thead>
        {#if queues}
            <tbody>
            {#each queues as queue}
                <tr>
                    <td>
                        <Link to="/queue/{queue.id}"> show</Link>
                    </td>
                    <td> {queue.name} </td>
                    <td> {queue.size} </td>
                    <td>
                        {#if queue.current}
                            {queue.current.ticketNumber}
                        {/if}
                    </td>
                    <Link to="/customer/{queue.id}"> ticket </Link>
                </tr>
            {/each}
            </tbody>
        {/if}
    </table>
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