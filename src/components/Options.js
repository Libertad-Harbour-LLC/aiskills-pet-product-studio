"use client";

import { PETS, SHOTS, SCENES, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import { PresetGrid, LabeledChips, TextField } from "./Presets";

export default function Options({ state, set, Chips }) {
  const { t } = useLang();
  return (
    <>
      <PresetGrid label={{ en: "Shot", ru: "Кадр" }} items={SHOTS} value={state.shot} onChange={(v) => set({ shot: v })} />
      <LabeledChips label={{ en: "Pet (if you have not added your own)", ru: "Питомец (если не добавили своего)" }} items={PETS} value={state.pet} onChange={(v) => set({ pet: v })} />
      {state.shot !== "white" && (
        <LabeledChips label={{ en: "Setting", ru: "Обстановка" }} items={SCENES} value={state.scene} onChange={(v) => set({ scene: v })} />
      )}
      <Chips label={t("aspect")} options={ASPECTS} value={state.aspect} onChange={(v) => set({ aspect: v })} />
      <Chips label={t("resolution")} options={RESOLUTIONS} value={state.resolution} onChange={(v) => set({ resolution: v })} render={(v) => v.toUpperCase()} />
      <TextField id="note" rows={2} label={{ en: "Extra wishes (optional)", ru: "Пожелания (необязательно)" }} value={state.note} max={300}
        onChange={(v) => set({ note: v })} placeholder={{ en: "e.g. golden retriever playing with the toy", ru: "например: золотистый ретривер играет с игрушкой" }} />
    </>
  );
}
