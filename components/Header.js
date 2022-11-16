import Image from 'next/image'
import ResponsiveAppBar from './ResponsiveAppBar'

export default function Header(){
    return (
        <div className={`header bg-lightgreen`}>
            <ResponsiveAppBar />
        </div>
    )
}