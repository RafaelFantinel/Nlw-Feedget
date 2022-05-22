import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenShot: string | null;
  onScreenShotTook: (screenshot: string | null) => void;
}
export function ScreenshotButton({
   screenShot,
   onScreenShotTook
}: ScreenshotButtonProps) {
  
  const [ isTakenScreenshot, setIsTakenScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakenScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenShotTook(base64image);
    setIsTakenScreenshot(false);
  }

  if(screenShot) {
    return (
      <button>
        <button 
          type="button"
          className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"  
          onClick={() => onScreenShotTook(null)}
          style={{
            backgroundImage: `url(${screenShot})`,
            backgroundPosition: 'right bottom',
            backgroundSize: 180
          }}
        >
          <Trash weight="fill" />

        </button>
      </button>
    )
  }
  return(
    <button
    type="button"
    className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >

    { isTakenScreenshot ? <Loading /> :
     <Camera className="w-6 h-6"
      onClick={handleTakeScreenshot}/>   }
  </button>
  )
}