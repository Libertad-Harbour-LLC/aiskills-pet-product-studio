// Pet Product Studio — ad and marketplace photos of pet products, with a pet using them.
// Model: nano-banana-2-1-edit (combines up to 14 photos, keeps the product exactly).

export const MODEL = "nano-banana-2-1-edit";

export const PETS = [
  { id: "dog", label: { en: "Dog", ru: "Собака" }, prompt: "a friendly medium-sized dog" },
  { id: "puppy", label: { en: "Puppy", ru: "Щенок" }, prompt: "a cute puppy" },
  { id: "cat", label: { en: "Cat", ru: "Кошка" }, prompt: "a beautiful domestic cat" },
  { id: "kitten", label: { en: "Kitten", ru: "Котёнок" }, prompt: "a fluffy kitten" },
  { id: "rabbit", label: { en: "Rabbit", ru: "Кролик" }, prompt: "a fluffy pet rabbit" },
  { id: "parrot", label: { en: "Parrot", ru: "Попугай" }, prompt: "a colorful pet parrot" },
  { id: "hamster", label: { en: "Hamster", ru: "Хомяк" }, prompt: "a small pet hamster" },
  { id: "none", label: { en: "No pet", ru: "Без питомца" }, prompt: "" },
];

export const SHOTS = [
  { id: "lifestyle", label: { en: "Lifestyle ad", ru: "Рекламный кадр" }, desc: { en: "The pet uses the product", ru: "Питомец пользуется товаром" },
    prompt: "a lifestyle advertising photo where the pet is naturally using or enjoying the product" },
  { id: "hero", label: { en: "Hero shot", ru: "Главный кадр" }, desc: { en: "Product in focus, pet nearby", ru: "Товар в фокусе, питомец рядом" },
    prompt: "a hero product shot: the product sharp and centered in the foreground, the pet softly behind it looking at it" },
  { id: "white", label: { en: "Marketplace white", ru: "Белый фон" }, desc: { en: "Clean white for listings", ru: "Чистый белый для карточки" },
    prompt: "a clean e-commerce photo on a pure white seamless background (#FFFFFF) with a soft natural shadow" },
  { id: "flatlay", label: { en: "Flat lay", ru: "Флэтлей" }, desc: { en: "Top view with props", ru: "Вид сверху с реквизитом" },
    prompt: "a top-down flat lay photo with tasteful pet-themed props around the product" },
];

export const SCENES = [
  { id: "living", label: { en: "Cozy living room", ru: "Уютная гостиная" }, prompt: "in a bright cozy living room with a soft rug and natural window light" },
  { id: "kitchen", label: { en: "Kitchen", ru: "Кухня" }, prompt: "on a clean modern kitchen floor with warm morning light" },
  { id: "park", label: { en: "Park", ru: "Парк" }, prompt: "on green grass in a sunny park with soft bokeh trees" },
  { id: "garden", label: { en: "Backyard garden", ru: "Сад у дома" }, prompt: "in a backyard garden with flowers on a sunny day" },
  { id: "bedroom", label: { en: "Bedroom", ru: "Спальня" }, prompt: "on a bed with soft linen in a calm bedroom" },
  { id: "beach", label: { en: "Beach", ru: "Пляж" }, prompt: "on a sandy beach at golden hour" },
  { id: "snow", label: { en: "Winter walk", ru: "Зимняя прогулка" }, prompt: "outdoors on fresh snow in a winter park" },
  { id: "studio", label: { en: "Color studio", ru: "Цветная студия" }, prompt: "in a studio with a pastel colored backdrop and soft even light" },
];

export const ASPECTS = ["1:1", "4:5", "3:4", "16:9", "9:16"];
export const RESOLUTIONS = ["1k", "2k"];

export const APP = {
  id: "pet-product-studio",
  name: "Pet Product Studio",
  theme: "emerald",
  tagline: { en: "Ad photos for pet brands", ru: "Рекламные фото для зоотоваров" },
  kicker: { en: "Pet product photography", ru: "Фото зоотоваров" },
  headline: { en: "Pet product photos that sell", ru: "Фото зоотоваров, которые продают" },
  description: {
    en: "Add photos of your product — and optionally of your own pet. Get lifestyle ads, hero shots and white-background listing photos in seconds.",
    ru: "Добавьте фото товара — и, если хотите, своего питомца. Получите рекламные кадры, главное фото и фото на белом фоне для карточки за секунды.",
  },
  cta: { en: "Create photos", ru: "Создать фото" },
  models: [MODEL],
  upload: { types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], maxBytes: 20 * 1024 * 1024 },
  slots: [
    { key: "product", kind: "image", min: 1, max: 6,
      label: { en: "Product photos", ru: "Фото товара" },
      hint: { en: "Collar, bowl, toy, food pack… Several angles = more accurate.", ru: "Ошейник, миска, игрушка, корм… Несколько ракурсов — точнее результат." } },
    { key: "pet", kind: "image", min: 0, max: 1,
      label: { en: "Your pet (optional)", ru: "Ваш питомец (необязательно)" },
      hint: { en: "Add a photo to show your own pet instead of a generated one.", ru: "Добавьте фото, чтобы в кадре был ваш питомец, а не сгенерированный." } },
  ],
  counts: [1, 2, 4],
  compare: false,
  initialState: () => ({ pet: "dog", shot: "lifestyle", scene: "living", aspect: "1:1", resolution: "1k", count: 1, note: "" }),
  priceModel: () => MODEL,
  label: (s, tx) => [tx(SHOTS.find((x) => x.id === s.shot)?.label), s.pet !== "none" ? tx(PETS.find((p) => p.id === s.pet)?.label) : ""].filter(Boolean).join(" · "),
};
