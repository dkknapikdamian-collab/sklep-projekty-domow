# Raport AI - Etap 20: Widok audit logu `/admin/audit`

Data: 2026-05-15 22:20 Europe/Warsaw  
Repo: `dkknapikdamian-collab/sklep-projekty-domow`  
Branch: `main`

## Cel

Audit log ma być widoczny z panelu admina. Po operacji admina można wejść w `/admin/audit` i zobaczyć ślad operacji.

## Zakres wykonany w paczce

### 1. Odczyt audit logu

Rozszerzono `lib/admin/audit-log.ts` o:

- `getAdminAuditLogEntries`,
- `ADMIN_AUDIT_ACTION_FILTERS`,
- `ADMIN_AUDIT_ACTION_FILTER_LABELS`,
- `toAdminAuditActionFilter`,
- `adminAuditMetadataSummary`,
- `adminAuditMetadataJson`.

### 2. Strona `/admin/audit`

Dodano `app/admin/audit/page.tsx`.

Widok pokazuje:

- data,
- admin,
- akcja,
- typ encji,
- ID encji,
- skrót metadata.

Dodano filtr po typie akcji.

### 3. Linki w adminie

Dodano:

- link `Audit` w `components/admin/AdminHeader.tsx`,
- kafel `Audit` w `app/admin/page.tsx`.

### 4. Guard

Rozszerzono `scripts/check-admin-audit-log-v44.cjs`, żeby pilnował strony audit, markerów UI, helperów, filtrów i braku mutacji w widoku audit.

## Czego nie zmieniono

- Nie zmieniano mechanizmu auth.
- Nie zmieniano logiki operacji admina.
- Nie zmieniano publicznych stron.
- Nie dodano mutacji na stronie audit.
- Nie zmieniano tabeli `admin_audit_log`.

## Testy wymagane lokalnie

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```

## Test ręczny wymagany

1. Wejść do `/admin/audit`.
2. Sprawdzić tabelę i filtr.
3. Wykonać operację admina.
4. Wrócić do `/admin/audit`.
5. Potwierdzić, że wpis pojawia się z poprawnym typem akcji, encją, ID i metadata.

## Ryzyka

- Jeśli tabela `admin_audit_log` nie ma jeszcze danych, widok pokaże pusty stan.
- Jeśli jakaś operacja admina nie wywołuje `writeAdminAuditLog`, nie pojawi się w audycie. To należy dopinać punktowo w kolejnych etapach, nie przebudową całego admina.
