package com.tajjm.queman.quemanserver;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class CustomerQueueTest {
    @Test
    public void test() {
        CustomerQueue customerQueue = new CustomerQueue("a-queue-id", "a-queue-name", "a-queue-owner");
        assertTrue(customerQueue.getCurrent().isEmpty());

        Ticket customer1 = customerQueue.getCustomerTicket("a-customer-id-1");
        Ticket customer2 = customerQueue.getCustomerTicket("a-customer-id-2");
        Ticket customer3 = customerQueue.getCustomerTicket("a-customer-id-3");
        assertEquals(4, customerQueue.getNextTicketNumber());

        Ticket customerTicket = customerQueue.getCustomerTicket("a-customer-id-2");
        assertEquals(customerTicket, customer2);

        Ticket start = customerQueue.nextTicket().orElseThrow();
        assertEquals("a-customer-id-1", start.getCustomerId());

        Ticket first = customerQueue.getCurrent().orElseThrow();
        assertEquals(1, first.getTicketNumber());

        Ticket second = customerQueue.nextTicket().orElseThrow();
        assertEquals("a-customer-id-2", second.getCustomerId());

        Ticket third = customerQueue.nextTicket().orElseThrow();
        assertEquals("a-customer-id-3", third.getCustomerId());

        Optional<Ticket> done = customerQueue.nextTicket();
        assertTrue(done.isEmpty());
    }
}