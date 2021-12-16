<script>
    import {v4 as uuidv4} from 'uuid';
    import {onMount} from 'svelte';
    import {Router, Link, Route} from "svelte-routing";
    import Admin from "./Admin.svelte";
    import Cashier from "./Cashier.svelte";
    import Customer from "./Customer.svelte";
    import Display from "./Display.svelte";

    export let name;
    export let url = '';
    export let serverUrl = 'http://localhost:8080/api';
    export let customerId;

    const CUSTOMER_ID_KEY = 'customerId';

    onMount(() => {
        if (!localStorage.getItem(CUSTOMER_ID_KEY)) {
            customerId = uuidv4();
            localStorage.setItem(CUSTOMER_ID_KEY, customerId);
        } else {
            customerId = localStorage.getItem(CUSTOMER_ID_KEY);
        }
        console.log('CustomerId: ' + customerId);
    });

</script>

<Router url="{url}">
    <div>
        <Route path="queue/:queueId" let:params>
            <Display queueId="{params.queueId}" {serverUrl}/>
        </Route>
        <Route path="admin" component="{Admin}" {serverUrl}/>
        <Route path="customer/:queueId" let:params>
            <Customer queueId="{params.queueId}" {serverUrl}/>
        </Route>
        <Route path="cashier/:queueId" component="{Cashier}" {serverUrl}  let:params/>
        <Route path="/">
            <main>
                <h1>{name}</h1>

                <h2>Customer Id: {customerId}</h2>

                <Link to="admin">Admin</Link>

                <hr/>
            </main>
        </Route>
    </div>
</Router>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>