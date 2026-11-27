// Theme: dark is the default (DESIGN.md, Direction v2). The server renders
// <html data-theme="dark">; this script runs before the first paint and switches to the
// light theme when the reader chose it before, so the page never flashes the wrong one.
export const THEME_KEY = "theme";
export const DEFAULT_THEME = "dark";

export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;
