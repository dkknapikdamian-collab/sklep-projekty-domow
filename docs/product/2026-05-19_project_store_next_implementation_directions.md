# Kierunki wdroĹĽenia produkcyjnego sklepu z projektami domĂłw

Status: ROADMAPA DO WDROĹ»ENIA ETAPAMI
Data: 2026-05-19
Project ID: sklep_projekty_domow

## Decyzja operacyjna

Po Etapie 42D nastÄ™pne prace majÄ… iĹ›Ä‡ w stronÄ™ domkniÄ™cia produkcyjnej sprzedaĹĽy, a nie dokĹ‚adania ozdobnikĂłw.

## P0 - przed publicznym startem

1. 43A - Legal/checkout consent foundation.
   - regulamin,
   - polityka prywatnoĹ›ci,
   - cookies,
   - zgody checkout,
   - zgoda na dostarczenie treĹ›ci cyfrowej po pĹ‚atnoĹ›ci,
   - jasne zasady odstÄ…pienia/reklamacji dla produktu cyfrowego.

2. 43B - Karta projektu: zakres dokumentacji i licencja.
   - co zawiera projekt,
   - co klient dostaje po zakupie,
   - czego projekt nie obejmuje,
   - adaptacja projektu,
   - warunki uĹĽycia dokumentacji,
   - PDF/ZIP/rzuty jako link do panelu pobrania, nie zaĹ‚Ä…czniki.

3. 43C - Katalog: filtry, sortowanie i wyszukiwarka.
   - metraĹĽ,
   - liczba pokoi,
   - garaĹĽ,
   - dach,
   - kondygnacje,
   - cena,
   - styl,
   - sortowanie.

4. 43D - SEO/meta/schema basics.
   - meta title/description,
   - canonical,
   - breadcrumbs,
   - Product structured data,
   - FAQ structured data,
   - sitemap/robots,
   - open graph.

5. 43E - Domain + Resend live activation.
   - domena kupiona,
   - Resend verified,
   - SPF/DKIM/DMARC,
   - Cloudflare Secrets,
   - redeploy,
   - jedna kontrolna pĹ‚atnoĹ›Ä‡,
   - email_outbox: payment_confirmation i project_files_access = sent/resend.

6. 43F - Download/access hardening.
   - log pobraĹ„,
   - wygasanie lub rotacja linku,
   - ponowienie dostÄ™pu,
   - admin widzi access URL/status,
   - brak wydania plikĂłw bez paid.

## P1 - zaraz po P0

- podobne projekty,
- porĂłwnywarka projektĂłw,
- ulubione,
- landing pages pod kategorie,
- prosty panel readiness publicznego startu,
- podstawowa analityka: view, add_to_cart, checkout_start, paid.

## P2 - pĂłĹşniej

- faktury automatyczne,
- konto klienta,
- newsletter/lead magnet,
- import/eksport projektĂłw,
- integracje marketingowe.

## NajbliĹĽszy rekomendowany etap

43A - legal/checkout consent foundation.

Uzasadnienie: pĹ‚atnoĹ›ci i mail sÄ… blisko gotowe, ale publiczny sklep bez regulaminu, polityki, zgĂłd i jasnego zakresu dokumentacji ma zbyt duĹĽe ryzyko prawne i zaufaniowe.