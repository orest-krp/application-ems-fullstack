import { useState } from "react";
import { MessageCircle, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger
} from "@/components/ui/drawer";

import { useAI } from "@/hooks/use-ai";
import { createMessage } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatInput } from "./chat-input";
import { useChatStore } from "@/store/chat-store";

export default function AiAssistant() {
  const { sendRequest, loading } = useAI();
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = createMessage("user", input.trim());
    addMessage(userMessage);
    setInput("");

    try {
      const response = await sendRequest({ question: userMessage.content });
      const assistantMessage = createMessage(
        "assistant",
        response.response ?? "Sorry, I didn't understand that."
      );
      addMessage(assistantMessage);
    } catch {
      addMessage(
        createMessage(
          "assistant",
          "Oops! Something went wrong. Please try again later."
        )
      );
    }
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 w-10 h-10 right-6 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full flex flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between gap-2">
          <div>
            <DrawerTitle>AI Assistant</DrawerTitle>
            <DrawerDescription>Ask me anything!</DrawerDescription>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => useChatStore.getState().clearMessages()}
              className="h-8 w-8"
              title="Clear Chat"
            >
              <Trash />
            </Button>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <Chat messages={messages} loading={loading} close={handleClose} />

        <DrawerFooter className="flex flex-col gap-2 p-4 border-t border-border">
          <ChatInput input={input} setInput={setInput} onSend={handleSend} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
