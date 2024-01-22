import { IconVolume } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type TVoice = {
  lang: string;
  text: string;
};

const Voice = ({ lang, text }: TVoice) => {
  const synth = window.speechSynthesis;

  const checkLanguageExistVoice = () => {
    const voices = synth.getVoices();
    return voices
      .filter((voice) => voice.name.includes("Google"))
      .find((item) => item.lang.includes(lang));
  };

  const handleTextToSpeech: MouseEventHandler<SVGSVGElement> = (e) => {
    // Defeat bubble event click
    e.stopPropagation();

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = checkLanguageExistVoice() ?? null;
    synth.speak(utterThis);
  };

  return (
    checkLanguageExistVoice() && (
      <IconVolume
        className="cursor-pointer ml-1.5"
        size="1rem"
        onClick={(e) => handleTextToSpeech(e)}
      />
    )
  );
};

export default Voice;
