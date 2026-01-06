# Data Model Reference

## `bookings` Table Schema

### Core Fields
- `id` (uuid, PK) - Unique booking identifier
- `created_at` (timestamptz) - Booking creation timestamp
- `booking_type` (text) - `venue_hire` | `karaoke_booking` | `vip_tickets` | `occasion`
- `status` (text) - `pending` | `confirmed` | `cancelled`
- `payment_status` (text) - `unpaid` | `paid` | `refunded`
- `reference_code` (text) - Format: `MAN-YY-XXXXXX` (e.g., `MAN-25-A1B2C3`)

### Customer Fields
- `customer_name` (text) - Required
- `customer_email` (text, nullable) - Email or phone required
- `customer_phone` (text, nullable) - Email or phone required

### Venue Fields
- `venue` (text) - `manor` | `hippie`
- `venue_area` (text, nullable) - `downstairs` | `upstairs` | `full_venue`
- `booking_date` (date) - Date of booking
- `start_time` (time, nullable) - Start time (HH:MM)
- `end_time` (time, nullable) - End time (HH:MM)
- `guest_count` (int, nullable) - Number of guests

### Karaoke Fields
- `booth_id` (uuid, nullable, FK to `karaoke_booths`) - Selected booth
- `hold_token` (text, nullable) - Temporary reservation token (10-min expiry)
- `hold_expires_at` (timestamptz, nullable) - Hold expiration time

### Payment Fields
- `square_payment_id` (text, nullable) - Square payment ID from API
- `ticket_price_cents` (int, nullable) - Price per ticket in cents
- `ticket_quantity` (int, nullable) - Number of tickets purchased

### Occasion Fields (Group Events)
- `is_occasion_organiser` (boolean, default false) - True for parent booking
- `parent_booking_id` (uuid, nullable, FK to `bookings`) - Links guest tickets to organiser
- `occasion_name` (text, nullable) - Name of the occasion/event
- `share_token` (text, nullable) - Shareable link token (UUID format)
- `capacity` (int, nullable) - Max guests for occasion

### Metadata
- `booking_source` (text) - `website_direct` | `admin` | etc
- `special_requests` (text, nullable) - Customer notes
- `staff_notes` (text, nullable) - Internal notes

## Booking Type Patterns

### Venue Hire (`booking_type = 'venue_hire'`)
**Purpose**: Enquiry-based venue bookings for events

**Required Fields**:
- `customer_name`, `customer_email` or `customer_phone`
- `venue`, `venue_area`, `booking_date`, `guest_count`

**Optional Fields**:
- `start_time`, `end_time`, `special_requests`

**Payment**: Not required (enquiry flow, staff follows up)

**Example**:
```json
{
  "booking_type": "venue_hire",
  "customer_name": "John Smith",
  "customer_email": "john@example.com",
  "venue": "manor",
  "venue_area": "downstairs",
  "booking_date": "2025-02-15",
  "start_time": "19:00",
  "end_time": "23:00",
  "guest_count": 50,
  "status": "pending",
  "payment_status": "unpaid",
  "reference_code": "MAN-25-A1B2C3"
}
```

---

### Karaoke Booking (`booking_type = 'karaoke_booking'`)
**Purpose**: Paid karaoke booth reservations

**Required Fields**:
- `customer_name`, `customer_email` or `customer_phone`
- `venue`, `booth_id`, `booking_date`, `start_time`, `end_time`
- `square_payment_id` (after payment)

**Flow**:
1. Create with `hold_token` and `hold_expires_at` (10-min hold)
2. Payment processed → `square_payment_id` populated
3. Status updated to `confirmed`

**Example**:
```json
{
  "booking_type": "karaoke_booking",
  "customer_name": "Jane Doe",
  "customer_email": "jane@example.com",
  "venue": "manor",
  "booth_id": "uuid-of-booth",
  "booking_date": "2025-02-15",
  "start_time": "20:00",
  "end_time": "22:00",
  "square_payment_id": "sq_payment_123",
  "status": "confirmed",
  "payment_status": "paid",
  "reference_code": "MAN-25-K7X9Y2"
}
```

---

### Occasion Parent (`booking_type = 'occasion'`, `is_occasion_organiser = true`)
**Purpose**: Group event created by organiser

**Required Fields**:
- `customer_name`, `customer_email` or `customer_phone`
- `occasion_name`, `capacity`, `share_token`, `booking_date`, `venue`

**Child Bookings**: Guests link via `parent_booking_id`

**Example**:
```json
{
  "booking_type": "occasion",
  "is_occasion_organiser": true,
  "customer_name": "Sarah Johnson",
  "customer_email": "sarah@example.com",
  "occasion_name": "Sarah's 30th Birthday",
  "capacity": 30,
  "share_token": "abc123-def456-ghi789",
  "booking_date": "2025-03-01",
  "venue": "manor",
  "status": "confirmed",
  "reference_code": "MAN-25-O3C4S5"
}
```

---

### Occasion Guest (`booking_type = 'occasion'`, `parent_booking_id IS NOT NULL`)
**Purpose**: Guest ticket purchase for group occasion

**Required Fields**:
- `customer_name`, `customer_email` or `customer_phone`
- `parent_booking_id`, `ticket_quantity`, `ticket_price_cents`
- `square_payment_id` (after payment)

**Example**:
```json
{
  "booking_type": "occasion",
  "is_occasion_organiser": false,
  "parent_booking_id": "uuid-of-parent-occasion",
  "customer_name": "Mike Brown",
  "customer_email": "mike@example.com",
  "ticket_quantity": 2,
  "ticket_price_cents": 3000,
  "square_payment_id": "sq_payment_456",
  "status": "confirmed",
  "payment_status": "paid",
  "reference_code": "MAN-25-G8T2K9"
}
```

---

### VIP Tables (`booking_type = 'vip_tickets'`)
**Purpose**: Direct VIP table/ticket sales

**Required Fields**:
- `customer_name`, `customer_email` or `customer_phone`
- `ticket_quantity`, `ticket_price_cents`, `square_payment_id`
- `booking_date`, `venue`

**Example**:
```json
{
  "booking_type": "vip_tickets",
  "customer_name": "Alex Chen",
  "customer_email": "alex@example.com",
  "ticket_quantity": 4,
  "ticket_price_cents": 5000,
  "square_payment_id": "sq_payment_789",
  "booking_date": "2025-02-20",
  "venue": "manor",
  "status": "confirmed",
  "payment_status": "paid",
  "reference_code": "MAN-25-V1P2T3"
}
```

---

## Related Tables

### `karaoke_booths`
- `id` (uuid, PK)
- `venue` (text) - `manor` | `hippie`
- `name` (text) - Display name (e.g., "Booth 1")
- `capacity` (int) - Max people per booth
- `is_active` (boolean) - Availability toggle

### `email_templates`
- `id` (uuid, PK)
- `name` (text) - Template identifier (e.g., `venue-confirmation`)
- `subject` (text) - Email subject line
- `html` (text) - HTML template with placeholders

### `email_events`
- `id` (uuid, PK)
- `booking_id` (uuid, FK to `bookings`)
- `recipient_email` (text)
- `template` (text) - Template name used
- `status` (text) - `queued` | `sent` | `failed`
- `error` (text, nullable) - Error message if failed
- `metadata` (jsonb, nullable) - Additional context
- `created_at` (timestamptz)

### `revenue_events`
- `id` (uuid, PK)
- `revenue_type` (text) - `door` | `bar` | etc
- `square_payment_id` (text, nullable)
- `amount_cents` (int)
- `event_date` (date)
- `created_at` (timestamptz)

### `revenue_event_items`
- `id` (uuid, PK)
- `event_id` (uuid, FK to `revenue_events`)
- `name` (text) - Item name
- `category` (text, nullable)
- `quantity` (int)
- `unit_amount_cents` (int, nullable)
- `total_amount_cents` (int, nullable)
- `is_comp` (boolean) - Complimentary item
- `is_refund` (boolean) - Refund item

### `square_orders_raw`
- `id` (uuid, PK)
- `order_id` (text, unique) - Square order ID
- `raw_response` (jsonb) - Full Square order JSON
- `created_at` (timestamptz)

### `square_payments_raw`
- `id` (uuid, PK)
- `square_payment_id` (text, unique) - Square payment ID
- `raw_response` (jsonb) - Full Square payment JSON
- `created_at` (timestamptz)

## Indexes & Constraints

### Recommended Indexes
```sql
CREATE INDEX idx_bookings_booking_type ON bookings(booking_type);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);
CREATE INDEX idx_bookings_square_payment_id ON bookings(square_payment_id);
CREATE INDEX idx_bookings_parent_booking_id ON bookings(parent_booking_id);
CREATE INDEX idx_bookings_share_token ON bookings(share_token);
CREATE INDEX idx_revenue_events_square_payment ON revenue_events(square_payment_id);
```

### Key Constraints
- `bookings.square_payment_id` should be unique when not null
- `bookings.share_token` should be unique when not null
- `bookings.parent_booking_id` must reference valid booking
- Venue hire: requires `venue_area`
- Karaoke: requires `booth_id`
- Occasions: organiser requires `share_token`, guests require `parent_booking_id`

