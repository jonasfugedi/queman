package com.tajjm.queman.quemanserver;

public class Ticket {
    private final String ticketId;
    private final String customerId;
    private final String queueId;
    private final long timestamp;
    private final int ticketNumber;
    private long serviceStart;
    private long serviceFinished;

    public Ticket(String ticketId, String customerId, String queueId, int ticketNumber) {
        this.ticketId = ticketId;
        this.customerId = customerId;
        this.queueId = queueId;
        this.ticketNumber = ticketNumber;
        this.timestamp = System.currentTimeMillis();
    }

    public String getTicketId() {
        return ticketId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getQueueId() {
        return queueId;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public long getServiceStart() {
        return serviceStart;
    }

    public void setServiceStart(long serviceStart) {
        this.serviceStart = serviceStart;
    }

    public long getServiceFinished() {
        return serviceFinished;
    }

    public void setServiceFinished(long serviceFinished) {
        this.serviceFinished = serviceFinished;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId='" + ticketId + '\'' +
                ", customerId='" + customerId + '\'' +
                ", queueId='" + queueId + '\'' +
                ", timestamp=" + timestamp +
                ", ticketNumber=" + ticketNumber +
                ", serviceStart=" + serviceStart +
                ", serviceFinished=" + serviceFinished +
                '}';
    }
}
