export type FallbackGif = {
  id: string;
  url: string;
  preview: string;
  width: number;
  height: number;
  tags: string[];
};

import focus from "./tenor-fallback/01-focus.gif";
import zen from "./tenor-fallback/02-zen.gif";
import energy from "./tenor-fallback/03-energy.gif";
import success from "./tenor-fallback/04-success.gif";
import night from "./tenor-fallback/05-night.gif";
import sunset from "./tenor-fallback/06-sunset.gif";
import coding from "./tenor-fallback/07-coding.gif";
import coffee from "./tenor-fallback/08-coffee.gif";
import idea from "./tenor-fallback/09-idea.gif";
import celebrate from "./tenor-fallback/10-celebrate.gif";
import calm from "./tenor-fallback/11-calm.gif";
import motivation from "./tenor-fallback/12-motivation.gif";

const FALLBACK_DIMENSION = 160;

export const FALLBACK_TENOR_GIFS: FallbackGif[] = [
  {
    id: "focus-galaxy",
    url: focus,
    preview: focus,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["focus", "productivité", "travail", "zen"],
  },
  {
    id: "zen-waves",
    url: zen,
    preview: zen,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["zen", "calme", "respiration", "relax"],
  },
  {
    id: "energy-boost",
    url: energy,
    preview: energy,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["energie", "motivation", "booster", "power"],
  },
  {
    id: "success-glow",
    url: success,
    preview: success,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["succes", "win", "progression", "objectif"],
  },
  {
    id: "night-shift",
    url: night,
    preview: night,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["night", "deep work", "nocturne", "focus"],
  },
  {
    id: "sunset-flow",
    url: sunset,
    preview: sunset,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["creativite", "sunset", "flow", "art"],
  },
  {
    id: "coding-loop",
    url: coding,
    preview: coding,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["code", "dev", "programmation", "terminal"],
  },
  {
    id: "coffee-break",
    url: coffee,
    preview: coffee,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["cafe", "pause", "matin", "energie"],
  },
  {
    id: "idea-burst",
    url: idea,
    preview: idea,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["idee", "brainstorm", "inspiration", "etincelle"],
  },
  {
    id: "celebrate-pulse",
    url: celebrate,
    preview: celebrate,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["celebration", "party", "yay", "succes"],
  },
  {
    id: "calm-breeze",
    url: calm,
    preview: calm,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["calme", "repos", "respiration", "serenite"],
  },
  {
    id: "motivation-spark",
    url: motivation,
    preview: motivation,
    width: FALLBACK_DIMENSION,
    height: FALLBACK_DIMENSION,
    tags: ["motivation", "courage", "boost", "objectif"],
  },
];
