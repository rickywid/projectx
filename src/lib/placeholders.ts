import Placeholder1 from '../assets/111-coding.png';
import Placeholder2 from '../assets/112-installing.png';
import Placeholder3 from '../assets/113-workstation.png';
import Placeholder4 from '../assets/118-macbook.png';
import Placeholder5 from '../assets/day38-macintosh.png';
import Placeholder6 from '../assets/day39-pc.png';
import Placeholder7 from '../assets/day40-powerbook-100.png';
import Placeholder8 from '../assets/day41-desktop.png';
import Placeholder9 from '../assets/day42-imac.png';

import Placeholder10 from '../assets/010-dove.png';
import Placeholder11 from '../assets/011-dog.png';
import Placeholder12 from '../assets/012-monkey.png';
import Placeholder13 from '../assets/013-dove.png';
import Placeholder14 from '../assets/014-cow.png';
import Placeholder15 from '../assets/015-goose.png';
import Placeholder16 from '../assets/016-goose.png';
import Placeholder17 from '../assets/017-monkey.png';
import Placeholder18 from '../assets/018-monkey.png';
import Placeholder19 from '../assets/019-pig.png';
import Placeholder20 from '../assets/020-goose.png';

import Placeholder21 from '../assets/021-dove.png';
import Placeholder22 from '../assets/022-cat.png';
import Placeholder23 from '../assets/023-dog.png';
import Placeholder24 from '../assets/024-raccoon.png';
import Placeholder25 from '../assets/025-pig.png';
import Placeholder26 from '../assets/026-elephant.png';
import Placeholder27 from '../assets/027-cow.png';
import Placeholder28 from '../assets/028-cat.png';
import Placeholder29 from '../assets/029-raccoon.png';
import Placeholder30 from '../assets/030-cow.png';

import Placeholder31 from '../assets/031-grizzly.png';
import Placeholder32 from '../assets/032-dove.png';
import Placeholder33 from '../assets/033-elephant.png';
import Placeholder34 from '../assets/034-elephant.png';
import Placeholder35 from '../assets/035-dog.png';
import Placeholder36 from '../assets/036-cow.png';
import Placeholder37 from '../assets/037-cow.png';
import Placeholder38 from '../assets/038-grizzly.png';
import Placeholder39 from '../assets/039-pig.png';
import Placeholder40 from '../assets/040-elephant.png';

import Placeholder41 from '../assets/041-raccoon.png';
import Placeholder42 from '../assets/042-raccoon.png';
import Placeholder43 from '../assets/043-monkey.png';
import Placeholder44 from '../assets/044-cat.png';
import Placeholder45 from '../assets/045-raccoon.png';
import Placeholder46 from '../assets/046-dog.png';
import Placeholder47 from '../assets/047-grizzly.png';
import Placeholder48 from '../assets/048-grizzly.png';
import Placeholder49 from '../assets/049-pig.png';
import Placeholder50 from '../assets/050-goose.png';

import Placeholder51 from '../assets/001-elephant.png';
import Placeholder52 from '../assets/002-goose.png';
import Placeholder53 from '../assets/003-cat.png';
import Placeholder54 from '../assets/004-pig.png';
import Placeholder55 from '../assets/005-dog.png';
import Placeholder56 from '../assets/006-monkey.png';
import Placeholder57 from '../assets/007-cat.png';
import Placeholder58 from '../assets/008-dove.png';
import Placeholder59 from '../assets/009-grizzly.png';

class Placeholder {

    project = () => {
        const images = [Placeholder1, Placeholder2, Placeholder3, Placeholder4, Placeholder5, Placeholder6, Placeholder7, Placeholder8, Placeholder9];
        return this.randomize(images)
    }

    user = () => {
        const images = [
            Placeholder10, 
            Placeholder11, 
            Placeholder12, 
            Placeholder13, 
            Placeholder14, 
            Placeholder15, 
            Placeholder16, 
            Placeholder17, 
            Placeholder18, 
            Placeholder19, 
            Placeholder20,
            Placeholder21,
            Placeholder22,
            Placeholder23,
            Placeholder24,
            Placeholder25,
            Placeholder26,
            Placeholder27,
            Placeholder28,
            Placeholder29,
            Placeholder30,
            Placeholder31,
            Placeholder32,
            Placeholder33,
            Placeholder34,
            Placeholder35,
            Placeholder20,
            Placeholder36,
            Placeholder37,
            Placeholder38,
            Placeholder39,
            Placeholder40,
            Placeholder41,
            Placeholder42,
            Placeholder43,
            Placeholder44,
            Placeholder45,
            Placeholder46,
            Placeholder47,
            Placeholder48,
            Placeholder49,
            Placeholder50,
            Placeholder51,
            Placeholder52,
            Placeholder53,
            Placeholder54,
            Placeholder55,
            Placeholder56,
            Placeholder57,
            Placeholder58,
            Placeholder59            
        ];
        return this.randomize(images)
    }

    randomize = (images: string[]) => {
        return images[Math.floor(Math.random() * images.length)];
    }
}

export default Placeholder;