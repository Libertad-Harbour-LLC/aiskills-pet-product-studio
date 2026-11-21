import "server-only";
import { MODEL, PETS, SHOTS, SCENES, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { pick, urls, text } from "@/lib/plan-helpers";

export function plan(body) {
  const product = urls(body.inputs, "product", { min: 1, max: 6, name: "product photo" });
  const own = urls(body.inputs, "pet", { min: 0, max: 1, name: "pet photo" });
  const shot = SHOTS.find((s) => s.id === body.shot) || SHOTS[0];
  const scene = SCENES.find((s) => s.id === body.scene) || SCENES[0];
  const pet = PETS.find((p) => p.id === body.pet) || PETS[0];
  const note = text(body.note, 300);
  const count = pick(Number(body.count), [1, 2, 4], 1);
  const n = product.length;
  const refs = n > 1 ? `images 1–${n}` : "image 1";
  let who = "";
  if (own.length) who = `The pet is exactly the animal from image ${n + 1} (same breed, coat color, markings and face). `;
  else if (pet.prompt) who = `The pet: ${pet.prompt}, with the correct anatomy for its species. `;
  else who = "No animals in the shot. ";
  const where = shot.id === "white" ? "" : ` Setting: ${scene.prompt}.`;
  const job = {
    model: MODEL,
    prompt:
      `Photorealistic pet product photo: ${shot.prompt}.${where} The product is the exact item shown in ${refs}. ` + who +
      "Keep the product's shape, size relative to the pet, colors, materials, label text and logo exactly as in the reference; do not invent text or logos. " +
      "Safe and believable use of the product, one product and at most one pet, sharp focus on the product, professional commercial lighting." +
      (note ? ` Extra wishes: ${note}.` : ""),
    params: { aspect_ratio: pick(body.aspect, ASPECTS, "1:1"), resolution: pick(body.resolution, RESOLUTIONS, "1k") },
    inputs: { image_urls: [...product, ...own] },
  };
  return Array.from({ length: count }, () => job);
}
