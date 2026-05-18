# Etap 40C V2 - actual source repair

Poprzedni Etap 40C nie usunął realnego parametru `automatic_payment_methods` z `lib/payments/stripe-payments.ts`.
Ten V2 patch naprawia aktywne źródło i dodaje guard, który nie skanuje katalogów systemowych Windows.
