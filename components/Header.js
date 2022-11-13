import Image from 'next/image'
import Logo from '../public/assets/img/logo.png';

export default function Header(){
    return (
        <div className={`header bg-lightgreen`}>
            <div className={`logo`}>
                <Image src={Logo} alt="Greencans" fill="true" />
            </div>
        </div>
    )
}