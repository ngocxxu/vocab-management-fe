export const ErrorMessage = ({ message }: { message: string }) => {
  return message && <span className="text-xs text-red-600">{message}</span>
}
