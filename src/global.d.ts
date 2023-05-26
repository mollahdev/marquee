import { MarqueeInterface } from "@/types"
import Marquee from "@/app"

declare global {
    interface Window {
        Marquee: typeof Marquee
    }    
}