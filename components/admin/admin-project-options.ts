export type AdminOption = {
  label: string;
  value: string;
};

export const badgeOptions: AdminOption[] = [
  { label: "Brak", value: "" },
  { label: "Nowość", value: "Nowość" },
  { label: "Bestseller", value: "Bestseller" },
  { label: "Promocja", value: "Promocja" },
  { label: "Polecany", value: "Polecany" },
  { label: "Premium", value: "Premium" },
  { label: "Gotowy do adaptacji", value: "Gotowy do adaptacji" }
];

export const projectTypeOptions: AdminOption[] = [
  { label: "Parterowy", value: "Parterowy" },
  { label: "Piętrowy", value: "Piętrowy" },
  { label: "Z poddaszem", value: "Z poddaszem" },
  { label: "Nowoczesna stodoła", value: "Nowoczesna stodoła" },
  { label: "Mały dom", value: "Mały dom" },
  { label: "Dom z garażem", value: "Dom z garażem" },
  { label: "Budynek gospodarczy", value: "Budynek gospodarczy" },
  { label: "Garaż / wiata", value: "Garaż / wiata" },
  { label: "Hala", value: "Hala" },
  { label: "Usługowy", value: "Usługowy" }
];

export const garageOptions: AdminOption[] = [
  { label: "Brak garażu", value: "Brak garażu" },
  { label: "1 stanowisko", value: "1 stanowisko" },
  { label: "2 stanowiska", value: "2 stanowiska" },
  { label: "3 stanowiska", value: "3 stanowiska" },
  { label: "Garaż jednostanowiskowy", value: "Garaż jednostanowiskowy" },
  { label: "Garaż dwustanowiskowy", value: "Garaż dwustanowiskowy" },
  { label: "Wiata", value: "Wiata" }
];

export const roofOptions: AdminOption[] = [
  { label: "Dwuspadowy", value: "Dwuspadowy" },
  { label: "Czterospadowy", value: "Czterospadowy" },
  { label: "Płaski", value: "Płaski" },
  { label: "Kopertowy", value: "Kopertowy" },
  { label: "Wielospadowy", value: "Wielospadowy" },
  { label: "Jednospadowy", value: "Jednospadowy" }
];

export const technologyOptions: AdminOption[] = [
  { label: "Murowana", value: "Murowana" },
  { label: "Szkieletowa", value: "Szkieletowa" },
  { label: "Drewniana", value: "Drewniana" },
  { label: "Prefabrykowana", value: "Prefabrykowana" },
  { label: "Żelbetowa", value: "Żelbetowa" },
  { label: "Stalowa", value: "Stalowa" }
];

export const styleOptions: AdminOption[] = [
  { label: "Nowoczesny", value: "Nowoczesny" },
  { label: "Tradycyjny", value: "Tradycyjny" },
  { label: "Minimalistyczny", value: "Minimalistyczny" },
  { label: "Klasyczny", value: "Klasyczny" },
  { label: "Nowoczesna stodoła", value: "Nowoczesna stodoła" },
  { label: "Industrialny", value: "Industrialny" },
  { label: "Skandynawski", value: "Skandynawski" }
];

export const floorsCountOptions: AdminOption[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" }
];

export const roomFloorOptions: AdminOption[] = [
  { label: "Parter", value: "Parter" },
  { label: "Piętro", value: "Piętro" },
  { label: "Poddasze", value: "Poddasze" },
  { label: "Piwnica", value: "Piwnica" },
  { label: "Antresola", value: "Antresola" },
  { label: "Garaż / techniczne", value: "Garaż / techniczne" }
];
