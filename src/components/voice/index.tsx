import { IconVolume } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type TVoice = {
  lang: string;
  text: string;
};

const Voice = ({ lang, text }: TVoice) => {
  const handleTextToSpeech: MouseEventHandler<SVGSVGElement> = (e) => {
    // Defeat bubble event click
    e.stopPropagation();
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const findVoice = voices
      .filter((voice) => voice.name.includes("Google"))
      .find((item) => item.lang.includes(lang));

    if (!findVoice) return;

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = findVoice;
    synth.speak(utterThis);
  };

  if (lang === "vi") return;

  return (
    <IconVolume
      className="cursor-pointer ml-1.5"
      size="1rem"
      onClick={(e) => handleTextToSpeech(e)}
    />
  );
};

export default Voice;