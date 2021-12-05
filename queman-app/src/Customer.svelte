<script>
    import {onMount} from "svelte";
    import {v4 as uuidv4} from "uuid";

    export let queueId;
    export let customerId;

    const CUSTOMER_ID_KEY = 'customerId';

    onMount(async () => {
        if (!localStorage.getItem(CUSTOMER_ID_KEY)) {
            customerId = uuidv4();
            localStorage.setItem(CUSTOMER_ID_KEY, customerId);
        } else {
            customerId = localStorage.getItem(CUSTOMER_ID_KEY);
        }
        console.log('CustomerId: ' + customerId);
    });

    async function takeTicket() {
        console.log("Getting ticket", queueId)
        const res = await fetch(`http://localhost:8080/ticket?customerId=${customerId}&queueId=${queueId}`);
        var ticket = await res.json();
        console.log("Got ticket: ", ticket)
    }
</script>

<div>
    <h1></h1>

</div>

<style>

</style>