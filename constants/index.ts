export { BRIDE, GROOM, WEDDING_DATE, WEDDING_DATE_ISO, GREETING } from "./couple";
export { EVENTS } from "./events";
export { GALLERY } from "./gallery";
export { LOVE_STORY } from "./story";
export { QUOTE } from "./quote";
export { GIFTS } from "./gifts";
export { MUSIC, VIDEO, FORMSPREE_ID, GISCUS } from "./integrations";

import { BRIDE, GROOM, WEDDING_DATE, WEDDING_DATE_ISO, GREETING } from "./couple";
import { EVENTS } from "./events";
import { GALLERY } from "./gallery";
import { LOVE_STORY } from "./story";
import { QUOTE } from "./quote";
import { GIFTS } from "./gifts";
import { MUSIC, VIDEO, FORMSPREE_ID, GISCUS } from "./integrations";
import type { WeddingData } from "@/types/wedding";

export const WEDDING: WeddingData = {
  bride: BRIDE,
  groom: GROOM,
  date: WEDDING_DATE,
  dateISO: WEDDING_DATE_ISO,
  greeting: GREETING,
  quote: QUOTE,
  events: EVENTS,
  loveStory: LOVE_STORY,
  gallery: GALLERY,
  gifts: GIFTS,
  music: MUSIC,
  video: VIDEO,
  formspreeId: FORMSPREE_ID,
  giscus: GISCUS,
};
