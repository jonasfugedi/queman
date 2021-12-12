<script>
    export let serverUrl;
    export let queueId;
    export let location; // Provided by router

</script>

<div>
    <h1>Current customer number</h1>
    <h2>Queue length</h2>
    <button>next</button>

    <hr/>
    <div> <i> serverUrl: {serverUrl} <br/> queueId: {queueId} <br/> location.href: {location.href} </i> </div>
</div>

<style>

</style>