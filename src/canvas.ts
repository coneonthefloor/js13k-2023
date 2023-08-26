import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { getActiveSeason } from "./season";

// select canvas element's based off their id
const { stage, effects, game, background, offscreen } = window as any;

// set canvas layers to match defined screen width and height
export const initialiseCanvas = () => {
    stage.classList.add(getActiveSeason());
    stage.style.width = SCREEN_WIDTH + 'px';
    stage.style.height = SCREEN_HEIGHT + 'px';
    for (const $el of [effects, game, background, offscreen]) {
        $el.width = SCREEN_WIDTH;
        $el.height = SCREEN_HEIGHT;
    }
};

// make canvas contexts available
export type Context = CanvasRenderingContext2D;
const getContext = (el: HTMLCanvasElement): Context =>
    el.getContext('2d') as Context;

export const layers: { [key: string]: Context; } = {
    game: getContext(game),
    effects: getContext(effects),
    offscreen: getContext(offscreen),
    background: getContext(background),
};