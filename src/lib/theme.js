// Theme: light is the default (DESIGN.md, Direction v2). The server renders
// <html data-theme="light">; this script runs before the first paint and switches to the
// dark theme when the reader chose it before, so the page never flashes the wrong one.
export const THEME_KEY = "theme";
export const DEFAULT_THEME = "light";

export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
