# Test-Driven Payment Integration Plan

## Core Requirements Overview

**Objective**: Add Square payments as the final step in the existing booking flow, converting tentative bookings into confirmed paid bookings.

**Current State**: Working karaoke booth booking system with database, availability checking, and booking creation (no payments).

**Target State**: Same system + Square payment processing + booking confirmation workflow.

---

## Step 1: Payment Integration Requirements (2-3 hours)

### Core Requirements:
1. **Payment Step Integration**: Add payment as final step after booking selection
2. **Square Web Payments SDK**: Frontend payment form with tokenization
3. **Payment Processing Edge Function**: Backend payment processing with Square Payments API
4. **Booking Status Management**: Update booking status based on payment success/failure
5. **Error Handling**: Graceful handling of payment failures with user feedback

### Test Requirements (Write First):
```typescript
// Test scenarios to implement:
- ✅ Payment form renders correctly with Square SDK
- ✅ Payment token generation works with test card
- ✅ Successful payment updates booking status to 'confirmed'
- ✅ Failed payment keeps booking as 'pending' with error message
- ✅ Payment processing includes proper idempotency
- ✅ Customer email confirmation sent on successful payment
- ✅ Square payment ID stored in booking record
```

### Technical Specifications:
- **Frontend**: Add payment step to existing booking flow (React component)
- **Backend**: New `process-booking-payment` edge function
- **Database**: Add `payment_status`, `square_payment_id` columns to bookings table
- **Square Integration**: Web Payments SDK + Payments API (consistent with your sync pattern)

---

## Step 2: Database Schema Updates (30 minutes)

### Requirements:
1. **Booking Status Enhancement**: Extend existing booking table with payment fields
2. **Payment Audit Trail**: Track payment attempts and status changes
3. **Idempotency Support**: Prevent duplicate payment processing

### Test Requirements:
```sql
-- Migration tests to implement:
- ✅ New columns added without breaking existing data
- ✅ Payment status defaults to 'pending' for new bookings
- ✅ Unique constraints prevent duplicate Square payment IDs
- ✅ Booking status transitions follow valid state machine
```

### Schema Changes:
```sql
ALTER TABLE bookings ADD COLUMN payment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE bookings ADD COLUMN square_payment_id VARCHAR(255) UNIQUE;
ALTER TABLE bookings ADD COLUMN payment_attempted_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN payment_completed_at TIMESTAMPTZ;
```

---

## Step 3: Payment Processing Edge Function (3-4 hours)

### Core Requirements:
1. **Payment Token Processing**: Accept Square payment token from frontend
2. **Booking Validation**: Verify booking exists and is payable
3. **Square Payment Creation**: Process payment via Square Payments API
4. **Status Management**: Update booking and send confirmations
5. **Error Recovery**: Handle partial failures gracefully

### Test Requirements (Write First):
```typescript
// Edge function tests:
- ✅ Rejects invalid/missing payment tokens
- ✅ Validates booking exists and is in correct status
- ✅ Successfully processes Square payment
- ✅ Updates booking status atomically
- ✅ Handles Square API failures gracefully
- ✅ Prevents double-charging with idempotency keys
- ✅ Returns appropriate error messages for different failure modes
```

### Function Specifications:
- **Input**: `{ bookingId, paymentToken, customerInfo }`
- **Output**: `{ success, bookingId, paymentId?, error? }`
- **Square Integration**: Use same patterns as your sync function (proper headers, error handling)
- **Idempotency**: Use booking ID + attempt timestamp as idempotency key

---

## Step 4: Frontend Payment Component (2-3 hours)

### Core Requirements:
1. **Payment Step UI**: Clean payment form integrated into existing booking flow
2. **Square SDK Integration**: Card input with proper styling
3. **Payment Processing**: Submit payment and handle responses
4. **User Feedback**: Loading states, success/error messaging
5. **Booking Summary**: Show what user is paying for

### Test Requirements (Write First):
```typescript
// Component tests:
- ✅ Renders booking summary correctly
- ✅ Square payment form initializes properly
- ✅ Shows loading state during payment processing
- ✅ Displays success message on completed payment
- ✅ Shows specific error messages for payment failures
- ✅ Disables form submission during processing
- ✅ Redirects to confirmation page on success
```

### Component Specifications:
- **Integration Point**: Add to existing booking flow after time/booth selection
- **Props**: `bookingData`, `onPaymentSuccess`, `onPaymentError`
- **State Management**: Handle loading, error, success states
- **Styling**: Consistent with existing design system

---

## Step 5: Testing Strategy & Implementation

### Test-First Development Approach:

#### 5.1 Unit Tests (Write First)
- **Payment Edge Function**: Mock Square API responses, test all scenarios
- **Frontend Component**: Mock Square SDK, test user interactions
- **Database Functions**: Test schema changes and data integrity

#### 5.2 Integration Tests (Write After Units)
- **End-to-End Flow**: Complete booking + payment flow with Square Sandbox
- **Error Scenarios**: Network failures, API errors, invalid cards
- **Idempotency Tests**: Prevent duplicate charges

#### 5.3 Manual Testing Checklist
- **Square Sandbox**: Test with all test card types (success, decline, etc.)
- **Payment Confirmation**: Verify emails sent and booking status updated
- **Error Handling**: Test with invalid tokens, expired cards, insufficient funds

### Square Test Cards for Development:
```
Success: 4532015623811111
Decline: 4000000000000002
Insufficient Funds: 4000000000009995
```

---

## Step 6: Environment Configuration (30 minutes)

### Requirements:
1. **Square Credentials**: Application ID, Location ID, Access Token
2. **Environment Variables**: Separate sandbox/production configs
3. **CORS Setup**: Ensure Square SDK can communicate properly
4. **Webhook Setup** (Optional): Handle payment status updates

### Configuration Checklist:
- **Frontend**: Square Application ID, Location ID
- **Backend**: Square Access Token (sandbox initially)
- **Security**: Never expose access tokens to frontend
- **CSP Headers**: Allow Square SDK domains

---

## Step 7: Deployment & Monitoring (1 hour)

### Requirements:
1. **Staged Deployment**: Test in sandbox before production
2. **Payment Monitoring**: Track success rates and failures
3. **Error Alerting**: Monitor for payment processing issues
4. **Revenue Reconciliation**: Ensure payments match bookings

### Success Criteria:
- **95%+ Payment Success Rate**: On valid card attempts
- **Sub-3 Second Response Time**: For payment processing
- **Zero Double Charges**: Proper idempotency implementation
- **100% Status Accuracy**: Booking status matches payment status

---

## Implementation Timeline (1 Day with AI Support)

**Morning (4 hours)**:
1. Write all tests first (30 min)
2. Database schema updates (30 min)
3. Payment edge function development (3 hours)

**Afternoon (4 hours)**:
1. Frontend payment component (2 hours)
2. Integration testing with Square sandbox (1 hour)
3. End-to-end testing and deployment (1 hour)

---

## Key Technical Decisions

### Why This Approach:
1. **Minimal Disruption**: Builds on existing system without major changes
2. **Test-Driven**: Ensures reliability for financial transactions
3. **Square Consistency**: Uses same patterns as your existing sync function
4. **Progressive Enhancement**: Payment becomes final step, existing flow unchanged

### Critical Success Factors:
1. **Idempotency**: Absolutely critical for payments
2. **Error Handling**: Must handle all Square API error scenarios
3. **Security**: Payment tokens must be handled securely
4. **User Experience**: Clear feedback for all payment outcomes

### Risk Mitigation:
1. **Start with Sandbox**: Thoroughly test before production
2. **Small Transactions**: Test with minimal amounts initially
3. **Monitoring**: Watch payment success rates closely
4. **Rollback Plan**: Can disable payment step if issues arise