package com.tajjm.queman.quemanserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class CustomerQueue {
    private static final Logger log = LoggerFactory.getLogger(CustomerQueue.class);

    private final String id;
    private final String name;
    private final String owner;
    private final AtomicInteger nextTicketNumber;
    private final AtomicInteger currentTicketNumber;

    private final List<Ticket> tickets;
    // private final List<Ticket> servicedTickets;
    private final Map<String, Ticket> customerTicketMap;
    private TicketSubscriber subscriber;

    public CustomerQueue(String id, String name, String owner) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.currentTicketNumber = new AtomicInteger(0);
        this.nextTicketNumber = new AtomicInteger(1);
        this.tickets = new ArrayList<>();
        // this.servicedTickets = new ArrayList<>();
        this.customerTicketMap = new HashMap<>();
    }

    public void setSubscriber(TicketSubscriber subscriber) {
        this.subscriber = subscriber;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getOwner() {
        return owner;
    }

    public int getSize() {
        return tickets.size();
    }

    public int getNextTicketNumber() {
        return nextTicketNumber.get();
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public Ticket getCustomerTicket(String customerId) {
        Ticket ticket = customerTicketMap.get(customerId);
        if (ticket == null) {
            String ticketId = UUID.randomUUID().toString();
            int ticketNumber = nextTicketNumber.getAndIncrement();
            ticket = new Ticket(ticketId, customerId, id, ticketNumber);
            tickets.add(ticket);
            customerTicketMap.put(customerId, ticket);
        }
        return ticket;
    }

    public boolean ticketInProgress() {
        return tickets.size() > 0 && currentTicketNumber.get() > 0;
    }

    public Optional<Ticket> getCurrent() {
        return ticketInProgress() ? Optional.of(tickets.get(0)) : Optional.empty();
    }

    public synchronized Optional<Ticket> nextTicket() {
        if (ticketInProgress()) {
            Ticket first = tickets.remove(0);
            first.setServiceFinished(System.currentTimeMillis());
            // servicedTickets.add(first);
            customerTicketMap.remove(first.getCustomerId());
            log.info("Finished ticket: {}", first);
            currentTicketNumber.set(0);
        }
        Optional<Ticket> next = Optional.ofNullable(tickets.size() > 0 ? tickets.get(0) : null);
        next.ifPresentOrElse(ticket -> {
            ticket.setServiceStart(System.currentTimeMillis());
            currentTicketNumber.set(ticket.getTicketNumber());
            if (subscriber != null) {
                subscriber.current(ticket);
            }
            log.info("Servicing now: {}", next);
        }, () -> {
            log.info("Queue is empty: {}", tickets);
        });
        return next;
    }

    @Override
    public String toString() {
        return "CustomerQueue{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", owner='" + owner + '\'' +
                '}';
    }
}
