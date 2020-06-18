import Placeholder1 from '../assets/111-coding.png';
import Placeholder2 from '../assets/112-installing.png';
import Placeholder3 from '../assets/113-workstation.png';
import Placeholder4 from '../assets/118-macbook.png';
import Placeholder5 from '../assets/day38-macintosh.png';
import Placeholder6 from '../assets/day39-pc.png';
import Placeholder7 from '../assets/day40-powerbook-100.png';
import Placeholder8 from '../assets/day41-desktop.png';
import Placeholder9 from '../assets/day42-imac.png';

import Placeholder10 from '../assets/day3-gaming-mouse.png';
import Placeholder11 from '../assets/day4-polaroid.png';
import Placeholder12 from '../assets/day7-vintage-camera.png';
import Placeholder13 from '../assets/day16-retro-cassette.png';
import Placeholder14 from '../assets/day18-floppy.png';
import Placeholder15 from '../assets/day19-apple-watch.png';
import Placeholder16 from '../assets/day20-rocket.png';
import Placeholder17 from '../assets/day27-my-robot.png';
import Placeholder18 from '../assets/day43-ram.png';
import Placeholder19 from '../assets/day44-hdd.png';
import Placeholder20 from '../assets/day45-gpu-ati.png';

class Placeholder {

    project = () => {
        const images = [Placeholder1, Placeholder2, Placeholder3, Placeholder4, Placeholder5, Placeholder6, Placeholder7, Placeholder8, Placeholder9];
        return this.randomize(images)
    }

    user = () => {
        const images = [Placeholder10, Placeholder11, Placeholder12, Placeholder13, Placeholder14, Placeholder15, Placeholder16, Placeholder17, Placeholder18, Placeholder19, Placeholder20];
        return this.randomize(images)
    }

    randomize = (images: string[]) => {
        return images[Math.floor(Math.random() * images.length)];
    }
}

export default Placeholder;