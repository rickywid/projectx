import Placeholder1 from '../assets/111-coding.png';
import Placeholder2 from '../assets/112-installing.png';
import Placeholder3 from '../assets/113-workstation.png';
import Placeholder4 from '../assets/118-macbook.png';
import Placeholder5 from '../assets/day38-macintosh.png';
import Placeholder6 from '../assets/day39-pc.png';
import Placeholder7 from '../assets/day40-powerbook-100.png';
import Placeholder8 from '../assets/day41-desktop.png';
import Placeholder9 from '../assets/day42-imac.png';

export default () => {
    const images = [Placeholder1, Placeholder2, Placeholder3, Placeholder4, Placeholder5, Placeholder6, Placeholder7, Placeholder8, Placeholder9];
    const image = images[Math.floor(Math.random() * images.length)];
    
    return image;
}