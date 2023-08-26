import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants";
import { initialiseCanvas, layers } from './canvas';
import { generateCRTVignette } from "./crt-vignette";
import { Game } from "./game";

initialiseCanvas();

const vignette = generateCRTVignette(layers.offscreen, SCREEN_WIDTH, SCREEN_HEIGHT);

const game = new Game();

window.addEventListener('load', () => {
    let lastUpdate = Date.now();

    game.start();

    function update(dt: number) {
        game.update(dt);
    }

    function draw() {
        layers.game.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        layers.effects.putImageData(vignette, 0, 0);

        game.draw();
    }

    function tick() {
        requestAnimationFrame(tick);

        const now = Date.now();
        const dt = now - lastUpdate;
        lastUpdate = now;

        update(dt);
        draw();
    }

    tick();
});
