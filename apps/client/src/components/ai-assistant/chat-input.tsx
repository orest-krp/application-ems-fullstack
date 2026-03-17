import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ input, setInput, onSend }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        name="chat"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="w-full border rounded-md p-2"
      />

      <div className="flex justify-end gap-2">
        <Button onClick={onSend}>
          <Send />
          Send
        </Button>
      </div>
    </div>
  );
}
