import type { AdminOrderItem, AdminOrderListItem } from "@/lib/admin/orders-admin";
import { money } from "@/lib/format";

export type ManualOrderEmailDraftKey = "order_confirmation" | "payment_confirmed" | "files_delivery";

export type ManualOrderEmailDraft = {
  key: ManualOrderEmailDraftKey;
  title: string;
  subject: string;
  body: string;
  copyHint: string;
};

function cleanLine(value: string) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function customerFirstName(order: AdminOrderListItem) {
  const first = cleanLine(order.customerName).split(" ").filter(Boolean)[0];
  return first || "dzień dobry";
}

function itemLine(item: AdminOrderItem) {
  const addons = item.addons.length
    ? item.addons.map((addon) => `${addon.name} (+${money(addon.priceGross)})`).join(", ")
    : "brak dodatków";

  return [
    `- ${item.projectName} (${item.projectCode})`,
    item.variantName ? `  Wariant: ${item.variantName}` : "",
    `  Dodatki: ${addons}`,
    `  Kwota pozycji: ${money(item.itemTotalGross)}`
  ].filter(Boolean).join("\n");
}

function itemsSummary(order: AdminOrderListItem) {
  return order.items.map(itemLine).join("\n\n");
}

function hasPdfEmailAddon(order: AdminOrderListItem) {
  return order.items.some((item) => item.hasPdfEmailAddon);
}

function hasPrivateFiles(order: AdminOrderListItem) {
  return order.items.some((item) => item.privateFiles.length > 0);
}

function privateFilesSummary(order: AdminOrderListItem) {
  const lines = order.items.flatMap((item) =>
    item.privateFiles.map((file) => `- ${item.projectCode}: ${file.fileLabel}${file.title ? ` / ${file.title}` : ""}`)
  );

  if (lines.length === 0) {
    return "- brak przypiętych plików prywatnych w panelu projektu";
  }

  return lines.join("\n");
}

export function buildManualPaymentInstruction(order: AdminOrderListItem) {
  const saved = order.fulfillmentChecklist.paymentInstruction.trim();
  if (saved) return saved;

  return [
    "Dane do płatności przelewem:",
    "Odbiorca: [UZUPEŁNIJ]",
    "Numer rachunku: [UZUPEŁNIJ]",
    `Tytuł przelewu: Zamówienie #${order.shortId}`,
    `Kwota: ${money(order.totalGross)}`,
    "",
    "Po zaksięgowaniu płatności przygotujemy ręczną realizację zamówienia."
  ].join("\n");
}

function commonFooter() {
  return [
    "Pozdrawiam,",
    "Zespół sklepu z projektami domów"
  ].join("\n");
}

export function buildManualOrderEmailDrafts(order: AdminOrderListItem): ManualOrderEmailDraft[] {
  const firstName = customerFirstName(order);
  const pdfLine = hasPdfEmailAddon(order)
    ? "W zamówieniu znajduje się dodatek: projekt w formacie PDF na e-mail."
    : "W zamówieniu nie widzę dodatku PDF na e-mail.";
  const privateFileLine = hasPrivateFiles(order)
    ? "W panelu admina są przypięte pliki prywatne do ręcznej realizacji."
    : "W panelu admina nie widzę jeszcze przypiętych plików prywatnych do tego zamówienia.";
  const manualPaymentInstruction = buildManualPaymentInstruction(order);

  return [
    {
      key: "order_confirmation",
      title: "E-mail: potwierdzenie zamówienia",
      subject: `Potwierdzenie zamówienia #${order.shortId}`,
      copyHint: "Wyślij po przyjęciu zamówienia. Ten draft zawiera ręczną instrukcję przelewu.",
      body: [
        `Dzień dobry ${firstName},`,
        "",
        `dziękujemy za złożenie zamówienia #${order.shortId}.`,
        "",
        "Podsumowanie zamówienia:",
        itemsSummary(order),
        "",
        `Łączna kwota: ${money(order.totalGross)}`,
        pdfLine,
        "",
        "Płatność jest realizowana ręcznie, po kontakcie z obsługą. Poniżej dane do przelewu:",
        manualPaymentInstruction,
        "",
        "Po potwierdzeniu płatności przygotujemy dalszą realizację zamówienia.",
        "",
        commonFooter()
      ].join("\n")
    },
    {
      key: "payment_confirmed",
      title: "E-mail: płatność potwierdzona",
      subject: `Płatność potwierdzona — zamówienie #${order.shortId}`,
      copyHint: "Wyślij po ręcznym potwierdzeniu płatności.",
      body: [
        `Dzień dobry ${firstName},`,
        "",
        `potwierdzamy zaksięgowanie płatności za zamówienie #${order.shortId}.`,
        "",
        "Przechodzimy do ręcznej realizacji zamówienia.",
        privateFileLine,
        "",
        "Jeżeli do zamówienia ma zostać przygotowany dodatkowy plik PDF na e-mail, uwzględnimy go zgodnie z wybranym dodatkiem.",
        "",
        commonFooter()
      ].join("\n")
    },
    {
      key: "files_delivery",
      title: "E-mail: wysyłka plików",
      subject: `Pliki do zamówienia #${order.shortId}`,
      copyHint: "Wyślij ręcznie po przygotowaniu plików. Wklej linki albo załączniki samodzielnie.",
      body: [
        `Dzień dobry ${firstName},`,
        "",
        `przesyłamy materiały do zamówienia #${order.shortId}.`,
        "",
        "Pliki / materiały do przekazania:",
        privateFilesSummary(order),
        "",
        "Miejsce na ręczne wklejenie linków albo informację o załącznikach:",
        "[TU WKLEJ LINKI LUB DODAJ ZAŁĄCZNIKI RĘCZNIE]",
        "",
        hasPdfEmailAddon(order)
          ? "Dodatek PDF na e-mail został uwzględniony w zamówieniu."
          : "Dodatkowy PDF na e-mail nie był zaznaczony w zamówieniu.",
        "",
        "W razie pytań prosimy o odpowiedź na tę wiadomość.",
        "",
        commonFooter()
      ].join("\n")
    }
  ];
}
