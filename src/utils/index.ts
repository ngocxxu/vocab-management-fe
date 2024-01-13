// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeOpenAttribute = (
  ref: React.MutableRefObject<HTMLDetailsElement>
) => {
  if (!ref.current) return;
  ref.current.removeAttribute("open");
};

export const showModal = (id: string) => {
  return (document.getElementById(id) as HTMLDialogElement).showModal();
};
