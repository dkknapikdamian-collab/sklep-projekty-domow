# STAGE24 — Admin header separation

## Cel

Oddzielić nawigację admina od publicznego headera sklepu.

## Problem

W widoku admina był używany `components/Header.tsx`, czyli publiczny pasek sklepu. To powodowało mylące zachowanie: kliknięcie logo albo linków w górnym pasku przenosiło administratora do publicznej części sklepu.

## Decyzja

W adminie ma być osobny `AdminHeader`, a publiczny `Header` zostaje tylko dla strony sklepu.

## Zmiany

- Dodano `components/admin/AdminHeader.tsx`.
- Dodano `app/admin-header-v24.css`.
- Admin pages pod `app/admin` używają `AdminHeader` zamiast publicznego `Header`.
- `AdminHeader` ma główne linki:
  - `/admin`
  - `/admin/projekty`
  - `/admin/projekty/nowy`
  - `/admin/strona-glowna`
- Link do sklepu istnieje, ale jest jawny jako `Zobacz sklep`, więc nie miesza się z admin flow.
- Dodano guard `scripts/check-admin-header-v24.cjs`.

## Kryterium zakończenia

- W adminie nie widać publicznego sklepowego paska.
- Logo admina prowadzi do `/admin`, nie do `/`.
- Publiczny sklep nadal używa `components/Header.tsx`.
- `npm run verify` przechodzi.
