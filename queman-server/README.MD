# Queuing System

## Customer Experience:

Scan QR code,
accept ticket,
see updates - position in queue, possibly estimated service time, big change in ui when it is customers turn, very visible when turn passed/ticket old.


## Staff Experience:

Register a shop and get QR code / URL - (auth with google, facebook, etc?)

- click for next customer (logged in cashier assignment? desk numbner?)

- Allow reset of queue and configurable auto resets daily

- url for queue view to show on displays for current customer number

- Time to expiration? Limit to number of customers?


## Tech details:

### Client state
State on customer side? A cookie probably safest/easiest choice? localStorage should work well?
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

### QR Codes
Generating the QR codes and URL's?
https://www.javatpoint.com/generating-qr-code-in-java

### Server state
State on server - shop, tickets

### Client updates
Client updates? Webosckets, polling, or long polling? Polling withc cache should be safe? Long polling also ok? Websockets nice but hard to scale from single server?

#### Websocket
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

#### Long polling
https://www.baeldung.com/spring-mvc-long-polling
https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/context/request/async/DeferredResult.html

#### Server-Sent Events
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
https://grapeup.com/blog/how-to-build-real-time-notification-service-using-server-sent-events-sse/
https://dzone.com/articles/server-sent-events-using-spring

## Testing

    curl -X POST -d '{ "name": "q", "owner": "me"}' -H "Content-Type: application/json" localhost:8080/queues

    curl -X POST -d '{ "name": "q", "owner": "me"}' -H "Content-Type: application/json" localhost:8080/queues
    {"id":"9043976f-1799-4f91-ad6a-de13b5b37bb1","name":"q","owner":"me","nextTicketNumber":1,"tickets":[],"size":0,"current":null}

    curl "localhost:8080/ticket?customerId=c1&queueId=9043976f-1799-4f91-ad6a-de13b5b37bb1"
    {"ticketId":"2ea619e4-f4ed-4888-a83f-868d1bdde2c2","customerId":"c1","queueId":"9043976f-1799-4f91-ad6a-de13b5b37bb1","timestamp":1638661810971,"ticketNumber":1,"serviceStart":0,"serviceFinished":0}

    curl -m 600 "localhost:8080/subscribe?queueId=805e9450-766a-4333-8faf-a9f64b23fd5d"

    id:1
    event:QUEUE_UPDATE
    data:fd288643-b86b-495d-acde-598261a080d7
    
    id:2
    event:QUEUE_UPDATE
    data:8e55a6ad-74aa-4648-8a3e-da63eb919ce1
    
    id:3
    event:QUEUE_UPDATE
    data:9d569081-fe5a-4d86-9339-6da00ac5cde0
