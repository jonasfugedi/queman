package com.tajjm.queman.quemanserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@CrossOrigin
public class QueueManager {
    private static final Logger log = LoggerFactory.getLogger(QueueManager.class);
    private final static long MAX_EXPECTED_QUEUE_TIME_MS = Duration.of(1, ChronoUnit.HOURS).toMillis();
    private final Map<String, CustomerQueue> customerQueueMap = new HashMap<>();
    private final Map<String, SseEmitter> emitterMap = new HashMap<>();
    private final Map<String, List<CustomerQueue>> ownedQueuesMap = new HashMap<>();

    @GetMapping("/queues")
    List<CustomerQueue> getOwnedQueues(@RequestParam String ownerId) {
        return ownedQueuesMap.computeIfAbsent(ownerId, ignored -> new ArrayList<>());
    }

    @GetMapping("/queue")
    ResponseEntity<CustomerQueue> getQueue(@RequestParam String queueId) {
        CustomerQueue cq = customerQueueMap.get(queueId);
        if (cq != null) {
            return ResponseEntity.ok().body(cq);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/queues")
    CustomerQueue createCustomerQueue(@RequestBody CustomerQueue queue) {
        log.info("Create queue: {}", queue);
        List<CustomerQueue> ownedQueues =
                ownedQueuesMap.computeIfAbsent(queue.getOwner(), ignored -> new ArrayList<>());

        CustomerQueue cq = ownedQueues.stream()
                .filter(ownedQueue -> ownedQueue.getName().equals(queue.getName()))
                .findFirst()
                .orElseGet(() -> {
                    var nq = new CustomerQueue(UUID.randomUUID().toString(), queue.getName(), queue.getOwner());
                    ownedQueues.add(nq);
                    customerQueueMap.put(nq.getId(), nq);
                    return nq;
                });

        log.info("Created queue: {}", cq);
        return cq;
    }

    @GetMapping("/next")
    public ResponseEntity<Ticket> next(@RequestParam String queueId) {
        CustomerQueue customerQueue = customerQueueMap.get(queueId);
        if (customerQueue != null) {
            Optional<Ticket> optionalTicket = customerQueue.nextTicket();

            return optionalTicket
                    .map(ticket -> ResponseEntity.ok().body(ticket))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ticket")
    public ResponseEntity<Ticket> getTicket(@RequestParam String customerId, @RequestParam String queueId) {
        CustomerQueue customerQueue = customerQueueMap.get(queueId);
        if (customerQueue == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(customerQueue.getCustomerTicket(customerId));
    }


    @GetMapping("/subscribe")
    SseEmitter subscribe(@RequestParam String queueId) {
        log.info("Subscriber to: {}", queueId);
        return emitterMap.computeIfAbsent(queueId, k -> {
            CustomerQueue cq = customerQueueMap.get(k);
            if (cq != null) {
                SseEmitter emitter = new SseEmitter(MAX_EXPECTED_QUEUE_TIME_MS);
                emitter.onCompletion(() -> {
                    log.info("Emitter completed for queue: {}", queueId);
                    synchronized (this.emitterMap) {
                        this.emitterMap.remove(queueId);
                        cq.setSubscriber(null);
                    }
                });
                emitter.onTimeout(emitter::complete);

                cq.setSubscriber(ticket -> {
                    SseEmitter.SseEventBuilder event = SseEmitter.event()
                            .id(String.valueOf(ticket.getTicketNumber()))
                            .name("QUEUE_UPDATE")
                            .data(ticket.getTicketId());
                    try {
                        emitter.send(event);
                    } catch (IOException e) {
                        log.error("Error emitting queue update for {}", cq.getName(), e);
                    }
                });
                return emitter;
            } else {
                throw new IllegalArgumentException("Queue not found! queueId=" + queueId);
            }
        });
    }
}
