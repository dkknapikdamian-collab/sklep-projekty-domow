# STAGE38_CART_ORDER_V1

Koszyk V1 jest zapisywany w `localStorage` pod kluczem `project-cart-v38`.

Powod: na tym etapie nie ma kont klientow, platnosci ani sesji zakupowej, wiec lokalny koszyk jest najszybszy i najmniej ryzykowny. Dane trafiaja do Supabase dopiero po wyslaniu formularza zamowienia.

Zamowienie zapisuje:
- `orders`
- `order_items`
- `order_item_addons`

V1 nie wykonuje platnosci, nie wysyla prywatnych plikow i nie automatyzuje faktur.
