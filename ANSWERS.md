# Billing Widget – Analysis & Test Cases

This document answers the three questions about the "Account Information"
billing screen (credit card payment form).

---

## Question A – Problems found in the screen

After reviewing the UI mock-up, here are the problems I found, grouped by area.

### 🔒 Security
1. **No CVV / CVC field (most severe).** The form has no field for the card
   security code. Real payment gateways require it, and without it the payment
   is either broken or highly vulnerable to fraud (it violates PCI-DSS).
2. **Card number is shown in plain text.** The card number is typed in a normal
   text field, so it is fully visible on screen. It should be masked
   (like a password) with an option to reveal it.

### ✔️ Validation
3. **No validation on the expiration date.** A user could select a past
   (expired) month/year and the form would still accept it.
4. **Numeric fields accept letters.** Fields such as Card Number and Postal Code
   should accept digits only, but nothing prevents typing letters or symbols.
5. **City is a free-text field with no validation.** The user can type any value
   (even a fake city). It is also inconsistent with "State", which is a fixed
   dropdown – the two are not linked, so City may not match the selected State.

### 🙂 Usability
6. **"MI" label is unclear.** "MI" (Middle Initial) is an abbreviation many users
   will not understand, which can confuse them.
7. **Address format is not explained.** The street address field gives no example
   of the expected format (house number, street, order…), unlike other fields
   that show hints such as "No dashes or spaces".

### ⚡ Performance / Technical (additional observations)
8. **No protection against double submission.** If the user clicks "Continue"
   on a slow connection, the payment could be submitted twice.
9. **Payment Amount is static text, not a verified value.** "30.00" is displayed
   as plain text; it is unclear how it is set or whether it can be tampered with.

---

## Question B – Sample test cases

### TC-01 — Verify the CVV field exists
| | |
|---|---|
| **Title** | Verify that the payment form includes a CVV field |
| **Steps** | 1. Open the "Account Information" payment page. 2. Look for a CVV / security code field. |
| **Expected result** | A required CVV field should be present so the payment can be completed securely. |
| **Actual result** | ❌ No CVV field exists – the payment is incomplete / insecure. |
| **Type** | Negative / Security |

### TC-02 — Card number should be masked
| | |
|---|---|
| **Title** | Verify that the card number is hidden while typing |
| **Steps** | 1. Open the payment page. 2. Type a card number in the "Card Number" field. |
| **Expected result** | The digits should be masked (e.g. ••••) with an option to reveal them. |
| **Actual result** | ❌ The card number is shown in plain text. |
| **Type** | Negative / Security |

### TC-03 — Card number should reject letters
| | |
|---|---|
| **Title** | Verify that the card number field accepts digits only |
| **Steps** | 1. Open the payment page. 2. In "Card Number", type letters such as `abcd`. |
| **Expected result** | The field should reject letters, or show an error like "Numbers only". |
| **Actual result** | ❌ Nothing prevents entering letters. |
| **Type** | Negative / Validation |

---

## Question C – Product solution for the most severe bug

**Most severe bug:** the **missing CVV field**.

**Why it is the most severe:** the CVV is a mandatory anti-fraud check required
by card networks (Visa, Mastercard) and by the PCI-DSS security standard.
Without it, either the payment cannot be processed, or the system accepts
payments using only a stolen card number – a serious fraud risk.

**Proposed solution:**
1. **Add a required "CVV / Security Code" field** next to the card details,
   limited to 3 digits (4 for American Express).
2. **Mask the CVV input** and never store it after the transaction
   (as required by PCI-DSS).
3. **Validate it on the client and the server** – block the "Continue" button
   until a valid CVV is entered.
4. **Add a small help icon** explaining where to find the CVV on the card,
   which also improves usability.

This closes the biggest security gap and makes the payment flow compliant with
standard card-processing requirements.
