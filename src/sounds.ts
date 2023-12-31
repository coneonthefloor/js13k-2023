// zzfx() - the universal entry point -- returns a AudioBufferSourceNode
const zzfx = (...t) => zzfxP(zzfxG(...t));

// zzfxP() - the sound player -- returns a AudioBufferSourceNode
const zzfxP = (...t) => { let e = zzfxX.createBufferSource(), f = zzfxX.createBuffer(t.length, t[0].length, zzfxR); t.map((d, i) => f.getChannelData(i).set(d)), e.buffer = f, e.connect(zzfxX.destination), e.start(); return e; };

// zzfxG() - the sound generator -- returns an array of sample data
// @ts-ignore
const zzfxG = (q = 1, k = .05, c = 220, e = 0, t = 0, u = .1, r = 0, F = 1, v = 0, z = 0, w = 0, A = 0, l = 0, B = 0, x = 0, G = 0, d = 0, y = 1, m = 0, C = 0) => { let b = 2 * Math.PI, H = v *= 500 * b / zzfxR ** 2, I = (0 < x ? 1 : -1) * b / 4, D = c *= (1 + 2 * k * Math.random() - k) * b / zzfxR, Z = [], g = 0, E = 0, a = 0, n = 1, J = 0, K = 0, f = 0, p, h; e = 99 + zzfxR * e; m *= zzfxR; t *= zzfxR; u *= zzfxR; d *= zzfxR; z *= 500 * b / zzfxR ** 3; x *= b / zzfxR; w *= b / zzfxR; A *= zzfxR; l = zzfxR * l | 0; for (h = e + m + t + u + d | 0; a < h; Z[a++] = f)++K % (100 * G | 0) || (f = r ? 1 < r ? 2 < r ? 3 < r ? Math.sin((g % b) ** 3) : Math.max(Math.min(Math.tan(g), 1), -1) : 1 - (2 * g / b % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(g / b) - g / b) : Math.sin(g), f = (l ? 1 - C + C * Math.sin(2 * Math.PI * a / l) : 1) * (0 < f ? 1 : -1) * Math.abs(f) ** F * q * zzfxV * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - y) : a < e + m + t ? y : a < h - d ? (h - a - d) / u * y : 0), f = d ? f / 2 + (d > a ? 0 : (a < h - d ? 1 : (h - a) / d) * Z[a - d | 0] / 2) : f), p = (c += v += z) * Math.sin(E * x - I), g += p - p * B * (1 - 1E9 * (Math.sin(a) + 1) % 2), E += p - p * B * (1 - 1E9 * (Math.sin(a) ** 2 + 1) % 2), n && ++n > A && (c += w, D += w, n = 0), !l || ++J % l || (c = D, v = H, n = n || 1); return Z; };

// zzfxV - global volume
const zzfxV = .3;

// zzfxR - global sample rate
const zzfxR = 44100;

// zzfxX - the common audio context 
// @ts-ignore
const zzfxX = new (window.AudioContext || webkitAudioContext);

//! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
// @ts-ignore
const zzfxM = (n, f, t, e = 125) => { let l, o, z, r, g, h, x, a, u, c, d, i, m, p, G, M = 0, R = [], b = [], j = [], k = 0, q = 0, s = 1, v = {}, w = zzfxR / e * 60 >> 2; for (; s; k++)R = [s = a = d = m = 0], t.map((e, d) => { for (x = f[e][k] || [0, 0, 0], s |= !!f[e][k], G = m + (f[e][0].length - 2 - !a) * w, p = d == t.length - 1, o = 2, r = m; o < x.length + p; a = ++o) { for (g = x[o], u = o == x.length + p - 1 && p || c != (x[0] || 0) | g | 0, z = 0; z < w && a; z++ > w - 99 && u ? i += (i < 1) / 99 : 0)h = (1 - i) * R[M++] / 2 || 0, b[r] = (b[r] || 0) - h * q + h, j[r] = (j[r++] || 0) + h * q + h; g && (i = g % 1, q = x[1] || 0, (g |= 0) && (R = v[[c = x[M = 0] || 0, g]] = v[[c, g]] || (l = [...n[c]], l[2] *= 2 ** ((g - 12) / 12), g > 0 ? zzfxG(...l) : []))); } m = G; }); return [b, j]; };


export class Sounds {
    public static hit = [, , 328, .02, .01, 0, 1, .69, -5.9, , , , , , , , .11];

    public static shoot = [.2, , 298, , , .07, 2, .18, -2.9, -0.1, , , .04, , , , .22, .69, .09, .05];

    public static death = [, , 466, .03, .01, .06, , 1.17, -8.8, 2.7, , , , .2, , , , .57, .06];

    public static arrowHit = [.2, , 670, .01, , .02, 3, .73, -2.1, , 506, .04, , .8, -57, , , , .02];

    public static music = zzfxM(...[[[, 0, 77, , , .7, 2, .41, , , , , , , , .06], [, 0, 43, .01, , .3, 2, , , , , , , , , .02, .01], [, 0, 170, .003, , .008, , .97, -35, 53, , , , , , .1], [.8, 0, 270, , , .12, 3, 1.65, -2, , , , , 4.5, , .02], [, 0, 86, , , , , .7, , , , .5, , 6.7, 1, .05], [, 0, 41, , .05, .4, 2, 0, , , 9, .01, , , , .08, .02], [, 0, 2200, , , .04, 3, 2, , , 800, .02, , 4.8, , .01, .1], [.3, 0, 16, , , .3, 3]], [[[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 22, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 24, , , , , , , , , , , , , , , , , , , , , , , , 22, , 22, , 22, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 24, , , , , , , , 27, , , , , , , , , , , , , , , , 27, , , , 24, , , , 24, , , , , , , , 27, , , , , , , , , , , , , , , , 24, , 24, , 24, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [6, 1, , , 34, 34, 34, , , , , , 34, 34, , , , , 34, , , , 34, 34, , , , , 34, , , , 34, , , , 34, 34, 34, , , , , , 34, , , , , , 34, 34, , , 34, 34, , , , , , , , , 34, 34], [4, 1, , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , , , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 23, 23, 35, 35, 23, 23, 35, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 36], [5, -1, 21, , , 19, , , 21, , , , , , , , , , 21, , , 19, , , 17, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,], [3, 1, 24, , , 24, , , 24, , , , , , , , , , 24, , , 24, , , 24, , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [4, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, 24.01, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 23, , 21, 23, , 35, , 23, , 21, 23, , 35, , 35, , 23, , 21, 23, , 35, , 21, 23, , 35, , 21, 23, , ,], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, 36, 34, , 33, 34, 34, 36, 31, 36, 34, , 31, 34, 32, , 33, 36, 34, , 31, 34, 34, 36, 33, 36, 33, , 31, , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, , , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29], [2, 1, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , , , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , ,], [6, 1, , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , , , , , , , , , , , 36, , , , , , 36, , 36, , , , , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , 25, , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25]], [[1, -1, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 31], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 36, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 19, , 19, 19, 31, 19, 19, 31, 19, , 19, 19, 31, 19, 19, 31], [2, 1, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , , , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, , , , , , 34, , 34, , , , , , , , 34, , , , , , 34, , 34, , , , , ,]]], [0, 1, 1, 2, 3, 4, 4]]);

    public static playSound(sound: any) {
        zzfx(...sound);
    }

    public static _music;
    public static playMusic() {
        //@ts-ignore
        Sounds._music = zzfxP(...Sounds.music);
    }

    public static stopMusic() {
        if (Sounds._music) {
            Sounds._music.stop();
            delete Sounds._music;
        }
    }
}